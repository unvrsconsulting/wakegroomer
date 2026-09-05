import db, { Groomer } from "./db";

export function slugify(input: string): string {
  const base = input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
  return base;
}

export function uniqueSlug(businessName: string): string {
  const base = slugify(businessName) || "groomer";
  let candidate = base;
  let n = 1;
  const exists = db.prepare("SELECT 1 FROM groomers WHERE slug = ?");
  while (exists.get(candidate)) {
    n += 1;
    candidate = `${base}-${n}`;
  }
  return candidate;
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
};

export function insertSignup(input: SignupInput): { slug: string } {
  const slug = uniqueSlug(input.business_name);

  db.prepare(
    `INSERT INTO groomers (
      slug, business_name, owner_name, email, phone, website, gmb_url, description,
      city, zip, neighborhoods, services, service_radius_miles, years_experience,
      rating, review_count, featured, status
    ) VALUES (
      @slug, @business_name, @owner_name, @email, @phone, @website, @gmb_url, @description,
      @city, @zip, @neighborhoods, @services, @service_radius_miles, @years_experience,
      0, 0, 0, 'pending'
    )`
  ).run({
    slug,
    business_name: input.business_name,
    owner_name: input.owner_name,
    email: input.email,
    phone: input.phone,
    website: input.website,
    gmb_url: input.gmb_url,
    description: input.description,
    city: input.city,
    zip: input.zip,
    neighborhoods: JSON.stringify(input.neighborhoods),
    services: JSON.stringify(input.services),
    service_radius_miles: input.service_radius_miles,
    years_experience: input.years_experience,
  });

  return { slug };
}

export function getPendingSignups(): Groomer[] {
  return db
    .prepare(`SELECT * FROM groomers WHERE status = 'pending' ORDER BY created_at ASC`)
    .all() as Groomer[];
}

export function approveSignup(id: number): void {
  // A self-submitted listing already proved ownership via its Google Business
  // Profile link, so approving it also marks it claimed.
  db.prepare(
    `UPDATE groomers SET status = 'approved', is_claimed = 1, claimed_at = datetime('now') WHERE id = ?`
  ).run(id);
}

export function rejectSignup(id: number): void {
  db.prepare(`UPDATE groomers SET status = 'rejected' WHERE id = ?`).run(id);
}
