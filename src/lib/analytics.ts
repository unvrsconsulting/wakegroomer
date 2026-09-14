import { sql, ensureSchema } from "./db";

export async function logGroomerView(groomerId: number): Promise<void> {
  await ensureSchema();
  await sql`
    INSERT INTO analytics_events (event_type, groomer_id)
    VALUES ('groomer_view', ${groomerId})
  `;
}

export async function logSearch(params: {
  q?: string;
  city?: string;
  service?: string;
  resultsCount: number;
}): Promise<void> {
  await ensureSchema();
  await sql`
    INSERT INTO analytics_events (event_type, query, city, service, results_count)
    VALUES ('search', ${params.q || null}, ${params.city || null}, ${params.service || null}, ${params.resultsCount})
  `;
}

export type GroomerViewStat = {
  groomer_id: number;
  business_name: string;
  slug: string;
  city: string;
  views: number;
};

export async function getTopViewedGroomers(days: number | null, limit: number): Promise<GroomerViewStat[]> {
  await ensureSchema();
  const rows = days
    ? ((await sql`
        SELECT g.id AS groomer_id, g.business_name, g.slug, g.city, COUNT(*)::int AS views
        FROM analytics_events e
        JOIN groomers g ON g.id = e.groomer_id
        WHERE e.event_type = 'groomer_view' AND e.created_at > now() - (${days} || ' days')::interval
        GROUP BY g.id, g.business_name, g.slug, g.city
        ORDER BY views DESC
        LIMIT ${limit}
      `) as unknown as GroomerViewStat[])
    : ((await sql`
        SELECT g.id AS groomer_id, g.business_name, g.slug, g.city, COUNT(*)::int AS views
        FROM analytics_events e
        JOIN groomers g ON g.id = e.groomer_id
        WHERE e.event_type = 'groomer_view'
        GROUP BY g.id, g.business_name, g.slug, g.city
        ORDER BY views DESC
        LIMIT ${limit}
      `) as unknown as GroomerViewStat[]);
  return rows;
}

export async function getSearchStatsByCity(
  days: number | null,
  limit: number
): Promise<{ city: string; count: number }[]> {
  await ensureSchema();
  const rows = days
    ? ((await sql`
        SELECT city, COUNT(*)::int AS count
        FROM analytics_events
        WHERE event_type = 'search' AND city IS NOT NULL AND created_at > now() - (${days} || ' days')::interval
        GROUP BY city
        ORDER BY count DESC
        LIMIT ${limit}
      `) as unknown as { city: string; count: number }[])
    : ((await sql`
        SELECT city, COUNT(*)::int AS count
        FROM analytics_events
        WHERE event_type = 'search' AND city IS NOT NULL
        GROUP BY city
        ORDER BY count DESC
        LIMIT ${limit}
      `) as unknown as { city: string; count: number }[]);
  return rows;
}

export async function getSearchStatsByTerm(
  days: number | null,
  limit: number
): Promise<{ term: string; count: number }[]> {
  await ensureSchema();
  const rows = days
    ? ((await sql`
        SELECT query AS term, COUNT(*)::int AS count
        FROM analytics_events
        WHERE event_type = 'search' AND query IS NOT NULL AND query != '' AND created_at > now() - (${days} || ' days')::interval
        GROUP BY query
        ORDER BY count DESC
        LIMIT ${limit}
      `) as unknown as { term: string; count: number }[])
    : ((await sql`
        SELECT query AS term, COUNT(*)::int AS count
        FROM analytics_events
        WHERE event_type = 'search' AND query IS NOT NULL AND query != ''
        GROUP BY query
        ORDER BY count DESC
        LIMIT ${limit}
      `) as unknown as { term: string; count: number }[]);
  return rows;
}

export async function getAnalyticsTotals(days: number | null): Promise<{ totalViews: number; totalSearches: number }> {
  await ensureSchema();
  const rows = days
    ? ((await sql`
        SELECT
          COUNT(*) FILTER (WHERE event_type = 'groomer_view')::int AS total_views,
          COUNT(*) FILTER (WHERE event_type = 'search')::int AS total_searches
        FROM analytics_events
        WHERE created_at > now() - (${days} || ' days')::interval
      `) as unknown as { total_views: number; total_searches: number }[])
    : ((await sql`
        SELECT
          COUNT(*) FILTER (WHERE event_type = 'groomer_view')::int AS total_views,
          COUNT(*) FILTER (WHERE event_type = 'search')::int AS total_searches
        FROM analytics_events
      `) as unknown as { total_views: number; total_searches: number }[]);
  return { totalViews: rows[0].total_views, totalSearches: rows[0].total_searches };
}
