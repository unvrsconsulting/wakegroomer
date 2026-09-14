import { getPendingSignups } from "@/lib/signup";
import { getPendingClaims } from "@/lib/claims";
import { getPendingGroomerEdits, getAllGroomersForAdmin, getAdminStats } from "@/lib/groomerEdits";
import {
  getTopViewedGroomers,
  getSearchStatsByCity,
  getSearchStatsByTerm,
  getAnalyticsTotals,
} from "@/lib/analytics";
import AdminLogoutButton from "@/components/AdminLogoutButton";
import AdminBusinessesTable from "@/components/AdminBusinessesTable";
import {
  approveSignupAction,
  rejectSignupAction,
  approveClaimAction,
  rejectClaimAction,
  approveGroomerEditAction,
  rejectGroomerEditAction,
  grantEditAccessAction,
  revokeEditAccessAction,
  toggleFeaturedAction,
  toggleClaimedAction,
  deleteGroomerAction,
} from "./actions";

const ANALYTICS_WINDOW_DAYS = 30;

export default async function AdminPage() {
  const [
    pendingSignups,
    pendingClaims,
    pendingEdits,
    allGroomers,
    stats,
    topViewed,
    topCities,
    topTerms,
    analyticsTotals,
  ] = await Promise.all([
    Promise.resolve(getPendingSignups()),
    Promise.resolve(getPendingClaims()),
    Promise.resolve(getPendingGroomerEdits()),
    Promise.resolve(getAllGroomersForAdmin()),
    getAdminStats(),
    getTopViewedGroomers(ANALYTICS_WINDOW_DAYS, 10),
    getSearchStatsByCity(ANALYTICS_WINDOW_DAYS, 10),
    getSearchStatsByTerm(ANALYTICS_WINDOW_DAYS, 10),
    getAnalyticsTotals(ANALYTICS_WINDOW_DAYS),
  ]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground">Admin</h1>
          <p className="mt-1 text-sm text-muted">Review new listings and business claims.</p>
        </div>
        <AdminLogoutButton />
      </div>

      <section className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <StatCard label="Businesses" value={stats.totalBusinesses} />
        <StatCard label="Verified" value={stats.claimedCount} />
        <StatCard label="Featured" value={stats.featuredCount} />
        <StatCard label="Cities Covered" value={stats.cityCount} />
        <StatCard label={`Page Views (${ANALYTICS_WINDOW_DAYS}d)`} value={analyticsTotals.totalViews} />
        <StatCard label={`Searches (${ANALYTICS_WINDOW_DAYS}d)`} value={analyticsTotals.totalSearches} />
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-bold text-foreground">
          Analytics <span className="text-sm font-normal text-muted">(last {ANALYTICS_WINDOW_DAYS} days)</span>
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-5 lg:grid-cols-3">
          <AnalyticsCard title="Most Viewed Businesses">
            {topViewed.length === 0 ? (
              <EmptyAnalytics />
            ) : (
              <ol className="space-y-2">
                {topViewed.map((v) => (
                  <li key={v.groomer_id} className="flex items-center justify-between gap-2 text-sm">
                    <a
                      href={`/groomer/${v.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-w-0 truncate text-brand hover:underline"
                    >
                      {v.business_name}
                    </a>
                    <span className="shrink-0 font-semibold text-foreground">{v.views}</span>
                  </li>
                ))}
              </ol>
            )}
          </AnalyticsCard>

          <AnalyticsCard title="Top Searched Cities">
            {topCities.length === 0 ? (
              <EmptyAnalytics />
            ) : (
              <ol className="space-y-2">
                {topCities.map((c) => (
                  <li key={c.city} className="flex items-center justify-between gap-2 text-sm">
                    <span className="min-w-0 truncate text-foreground">{c.city}</span>
                    <span className="shrink-0 font-semibold text-foreground">{c.count}</span>
                  </li>
                ))}
              </ol>
            )}
          </AnalyticsCard>

          <AnalyticsCard title="Top Search Terms">
            {topTerms.length === 0 ? (
              <EmptyAnalytics />
            ) : (
              <ol className="space-y-2">
                {topTerms.map((t) => (
                  <li key={t.term} className="flex items-center justify-between gap-2 text-sm">
                    <span className="min-w-0 truncate text-foreground">&quot;{t.term}&quot;</span>
                    <span className="shrink-0 font-semibold text-foreground">{t.count}</span>
                  </li>
                ))}
              </ol>
            )}
          </AnalyticsCard>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-lg font-bold text-foreground">
          Businesses <span className="text-sm font-normal text-muted">({allGroomers.length})</span>
        </h2>
        <p className="mt-1 text-sm text-muted">
          Search, verify, feature, grant edit access, or edit any listing directly.
        </p>
        <div className="mt-4">
          <AdminBusinessesTable
            groomers={allGroomers}
            grantAction={grantEditAccessAction}
            revokeAction={revokeEditAccessAction}
            toggleFeaturedAction={toggleFeaturedAction}
            toggleClaimedAction={toggleClaimedAction}
            deleteAction={deleteGroomerAction}
          />
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-bold text-foreground">
          Pending Listings{" "}
          <span className="text-sm font-normal text-muted">({pendingSignups.length})</span>
        </h2>

        {pendingSignups.length === 0 ? (
          <p className="mt-3 text-sm text-muted">Nothing waiting on review.</p>
        ) : (
          <div className="mt-4 space-y-4">
            {pendingSignups.map((s) => (
              <div
                key={s.id}
                className="card-shadow rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5"
              >
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                  <div className="min-w-0">
                    <p className="font-bold text-foreground">{s.business_name}</p>
                    <p className="text-sm text-muted">
                      {s.city}, NC {s.zip} · submitted {new Date(s.created_at).toLocaleDateString()}
                    </p>
                    <dl className="mt-3 grid grid-cols-1 gap-x-6 gap-y-1 text-sm sm:grid-cols-2">
                      <Row label="Contact" value={`${s.owner_name} · ${s.email} · ${s.phone}`} />
                      <Row label="Website" value={s.website ?? "N/A"} link={s.website ?? undefined} />
                      <Row label="Google Business Profile" value={s.gmb_url ?? "N/A"} link={s.gmb_url ?? undefined} />
                      <Row label="Wants Verified Badge" value={s.wants_verified_badge ? "Yes" : "No"} />
                      <Row label="Wants Featured" value={s.wants_featured ? "Yes" : "No"} />
                    </dl>
                  </div>

                  <div className="flex shrink-0 gap-2">
                    <form action={approveSignupAction}>
                      <input type="hidden" name="id" value={s.id} />
                      <button
                        type="submit"
                        className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
                      >
                        Approve
                      </button>
                    </form>
                    <form action={rejectSignupAction}>
                      <input type="hidden" name="id" value={s.id} />
                      <button
                        type="submit"
                        className="rounded-full border border-[var(--color-border)] px-4 py-2 text-sm font-semibold text-foreground hover:border-red-400 hover:text-red-600"
                      >
                        Reject
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="mt-12">
        <h2 className="text-lg font-bold text-foreground">
          Pending Claims{" "}
          <span className="text-sm font-normal text-muted">({pendingClaims.length})</span>
        </h2>

        {pendingClaims.length === 0 ? (
          <p className="mt-3 text-sm text-muted">Nothing waiting on review.</p>
        ) : (
          <div className="mt-4 space-y-4">
            {pendingClaims.map((c) => (
              <div
                key={c.id}
                className="card-shadow rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5"
              >
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                  <div className="min-w-0">
                    <p className="font-bold text-foreground">{c.business_name}</p>
                    <p className="text-sm text-muted">
                      claim submitted {new Date(c.created_at).toLocaleDateString()}
                    </p>
                    <dl className="mt-3 grid grid-cols-1 gap-x-6 gap-y-1 text-sm sm:grid-cols-2">
                      <Row label="Claimant" value={`${c.claimant_name} · ${c.claimant_email} · ${c.claimant_phone}`} />
                      {c.website && <Row label="Website" value={c.website} link={c.website} />}
                      <Row label="Google Business Profile" value={c.gmb_url} link={c.gmb_url} />
                      {c.message && <Row label="Message" value={c.message} />}
                      <Row label="Wants Verified Badge" value={c.wants_verified_badge ? "Yes" : "No"} />
                      <Row label="Wants Featured" value={c.wants_featured ? "Yes" : "No"} />
                    </dl>
                  </div>

                  <div className="flex shrink-0 gap-2">
                    <form action={approveClaimAction}>
                      <input type="hidden" name="id" value={c.id} />
                      <button
                        type="submit"
                        className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
                      >
                        Approve
                      </button>
                    </form>
                    <form action={rejectClaimAction}>
                      <input type="hidden" name="id" value={c.id} />
                      <button
                        type="submit"
                        className="rounded-full border border-[var(--color-border)] px-4 py-2 text-sm font-semibold text-foreground hover:border-red-400 hover:text-red-600"
                      >
                        Reject
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="mt-12">
        <h2 className="text-lg font-bold text-foreground">
          Pending Profile Edits{" "}
          <span className="text-sm font-normal text-muted">({pendingEdits.length})</span>
        </h2>

        {pendingEdits.length === 0 ? (
          <p className="mt-3 text-sm text-muted">Nothing waiting on review.</p>
        ) : (
          <div className="mt-4 space-y-4">
            {pendingEdits.map((e) => {
              const neighborhoods = JSON.parse(e.neighborhoods) as string[];
              const services = JSON.parse(e.services) as string[];
              return (
                <div
                  key={e.id}
                  className="card-shadow rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5"
                >
                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                    <div className="min-w-0">
                      <p className="font-bold text-foreground">
                        {e.current_business_name}
                        {e.business_name !== e.current_business_name && (
                          <span className="text-muted"> → {e.business_name}</span>
                        )}
                      </p>
                      <p className="text-sm text-muted">
                        submitted {new Date(e.created_at).toLocaleDateString()} ·{" "}
                        <a
                          href={`/groomer/${e.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-brand hover:underline"
                        >
                          view live listing
                        </a>
                      </p>
                      <dl className="mt-3 grid grid-cols-1 gap-x-6 gap-y-1 text-sm sm:grid-cols-2">
                        <Row label="Contact" value={`${e.owner_name ?? "N/A"} · ${e.email ?? "N/A"} · ${e.phone ?? "N/A"}`} />
                        <Row label="Website" value={e.website ?? "N/A"} link={e.website ?? undefined} />
                        <Row label="Google Business Profile" value={e.gmb_url ?? "N/A"} link={e.gmb_url ?? undefined} />
                        <Row label="Facebook" value={e.facebook_url ?? "N/A"} link={e.facebook_url ?? undefined} />
                        <Row label="Location" value={`${e.city}, NC ${e.zip}`} />
                        <Row label="Areas Served" value={neighborhoods.join(", ")} />
                        <Row label="Services" value={services.join(", ")} />
                        <Row label="Radius / Experience" value={`${e.service_radius_miles} mi · ${e.years_experience ?? "N/A"} yrs`} />
                        {e.hours && <Row label="Hours" value={e.hours} />}
                        {e.price_info && <Row label="Pricing" value={e.price_info} />}
                        {e.description && <Row label="Description" value={e.description} />}
                      </dl>
                    </div>

                    <div className="flex shrink-0 gap-2">
                      <form action={approveGroomerEditAction}>
                        <input type="hidden" name="id" value={e.id} />
                        <button
                          type="submit"
                          className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
                        >
                          Approve
                        </button>
                      </form>
                      <form action={rejectGroomerEditAction}>
                        <input type="hidden" name="id" value={e.id} />
                        <button
                          type="submit"
                          className="rounded-full border border-[var(--color-border)] px-4 py-2 text-sm font-semibold text-foreground hover:border-red-400 hover:text-red-600"
                        >
                          Reject
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

    </div>
  );
}

function Row({ label, value, link }: { label: string; value: string; link?: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase text-muted">{label}</dt>
      <dd className="truncate text-foreground">
        {link ? (
          <a href={link} target="_blank" rel="noopener noreferrer nofollow" className="text-brand hover:underline">
            {value}
          </a>
        ) : (
          value
        )}
      </dd>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="card-shadow rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
      <p className="text-2xl font-extrabold text-foreground">{value}</p>
      <p className="mt-1 text-xs font-medium uppercase tracking-wide text-muted">{label}</p>
    </div>
  );
}

function AnalyticsCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="card-shadow rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
      <h3 className="text-sm font-bold text-foreground">{title}</h3>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function EmptyAnalytics() {
  return <p className="text-sm text-muted">No data yet.</p>;
}
