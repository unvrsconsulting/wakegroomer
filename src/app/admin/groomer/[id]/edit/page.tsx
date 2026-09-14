import Link from "next/link";
import { notFound } from "next/navigation";
import { getGroomerById } from "@/lib/groomerEdits";
import AdminGroomerEditForm from "@/components/AdminGroomerEditForm";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminGroomerEditPage({ params }: PageProps) {
  const { id } = await params;
  const groomerId = Number(id);
  if (!Number.isFinite(groomerId)) notFound();

  const groomer = await getGroomerById(groomerId);
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
        Edit {groomer.business_name}
      </h1>
      <p className="mt-2 text-sm text-foreground/70">
        Changes here save immediately to the live listing — no approval step.
      </p>

      <div className="mt-6">
        <AdminGroomerEditForm groomer={groomer} />
      </div>
    </div>
  );
}
