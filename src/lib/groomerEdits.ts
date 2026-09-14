import crypto from "crypto";
import { sql, ensureSchema, Groomer, GroomerEdit } from "./db";

export type GroomerEditInput = {
  groomer_id: number;
  business_name: string;
  owner_name: string;
  email: string;
  phone: string;
  website: string;
  gmb_url: string;
  facebook_url: string;
  price_info: string;
  hours: string;
  description: string;
  city: string;
  zip: string;
  neighborhoods: string[];
  services: string[];
  service_radius_miles: number;
  years_experience: number | null;
};

export type GroomerForAdmin = {
  id: number;
  slug: string;
  business_name: string;
  city: string;
  phone: string | null;
  is_claimed: number;
  featured: number;
  rating: number;
  review_count: number;
  status: string;
  edit_token: string | null;
  created_at: string;
};

export async function getAllGroomersForAdmin(): Promise<GroomerForAdmin[]> {
  await ensureSchema();
  return (await sql`
    SELECT id, slug, business_name, city, phone, is_claimed, featured, rating, review_count,
           status, edit_token, created_at
    FROM groomers
    ORDER BY business_name ASC
  `) as unknown as GroomerForAdmin[];
}

export type AdminStats = {
  totalBusinesses: number;
  claimedCount: number;
  featuredCount: number;
  cityCount: number;
};

export async function getAdminStats(): Promise<AdminStats> {
  await ensureSchema();
  const rows = (await sql`
    SELECT
      COUNT(*)::int AS total_businesses,
      COUNT(*) FILTER (WHERE is_claimed = 1)::int AS claimed_count,
      COUNT(*) FILTER (WHERE featured = 1)::int AS featured_count,
      COUNT(DISTINCT city)::int AS city_count
    FROM groomers
  `) as unknown as { total_businesses: number; claimed_count: number; featured_count: number; city_count: number }[];
  const r = rows[0];
  return {
    totalBusinesses: r.total_businesses,
    claimedCount: r.claimed_count,
    featuredCount: r.featured_count,
    cityCount: r.city_count,
  };
}

export async function toggleFeatured(id: number): Promise<void> {
  await ensureSchema();
  await sql`UPDATE groomers SET featured = 1 - featured WHERE id = ${id}`;
}

export async function toggleClaimed(id: number): Promise<void> {
  await ensureSchema();
  await sql`
    UPDATE groomers SET
      is_claimed = 1 - is_claimed,
      claimed_at = CASE WHEN is_claimed = 0 AND claimed_at IS NULL THEN now() ELSE claimed_at END
    WHERE id = ${id}
  `;
}

export async function deleteGroomer(id: number): Promise<void> {
  await ensureSchema();
  await sql.transaction([
    sql`DELETE FROM groomer_edits WHERE groomer_id = ${id}`,
    sql`DELETE FROM claims WHERE groomer_id = ${id}`,
    sql`DELETE FROM groomers WHERE id = ${id}`,
  ]);
}

export async function getGroomerById(id: number): Promise<Groomer | null> {
  await ensureSchema();
  const rows = (await sql`SELECT * FROM groomers WHERE id = ${id}`) as unknown as Groomer[];
  return rows[0] ?? null;
}

export type AdminGroomerUpdateInput = {
  business_name: string;
  owner_name: string;
  email: string;
  phone: string;
  website: string;
  gmb_url: string;
  facebook_url: string;
  price_info: string;
  hours: string;
  description: string;
  city: string;
  zip: string;
  neighborhoods: string[];
  services: string[];
  service_radius_miles: number;
  years_experience: number | null;
  rating: number;
  review_count: number;
  featured: boolean;
  is_claimed: boolean;
};

export async function adminUpdateGroomer(id: number, input: AdminGroomerUpdateInput): Promise<void> {
  await ensureSchema();
  await sql`
    UPDATE groomers SET
      business_name = ${input.business_name},
      owner_name = ${input.owner_name || null},
      email = ${input.email || null},
      phone = ${input.phone || null},
      website = ${input.website || null},
      gmb_url = ${input.gmb_url || null},
      facebook_url = ${input.facebook_url || null},
      price_info = ${input.price_info || null},
      hours = ${input.hours || null},
      description = ${input.description || null},
      city = ${input.city},
      zip = ${input.zip},
      neighborhoods = ${JSON.stringify(input.neighborhoods)},
      services = ${JSON.stringify(input.services)},
      service_radius_miles = ${input.service_radius_miles},
      years_experience = ${input.years_experience},
      rating = ${input.rating},
      review_count = ${input.review_count},
      featured = ${input.featured ? 1 : 0},
      is_claimed = ${input.is_claimed ? 1 : 0},
      claimed_at = CASE WHEN ${input.is_claimed} AND claimed_at IS NULL THEN now() ELSE claimed_at END
    WHERE id = ${id}
  `;
}

export async function generateEditToken(groomerId: number): Promise<string> {
  await ensureSchema();
  const token = crypto.randomBytes(16).toString("hex");
  await sql`UPDATE groomers SET edit_token = ${token} WHERE id = ${groomerId}`;
  return token;
}

export async function revokeEditToken(groomerId: number): Promise<void> {
  await ensureSchema();
  await sql`UPDATE groomers SET edit_token = NULL WHERE id = ${groomerId}`;
}

export async function getGroomerByEditToken(slug: string, token: string): Promise<Groomer | null> {
  await ensureSchema();
  if (!token) return null;
  const rows = (await sql`
    SELECT * FROM groomers WHERE slug = ${slug} AND edit_token = ${token}
  `) as unknown as Groomer[];
  return rows[0] ?? null;
}

export async function getPendingEditForGroomer(groomerId: number): Promise<GroomerEdit | null> {
  await ensureSchema();
  const rows = (await sql`
    SELECT * FROM groomer_edits WHERE groomer_id = ${groomerId} AND status = 'pending'
    ORDER BY created_at DESC LIMIT 1
  `) as unknown as GroomerEdit[];
  return rows[0] ?? null;
}

export async function insertGroomerEdit(input: GroomerEditInput): Promise<{ id: number }> {
  await ensureSchema();
  const rows = (await sql`
    INSERT INTO groomer_edits (
      groomer_id, business_name, owner_name, email, phone, website, gmb_url, facebook_url,
      price_info, hours, description, city, zip, neighborhoods, services,
      service_radius_miles, years_experience, status
    ) VALUES (
      ${input.groomer_id}, ${input.business_name}, ${input.owner_name}, ${input.email}, ${input.phone},
      ${input.website}, ${input.gmb_url}, ${input.facebook_url}, ${input.price_info}, ${input.hours},
      ${input.description}, ${input.city}, ${input.zip}, ${JSON.stringify(input.neighborhoods)},
      ${JSON.stringify(input.services)}, ${input.service_radius_miles}, ${input.years_experience}, 'pending'
    )
    RETURNING id
  `) as unknown as { id: number }[];
  return { id: rows[0].id };
}

export async function getPendingGroomerEdits(): Promise<
  (GroomerEdit & { slug: string; current_business_name: string })[]
> {
  await ensureSchema();
  return (await sql`
    SELECT groomer_edits.*, groomers.slug AS slug, groomers.business_name AS current_business_name
    FROM groomer_edits
    JOIN groomers ON groomers.id = groomer_edits.groomer_id
    WHERE groomer_edits.status = 'pending'
    ORDER BY groomer_edits.created_at ASC
  `) as unknown as (GroomerEdit & { slug: string; current_business_name: string })[];
}

export async function approveGroomerEdit(editId: number): Promise<void> {
  await ensureSchema();
  const rows = (await sql`SELECT * FROM groomer_edits WHERE id = ${editId}`) as unknown as GroomerEdit[];
  const edit = rows[0];
  if (!edit) throw new Error("Edit not found");

  await sql.transaction([
    sql`
      UPDATE groomers SET
        business_name = ${edit.business_name},
        owner_name = ${edit.owner_name},
        email = ${edit.email},
        phone = ${edit.phone},
        website = ${edit.website},
        gmb_url = ${edit.gmb_url},
        facebook_url = ${edit.facebook_url},
        price_info = ${edit.price_info},
        hours = ${edit.hours},
        description = ${edit.description},
        city = ${edit.city},
        zip = ${edit.zip},
        neighborhoods = ${edit.neighborhoods},
        services = ${edit.services},
        service_radius_miles = ${edit.service_radius_miles},
        years_experience = ${edit.years_experience},
        is_claimed = 1,
        claimed_at = COALESCE(claimed_at, now()),
        edit_token = NULL
      WHERE id = ${edit.groomer_id}
    `,
    sql`UPDATE groomer_edits SET status = 'approved' WHERE id = ${editId}`,
  ]);
}

export async function rejectGroomerEdit(editId: number): Promise<void> {
  await ensureSchema();
  await sql`UPDATE groomer_edits SET status = 'rejected' WHERE id = ${editId}`;
}
