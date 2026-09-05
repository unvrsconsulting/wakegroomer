import { NextRequest, NextResponse } from "next/server";
import { searchGroomers } from "@/lib/listings";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const results = searchGroomers({
    q: searchParams.get("q") ?? undefined,
    city: searchParams.get("city") ?? undefined,
    zip: searchParams.get("zip") ?? undefined,
    neighborhood: searchParams.get("neighborhood") ?? undefined,
    service: searchParams.get("service") ?? undefined,
  });

  return NextResponse.json({ results, count: results.length });
}
