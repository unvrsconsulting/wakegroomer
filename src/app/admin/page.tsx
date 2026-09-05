import { getPendingSignups } from "@/lib/signup";
import { getPendingClaims } from "@/lib/claims";
import AdminLogoutButton from "@/components/AdminLogoutButton";
import {
  approveSignupAction,
  rejectSignupAction,
  approveClaimAction,
  rejectClaimAction,
} from "./actions";

export default async function AdminPage() {
  const [pendingSignups, pendingClaims] = await Promise.all([
    Promise.resolve(getPendingSignups()),
    Promise.resolve(getPendingClaims()),
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
                      <Row label="Website" value={s.website} link={s.website} />
                      <Row label="Google Business Profile" value={s.gmb_url} link={s.gmb_url} />
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
