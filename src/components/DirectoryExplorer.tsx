"use client";

import { useCallback, useEffect, useMemo, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import GroomerCard from "./GroomerCard";
import { GroomerView } from "@/lib/listings";
import { ALL_SERVICES, SERVICE_AREA_CITIES } from "@/lib/constants";

type Props = {
  initialResults: GroomerView[];
  neighborhoods: string[];
  zips: string[];
};

export default function DirectoryExplorer({ initialResults, neighborhoods, zips }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [q, setQ] = useState(searchParams.get("q") ?? "");
  const [city, setCity] = useState(searchParams.get("city") ?? "");
  const [neighborhood, setNeighborhood] = useState(searchParams.get("neighborhood") ?? "");
  const [zip, setZip] = useState(searchParams.get("zip") ?? "");
  const [service, setService] = useState(searchParams.get("service") ?? "");

  const [results, setResults] = useState<GroomerView[]>(initialResults);
  const [loading, setLoading] = useState(false);

  const hasFilters = Boolean(q || city || neighborhood || zip || service);

  const filteredNeighborhoods = useMemo(() => neighborhoods, [neighborhoods]);

  const runSearch = useCallback(
    async (params: { q: string; city: string; neighborhood: string; zip: string; service: string }) => {
      setLoading(true);
      const usp = new URLSearchParams();
      if (params.q) usp.set("q", params.q);
      if (params.city) usp.set("city", params.city);
      if (params.neighborhood) usp.set("neighborhood", params.neighborhood);
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
      runSearch({ q, city, neighborhood, zip, service });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, 250);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, city, neighborhood, zip, service]);

  function clearFilters() {
    setQ("");
    setCity("");
    setNeighborhood("");
    setZip("");
    setService("");
  }

  return (
    <div id="directory" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
        {/* Filters sidebar */}
        <aside className="card-shadow h-fit rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 lg:sticky lg:top-24">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wide text-foreground">Filters</h2>
            {hasFilters && (
              <button onClick={clearFilters} className="text-xs font-medium text-brand hover:underline">
                Clear all
              </button>
            )}
          </div>

          <div className="mt-4 space-y-4">
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
                {SERVICE_AREA_CITIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-muted">Neighborhood</label>
              <select
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
                className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm outline-none focus:border-brand"
              >
                <option value="">All Neighborhoods</option>
                {filteredNeighborhoods.map((n) => (
                  <option key={n} value={n}>
                    {n}
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
