import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getApprovedGroomerBySlug, getPendingClaimForGroomer } from "@/lib/claims";
import ClaimForm from "@/components/ClaimForm";

export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ClaimPage({ params }: PageProps) {
  const { slug } = await params;
  const groomer = await getApprovedGroomerBySlug(slug);

  if (!groomer) notFound();

  const pendingClaim = await getPendingClaimForGroomer(groomer.id);

  return (
    <div className="mx-auto max-w-xl px-4 py-10 sm:px-6 lg:px-8">
      <Link href={`/groomer/${slug}`} className="text-sm font-medium text-brand hover:underline">
        ← Back to {groomer.business_name}
      </Link>

      <h1 className="mt-4 text-2xl font-extrabold text-foreground sm:text-3xl">
        Claim {groomer.business_name}
      </h1>

      {groomer.is_claimed === 1 ? (
        <div className="card-shadow mt-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 text-center">
          <div className="text-4xl">✔️</div>
          <p className="mt-3 text-foreground/80">
            This listing has already been claimed and verified. If you believe this is a mistake,
            contact us at{" "}
            <a href="mailto:support@mobilepetgroomnc.com" className="text-brand hover:underline">
              support@mobilepetgroomnc.com
            </a>
            .
          </p>
        </div>
      ) : pendingClaim ? (
        <div className="card-shadow mt-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 text-center">
          <div className="text-4xl">⏳</div>
          <p className="mt-3 text-foreground/80">
            A claim for this listing was submitted on{" "}
            {new Date(pendingClaim.created_at).toLocaleDateString()} and is currently under
            review. We&apos;ll be in touch soon.
          </p>
        </div>
      ) : (
        <div className="mt-6">
          <ClaimForm
            slug={slug}
            businessName={groomer.business_name}
            suggestedWebsite={groomer.website ?? ""}
            suggestedGmbUrl={groomer.gmb_url ?? ""}
          />
        </div>
      )}
    </div>
  );
}
