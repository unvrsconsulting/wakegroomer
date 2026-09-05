import db, { Groomer } from "./db";
import { ALL_SERVICES } from "./constants";

export type GroomerView = Omit<Groomer, "neighborhoods" | "services"> & {
  neighborhoods: string[];
  services: string[];
};

function parse(row: Groomer): GroomerView {
  return {
    ...row,
    neighborhoods: JSON.parse(row.neighborhoods),
    services: JSON.parse(row.services),
  };
}

export type SearchParams = {
  q?: string;
  city?: string;
  zip?: string;
  neighborhood?: string;
  service?: string;
};

export function searchGroomers(params: SearchParams): GroomerView[] {
  const rows = db
    .prepare(`SELECT * FROM groomers WHERE status = 'approved' ORDER BY is_claimed DESC, featured DESC, rating DESC`)
    .all() as Groomer[];

  let results = rows.map(parse);

  const q = params.q?.trim().toLowerCase();
  if (q) {
    results = results.filter((g) =>
      [g.business_name, g.city, g.description ?? "", ...g.neighborhoods, ...g.services]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }

  if (params.city) {
    const city = params.city.toLowerCase();
    results = results.filter((g) => g.city.toLowerCase() === city);
  }

  if (params.zip) {
    results = results.filter((g) => g.zip === params.zip);
  }

  if (params.neighborhood) {
    const n = params.neighborhood.toLowerCase();
    results = results.filter((g) => g.neighborhoods.some((nb) => nb.toLowerCase() === n));
  }

  if (params.service) {
    const s = params.service.toLowerCase();
    results = results.filter((g) => g.services.some((sv) => sv.toLowerCase() === s));
  }

  return results;
}

export function getFeaturedGroomers(limit: number): GroomerView[] {
  return searchGroomers({}).slice(0, limit);
}

export function getCityCounts(): { city: string; count: number }[] {
  return db
    .prepare(
      `SELECT city, COUNT(*) as count FROM groomers WHERE status = 'approved' GROUP BY city ORDER BY count DESC`
    )
    .all() as { city: string; count: number }[];
}

export function getServiceCounts(): { service: string; count: number }[] {
  const rows = db
    .prepare(`SELECT services FROM groomers WHERE status = 'approved'`)
    .all() as { services: string }[];

  const counts = new Map<string, number>();
  rows.forEach((r) => {
    (JSON.parse(r.services) as string[]).forEach((s) => {
      counts.set(s, (counts.get(s) ?? 0) + 1);
    });
  });

  return ALL_SERVICES.map((service) => ({ service, count: counts.get(service) ?? 0 })).filter(
    (c) => c.count > 0
  );
}

export function getDirectoryStats(): { groomerCount: number; verifiedCount: number } {
  const row = db
    .prepare(
      `SELECT COUNT(*) as groomerCount, SUM(is_claimed) as verifiedCount FROM groomers WHERE status = 'approved'`
    )
    .get() as { groomerCount: number; verifiedCount: number | null };

  return { groomerCount: row.groomerCount, verifiedCount: row.verifiedCount ?? 0 };
}

export function getGroomerBySlug(slug: string): GroomerView | null {
  const row = db
    .prepare(`SELECT * FROM groomers WHERE slug = ? AND status = 'approved'`)
    .get(slug) as Groomer | undefined;
  return row ? parse(row) : null;
}

export function getAllCities(): string[] {
  const rows = db
    .prepare(`SELECT DISTINCT city FROM groomers WHERE status = 'approved' ORDER BY city`)
    .all() as { city: string }[];
  return rows.map((r) => r.city);
}

export function getAllNeighborhoods(): string[] {
  const rows = db
    .prepare(`SELECT neighborhoods FROM groomers WHERE status = 'approved'`)
    .all() as { neighborhoods: string }[];
  const set = new Set<string>();
  rows.forEach((r) => (JSON.parse(r.neighborhoods) as string[]).forEach((n) => set.add(n)));
  return Array.from(set).sort();
}

export function getAllZips(): string[] {
  const rows = db
    .prepare(`SELECT DISTINCT zip FROM groomers WHERE status = 'approved' ORDER BY zip`)
    .all() as { zip: string }[];
  return rows.map((r) => r.zip);
}
