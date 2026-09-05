import Link from "next/link";
import { GroomerView } from "@/lib/listings";
import VerifiedBadge from "./VerifiedBadge";

function initials(name: string): string {
  return name
    .split(" ")
    .filter((w) => /^[A-Za-z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export default function GroomerCard({ groomer }: { groomer: GroomerView }) {
  return (
    <Link
      href={`/groomer/${groomer.slug}`}
      className="card-shadow card-shadow-hover group flex flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] transition"
    >
      <div className="relative flex h-36 items-center justify-center bg-gradient-to-br from-brand-light to-white">
        <span className="text-4xl font-bold text-brand/30">{initials(groomer.business_name)}</span>
        {groomer.featured === 1 && (
          <span className="absolute left-3 top-3 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white">
            Featured
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-bold text-foreground group-hover:text-brand">
            {groomer.business_name}
          </h3>
          {groomer.is_claimed === 1 && <VerifiedBadge className="shrink-0" />}
        </div>

        <div className="mt-1 flex items-center gap-1 text-sm text-muted">
          <span className="text-accent">★</span>
          <span className="font-semibold text-foreground">{groomer.rating.toFixed(1)}</span>
          <span>({groomer.review_count} reviews)</span>
        </div>

        <div className="mt-2 text-sm text-muted">
          📍 {groomer.city}, NC · {groomer.zip}
        </div>

        <p className="mt-3 line-clamp-2 text-sm text-foreground/70">{groomer.description}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {groomer.services.slice(0, 3).map((s) => (
            <span
              key={s}
              className="rounded-full bg-brand-light px-2.5 py-1 text-xs font-medium text-brand-dark"
            >
              {s}
            </span>
          ))}
          {groomer.services.length > 3 && (
            <span className="rounded-full bg-[var(--color-border)]/60 px-2.5 py-1 text-xs font-medium text-muted">
              +{groomer.services.length - 3} more
            </span>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-[var(--color-border)] pt-3 text-sm">
          <span className="font-semibold text-brand">View Profile →</span>
          <span className="text-muted">{groomer.years_experience ?? 0}+ yrs experience</span>
        </div>
      </div>
    </Link>
  );
}
