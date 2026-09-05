"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { SERVICE_AREA_CITIES } from "@/lib/constants";
import { PHOTOS } from "@/lib/photos";

const HERO_DOGS = [
  {
    photo: PHOTOS.heroDog,
    className: "-right-12 -top-12 hidden h-72 w-72 opacity-25 sm:block lg:h-96 lg:w-96",
  },
  {
    photo: PHOTOS.groomedPoodle,
    className: "-bottom-16 -left-16 hidden h-48 w-48 opacity-20 sm:block lg:h-64 lg:w-64",
  },
  {
    photo: PHOTOS.puppy,
    className: "-left-8 top-16 hidden h-28 w-28 opacity-15 lg:block",
  },
  {
    photo: PHOTOS.corgi,
    className: "-right-8 bottom-20 hidden h-36 w-36 opacity-20 lg:block",
  },
];

export default function Hero() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [city, setCity] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const usp = new URLSearchParams();
    if (q) usp.set("q", q);
    if (city) usp.set("city", city);
    router.push(usp.toString() ? `/search?${usp.toString()}` : "/search");
  }

  return (
    <section className="relative overflow-hidden border-b border-[var(--color-border)] bg-gradient-to-b from-brand-light to-[var(--background)]">
      {HERO_DOGS.map(({ photo, className }) => (
        <div
          key={photo.src}
          className={`pointer-events-none absolute overflow-hidden rounded-full ${className}`}
        >
          <Image src={photo.src} alt="" fill sizes="400px" className="object-cover" />
        </div>
      ))}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-brand-dark shadow-sm">
            🐾 The NC Piedmont&apos;s free mobile dog grooming directory
          </span>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Find a Mobile Dog Groomer
            <br className="hidden sm:block" /> Near You
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-foreground/70 sm:text-lg">
            Browse trusted, locally-owned mobile groomers from Raleigh to Greensboro — the
            Triangle, the Triad, and everywhere between — no shop drop-off required.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="card-shadow mx-auto mt-8 flex max-w-2xl flex-col gap-3 rounded-2xl border border-[var(--color-border)] bg-white p-3 sm:flex-row"
        >
          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by neighborhood, service, or business name"
            className="flex-1 rounded-xl border-0 px-4 py-3 text-sm outline-none placeholder:text-muted"
          />
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="rounded-xl border border-[var(--color-border)] px-4 py-3 text-sm outline-none sm:border-0 sm:bg-[var(--background)]"
          >
            <option value="">Any City</option>
            {SERVICE_AREA_CITIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-dark"
          >
            Search
          </button>
        </form>

        <div className="mx-auto mt-8 flex max-w-2xl flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-foreground/60">
          <span>✓ 100% free for pet owners</span>
          <span>✓ Verified local businesses</span>
          <span>✓ No shop visit needed</span>
        </div>
      </div>
    </section>
  );
}
