import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";
import { PHOTOS } from "@/lib/photos";
import { GROOMER_PHOTOS } from "@/lib/groomerPhotos.generated";
import { SERVICE_PHOTOS } from "@/lib/servicePhotos.generated";
import { serviceSlug } from "@/lib/slugs";
import { getAllBlogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Photo Credits",
  description: `Attribution for photos used across ${SITE_NAME}, sourced from Wikimedia Commons.`,
  alternates: { canonical: "/photo-credits" },
  robots: { index: false, follow: true },
};

function humanizeSlug(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function CreditRow({
  id,
  label,
  author,
  license,
  sourceUrl,
}: {
  id: string;
  label: string;
  author: string;
  license: string;
  sourceUrl: string;
}) {
  return (
    <li id={id} className="scroll-mt-24 text-sm text-foreground/80">
      <span className="font-medium text-foreground">{label}:</span>{" "}
      <a
        href={sourceUrl}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="font-medium text-brand hover:underline"
      >
        {author}
      </a>{" "}
      ({license}) via Wikimedia Commons
    </li>
  );
}

export default function PhotoCreditsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold text-foreground">Photo Credits</h1>
      <p className="mt-3 text-foreground/70">
        Photos used across {SITE_NAME} are sourced from Wikimedia Commons under Creative Commons
        or public domain licenses.
      </p>

      <h2 className="mt-8 text-lg font-bold text-foreground">Site Photos</h2>
      <ul className="mt-3 space-y-2">
        {Object.entries(PHOTOS).map(([key, p]) => (
          <CreditRow
            key={key}
            id={`site-${key}`}
            label="Site photo"
            author={p.author}
            license={p.license}
            sourceUrl={p.sourceUrl}
          />
        ))}
      </ul>

      <h2 className="mt-8 text-lg font-bold text-foreground">Business Photos</h2>
      <ul className="mt-3 space-y-2">
        {Object.entries(GROOMER_PHOTOS).map(([slug, p]) => (
          <CreditRow
            key={slug}
            id={`groomer-${slug}`}
            label={humanizeSlug(slug)}
            author={p.author}
            license={p.license}
            sourceUrl={p.sourceUrl}
          />
        ))}
      </ul>

      <h2 className="mt-8 text-lg font-bold text-foreground">Service Photos</h2>
      <ul className="mt-3 space-y-2">
        {Object.entries(SERVICE_PHOTOS).map(([service, p]) => (
          <CreditRow
            key={service}
            id={`service-${serviceSlug(service)}`}
            label={service}
            author={p.author}
            license={p.license}
            sourceUrl={p.sourceUrl}
          />
        ))}
      </ul>

      <h2 className="mt-8 text-lg font-bold text-foreground">Blog Photos</h2>
      <ul className="mt-3 space-y-2">
        {getAllBlogPosts().map((post) => (
          <CreditRow
            key={post.slug}
            id={`blog-${post.slug}`}
            label={post.title}
            author={post.heroImage.author}
            license={post.heroImage.license}
            sourceUrl={post.heroImage.sourceUrl}
          />
        ))}
      </ul>
    </div>
  );
}
