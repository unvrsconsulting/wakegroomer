"use client";

import Link from "next/link";
import { citySlug } from "@/lib/slugs";
import { useDetectedLocation } from "./LocationProvider";

export default function LocationBanner() {
  const { city, dismissed, dismiss } = useDetectedLocation();

  if (!city || dismissed) return null;

  return (
    <div className="border-b border-[var(--color-border)] bg-brand-light">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-3 px-4 py-2.5 text-center sm:px-6 lg:px-8">
        <p className="text-sm text-brand-dark">
          📍 We found groomers near <strong>{city}, NC</strong>
        </p>
        <Link
          href={`/groomers/${citySlug(city)}`}
          className="text-sm font-semibold text-brand-dark underline hover:no-underline"
        >
          View groomers near you →
        </Link>
        <button
          onClick={dismiss}
          aria-label="Dismiss"
          className="ml-1 text-brand-dark/60 hover:text-brand-dark"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
