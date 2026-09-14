import { NextRequest, NextResponse } from "next/server";
import { insertSignup, SignupInput } from "@/lib/signup";
import { SERVICE_AREA_CITIES } from "@/lib/constants";
import { URL_RE, EMAIL_RE, PHONE_RE, ZIP_RE, isLikelyGmbUrl } from "@/lib/validation";
import { isSpamSubmission } from "@/lib/spam";
import { sendNotificationEmail, renderNotificationHtml } from "@/lib/email";

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (isSpamSubmission(body)) {
    // Pretend success so bots don't learn to route around this check.
    return NextResponse.json({ ok: true, slug: "" }, { status: 201 });
  }

  const errors: Record<string, string> = {};

  const business_name = String(body.business_name ?? "").trim();
  if (!business_name) errors.business_name = "Business name is required.";

  const owner_name = String(body.owner_name ?? "").trim();
  if (!owner_name) errors.owner_name = "Owner/contact name is required.";

  const email = String(body.email ?? "").trim();
  if (!email || !EMAIL_RE.test(email)) errors.email = "A valid email address is required.";

  const phone = String(body.phone ?? "").trim();
  if (!phone || !PHONE_RE.test(phone)) errors.phone = "A valid phone number is required.";

  const website = String(body.website ?? "").trim();
  if (!website || !URL_RE.test(website)) {
    errors.website = "A valid website URL is required (e.g. https://yourbusiness.com).";
  }

  const gmb_url = String(body.gmb_url ?? "").trim();
  if (!gmb_url) {
    errors.gmb_url = "A link to your Google Business Profile is required.";
  } else if (!isLikelyGmbUrl(gmb_url)) {
    errors.gmb_url =
      "That doesn't look like a Google Business Profile link. Use the 'Share' link from your listing on Google Maps (e.g. https://g.page/... or https://maps.app.goo.gl/...).";
  }

  const description = String(body.description ?? "").trim();
  if (!description || description.length < 20) {
    errors.description = "Please provide a short description of at least 20 characters.";
  }

  const city = String(body.city ?? "").trim();
  if (!city || !SERVICE_AREA_CITIES.includes(city)) {
    errors.city = "Please select a valid city within our service area.";
  }

  const zip = String(body.zip ?? "").trim();
  if (!ZIP_RE.test(zip)) errors.zip = "Please enter a valid 5-digit zip code.";

  const neighborhoods = Array.isArray(body.neighborhoods)
    ? (body.neighborhoods as unknown[]).map(String).filter(Boolean)
    : [];
  if (neighborhoods.length === 0) {
    errors.neighborhoods = "List at least one neighborhood or area you serve.";
  }

  const services = Array.isArray(body.services)
    ? (body.services as unknown[]).map(String).filter(Boolean)
    : [];
  if (services.length === 0) {
    errors.services = "Select at least one service you offer.";
  }

  const service_radius_miles = Number(body.service_radius_miles);
  if (!Number.isFinite(service_radius_miles) || service_radius_miles <= 0 || service_radius_miles > 100) {
    errors.service_radius_miles = "Enter a service radius between 1 and 100 miles.";
  }

  const years_experience = Number(body.years_experience);
  if (!Number.isFinite(years_experience) || years_experience < 0 || years_experience > 75) {
    errors.years_experience = "Enter a valid number of years in business.";
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  const wants_verified_badge = Boolean(body.wants_verified_badge);
  const wants_featured = Boolean(body.wants_featured);

  const input: SignupInput = {
    business_name,
    owner_name,
    email,
    phone,
    website,
    gmb_url,
    description,
    city,
    zip,
    neighborhoods,
    services,
    service_radius_miles,
    years_experience,
    wants_verified_badge,
    wants_featured,
  };

  const { slug } = await insertSignup(input);

  await sendNotificationEmail(
    `New business signup: ${business_name}`,
    renderNotificationHtml("New Business Signup", {
      "Business Name": business_name,
      "Owner / Contact": owner_name,
      Email: email,
      Phone: phone,
      Website: website,
      "Google Business Profile": gmb_url,
      City: city,
      Zip: zip,
      Neighborhoods: neighborhoods.join(", "),
      Services: services.join(", "),
      Description: description,
      "Wants Verified Badge": wants_verified_badge ? "Yes" : "No",
      "Wants Featured": wants_featured ? "Yes" : "No",
      "Review in admin": `https://mobilepetgroomnc.com/admin`,
    })
  );

  return NextResponse.json({ ok: true, slug }, { status: 201 });
}
