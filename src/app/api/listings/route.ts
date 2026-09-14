import { NextRequest, NextResponse } from "next/server";
import { searchGroomers } from "@/lib/listings";
import { logSearch } from "@/lib/analytics";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") ?? undefined;
  const city = searchParams.get("city") ?? undefined;
  const service = searchParams.get("service") ?? undefined;

  const results = await searchGroomers({
    q,
    city,
    zip: searchParams.get("zip") ?? undefined,
    neighborhood: searchParams.get("neighborhood") ?? undefined,
    service,
  });

  if (q || city || service) {
    logSearch({ q, city, service, resultsCount: results.length }).catch(() => {});
  }

  return NextResponse.json({ results, count: results.length });
}
