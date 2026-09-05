import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";
import { PHOTOS } from "@/lib/photos";

const FOOTER_CITIES = ["Raleigh", "Durham", "Chapel Hill", "Cary", "Greensboro", "Apex"];

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-base">
                🐾
              </span>
              <span className="font-bold text-foreground">{SITE_NAME}</span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-muted">
              The free local directory for mobile dog groomers serving North Carolina&apos;s
              Piedmont — from the Triangle to the Triad.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Cities</h3>
            <ul className="mt-3 space-y-2">
              {FOOTER_CITIES.map((city) => (
                <li key={city}>
                  <Link
                    href={`/search?city=${encodeURIComponent(city)}`}
                    className="text-sm text-muted hover:text-brand"
                  >
                    {city}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">For Pet Owners</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/search" className="text-sm text-muted hover:text-brand">
                  Search Groomers
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="text-sm text-muted hover:text-brand">
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">For Businesses</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/list-your-business" className="text-sm text-muted hover:text-brand">
                  List Your Business Free
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-[var(--color-border)] pt-6 text-xs text-muted">
          © {new Date().getFullYear()} {SITE_NAME}. A local directory for the North Carolina
          Piedmont. Not affiliated with any city, county, or state government.
        </div>

        <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-muted/80">
          <span>Photos:</span>
          {Object.values(PHOTOS).map((p) => (
            <a
              key={p.sourceUrl}
              href={p.sourceUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="hover:text-brand hover:underline"
            >
              {p.author} ({p.license})
            </a>
          ))}
          <span>via Wikimedia Commons</span>
        </div>
      </div>
    </footer>
  );
}
