import Link from "next/link";
import type { GroomerAnalytics } from "@/lib/analytics";
import { toggleFeaturedAction, toggleClaimedAction } from "@/app/admin/actions";

export default function PublicAdminBar({
  groomerId,
  isFeatured,
  isClaimed,
  hasPendingClaim,
  analytics,
}: {
  groomerId: number;
  isFeatured: boolean;
  isClaimed: boolean;
  hasPendingClaim: boolean;
  analytics: GroomerAnalytics;
}) {
  return (
    <div className="w-full bg-neutral-900 text-white">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-2.5 text-sm sm:px-6 lg:px-8">
        <span className="flex items-center gap-1.5 font-semibold text-white/90">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Admin View
        </span>

        <span className="text-white/70">
          {analytics.views} views · {analytics.telClicks} calls
          <span className="text-white/40"> (30d)</span>
        </span>

        {hasPendingClaim && (
          <Link href="/admin" className="font-medium text-amber-300 hover:text-amber-200">
            Pending claim awaiting review →
          </Link>
        )}

        <div className="ml-auto flex flex-wrap items-center gap-2">
          <form action={toggleClaimedAction}>
            <input type="hidden" name="id" value={groomerId} />
            <button
              type="submit"
              className="rounded-full border border-white/20 px-3 py-1 text-xs font-semibold text-white/90 hover:bg-white/10"
            >
              {isClaimed ? "Unverify" : "Verify"}
            </button>
          </form>

          <form action={toggleFeaturedAction}>
            <input type="hidden" name="id" value={groomerId} />
            <button
              type="submit"
              className="rounded-full border border-white/20 px-3 py-1 text-xs font-semibold text-white/90 hover:bg-white/10"
            >
              {isFeatured ? "Unfeature" : "Feature"}
            </button>
          </form>

          <Link
            href={`/admin/groomer/${groomerId}/edit`}
            className="rounded-full bg-brand px-3 py-1 text-xs font-semibold text-white hover:bg-brand-dark"
          >
            Edit Listing
          </Link>

          <Link href="/admin" className="text-xs font-medium text-white/60 hover:text-white">
            ← Admin
          </Link>
        </div>
      </div>
    </div>
  );
}
