import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";
import { getAllBlogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Dog Grooming Blog",
  description: `Tips and local guides on dog grooming across North Carolina, from ${SITE_NAME}.`,
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  const posts = getAllBlogPosts();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold text-foreground sm:text-4xl">Dog Grooming Blog</h1>
      <p className="mt-3 max-w-2xl text-foreground/70">
        Local guides and practical tips for mobile dog grooming across North Carolina.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="card-shadow card-shadow-hover group flex flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] transition"
          >
            <div className="relative h-44 w-full overflow-hidden bg-brand-light">
              <Image
                src={post.heroImage.src}
                alt={post.heroImage.alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition duration-300 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-1 flex-col p-5">
              <time dateTime={post.publishedAt} className="text-xs font-medium uppercase tracking-wide text-muted">
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  timeZone: "UTC",
                })}
              </time>
              <h2 className="mt-2 text-lg font-bold text-foreground group-hover:text-brand">
                {post.title}
              </h2>
              <p className="mt-2 line-clamp-3 text-sm text-foreground/70">{post.excerpt}</p>
              <span className="mt-4 text-sm font-semibold text-brand">Read more →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
