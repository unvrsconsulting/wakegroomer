import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, isValidSessionToken } from "@/lib/adminAuth";
import { getGroomerById, adminUpdateGroomer } from "@/lib/groomerEdits";
import { SERVICE_AREA_CITIES, ALL_SERVICES } from "@/lib/constants";
import { URL_RE, EMAIL_RE, PHONE_RE, ZIP_RE, isLikelyGmbUrl } from "@/lib/validation";

export async function POST(req: NextRequest) {
  const token = req.cookies.get(ADMIN_COOKIE)?.value;
  if (!(await isValidSessionToken(token))) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const id = Number(body.id);
  if (!Number.isFinite(id)) {
    return NextResponse.json({ error: "Invalid id." }, { status: 400 });
  }

  const existing = await getGroomerById(id);
  if (!existing) {
    return NextResponse.json({ error: "Listing not found." }, { status: 404 });
  }

  const errors: Record<string, string> = {};

  const business_name = String(body.business_name ?? "").trim();
  if (!business_name) errors.business_name = "Business name is required.";

  const owner_name = String(body.owner_name ?? "").trim();

  const email = String(body.email ?? "").trim();
  if (email && !EMAIL_RE.test(email)) errors.email = "Enter a valid email address.";

  const phone = String(body.phone ?? "").trim();
  if (phone && !PHONE_RE.test(phone)) errors.phone = "Enter a valid phone number.";

  const website = String(body.website ?? "").trim();
  if (website && !URL_RE.test(website)) errors.website = "Enter a valid website URL.";

  const gmb_url = String(body.gmb_url ?? "").trim();
  if (gmb_url && !isLikelyGmbUrl(gmb_url)) {
    errors.gmb_url = "That doesn't look like a Google Business Profile link.";
  }

  const facebook_url = String(body.facebook_url ?? "").trim();
  if (facebook_url && !URL_RE.test(facebook_url)) errors.facebook_url = "Enter a valid Facebook URL.";

  const price_info = String(body.price_info ?? "").trim();
  const hours = String(body.hours ?? "").trim();
  const description = String(body.description ?? "").trim();

  const city = String(body.city ?? "").trim();
  if (!city || !SERVICE_AREA_CITIES.includes(city)) errors.city = "Select a valid city.";

  const zip = String(body.zip ?? "").trim();
  if (!ZIP_RE.test(zip)) errors.zip = "Enter a valid 5-digit zip code.";

  const neighborhoods = Array.isArray(body.neighborhoods)
    ? (body.neighborhoods as unknown[]).map(String).filter(Boolean)
    : [];
  if (neighborhoods.length === 0) errors.neighborhoods = "List at least one area served.";

  const services = Array.isArray(body.services)
    ? (body.services as unknown[]).map(String).filter((s) => ALL_SERVICES.includes(s))
    : [];
  if (services.length === 0) errors.services = "Select at least one service.";

  const service_radius_miles = Number(body.service_radius_miles);
  if (!Number.isFinite(service_radius_miles) || service_radius_miles <= 0 || service_radius_miles > 100) {
    errors.service_radius_miles = "Enter a radius between 1 and 100 miles.";
  }

  const yearsRaw = body.years_experience;
  const years_experience =
    yearsRaw === "" || yearsRaw === null || yearsRaw === undefined ? null : Number(yearsRaw);
  if (years_experience !== null && (!Number.isFinite(years_experience) || years_experience < 0)) {
    errors.years_experience = "Enter a valid number of years, or leave blank.";
  }

  const rating = Number(body.rating ?? 0);
  if (!Number.isFinite(rating) || rating < 0 || rating > 5) {
    errors.rating = "Rating must be between 0 and 5.";
  }

  const review_count = Number(body.review_count ?? 0);
  if (!Number.isFinite(review_count) || review_count < 0) {
    errors.review_count = "Review count must be 0 or more.";
  }

  const featured = Boolean(body.featured);
  const is_claimed = Boolean(body.is_claimed);

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  await adminUpdateGroomer(id, {
    business_name,
    owner_name,
    email,
    phone,
    website,
    gmb_url,
    facebook_url,
    price_info,
    hours,
    description,
    city,
    zip,
    neighborhoods,
    services,
    service_radius_miles,
    years_experience,
    rating,
    review_count,
    featured,
    is_claimed,
  });

  return NextResponse.json({ ok: true });
}
