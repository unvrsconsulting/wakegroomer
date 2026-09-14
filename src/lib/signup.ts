import { sql, ensureSchema, Groomer } from "./db";

export function slugify(input: string): string {
  const base = input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
  return base;
}

export async function uniqueSlug(businessName: string): Promise<string> {
  await ensureSchema();
  const base = slugify(businessName) || "groomer";
  let candidate = base;
  let n = 1;
  while (true) {
    const rows = (await sql`SELECT 1 FROM groomers WHERE slug = ${candidate}`) as unknown[];
    if (rows.length === 0) return candidate;
    n += 1;
    candidate = `${base}-${n}`;
  }
}

export type SignupInput = {
  business_name: string;
  owner_name: string;
  email: string;
  phone: string;
  website: string;
  gmb_url: string;
  description: string;
  city: string;
  zip: string;
  neighborhoods: string[];
  services: string[];
  service_radius_miles: number;
  years_experience: number;
  wants_verified_badge: boolean;
  wants_featured: boolean;
};

export async function insertSignup(input: SignupInput): Promise<{ slug: string }> {
  await ensureSchema();
  const slug = await uniqueSlug(input.business_name);

  await sql`
    INSERT INTO groomers (
      slug, business_name, owner_name, email, phone, website, gmb_url, description,
      city, zip, neighborhoods, services, service_radius_miles, years_experience,
      rating, review_count, featured, status, wants_verified_badge, wants_featured
    ) VALUES (
      ${slug}, ${input.business_name}, ${input.owner_name}, ${input.email}, ${input.phone},
      ${input.website}, ${input.gmb_url}, ${input.description}, ${input.city}, ${input.zip},
      ${JSON.stringify(input.neighborhoods)}, ${JSON.stringify(input.services)},
      ${input.service_radius_miles}, ${input.years_experience},
      0, 0, 0, 'pending', ${input.wants_verified_badge}, ${input.wants_featured}
    )
  `;

  return { slug };
}

export async function getPendingSignups(): Promise<Groomer[]> {
  await ensureSchema();
  return (await sql`
    SELECT * FROM groomers WHERE status = 'pending' ORDER BY created_at ASC
  `) as unknown as Groomer[];
}

export async function approveSignup(id: number): Promise<void> {
  await ensureSchema();
  // A self-submitted listing already proved ownership via its Google Business
  // Profile link, so approving it also marks it claimed.
  await sql`
    UPDATE groomers SET status = 'approved', is_claimed = 1, claimed_at = now() WHERE id = ${id}
  `;
}

export async function rejectSignup(id: number): Promise<void> {
  await ensureSchema();
  await sql`UPDATE groomers SET status = 'rejected' WHERE id = ${id}`;
}
