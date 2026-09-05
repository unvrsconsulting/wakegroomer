import Link from "next/link";
import Image from "next/image";
import Hero from "@/components/Hero";
import GroomerCarousel from "@/components/GroomerCarousel";
import CityHeatmap from "@/components/CityHeatmap";
import { getFeaturedGroomers, getCityCounts, getServiceCounts } from "@/lib/listings";
import { SERVICE_AREA_CITIES, SITE_NAME } from "@/lib/constants";
import { PHOTOS, PHOTO_POOL } from "@/lib/photos";

const BENEFITS = [
  {
    title: "No stressful car rides or shop cages",
    body: "Your dog gets groomed steps from your front door — no waiting in a crate next to unfamiliar animals.",
  },
  {
    title: "One dog at a time",
    body: "Mobile groomers work with a single client per appointment, not a dozen dogs booked back-to-back.",
  },
  {
    title: "Get your time back",
    body: "No drop-off, no waiting room, no second trip to pick up — the groomer comes to you.",
  },
  {
    title: "Gentler on anxious & senior dogs",
    body: "A quiet, familiar driveway is far less overwhelming than a busy grooming salon.",
  },
];

const FAQS = [
  {
    q: "Is this really free for pet owners?",
    a: "Yes. Searching the directory and contacting groomers costs nothing. Some businesses pay for a Featured placement, but that never limits which groomers you can find or contact.",
  },
  {
    q: "How do I know a groomer is legitimate?",
    a: "Look for the Verified badge — it means the business owner confirmed ownership through their Google Business Profile. Unclaimed listings are still real businesses we've researched, just not yet confirmed by the owner.",
  },
  {
    q: "What if I don't see a groomer in my city?",
    a: "Coverage is still growing across the Piedmont. Try a nearby city in the search filters, or let a local groomer know they can list for free.",
  },
  {
    q: "How do I actually book an appointment?",
    a: "Reach out directly through the groomer's website, phone number, or Google Business Profile listed on their profile page — booking happens with the business, not through this site.",
  },
  {
    q: "I run a mobile grooming business — how do I get listed?",
    a: "Click \"List Your Business Free\" and fill out the short form. We'll review it and your listing goes live within 1-2 business days.",
  },
];

export default async function Home() {
  const [featured, cityCounts, serviceCounts] = await Promise.all([
    Promise.resolve(getFeaturedGroomers(10)),
    Promise.resolve(getCityCounts()),
    Promise.resolve(getServiceCounts()),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    description:
      "The free local directory for mobile dog groomers across North Carolina's Piedmont.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <Hero />

      <section className="border-b border-[var(--color-border)] bg-[var(--color-surface)] py-6">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-2 px-4 sm:px-6 lg:px-8">
          <span className="mr-2 text-sm font-medium text-muted">Popular cities:</span>
          {SERVICE_AREA_CITIES.slice(0, 8).map((c) => (
            <Link
              key={c}
              href={`/search?city=${encodeURIComponent(c)}`}
              className="rounded-full border border-[var(--color-border)] px-3 py-1.5 text-sm text-foreground/80 hover:border-brand hover:text-brand"
            >
              {c}
            </Link>
          ))}
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Why Pet Owners Love Mobile Grooming</h2>
            <dl className="mt-6 space-y-6">
              {BENEFITS.map((b) => (
                <div key={b.title}>
                  <dt className="font-semibold text-foreground">🐾 {b.title}</dt>
                  <dd className="mt-1 text-sm text-foreground/70">{b.body}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl sm:aspect-[4/3]">
            <Image
              src={PHOTOS.groomingAction.src}
              alt={PHOTOS.groomingAction.alt}
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--color-border)] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-foreground">Featured &amp; Verified Groomers</h2>
              <p className="mt-2 text-foreground/70">
                A few of the highly-rated, owner-verified groomers on our directory.
              </p>
            </div>
            <Link
              href="/search"
              className="hidden shrink-0 text-sm font-semibold text-brand hover:underline sm:block"
            >
              View all groomers →
            </Link>
          </div>

          <div className="mt-8">
            <GroomerCarousel groomers={featured} />
          </div>

          <Link
            href="/search"
            className="mt-6 block text-center text-sm font-semibold text-brand hover:underline sm:hidden"
          >
            View all groomers →
          </Link>
        </div>
      </section>

      <section className="bg-[var(--color-surface)] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-foreground">Browse by Service</h2>
            <p className="mt-2 text-foreground/70">
              Find groomers who offer exactly what your dog needs.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {serviceCounts.map(({ service, count }, i) => {
              const photo = PHOTO_POOL[i % PHOTO_POOL.length];
              return (
                <Link
                  key={service}
                  href={`/search?service=${encodeURIComponent(service)}`}
                  className="card-shadow card-shadow-hover group overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white text-center transition hover:border-brand"
                >
                  <div className="relative aspect-square w-full overflow-hidden">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
                      className="object-cover transition duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <span className="block text-sm font-semibold text-foreground">{service}</span>
                    <span className="text-xs text-muted">
                      {count} groomer{count === 1 ? "" : "s"}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--color-border)] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-foreground">Coverage Across the Piedmont</h2>
            <p className="mt-2 text-foreground/70">
              Darker, larger circles mean more listed groomers serving that city. Click a city to
              see its groomers.
            </p>
          </div>

          <div className="mt-8">
            <CityHeatmap cityCounts={cityCounts} />
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-foreground">How It Works</h2>
            <p className="mt-2 text-foreground/70">
              Finding a trusted mobile groomer near you takes three easy steps.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {[
              {
                step: "1",
                title: "Search your area",
                body: "Filter by city, neighborhood, or zip code to see groomers who actually serve your street.",
              },
              {
                step: "2",
                title: "Compare profiles",
                body: "Check ratings, services offered, service radius, and each business's Google reviews.",
              },
              {
                step: "3",
                title: "Book directly",
                body: "Reach out through their website or Google Business Profile to schedule your appointment.",
              },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand text-lg font-bold text-white">
                  {s.step}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">{s.title}</h3>
                <p className="mt-2 text-sm text-foreground/70">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--color-border)] bg-[var(--color-surface)] py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground">Frequently Asked Questions</h2>
          </div>

          <div className="mt-8 divide-y divide-[var(--color-border)] rounded-2xl border border-[var(--color-border)] bg-white">
            {FAQS.map((f) => (
              <details key={f.q} className="group p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-foreground">
                  {f.q}
                  <span className="shrink-0 text-brand transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm text-foreground/70">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-dark py-16">
        <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold text-white">Own a mobile grooming business?</h2>
            <p className="mx-auto mt-3 max-w-xl text-brand-light/90 lg:mx-0">
              List your business on {SITE_NAME} for free and get discovered by pet owners
              searching your service area.
            </p>
            <Link
              href="/list-your-business"
              className="mt-6 inline-block rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white transition hover:bg-accent-dark"
            >
              List Your Business Free
            </Link>
          </div>

          <div className="relative mx-auto aspect-[4/3] w-full max-w-md overflow-hidden rounded-2xl">
            <Image
              src={PHOTOS.happyDog.src}
              alt={PHOTOS.happyDog.alt}
              fill
              sizes="(min-width: 1024px) 30vw, 90vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
