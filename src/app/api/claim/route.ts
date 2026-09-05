import { NextRequest, NextResponse } from "next/server";
import { getApprovedGroomerBySlug, getPendingClaimForGroomer, insertClaim } from "@/lib/claims";
import { EMAIL_RE, PHONE_RE, URL_RE, isLikelyGmbUrl } from "@/lib/validation";

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const slug = String(body.slug ?? "").trim();
  const groomer = slug ? getApprovedGroomerBySlug(slug) : null;
  if (!groomer) {
    return NextResponse.json({ error: "That business listing could not be found." }, { status: 404 });
  }

  if (groomer.is_claimed) {
    return NextResponse.json({ error: "This listing has already been claimed." }, { status: 409 });
  }

  if (getPendingClaimForGroomer(groomer.id)) {
    return NextResponse.json(
      { error: "A claim for this listing is already under review." },
      { status: 409 }
    );
  }

  const errors: Record<string, string> = {};

  const claimant_name = String(body.claimant_name ?? "").trim();
  if (!claimant_name) errors.claimant_name = "Your name is required.";

  const claimant_email = String(body.claimant_email ?? "").trim();
  if (!claimant_email || !EMAIL_RE.test(claimant_email)) {
    errors.claimant_email = "A valid email address is required.";
  }

  const claimant_phone = String(body.claimant_phone ?? "").trim();
  if (!claimant_phone || !PHONE_RE.test(claimant_phone)) {
    errors.claimant_phone = "A valid phone number is required.";
  }

  const website = String(body.website ?? "").trim();
  if (website && !URL_RE.test(website)) {
    errors.website = "Enter a valid website URL, e.g. https://yourbusiness.com.";
  }

  const gmb_url = String(body.gmb_url ?? "").trim();
  if (!gmb_url) {
    errors.gmb_url = "A link to your Google Business Profile is required to verify ownership.";
  } else if (!isLikelyGmbUrl(gmb_url)) {
    errors.gmb_url =
      "That doesn't look like a Google Business Profile link. Use the 'Share' link from your listing on Google Maps (e.g. https://g.page/... or https://maps.app.goo.gl/...).";
  }

  const message = String(body.message ?? "").trim();

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  insertClaim({
    groomer_id: groomer.id,
    claimant_name,
    claimant_email,
    claimant_phone,
    website,
    gmb_url,
    message,
  });

  return NextResponse.json({ ok: true }, { status: 201 });
}
