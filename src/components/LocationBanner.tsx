"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { nearestServiceAreaCity } from "@/lib/geo";

const DISMISSED_KEY = "wdg_location_banner_dismissed";
const MAX_RELEVANT_MILES = 60;

export default function LocationBanner() {
  const [city, setCity] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !("geolocation" in navigator)) return;
    if (sessionStorage.getItem(DISMISSED_KEY)) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const nearest = nearestServiceAreaCity(
          position.coords.latitude,
          position.coords.longitude
        );
        if (nearest && nearest.distanceMiles <= MAX_RELEVANT_MILES) {
          setCity(nearest.city);
        }
      },
      () => {
        // Permission denied, unavailable, or timed out — fail silently.
      },
      { timeout: 8000, maximumAge: 10 * 60 * 1000 }
    );
  }, []);

  function dismiss() {
    setCity(null);
    sessionStorage.setItem(DISMISSED_KEY, "1");
  }

  if (!city) return null;

  return (
    <div className="border-b border-[var(--color-border)] bg-brand-light">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-3 px-4 py-2.5 text-center sm:px-6 lg:px-8">
        <p className="text-sm text-brand-dark">
          📍 We found groomers near <strong>{city}, NC</strong>
        </p>
        <Link
          href={`/search?city=${encodeURIComponent(city)}`}
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
