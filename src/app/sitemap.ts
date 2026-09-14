import type { MetadataRoute } from "next";
import { searchGroomers, getAllCities, getServiceCounts } from "@/lib/listings";
import { citySlug, serviceSlug } from "@/lib/slugs";
import { getAllBlogPosts } from "@/lib/blog";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [groomers, cities, serviceCounts] = await Promise.all([
    searchGroomers({}),
    getAllCities(),
    getServiceCounts(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/search`, changeFrequency: "daily", priority: 0.9 },
    { url: `${siteUrl}/list-your-business`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteUrl}/blog`, changeFrequency: "weekly", priority: 0.6 },
  ];

  const blogRoutes: MetadataRoute.Sitemap = getAllBlogPosts().map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: post.publishedAt,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const groomerRoutes: MetadataRoute.Sitemap = groomers.map((g) => ({
    url: `${siteUrl}/groomer/${g.slug}`,
    lastModified: g.claimed_at ?? g.created_at,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const cityRoutes: MetadataRoute.Sitemap = cities.map((city) => ({
    url: `${siteUrl}/groomers/${citySlug(city)}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const serviceRoutes: MetadataRoute.Sitemap = serviceCounts.map(({ service }) => ({
    url: `${siteUrl}/services/${serviceSlug(service)}`,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes, ...cityRoutes, ...serviceRoutes, ...groomerRoutes];
}
