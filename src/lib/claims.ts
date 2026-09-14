import { sql, ensureSchema, Claim, Groomer } from "./db";

export type ClaimInput = {
  groomer_id: number;
  claimant_name: string;
  claimant_email: string;
  claimant_phone: string;
  website: string;
  gmb_url: string;
  message: string;
  wants_verified_badge: boolean;
  wants_featured: boolean;
};

export async function getApprovedGroomerBySlug(slug: string): Promise<Groomer | null> {
  await ensureSchema();
  const rows = (await sql`
    SELECT * FROM groomers WHERE slug = ${slug} AND status = 'approved'
  `) as unknown as Groomer[];
  return rows[0] ?? null;
}

export async function getPendingClaimForGroomer(groomerId: number): Promise<Claim | null> {
  await ensureSchema();
  const rows = (await sql`
    SELECT * FROM claims WHERE groomer_id = ${groomerId} AND status = 'pending'
    ORDER BY created_at DESC LIMIT 1
  `) as unknown as Claim[];
  return rows[0] ?? null;
}

export async function insertClaim(input: ClaimInput): Promise<{ id: number }> {
  await ensureSchema();
  const rows = (await sql`
    INSERT INTO claims (
      groomer_id, claimant_name, claimant_email, claimant_phone, website, gmb_url, message,
      status, wants_verified_badge, wants_featured
    )
    VALUES (${input.groomer_id}, ${input.claimant_name}, ${input.claimant_email}, ${input.claimant_phone},
            ${input.website}, ${input.gmb_url}, ${input.message}, 'pending',
            ${input.wants_verified_badge}, ${input.wants_featured})
    RETURNING id
  `) as unknown as { id: number }[];
  return { id: rows[0].id };
}

export async function getPendingClaims(): Promise<(Claim & { business_name: string; slug: string })[]> {
  await ensureSchema();
  return (await sql`
    SELECT claims.*, groomers.business_name AS business_name, groomers.slug AS slug
    FROM claims
    JOIN groomers ON groomers.id = claims.groomer_id
    WHERE claims.status = 'pending'
    ORDER BY claims.created_at ASC
  `) as unknown as (Claim & { business_name: string; slug: string })[];
}

export async function approveClaim(claimId: number): Promise<void> {
  await ensureSchema();
  const rows = (await sql`SELECT * FROM claims WHERE id = ${claimId}`) as unknown as Claim[];
  const claim = rows[0];
  if (!claim) throw new Error("Claim not found");

  await sql.transaction([
    sql`
      UPDATE groomers SET
        is_claimed = 1,
        claimed_at = now(),
        owner_name = ${claim.claimant_name},
        email = ${claim.claimant_email},
        phone = ${claim.claimant_phone},
        website = COALESCE(NULLIF(${claim.website}, ''), website),
        gmb_url = ${claim.gmb_url}
      WHERE id = ${claim.groomer_id}
    `,
    sql`UPDATE claims SET status = 'approved' WHERE id = ${claimId}`,
  ]);
}

export async function rejectClaim(claimId: number): Promise<void> {
  await ensureSchema();
  await sql`UPDATE claims SET status = 'rejected' WHERE id = ${claimId}`;
}
