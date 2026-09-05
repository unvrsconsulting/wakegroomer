import db, { Claim, Groomer } from "./db";

export type ClaimInput = {
  groomer_id: number;
  claimant_name: string;
  claimant_email: string;
  claimant_phone: string;
  website: string;
  gmb_url: string;
  message: string;
};

export function getApprovedGroomerBySlug(slug: string): Groomer | null {
  const row = db
    .prepare(`SELECT * FROM groomers WHERE slug = ? AND status = 'approved'`)
    .get(slug) as Groomer | undefined;
  return row ?? null;
}

export function getPendingClaimForGroomer(groomerId: number): Claim | null {
  const row = db
    .prepare(`SELECT * FROM claims WHERE groomer_id = ? AND status = 'pending' ORDER BY created_at DESC LIMIT 1`)
    .get(groomerId) as Claim | undefined;
  return row ?? null;
}

export function insertClaim(input: ClaimInput): { id: number } {
  const result = db
    .prepare(
      `INSERT INTO claims (groomer_id, claimant_name, claimant_email, claimant_phone, website, gmb_url, message, status)
       VALUES (@groomer_id, @claimant_name, @claimant_email, @claimant_phone, @website, @gmb_url, @message, 'pending')`
    )
    .run(input);
  return { id: Number(result.lastInsertRowid) };
}

export function getPendingClaims(): (Claim & { business_name: string; slug: string })[] {
  return db
    .prepare(
      `SELECT claims.*, groomers.business_name AS business_name, groomers.slug AS slug
       FROM claims
       JOIN groomers ON groomers.id = claims.groomer_id
       WHERE claims.status = 'pending'
       ORDER BY claims.created_at ASC`
    )
    .all() as (Claim & { business_name: string; slug: string })[];
}

export function approveClaim(claimId: number): void {
  const claim = db.prepare(`SELECT * FROM claims WHERE id = ?`).get(claimId) as Claim | undefined;
  if (!claim) throw new Error("Claim not found");

  const apply = db.transaction(() => {
    db.prepare(
      `UPDATE groomers SET
        is_claimed = 1,
        claimed_at = datetime('now'),
        owner_name = @claimant_name,
        email = @claimant_email,
        phone = @claimant_phone,
        website = COALESCE(NULLIF(@website, ''), website),
        gmb_url = @gmb_url
       WHERE id = @groomer_id`
    ).run(claim);

    db.prepare(`UPDATE claims SET status = 'approved' WHERE id = ?`).run(claimId);
  });

  apply();
}

export function rejectClaim(claimId: number): void {
  db.prepare(`UPDATE claims SET status = 'rejected' WHERE id = ?`).run(claimId);
}
