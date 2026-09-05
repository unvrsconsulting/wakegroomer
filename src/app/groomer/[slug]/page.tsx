import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getGroomerBySlug } from "@/lib/listings";
import { getPendingClaimForGroomer } from "@/lib/claims";
import VerifiedBadge from "@/components/VerifiedBadge";
import { SITE_NAME } from "@/lib/constants";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const groomer = getGroomerBySlug(slug);

  if (!groomer) return {};

  const title = `${groomer.business_name} — Mobile Dog Groomer in ${groomer.city}, NC`;
  const description =
    groomer.description ??
    `${groomer.business_name} offers mobile dog grooming in ${groomer.city}, NC and nearby areas.`;

  return {
    title,
    description,
    alternates: { canonical: `/groomer/${groomer.slug}` },
    openGraph: { title, description, type: "profile" },
  };
}

export default async function GroomerProfile({ params }: PageProps) {
  const { slug } = await params;
  const groomer = getGroomerBySlug(slug);

  if (!groomer) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: groomer.business_name,
    description: groomer.description ?? undefined,
    telephone: groomer.phone,
    email: groomer.email,
    url: groomer.website,
    address: {
      "@type": "PostalAddress",
      addressLocality: groomer.city,
      addressRegion: "NC",
      postalCode: groomer.zip,
      addressCountry: "US",
    },
    areaServed: groomer.neighborhoods,
    ...(groomer.review_count > 0 && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: groomer.rating,
        reviewCount: groomer.review_count,
      },
    }),
  };

  const pendingClaim = groomer.is_claimed === 0 ? getPendingClaimForGroomer(groomer.id) : null;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Link href="/" className="text-sm font-medium text-brand hover:underline">
        ← Back to directory
      </Link>

      <div className="card-shadow mt-6 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="relative flex h-40 items-center justify-center bg-gradient-to-br from-brand-light to-white sm:h-52">
          <span className="text-6xl">🐾</span>
          {groomer.featured === 1 && (
            <span className="absolute left-4 top-4 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white">
              Featured
            </span>
          )}
        </div>

        <div className="p-6 sm:p-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-extrabold text-foreground sm:text-3xl">
                  {groomer.business_name}
                </h1>
                {groomer.is_claimed === 1 && <VerifiedBadge />}
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted">
                <span className="flex items-center gap-1">
                  <span className="text-accent">★</span>
                  <span className="font-semibold text-foreground">{groomer.rating.toFixed(1)}</span>
                  <span>({groomer.review_count} reviews)</span>
                </span>
                <span>·</span>
                <span>📍 {groomer.city}, NC {groomer.zip}</span>
                <span>·</span>
                <span>{groomer.years_experience ?? 0}+ years experience</span>
              </div>
            </div>

            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <a
                href={groomer.website}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="rounded-full bg-brand px-5 py-2.5 text-center text-sm font-semibold text-white hover:bg-brand-dark"
              >
                Visit Website
              </a>
              <a
                href={groomer.gmb_url}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="rounded-full border border-[var(--color-border)] px-5 py-2.5 text-center text-sm font-semibold text-foreground hover:border-brand hover:text-brand"
              >
                View on Google
              </a>
            </div>
          </div>

          <p className="mt-6 text-foreground/80">{groomer.description}</p>

          {groomer.is_claimed === 0 && (
            <div className="mt-6 flex flex-col items-start justify-between gap-3 rounded-xl border border-dashed border-brand/40 bg-brand-light/40 p-4 sm:flex-row sm:items-center">
              {pendingClaim ? (
                <p className="text-sm text-brand-dark">
                  ⏳ A claim for this listing is currently under review.
                </p>
              ) : (
                <>
                  <p className="text-sm text-foreground/80">
                    <strong>Is this your business?</strong> Claim this free listing to add a
                    verified badge and appear higher in search.
                  </p>
                  <Link
                    href={`/groomer/${groomer.slug}/claim`}
                    className="shrink-0 rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
                  >
                    Claim This Business
                  </Link>
                </>
              )}
            </div>
          )}

          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wide text-foreground">Services Offered</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {groomer.services.map((s) => (
                  <span
                    key={s}
                    className="rounded-full bg-brand-light px-3 py-1.5 text-sm font-medium text-brand-dark"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-sm font-bold uppercase tracking-wide text-foreground">Service Area</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {groomer.neighborhoods.map((n) => (
                  <span
                    key={n}
                    className="rounded-full border border-[var(--color-border)] px-3 py-1.5 text-sm text-foreground/80"
                  >
                    {n}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-sm text-muted">
                Serves within approximately {groomer.service_radius_miles} miles of {groomer.city}, NC.
              </p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--background)] p-5 sm:grid-cols-3">
            <div>
              <div className="text-xs font-semibold uppercase text-muted">Phone</div>
              <a href={`tel:${groomer.phone}`} className="text-sm font-medium text-foreground hover:text-brand">
                {groomer.phone}
              </a>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase text-muted">Email</div>
              <a href={`mailto:${groomer.email}`} className="text-sm font-medium text-foreground hover:text-brand">
                {groomer.email}
              </a>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase text-muted">Contact</div>
              <div className="text-sm font-medium text-foreground">{groomer.owner_name}</div>
            </div>
          </div>

          <p className="mt-6 text-xs text-muted">
            Listing information is provided by the business owner. {SITE_NAME} does not
            independently verify pricing or availability — please confirm details directly with the
            business.
          </p>
        </div>
      </div>
    </div>
  );
}
