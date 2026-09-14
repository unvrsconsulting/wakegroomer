import { sql, ensureSchema, Groomer } from "./db";
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

export async function searchGroomers(params: SearchParams): Promise<GroomerView[]> {
  await ensureSchema();
  const rows = (await sql`
    SELECT * FROM groomers WHERE status = 'approved'
    ORDER BY is_claimed DESC, featured DESC, rating DESC
  `) as unknown as Groomer[];

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
    results = results.filter(
      (g) => g.city.toLowerCase() === city || g.neighborhoods.some((n) => n.toLowerCase() === city)
    );
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

export async function getFeaturedGroomers(limit: number): Promise<GroomerView[]> {
  const all = await searchGroomers({});
  return all.slice(0, limit);
}

export async function getCityCounts(): Promise<{ city: string; count: number }[]> {
  await ensureSchema();
  const rows = (await sql`
    SELECT city, COUNT(*)::int as count FROM groomers
    WHERE status = 'approved' GROUP BY city ORDER BY count DESC
  `) as unknown as { city: string; count: number }[];
  return rows;
}

export async function getServiceCounts(): Promise<{ service: string; count: number }[]> {
  await ensureSchema();
  const rows = (await sql`
    SELECT services FROM groomers WHERE status = 'approved'
  `) as unknown as { services: string }[];

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

export async function getDirectoryStats(): Promise<{ groomerCount: number; verifiedCount: number }> {
  await ensureSchema();
  const rows = (await sql`
    SELECT COUNT(*)::int as "groomerCount", COALESCE(SUM(is_claimed), 0)::int as "verifiedCount"
    FROM groomers WHERE status = 'approved'
  `) as unknown as { groomerCount: number; verifiedCount: number }[];
  return rows[0];
}

export async function getGroomerBySlug(slug: string): Promise<GroomerView | null> {
  await ensureSchema();
  const rows = (await sql`
    SELECT * FROM groomers WHERE slug = ${slug} AND status = 'approved'
  `) as unknown as Groomer[];
  return rows[0] ? parse(rows[0]) : null;
}

export async function getAllCities(): Promise<string[]> {
  await ensureSchema();
  const rows = (await sql`
    SELECT DISTINCT city FROM groomers WHERE status = 'approved' ORDER BY city
  `) as unknown as { city: string }[];
  return rows.map((r) => r.city);
}

export async function getAllZips(): Promise<string[]> {
  await ensureSchema();
  const rows = (await sql`
    SELECT DISTINCT zip FROM groomers WHERE status = 'approved' ORDER BY zip
  `) as unknown as { zip: string }[];
  return rows.map((r) => r.zip);
}
