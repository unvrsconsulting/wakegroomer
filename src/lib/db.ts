import { neon } from "@neondatabase/serverless";

const connectionString =
  process.env.DATABASE_URL ?? process.env.POSTGRES_URL ?? process.env.DATABASE_URL_UNPOOLED;

if (!connectionString) {
  throw new Error(
    "No Postgres connection string found. Set DATABASE_URL (or POSTGRES_URL) — provided automatically by the Neon Vercel integration, or via `vercel env pull` for local dev."
  );
}

export const sql = neon(connectionString);

let schemaReady: Promise<void> | null = null;

export function ensureSchema(): Promise<void> {
  if (!schemaReady) {
    schemaReady = (async () => {
      await sql`
        CREATE TABLE IF NOT EXISTS groomers (
          id SERIAL PRIMARY KEY,
          slug TEXT UNIQUE NOT NULL,
          business_name TEXT NOT NULL,
          owner_name TEXT,
          email TEXT,
          phone TEXT,
          website TEXT,
          gmb_url TEXT,
          facebook_url TEXT,
          price_info TEXT,
          hours TEXT,
          description TEXT,
          city TEXT NOT NULL,
          zip TEXT NOT NULL,
          neighborhoods TEXT NOT NULL,
          services TEXT NOT NULL,
          service_radius_miles INTEGER DEFAULT 15,
          years_experience INTEGER,
          rating REAL DEFAULT 0,
          review_count INTEGER DEFAULT 0,
          featured INTEGER DEFAULT 0,
          status TEXT NOT NULL DEFAULT 'pending',
          is_claimed INTEGER NOT NULL DEFAULT 0,
          claimed_at TIMESTAMPTZ,
          created_at TIMESTAMPTZ NOT NULL DEFAULT now()
        );
      `;
      await sql`ALTER TABLE groomers ADD COLUMN IF NOT EXISTS facebook_url TEXT;`;
      await sql`ALTER TABLE groomers ADD COLUMN IF NOT EXISTS price_info TEXT;`;
      await sql`ALTER TABLE groomers ADD COLUMN IF NOT EXISTS hours TEXT;`;
      await sql`ALTER TABLE groomers ADD COLUMN IF NOT EXISTS edit_token TEXT;`;
      await sql`ALTER TABLE groomers ADD COLUMN IF NOT EXISTS wants_verified_badge BOOLEAN;`;
      await sql`ALTER TABLE groomers ADD COLUMN IF NOT EXISTS wants_featured BOOLEAN;`;
      await sql`CREATE INDEX IF NOT EXISTS idx_groomers_status ON groomers(status);`;
      await sql`CREATE INDEX IF NOT EXISTS idx_groomers_city ON groomers(city);`;
      await sql`CREATE INDEX IF NOT EXISTS idx_groomers_zip ON groomers(zip);`;
      await sql`CREATE UNIQUE INDEX IF NOT EXISTS idx_groomers_edit_token ON groomers(edit_token) WHERE edit_token IS NOT NULL;`;

      await sql`
        CREATE TABLE IF NOT EXISTS claims (
          id SERIAL PRIMARY KEY,
          groomer_id INTEGER NOT NULL REFERENCES groomers(id),
          claimant_name TEXT NOT NULL,
          claimant_email TEXT NOT NULL,
          claimant_phone TEXT NOT NULL,
          website TEXT,
          gmb_url TEXT NOT NULL,
          message TEXT,
          status TEXT NOT NULL DEFAULT 'pending',
          created_at TIMESTAMPTZ NOT NULL DEFAULT now()
        );
      `;
      await sql`ALTER TABLE claims ADD COLUMN IF NOT EXISTS wants_verified_badge BOOLEAN NOT NULL DEFAULT true;`;
      await sql`ALTER TABLE claims ADD COLUMN IF NOT EXISTS wants_featured BOOLEAN NOT NULL DEFAULT false;`;
      await sql`CREATE INDEX IF NOT EXISTS idx_claims_groomer ON claims(groomer_id, status);`;
      await sql`CREATE INDEX IF NOT EXISTS idx_claims_status ON claims(status);`;

      await sql`
        CREATE TABLE IF NOT EXISTS groomer_edits (
          id SERIAL PRIMARY KEY,
          groomer_id INTEGER NOT NULL REFERENCES groomers(id),
          business_name TEXT NOT NULL,
          owner_name TEXT,
          email TEXT,
          phone TEXT,
          website TEXT,
          gmb_url TEXT,
          facebook_url TEXT,
          price_info TEXT,
          hours TEXT,
          description TEXT,
          city TEXT NOT NULL,
          zip TEXT NOT NULL,
          neighborhoods TEXT NOT NULL,
          services TEXT NOT NULL,
          service_radius_miles INTEGER DEFAULT 15,
          years_experience INTEGER,
          status TEXT NOT NULL DEFAULT 'pending',
          created_at TIMESTAMPTZ NOT NULL DEFAULT now()
        );
      `;
      await sql`CREATE INDEX IF NOT EXISTS idx_groomer_edits_groomer ON groomer_edits(groomer_id, status);`;
      await sql`CREATE INDEX IF NOT EXISTS idx_groomer_edits_status ON groomer_edits(status);`;

      await sql`
        CREATE TABLE IF NOT EXISTS analytics_events (
          id SERIAL PRIMARY KEY,
          event_type TEXT NOT NULL,
          groomer_id INTEGER REFERENCES groomers(id) ON DELETE SET NULL,
          query TEXT,
          city TEXT,
          service TEXT,
          results_count INTEGER,
          created_at TIMESTAMPTZ NOT NULL DEFAULT now()
        );
      `;
      await sql`CREATE INDEX IF NOT EXISTS idx_analytics_events_type_created ON analytics_events(event_type, created_at);`;
      await sql`CREATE INDEX IF NOT EXISTS idx_analytics_events_groomer ON analytics_events(groomer_id);`;
    })();
  }
  return schemaReady;
}

export type Groomer = {
  id: number;
  slug: string;
  business_name: string;
  owner_name: string | null;
  email: string | null;
  phone: string | null;
  website: string | null;
  gmb_url: string | null;
  facebook_url: string | null;
  price_info: string | null;
  hours: string | null;
  description: string | null;
  city: string;
  zip: string;
  neighborhoods: string; // JSON array string
  services: string; // JSON array string
  service_radius_miles: number;
  years_experience: number | null;
  rating: number;
  review_count: number;
  featured: number;
  status: "pending" | "approved" | "rejected";
  is_claimed: number;
  claimed_at: string | Date | null;
  created_at: string | Date;
  edit_token: string | null;
  wants_verified_badge: boolean | null;
  wants_featured: boolean | null;
};

export type GroomerEdit = {
  id: number;
  groomer_id: number;
  business_name: string;
  owner_name: string | null;
  email: string | null;
  phone: string | null;
  website: string | null;
  gmb_url: string | null;
  facebook_url: string | null;
  price_info: string | null;
  hours: string | null;
  description: string | null;
  city: string;
  zip: string;
  neighborhoods: string; // JSON array string
  services: string; // JSON array string
  service_radius_miles: number;
  years_experience: number | null;
  status: "pending" | "approved" | "rejected";
  created_at: string | Date;
};

export type Claim = {
  id: number;
  groomer_id: number;
  claimant_name: string;
  claimant_email: string;
  claimant_phone: string;
  website: string | null;
  gmb_url: string;
  message: string | null;
  status: "pending" | "approved" | "rejected";
  created_at: string | Date;
  wants_verified_badge: boolean;
  wants_featured: boolean;
};
