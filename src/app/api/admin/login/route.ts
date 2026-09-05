import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, checkPassword, expectedSessionToken } from "@/lib/adminAuth";

const EIGHT_HOURS = 60 * 60 * 8;

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const password = String(body.password ?? "");

  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json(
      { error: "Admin login is not configured. Set ADMIN_PASSWORD in your environment." },
      { status: 500 }
    );
  }

  if (!checkPassword(password)) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  const token = await expectedSessionToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, token!, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: EIGHT_HOURS,
    path: "/",
  });
  return res;
}
