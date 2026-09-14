import Link from "next/link";
import { notFound } from "next/navigation";
import { getGroomerById } from "@/lib/groomerEdits";
import { getGroomerAnalytics } from "@/lib/analytics";
import AdminGroomerEditForm from "@/components/AdminGroomerEditForm";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminGroomerEditPage({ params }: PageProps) {
  const { id } = await params;
  const groomerId = Number(id);
  if (!Number.isFinite(groomerId)) notFound();

  const [groomer, analytics] = await Promise.all([
    getGroomerById(groomerId),
    getGroomerAnalytics(groomerId),
  ]);
  if (!groomer) notFound();

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <Link href="/admin" className="text-sm font-medium text-brand hover:underline">
          ← Back to Admin
        </Link>
        <a
          href={`/groomer/${groomer.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-brand hover:underline"
        >
          View public profile ↗
        </a>
      </div>

      <h1 className="mt-4 text-2xl font-extrabold text-foreground sm:text-3xl">
        {groomer.business_name}
      </h1>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Views (30d)" value={analytics.last30.views} />
        <StatCard label="Calls (30d)" value={analytics.last30.telClicks} />
        <StatCard label="Views (all time)" value={analytics.allTime.views} />
        <StatCard label="Calls (all time)" value={analytics.allTime.telClicks} />
      </div>

      {analytics.dailyLast30.length > 0 && (
        <div className="mt-6">
          <h2 className="text-sm font-bold uppercase tracking-wide text-foreground">
            Daily Activity (last 30 days)
          </h2>
          <div className="mt-3 max-h-48 overflow-y-auto overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--color-border)] text-xs font-semibold uppercase text-muted">
                  <th className="py-2 pr-4">Date</th>
                  <th className="py-2 pr-4">Views</th>
                  <th className="py-2">Calls</th>
                </tr>
              </thead>
              <tbody>
                {analytics.dailyLast30.map((d) => (
                  <tr key={d.date} className="border-b border-[var(--color-border)] last:border-0">
                    <td className="py-2 pr-4 text-foreground">{d.date}</td>
                    <td className="py-2 pr-4 text-foreground">{d.views}</td>
                    <td className="py-2 text-foreground">{d.telClicks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <h2 className="mt-10 text-lg font-bold text-foreground">Business Profile</h2>
      <p className="mt-1 text-sm text-foreground/70">
        Changes here save immediately to the live listing — no approval step.
      </p>

      <div className="mt-6">
        <AdminGroomerEditForm groomer={groomer} />
      </div>
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
