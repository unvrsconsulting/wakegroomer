import Link from "next/link";
import type { Metadata } from "next";
import { getGroomerByEditToken, getPendingEditForGroomer } from "@/lib/groomerEdits";
import GroomerEditForm from "@/components/GroomerEditForm";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ token?: string }>;
};

export default async function GroomerEditPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { token = "" } = await searchParams;

  const groomer = await getGroomerByEditToken(slug, token);

  if (!groomer) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <div className="text-4xl">🔒</div>
        <h1 className="mt-4 text-2xl font-extrabold text-foreground">Invalid or expired link</h1>
        <p className="mt-3 text-foreground/70">
          This edit link isn&apos;t valid. Links are single-use and tied to a specific business.
          Contact us at{" "}
          <a href="mailto:support@mobilepetgroomnc.com" className="text-brand hover:underline">
            support@mobilepetgroomnc.com
          </a>{" "}
          for a new one.
        </p>
      </div>
    );
  }

  const pendingEdit = await getPendingEditForGroomer(groomer.id);

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
      <Link href={`/groomer/${slug}`} className="text-sm font-medium text-brand hover:underline">
        ← Back to {groomer.business_name}
      </Link>

      <h1 className="mt-4 text-2xl font-extrabold text-foreground sm:text-3xl">
        Edit {groomer.business_name}
      </h1>
      <p className="mt-2 text-sm text-foreground/70">
        Update your public listing below. Changes are reviewed before going live.
      </p>

      {pendingEdit ? (
        <div className="card-shadow mt-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 text-center">
          <div className="text-4xl">⏳</div>
          <p className="mt-3 text-foreground/80">
            An edit submitted on {new Date(pendingEdit.created_at).toLocaleDateString()} is
            currently under review. We&apos;ll be in touch once it&apos;s approved.
          </p>
        </div>
      ) : (
        <div className="mt-6">
          <GroomerEditForm groomer={groomer} token={token} />
        </div>
      )}
    </div>
  );
}
