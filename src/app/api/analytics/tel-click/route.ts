import { NextRequest, NextResponse } from "next/server";
import { logTelClick } from "@/lib/analytics";

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const groomerId = Number(body.groomerId);
  if (!Number.isFinite(groomerId)) {
    return NextResponse.json({ error: "Invalid groomerId." }, { status: 400 });
  }

  try {
    await logTelClick(groomerId);
  } catch {
    // Bad/deleted groomer id, or a transient DB error — never surface this to the visitor.
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
