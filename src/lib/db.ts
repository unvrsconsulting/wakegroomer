import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

const dataDir = path.join(process.cwd(), "data");
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

const dbPath = path.join(dataDir, "groomers.db");
const isNewDb = !fs.existsSync(dbPath);

const db = new Database(dbPath);
db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS groomers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE NOT NULL,
    business_name TEXT NOT NULL,
    owner_name TEXT,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    website TEXT NOT NULL,
    gmb_url TEXT NOT NULL,
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
    claimed_at TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE INDEX IF NOT EXISTS idx_groomers_status ON groomers(status);
  CREATE INDEX IF NOT EXISTS idx_groomers_city ON groomers(city);
  CREATE INDEX IF NOT EXISTS idx_groomers_zip ON groomers(zip);

  CREATE TABLE IF NOT EXISTS claims (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    groomer_id INTEGER NOT NULL REFERENCES groomers(id),
    claimant_name TEXT NOT NULL,
    claimant_email TEXT NOT NULL,
    claimant_phone TEXT NOT NULL,
    website TEXT,
    gmb_url TEXT NOT NULL,
    message TEXT,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE INDEX IF NOT EXISTS idx_claims_groomer ON claims(groomer_id, status);
  CREATE INDEX IF NOT EXISTS idx_claims_status ON claims(status);
`);

// Idempotent migration: add columns that may be missing on a pre-existing db file.
const groomerColumns = new Set(
  (db.prepare("PRAGMA table_info(groomers)").all() as { name: string }[]).map((c) => c.name)
);
if (!groomerColumns.has("is_claimed")) {
  db.exec("ALTER TABLE groomers ADD COLUMN is_claimed INTEGER NOT NULL DEFAULT 0");
}
if (!groomerColumns.has("claimed_at")) {
  db.exec("ALTER TABLE groomers ADD COLUMN claimed_at TEXT");
}

export type Groomer = {
  id: number;
  slug: string;
  business_name: string;
  owner_name: string | null;
  email: string;
  phone: string;
  website: string;
  gmb_url: string;
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
  claimed_at: string | null;
  created_at: string;
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
  created_at: string;
};

export default db;
export { isNewDb };
