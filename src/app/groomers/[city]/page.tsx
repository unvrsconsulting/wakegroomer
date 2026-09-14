import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { searchGroomers, getAllCities, getServiceCounts } from "@/lib/listings";
import { citySlug, cityFromSlug, serviceSlug } from "@/lib/slugs";
import { SITE_NAME } from "@/lib/constants";
import GroomerCard from "@/components/GroomerCard";

type PageProps = {
  params: Promise<{ city: string }>;
};

export async function generateStaticParams() {
  const cities = await getAllCities();
  return cities.map((city) => ({ city: citySlug(city) }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city: citySlugParam } = await params;
  const cities = await getAllCities();
  const city = cityFromSlug(citySlugParam, cities);
  if (!city) return {};

  const title = `Mobile Dog Groomers in ${city}, NC`;
  const description = `Find real, locally-owned mobile dog groomers serving ${city}, NC. Compare ratings, services, and pricing. No shop drop-off required.`;

  return {
    title,
    description,
    alternates: { canonical: `/groomers/${citySlugParam}` },
    openGraph: { title, description, type: "website" },
  };
}

export default async function CityPage({ params }: PageProps) {
  const { city: citySlugParam } = await params;
  const cities = await getAllCities();
  const city = cityFromSlug(citySlugParam, cities);
  if (!city) notFound();

  const [groomers, serviceCounts] = await Promise.all([
    searchGroomers({ city }),
    getServiceCounts(),
  ]);

  const servicesInCity = Array.from(new Set(groomers.flatMap((g) => g.services))).sort();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Mobile Dog Groomers in ${city}, NC`,
    url: `https://mobilepetgroomnc.com/groomers/${citySlugParam}`,
    about: {
      "@type": "Place",
      name: `${city}, NC`,
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: groomers.map((g, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `https://mobilepetgroomnc.com/groomer/${g.slug}`,
        name: g.business_name,
      })),
    },
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Link href="/search" className="text-sm font-medium text-brand hover:underline">
        ← Browse all cities
      </Link>

      <h1 className="mt-4 text-3xl font-extrabold text-foreground sm:text-4xl">
        Mobile Dog Groomers in {city}, NC
      </h1>
      <p className="mt-3 max-w-2xl text-foreground/70">
        {groomers.length} real, locally-owned mobile dog groomer{groomers.length === 1 ? "" : "s"}{" "}
        serving {city}, NC and the surrounding area. Every listing on {SITE_NAME} is a real
        business. No shop drop-off required, they come to you.
      </p>

      {servicesInCity.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {servicesInCity.map((s) => (
            <Link
              key={s}
              href={`/services/${serviceSlug(s)}`}
              className="rounded-full border border-[var(--color-border)] px-3 py-1.5 text-sm text-foreground/80 hover:border-brand hover:text-brand"
            >
              {s}
            </Link>
          ))}
        </div>
      )}

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {groomers.map((g) => (
          <GroomerCard key={g.id} groomer={g} />
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-dashed border-[var(--color-border)] p-6 text-center">
        <p className="text-sm text-foreground/70">
          Run a mobile grooming business in {city}?{" "}
          <Link href="/list-your-business" className="font-semibold text-brand hover:underline">
            List it free
          </Link>
          .
        </p>
      </div>

      <p className="mt-8 text-xs text-muted">
        Looking for a specific service?{" "}
        {serviceCounts.map((s, i) => (
          <span key={s.service}>
            <Link href={`/services/${serviceSlug(s.service)}`} className="text-brand hover:underline">
              {s.service}
            </Link>
            {i < serviceCounts.length - 1 ? ", " : ""}
          </span>
        ))}
      </p>
    </div>
  );
}
