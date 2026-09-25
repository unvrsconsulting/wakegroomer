import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { searchGroomers, getAllCities, getServiceCounts } from "@/lib/listings";
import { citySlug, cityFromSlug, serviceSlug } from "@/lib/slugs";
import { SITE_URL } from "@/lib/site";
import { buildCityContent } from "@/lib/cityContent";
import { getDefaultGuides } from "@/lib/guides";
import GroomerCard from "@/components/GroomerCard";
import Breadcrumbs from "@/components/Breadcrumbs";

export const revalidate = 3600;

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

  const groomers = await searchGroomers({ city });
  const count = groomers.length;

  const title = `Mobile Dog Groomers in ${city}, NC`;
  const description = `Compare ${count} mobile dog grooming ${count === 1 ? "business" : "businesses"} serving ${city}, NC. See services, service areas, and contact details. No shop drop-off required.`;

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
  const content = buildCityContent(city, groomers, cities);
  const guides = getDefaultGuides(3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Mobile Dog Groomers in ${city}, NC`,
    url: `${SITE_URL}/groomers/${citySlugParam}`,
    about: {
      "@type": "Place",
      name: `${city}, NC`,
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: groomers.map((g, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE_URL}/groomer/${g.slug}`,
        name: g.business_name,
      })),
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Find a Groomer", href: "/search" },
          { name: `${city}, NC`, href: `/groomers/${citySlugParam}` },
        ]}
      />

      <h1 className="mt-4 text-3xl font-extrabold text-foreground sm:text-4xl">
        Mobile Dog Groomers in {city}, NC
      </h1>
      <p className="mt-3 max-w-3xl text-foreground/70">{content.intro}</p>

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

      <section className="mt-14 max-w-3xl">
        <h2 className="text-2xl font-bold text-foreground">Mobile Dog Grooming in {city}</h2>
        {content.overview && <p className="mt-3 text-foreground/80">{content.overview}</p>}

        <div className="mt-6 space-y-5">
          {content.faqs.map((f) => (
            <div key={f.q}>
              <h3 className="text-lg font-semibold text-foreground">{f.q}</h3>
              <p className="mt-1 text-foreground/80">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {content.nearby.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-bold text-foreground">Groomers in Nearby Cities</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {content.nearby.map((n) => (
              <Link
                key={n.city}
                href={`/groomers/${citySlug(n.city)}`}
                className="rounded-full border border-[var(--color-border)] px-3 py-1.5 text-sm text-foreground/80 hover:border-brand hover:text-brand"
              >
                {n.city}
              </Link>
            ))}
          </div>
        </section>
      )}

      {guides.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-bold text-foreground">Helpful Guides</h2>
          <ul className="mt-4 space-y-2">
            {guides.map((p) => (
              <li key={p.slug}>
                <Link href={`/blog/${p.slug}`} className="font-medium text-brand hover:underline">
                  {p.title}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/guides" className="font-medium text-brand hover:underline">
                All mobile grooming guides →
              </Link>
            </li>
          </ul>
        </section>
      )}

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
