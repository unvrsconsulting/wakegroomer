import Link from "next/link";
import type { Metadata } from "next";
import { getBlogPostBySlug } from "@/lib/blog";
import { GUIDE_SECTIONS } from "@/lib/guides";
import { getAllCities, getServiceCounts } from "@/lib/listings";
import { citySlug, serviceSlug } from "@/lib/slugs";
import { SITE_URL } from "@/lib/site";
import Breadcrumbs from "@/components/Breadcrumbs";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Mobile Dog Grooming Guide for North Carolina",
  description:
    "A complete guide to mobile dog grooming in North Carolina: what it costs, how to choose a groomer, coat and breed care, and health basics like nails, ears, and teeth.",
  alternates: { canonical: "/guides" },
};

export default async function GuidesPage() {
  const [cities, serviceCounts] = await Promise.all([getAllCities(), getServiceCounts()]);

  const sections = GUIDE_SECTIONS.map((section) => ({
    ...section,
    posts: section.slugs
      .map((slug) => getBlogPostBySlug(slug))
      .filter((p): p is NonNullable<typeof p> => Boolean(p)),
  })).filter((s) => s.posts.length > 0);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Mobile Dog Grooming Guide for North Carolina",
    url: `${SITE_URL}/guides`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: sections.flatMap((s) => s.posts).map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE_URL}/blog/${p.slug}`,
        name: p.title,
      })),
    },
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Guides", href: "/guides" },
        ]}
      />

      <h1 className="mt-4 text-3xl font-extrabold text-foreground sm:text-4xl">
        The Complete Guide to Mobile Dog Grooming in North Carolina
      </h1>
      <p className="mt-3 max-w-3xl text-foreground/70">
        Mobile grooming brings a fully equipped van to your driveway, so your dog is groomed without a
        drop-off or a waiting room. These guides cover what to expect, what it costs, how to choose a
        groomer, and how to care for your dog&apos;s coat, nails, ears, and teeth. When you&apos;re ready,{" "}
        <Link href="/search" className="font-semibold text-brand hover:underline">
          search the directory
        </Link>{" "}
        to find a groomer near you.
      </p>

      <div className="mt-10 space-y-12">
        {sections.map((section) => (
          <section key={section.id} id={section.id}>
            <h2 className="text-2xl font-bold text-foreground">{section.title}</h2>
            <p className="mt-1 text-foreground/70">{section.blurb}</p>
            <ul className="mt-4 space-y-4">
              {section.posts.map((p) => (
                <li key={p.slug}>
                  <Link href={`/blog/${p.slug}`} className="text-lg font-semibold text-brand hover:underline">
                    {p.title}
                  </Link>
                  <p className="mt-1 text-sm text-foreground/70">{p.excerpt}</p>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <section className="mt-14">
        <h2 className="text-2xl font-bold text-foreground">Find a Mobile Groomer by Service</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {serviceCounts.map((s) => (
            <Link
              key={s.service}
              href={`/services/${serviceSlug(s.service)}`}
              className="rounded-full border border-[var(--color-border)] px-3 py-1.5 text-sm text-foreground/80 hover:border-brand hover:text-brand"
            >
              {s.service}
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-foreground">Find a Mobile Groomer by City</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {cities.map((c) => (
            <Link
              key={c}
              href={`/groomers/${citySlug(c)}`}
              className="rounded-full border border-[var(--color-border)] px-3 py-1.5 text-sm text-foreground/80 hover:border-brand hover:text-brand"
            >
              {c}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
