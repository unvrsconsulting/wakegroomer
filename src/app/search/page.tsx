import { Suspense } from "react";
import type { Metadata } from "next";
import DirectoryExplorer from "@/components/DirectoryExplorer";
import { searchGroomers, getAllNeighborhoods, getAllZips } from "@/lib/listings";

export const metadata: Metadata = {
  title: "Find a Mobile Dog Groomer",
  description:
    "Search every mobile dog groomer across the NC Piedmont — Raleigh, Durham, Chapel Hill, Greensboro, and beyond — by city, neighborhood, zip code, or service.",
};

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function SearchPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const get = (key: string) => {
    const v = sp[key];
    return Array.isArray(v) ? v[0] : v;
  };

  const params = {
    q: get("q"),
    city: get("city"),
    neighborhood: get("neighborhood"),
    zip: get("zip"),
    service: get("service"),
  };

  const [initialResults, neighborhoods, zips] = await Promise.all([
    Promise.resolve(searchGroomers(params)),
    Promise.resolve(getAllNeighborhoods()),
    Promise.resolve(getAllZips()),
  ]);

  return (
    <div>
      <div className="border-b border-[var(--color-border)] bg-[var(--color-surface)] py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-extrabold text-foreground sm:text-3xl">
            Find a Mobile Dog Groomer
          </h1>
          <p className="mt-1 text-sm text-foreground/70">
            Browse every listed groomer across the Piedmont, or narrow it down with the filters
            below.
          </p>
        </div>
      </div>

      <Suspense>
        <DirectoryExplorer
          key={new URLSearchParams(
            Object.entries(params).filter(([, v]) => v) as [string, string][]
          ).toString()}
          initialResults={initialResults}
          neighborhoods={neighborhoods}
          zips={zips}
        />
      </Suspense>
    </div>
  );
}
