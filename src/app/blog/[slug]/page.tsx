import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllBlogPosts, getBlogPostBySlug, type ContentBlock } from "@/lib/blog";
import { SITE_NAME } from "@/lib/constants";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.metaDescription,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      type: "article",
      publishedTime: post.publishedAt,
    },
  };
}

function Block({ block }: { block: ContentBlock }) {
  if (block.type === "h2") {
    return <h2 className="mt-8 text-xl font-bold text-foreground">{block.text}</h2>;
  }
  if (block.type === "ul") {
    return (
      <ul className="mt-3 list-disc space-y-2 pl-6">
        {block.items.map((item, i) => (
          <li key={i} className="text-foreground/80" dangerouslySetInnerHTML={{ __html: item }} />
        ))}
      </ul>
    );
  }
  return <p className="mt-3 text-foreground/80" dangerouslySetInnerHTML={{ __html: block.html }} />;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.publishedAt,
    image: post.heroImage.src,
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: { "@type": "Organization", name: SITE_NAME },
    mainEntityOfPage: `https://mobilepetgroomnc.com/blog/${post.slug}`,
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Link href="/blog" className="text-sm font-medium text-brand hover:underline">
        ← Back to blog
      </Link>

      <h1 className="mt-4 text-3xl font-extrabold text-foreground sm:text-4xl">{post.title}</h1>
      <time dateTime={post.publishedAt} className="mt-2 block text-sm text-muted">
        {new Date(post.publishedAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          timeZone: "UTC",
        })}
      </time>

      <div className="card-shadow relative mt-6 h-56 w-full overflow-hidden rounded-2xl sm:h-80">
        <Image
          src={post.heroImage.src}
          alt={post.heroImage.alt}
          fill
          sizes="(min-width: 1024px) 768px, 100vw"
          className="object-cover"
          priority
        />
        <Link
          href={`/photo-credits#blog-${post.slug}`}
          aria-label="Photo credit"
          title="Photo credit"
          className="absolute bottom-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-black/50 text-[11px] font-semibold text-white/90 hover:bg-black/70"
        >
          i
        </Link>
      </div>

      <article className="mt-8">
        {post.content.map((block, i) => (
          <Block key={i} block={block} />
        ))}
      </article>

      <div className="mt-10 rounded-2xl border border-dashed border-[var(--color-border)] p-6 text-center">
        <p className="text-sm text-foreground/70">
          Ready to book a mobile groomer?{" "}
          <Link href="/search" className="font-semibold text-brand hover:underline">
            Search the directory
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
