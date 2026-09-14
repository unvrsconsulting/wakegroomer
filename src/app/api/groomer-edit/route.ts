import { NextRequest, NextResponse } from "next/server";
import {
  getGroomerByEditToken,
  getPendingEditForGroomer,
  insertGroomerEdit,
} from "@/lib/groomerEdits";
import { SERVICE_AREA_CITIES, ALL_SERVICES } from "@/lib/constants";
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
    return NextResponse.json({ ok: true }, { status: 201 });
  }

  const slug = String(body.slug ?? "").trim();
  const token = String(body.token ?? "").trim();
  const groomer = slug && token ? await getGroomerByEditToken(slug, token) : null;
  if (!groomer) {
    return NextResponse.json(
      { error: "This edit link is invalid or has expired. Contact us for a new one." },
      { status: 404 }
    );
  }

  if (await getPendingEditForGroomer(groomer.id)) {
    return NextResponse.json(
      { error: "You already have an edit under review. We'll follow up once it's approved." },
      { status: 409 }
    );
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
  if (website && !URL_RE.test(website)) {
    errors.website = "Enter a valid website URL (e.g. https://yourbusiness.com).";
  }

  const gmb_url = String(body.gmb_url ?? "").trim();
  if (gmb_url && !isLikelyGmbUrl(gmb_url)) {
    errors.gmb_url = "That doesn't look like a Google Business Profile link.";
  }

  const facebook_url = String(body.facebook_url ?? "").trim();
  if (facebook_url && !URL_RE.test(facebook_url)) {
    errors.facebook_url = "Enter a valid Facebook URL.";
  }

  const price_info = String(body.price_info ?? "").trim();
  const hours = String(body.hours ?? "").trim();
  const description = String(body.description ?? "").trim();

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
    ? (body.services as unknown[]).map(String).filter((s) => ALL_SERVICES.includes(s))
    : [];
  if (services.length === 0) {
    errors.services = "Select at least one service you offer.";
  }

  const service_radius_miles = Number(body.service_radius_miles);
  if (!Number.isFinite(service_radius_miles) || service_radius_miles <= 0 || service_radius_miles > 100) {
    errors.service_radius_miles = "Enter a service radius between 1 and 100 miles.";
  }

  const yearsRaw = body.years_experience;
  const years_experience =
    yearsRaw === "" || yearsRaw === null || yearsRaw === undefined ? null : Number(yearsRaw);
  if (
    years_experience !== null &&
    (!Number.isFinite(years_experience) || years_experience < 0 || years_experience > 75)
  ) {
    errors.years_experience = "Enter a valid number of years, or leave blank.";
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  await insertGroomerEdit({
    groomer_id: groomer.id,
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
  });

  await sendNotificationEmail(
    `Profile edit submitted: ${business_name}`,
    renderNotificationHtml("Business Profile Edit Submitted", {
      "Listing (current)": groomer.business_name,
      "Listing URL": `https://mobilepetgroomnc.com/groomer/${groomer.slug}`,
      "Proposed Business Name": business_name,
      "Owner / Contact": owner_name,
      Email: email,
      Phone: phone,
      Website: website,
      "Google Business Profile": gmb_url,
      Facebook: facebook_url,
      City: city,
      Zip: zip,
      Neighborhoods: neighborhoods.join(", "),
      Services: services.join(", "),
      Hours: hours,
      Pricing: price_info,
      Description: description,
      "Review in admin": "https://mobilepetgroomnc.com/admin",
    })
  );

  return NextResponse.json({ ok: true }, { status: 201 });
}
