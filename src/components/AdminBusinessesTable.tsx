"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { GroomerForAdmin } from "@/lib/groomerEdits";

type Props = {
  groomers: GroomerForAdmin[];
  grantAction: (formData: FormData) => void;
  revokeAction: (formData: FormData) => void;
  toggleFeaturedAction: (formData: FormData) => void;
  toggleClaimedAction: (formData: FormData) => void;
  deleteAction: (formData: FormData) => void;
};

export default function AdminBusinessesTable({
  groomers,
  grantAction,
  revokeAction,
  toggleFeaturedAction,
  toggleClaimedAction,
  deleteAction,
}: Props) {
  const [query, setQuery] = useState("");
  const [claimedFilter, setClaimedFilter] = useState<"all" | "claimed" | "unclaimed">("all");
  const [featuredFilter, setFeaturedFilter] = useState<"all" | "featured" | "not">("all");

  const filtered = useMemo(() => {
    let rows = groomers;
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      rows = rows.filter((g) => `${g.business_name} ${g.city} ${g.slug}`.toLowerCase().includes(q));
    }
    if (claimedFilter !== "all") {
      rows = rows.filter((g) => (claimedFilter === "claimed" ? g.is_claimed === 1 : g.is_claimed === 0));
    }
    if (featuredFilter !== "all") {
      rows = rows.filter((g) => (featuredFilter === "featured" ? g.featured === 1 : g.featured === 0));
    }
    return rows;
  }, [groomers, query, claimedFilter, featuredFilter]);

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by business name, city, or slug…"
          className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2.5 text-sm outline-none focus:border-brand sm:max-w-sm"
        />
        <select
          value={claimedFilter}
          onChange={(e) => setClaimedFilter(e.target.value as typeof claimedFilter)}
          className="rounded-lg border border-[var(--color-border)] bg-white px-3 py-2.5 text-sm outline-none focus:border-brand"
        >
          <option value="all">All statuses</option>
          <option value="claimed">Verified only</option>
          <option value="unclaimed">Unclaimed only</option>
        </select>
        <select
          value={featuredFilter}
          onChange={(e) => setFeaturedFilter(e.target.value as typeof featuredFilter)}
          className="rounded-lg border border-[var(--color-border)] bg-white px-3 py-2.5 text-sm outline-none focus:border-brand"
        >
          <option value="all">Featured + not</option>
          <option value="featured">Featured only</option>
          <option value="not">Not featured</option>
        </select>
      </div>

      <p className="mt-2 text-xs text-muted">
        {filtered.length} of {groomers.length} businesses.
      </p>

      <div className="mt-4 max-h-[36rem] space-y-3 overflow-y-auto pr-1">
        {filtered.map((g) => {
          const editUrl = g.edit_token
            ? `https://mobilepetgroomnc.com/groomer/${g.slug}/edit?token=${g.edit_token}`
            : null;
          return (
            <div
              key={g.id}
              className="card-shadow rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4"
            >
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <div className="min-w-0">
                  <p className="font-semibold text-foreground">
                    {g.business_name}{" "}
                    {g.is_claimed === 1 && (
                      <span className="ml-1 rounded-full bg-brand-light px-2 py-0.5 text-xs font-medium text-brand-dark">
                        Verified
                      </span>
                    )}
                    {g.featured === 1 && (
                      <span className="ml-1 rounded-full bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent-dark">
                        Featured
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-muted">
                    {g.city}, NC{g.phone ? ` · ${g.phone}` : ""}
                    {g.review_count > 0 ? ` · ${g.rating.toFixed(1)}★ (${g.review_count})` : " · New listing"}
                  </p>
                </div>

                <div className="flex shrink-0 flex-wrap gap-2">
                  <Link
                    href={`/admin/groomer/${g.id}/edit`}
                    className="rounded-full border border-[var(--color-border)] px-3 py-1.5 text-xs font-semibold text-foreground hover:border-brand hover:text-brand"
                  >
                    Edit
                  </Link>

                  <form action={toggleClaimedAction}>
                    <input type="hidden" name="id" value={g.id} />
                    <button
                      type="submit"
                      className="rounded-full border border-[var(--color-border)] px-3 py-1.5 text-xs font-semibold text-foreground hover:border-brand hover:text-brand"
                    >
                      {g.is_claimed === 1 ? "Unverify" : "Verify"}
                    </button>
                  </form>

                  <form action={toggleFeaturedAction}>
                    <input type="hidden" name="id" value={g.id} />
                    <button
                      type="submit"
                      className="rounded-full border border-[var(--color-border)] px-3 py-1.5 text-xs font-semibold text-foreground hover:border-brand hover:text-brand"
                    >
                      {g.featured === 1 ? "Unfeature" : "Feature"}
                    </button>
                  </form>

                  {editUrl ? (
                    <form action={revokeAction}>
                      <input type="hidden" name="id" value={g.id} />
                      <button
                        type="submit"
                        className="rounded-full border border-[var(--color-border)] px-3 py-1.5 text-xs font-semibold text-foreground hover:border-red-400 hover:text-red-600"
                      >
                        Revoke Access
                      </button>
                    </form>
                  ) : (
                    <form action={grantAction}>
                      <input type="hidden" name="id" value={g.id} />
                      <button
                        type="submit"
                        className="rounded-full bg-brand px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-dark"
                      >
                        Grant Edit Access
                      </button>
                    </form>
                  )}

                  <form
                    action={deleteAction}
                    onSubmit={(e) => {
                      if (!confirm(`Permanently delete "${g.business_name}"? This cannot be undone.`)) {
                        e.preventDefault();
                      }
                    }}
                  >
                    <input type="hidden" name="id" value={g.id} />
                    <button
                      type="submit"
                      className="rounded-full border border-[var(--color-border)] px-3 py-1.5 text-xs font-semibold text-red-600 hover:border-red-400 hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </form>
                </div>
              </div>

              {editUrl && (
                <div className="mt-3">
                  <label className="mb-1 block text-xs font-semibold uppercase text-muted">
                    Edit link — send this to the business
                  </label>
                  <input
                    readOnly
                    value={editUrl}
                    onFocus={(e) => e.currentTarget.select()}
                    className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-xs text-foreground/80"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
