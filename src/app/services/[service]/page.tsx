import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { searchGroomers, getServiceCounts } from "@/lib/listings";
import { serviceSlug, serviceFromSlug, citySlug } from "@/lib/slugs";
import { SITE_NAME } from "@/lib/constants";
import GroomerCard from "@/components/GroomerCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SERVICE_INFO } from "@/lib/serviceInfo";
import { getGuideForService, getDefaultGuides } from "@/lib/guides";
import { SITE_URL } from "@/lib/site";

export const revalidate = 3600;

type PageProps = {
  params: Promise<{ service: string }>;
};

export async function generateStaticParams() {
  const serviceCounts = await getServiceCounts();
  return serviceCounts.map(({ service }) => ({ service: serviceSlug(service) }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { service: serviceSlugParam } = await params;
  const serviceCounts = await getServiceCounts();
  const service = serviceFromSlug(
    serviceSlugParam,
    serviceCounts.map((s) => s.service)
  );
  if (!service) return {};

  const title = `${service} | Mobile Dog Groomers in NC`;
  const description = `Find real mobile dog groomers across North Carolina offering ${service.toLowerCase()}. Compare cities, ratings, and pricing. They come to you.`;

  return {
    title,
    description,
    alternates: { canonical: `/services/${serviceSlugParam}` },
    openGraph: { title, description, type: "website" },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { service: serviceSlugParam } = await params;
  const serviceCounts = await getServiceCounts();
  const service = serviceFromSlug(
    serviceSlugParam,
    serviceCounts.map((s) => s.service)
  );
  if (!service) notFound();

  const groomers = await searchGroomers({ service });
  const citiesForService = Array.from(new Set(groomers.map((g) => g.city))).sort();
  const info = SERVICE_INFO[service];
  const mainGuide = getGuideForService(service);
  const guides = [mainGuide, ...getDefaultGuides(3)].filter(
    (p, i, arr): p is NonNullable<typeof p> => Boolean(p) && arr.findIndex((q) => q?.slug === p?.slug) === i
  ).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${service} | Mobile Dog Groomers in NC`,
    url: `${SITE_URL}/services/${serviceSlugParam}`,
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

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Find a Groomer", href: "/search" },
          { name: service, href: `/services/${serviceSlugParam}` },
        ]}
      />

      <h1 className="mt-4 text-3xl font-extrabold text-foreground sm:text-4xl">
        {service} Mobile Dog Groomers in NC
      </h1>
      <p className="mt-3 max-w-2xl text-foreground/70">
        {groomers.length} real mobile dog groomer{groomers.length === 1 ? "" : "s"} across North
        Carolina offer {service.toLowerCase()}. Every listing on {SITE_NAME} is a real
        business. No shop drop-off required, they come to you.
      </p>

      {info && <p className="mt-3 max-w-3xl text-foreground/80">{info}</p>}

      {citiesForService.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {citiesForService.map((c) => (
            <Link
              key={c}
              href={`/groomers/${citySlug(c)}`}
              className="rounded-full border border-[var(--color-border)] px-3 py-1.5 text-sm text-foreground/80 hover:border-brand hover:text-brand"
            >
              {c}
            </Link>
          ))}
        </div>
      )}

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {groomers.map((g) => (
          <GroomerCard key={g.id} groomer={g} />
        ))}
      </div>

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
          </ul>
        </section>
      )}

      <div className="mt-10 rounded-2xl border border-dashed border-[var(--color-border)] p-6 text-center">
        <p className="text-sm text-foreground/70">
          Offer {service.toLowerCase()} at your mobile grooming business?{" "}
          <Link href="/list-your-business" className="font-semibold text-brand hover:underline">
            List it free
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
