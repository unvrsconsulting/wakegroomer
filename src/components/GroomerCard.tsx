import Image from "next/image";
import Link from "next/link";
import { GroomerView } from "@/lib/listings";
import { GROOMER_PHOTOS } from "@/lib/groomerPhotos.generated";
import VerifiedBadge from "./VerifiedBadge";

export default function GroomerCard({ groomer }: { groomer: GroomerView }) {
  const photo = GROOMER_PHOTOS[groomer.slug];
  const isCatGroomer = groomer.services.includes("Cat Grooming");

  return (
    <Link
      href={`/groomer/${groomer.slug}`}
      className="card-shadow card-shadow-hover group flex flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] transition"
    >
      <div className="relative h-36 w-full bg-brand-light">
        {photo && (
          <Image
            src={photo.src}
            alt={`Happy ${isCatGroomer ? "cat" : "dog"}`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        )}
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
          {groomer.review_count > 0 ? (
            <>
              <span className="text-accent">★</span>
              <span className="font-semibold text-foreground">{groomer.rating.toFixed(1)}</span>
              <span>({groomer.review_count} reviews)</span>
            </>
          ) : (
            <span className="text-xs font-medium uppercase tracking-wide text-muted">New listing</span>
          )}
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
          {groomer.years_experience != null && (
            <span className="text-muted">{groomer.years_experience}+ yrs experience</span>
          )}
        </div>
      </div>
    </Link>
  );
}
