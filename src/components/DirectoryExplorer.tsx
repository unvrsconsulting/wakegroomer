"use client";

import { useCallback, useEffect, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import GroomerCard from "./GroomerCard";
import { GroomerView } from "@/lib/listings";
import { ALL_SERVICES } from "@/lib/constants";

type Props = {
  initialResults: GroomerView[];
  zips: string[];
  cities: string[];
};

export default function DirectoryExplorer({ initialResults, zips, cities }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [q, setQ] = useState(searchParams.get("q") ?? "");
  const [city, setCity] = useState(searchParams.get("city") ?? "");
  const [zip, setZip] = useState(searchParams.get("zip") ?? "");
  const [service, setService] = useState(searchParams.get("service") ?? "");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const [results, setResults] = useState<GroomerView[]>(initialResults);
  const [loading, setLoading] = useState(false);

  const hasFilters = Boolean(q || city || zip || service);

  const runSearch = useCallback(
    async (params: { q: string; city: string; zip: string; service: string }) => {
      setLoading(true);
      const usp = new URLSearchParams();
      if (params.q) usp.set("q", params.q);
      if (params.city) usp.set("city", params.city);
      if (params.zip) usp.set("zip", params.zip);
      if (params.service) usp.set("service", params.service);

      startTransition(() => {
        router.replace(usp.toString() ? `/search?${usp.toString()}` : "/search", { scroll: false });
      });

      try {
        const res = await fetch(`/api/listings?${usp.toString()}`);
        const data = await res.json();
        setResults(data.results ?? []);
      } finally {
        setLoading(false);
      }
    },
    [router]
  );

  useEffect(() => {
    // Skip initial mount; initialResults already reflects any server-provided params.
    const t = setTimeout(() => {
      runSearch({ q, city, zip, service });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, 250);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, city, zip, service]);

  function clearFilters() {
    setQ("");
    setCity("");
    setZip("");
    setService("");
  }

  return (
    <div id="directory" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
        {/* Filters sidebar */}
        <aside className="card-shadow h-fit overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] lg:sticky lg:top-24">
          <button
            type="button"
            onClick={() => setFiltersOpen((open) => !open)}
            aria-expanded={filtersOpen}
            className="flex w-full items-center justify-between p-5 lg:hidden"
          >
            <span className="text-sm font-bold uppercase tracking-wide text-foreground">
              Filters{hasFilters ? " (active)" : ""}
            </span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className={`h-4 w-4 shrink-0 text-foreground/70 transition-transform ${filtersOpen ? "rotate-180" : ""}`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
            </svg>
          </button>

          <div className="hidden items-center justify-between p-5 lg:flex">
            <h2 className="text-sm font-bold uppercase tracking-wide text-foreground">Filters</h2>
            {hasFilters && (
              <button onClick={clearFilters} className="text-xs font-medium text-brand hover:underline">
                Clear all
              </button>
            )}
          </div>

          <div className={`${filtersOpen ? "block" : "hidden"} space-y-4 px-5 pb-5 lg:block lg:pt-0`}>
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="text-xs font-medium text-brand hover:underline lg:hidden"
              >
                Clear all
              </button>
            )}

            <div>
              <label className="mb-1 block text-xs font-semibold text-muted">Keyword</label>
              <input
                type="text"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="e.g. de-shedding, cat grooming"
                className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm outline-none focus:border-brand"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-muted">City</label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm outline-none focus:border-brand"
              >
                <option value="">All Cities</option>
                {cities.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-muted">Zip Code</label>
              <select
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm outline-none focus:border-brand"
              >
                <option value="">All Zip Codes</option>
                {zips.map((z) => (
                  <option key={z} value={z}>
                    {z}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-muted">Service</label>
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm outline-none focus:border-brand"
              >
                <option value="">All Services</option>
                {ALL_SERVICES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </aside>

        {/* Results */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-muted">
              {loading || isPending ? "Searching…" : `${results.length} mobile groomer${results.length === 1 ? "" : "s"} found`}
            </p>
          </div>

          {results.length === 0 && !loading ? (
            <div className="card-shadow rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-10 text-center">
              <p className="text-lg font-semibold text-foreground">No groomers match those filters</p>
              <p className="mt-1 text-sm text-muted">Try clearing a filter or searching a nearby city.</p>
              <button
                onClick={clearFilters}
                className="mt-4 rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((g) => (
                <GroomerCard key={g.id} groomer={g} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
