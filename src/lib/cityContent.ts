import type { GroomerView } from "./listings";
import { nearbyCities } from "./geo";

const CORE_SERVICES = new Set(["Full Groom", "Bath & Brush"]);

export type CityFaq = { q: string; a: string };

export type CityContent = {
  intro: string;
  overview: string;
  faqs: CityFaq[];
  nearby: { city: string; miles: number }[];
};

function joinList(items: string[]): string {
  if (items.length <= 1) return items.join("");
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

function joinNames(shown: string[], extra: number): string {
  return extra > 0 ? `${shown.join(", ")}, and ${extra} more` : joinList(shown);
}

function plural(n: number, one: string, many: string): string {
  return n === 1 ? one : many;
}

export function buildCityContent(
  city: string,
  groomers: GroomerView[],
  allCities: string[]
): CityContent {
  const count = groomers.length;
  const names = Array.from(new Set(groomers.map((g) => g.business_name)));
  const shown = names.slice(0, 4);
  const extra = names.length - shown.length;
  const verified = groomers.filter((g) => g.is_claimed === 1).length;

  const serviceCounts = new Map<string, number>();
  groomers.forEach((g) => g.services.forEach((s) => serviceCounts.set(s, (serviceCounts.get(s) ?? 0) + 1)));
  const specialties = Array.from(serviceCounts.entries())
    .filter(([s]) => !CORE_SERVICES.has(s))
    .sort((a, b) => b[1] - a[1])
    .map(([s]) => s.toLowerCase());
  const offersCore = groomers.some((g) => g.services.some((s) => CORE_SERVICES.has(s)));

  const cityLower = city.toLowerCase();
  const areas = Array.from(
    new Set(groomers.flatMap((g) => g.neighborhoods).filter((n) => n.toLowerCase() !== cityLower))
  ).slice(0, 8);

  const rated = groomers.filter((g) => g.review_count > 0).length;
  const anyPricing = groomers.some((g) => Boolean(g.price_info));
  const catCount = serviceCounts.get("Cat Grooming") ?? 0;

  const nearby = nearbyCities(
    city,
    allCities.filter((c) => c !== city),
    4
  );

  const intro =
    `${count} mobile dog grooming ${plural(count, "business is", "businesses are")} listed for ${city}, NC: ` +
    `${joinNames(shown, extra)}. ` +
    `Mobile groomers bring a fully equipped van to your driveway, so there's no drop-off, no crate time, and no waiting room.`;

  const overviewParts: string[] = [];
  if (offersCore) {
    overviewParts.push(
      `Listings in ${city} offer core services like full grooms and bath and brush appointments` +
        (specialties.length ? `, and ${plural(specialties.length, "one specialty service is", "specialty services are")} also offered here: ${joinList(specialties)}` : "") +
        "."
    );
  } else if (specialties.length) {
    overviewParts.push(`Services offered here include ${joinList(specialties)}.`);
  }
  if (areas.length) {
    overviewParts.push(`Groomers listed in ${city} also report serving ${joinList(areas)}.`);
  }
  const overview = overviewParts.join(" ");

  const faqs: CityFaq[] = [];

  faqs.push({
    q: `How many mobile dog groomers serve ${city}, NC?`,
    a: `We currently list ${count} mobile dog grooming ${plural(count, "business", "businesses")} for ${city}: ${joinNames(shown, extra)}.`,
  });

  faqs.push({
    q: `What services do mobile groomers in ${city} offer?`,
    a: offersCore
      ? `Listings in ${city} offer full grooms and bath and brush appointments${specialties.length ? `. Specialty services listed here: ${joinList(specialties)}` : ""}. Open any listing to see exactly what that business offers.`
      : `Open any listing to see exactly what that business offers.${specialties.length ? ` Services listed here include ${joinList(specialties)}.` : ""}`,
  });

  if (catCount > 0) {
    faqs.push({
      q: `Is there mobile cat grooming in ${city}?`,
      a: `${catCount} ${plural(catCount, "listing", "listings")} in ${city} ${plural(catCount, "offers", "offer")} cat grooming. Not every mobile groomer works with cats, so confirm before booking.`,
    });
  }

  faqs.push({
    q: `Do ${city} groomers travel to nearby towns?`,
    a:
      (areas.length
        ? `Groomers listed in ${city} report serving ${joinList(areas)}. `
        : "") +
      (nearby.length
        ? `You can also browse groomers in nearby ${joinList(nearby.slice(0, 3).map((n) => n.city))}.`
        : "Service areas vary, so check each listing's coverage."),
  });

  faqs.push({
    q: `How much does mobile dog grooming cost in ${city}?`,
    a: anyPricing
      ? `Some ${city} listings publish pricing, so check the individual profiles. Prices depend on your dog's size, coat, and condition. Our mobile grooming cost guide explains what drives the price.`
      : `Prices depend on your dog's size, coat, and condition, and most ${city} listings don't publish rates, so ask for a quote when you book. Our mobile grooming cost guide explains what drives the price.`,
  });

  faqs.push({
    q: `Are the ${city} listings verified?`,
    a:
      verified > 0
        ? `${verified} of ${count} ${plural(count, "listing is", "listings are")} owner-verified. Others are compiled from public information, so confirm details directly with the business.`
        : count === 1
          ? `The listing in ${city} has not been claimed by its owner yet. Details are compiled from public information, so confirm with the business before booking.${rated ? " It has a public rating." : ""}`
          : `None of the ${count} listings in ${city} have been claimed by their owners yet. Details are compiled from public information, so confirm with the business before booking.${rated ? ` ${rated} ${plural(rated, "has", "have")} a public rating.` : ""}`,
  });

  return { intro, overview, faqs, nearby };
}
