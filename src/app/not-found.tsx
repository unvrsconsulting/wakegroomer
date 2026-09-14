import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center sm:px-6 lg:px-8">
      <span className="text-6xl">🐾</span>
      <h1 className="mt-6 text-3xl font-extrabold text-foreground sm:text-4xl">
        This page wandered off
      </h1>
      <p className="mt-3 text-foreground/70">
        We couldn&apos;t find the page you&apos;re looking for. It may have moved, or the link
        might be outdated.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-dark"
        >
          Back to Home
        </Link>
        <Link
          href="/search"
          className="rounded-full border border-[var(--color-border)] px-6 py-3 text-sm font-semibold text-foreground hover:border-brand hover:text-brand"
        >
          Find a Groomer
        </Link>
      </div>
    </div>
  );
}
