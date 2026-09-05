import type { MetadataRoute } from "next";
import { searchGroomers } from "@/lib/listings";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const groomers = searchGroomers({});

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/search`, changeFrequency: "daily", priority: 0.9 },
    { url: `${siteUrl}/list-your-business`, changeFrequency: "monthly", priority: 0.5 },
  ];

  const groomerRoutes: MetadataRoute.Sitemap = groomers.map((g) => ({
    url: `${siteUrl}/groomer/${g.slug}`,
    lastModified: g.claimed_at ?? g.created_at,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...groomerRoutes];
}
