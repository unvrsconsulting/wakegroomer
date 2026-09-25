import Link from "next/link";
import { SITE_NAME, SERVICE_AREA_CITIES } from "@/lib/constants";
import { citySlug, serviceSlug } from "@/lib/slugs";
import { getAllCities, getServiceCounts } from "@/lib/listings";

async function loadFooterLinks(): Promise<{ cities: string[]; services: string[] }> {
  try {
    const [cities, serviceCounts] = await Promise.all([getAllCities(), getServiceCounts()]);
    return { cities, services: serviceCounts.map((s) => s.service) };
  } catch {
    return { cities: SERVICE_AREA_CITIES.slice(0, 12), services: [] };
  }
}

export default async function Footer() {
  const { cities, services } = await loadFooterLinks();

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
              The free local directory for mobile dog groomers serving businesses across North
              Carolina, from the Triangle to the Triad.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Services</h3>
            <ul className="mt-3 space-y-2">
              {services.map((service) => (
                <li key={service}>
                  <Link
                    href={`/services/${serviceSlug(service)}`}
                    className="text-sm text-muted hover:text-brand"
                  >
                    {service}
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
                <Link href="/guides" className="text-sm text-muted hover:text-brand">
                  Mobile Grooming Guides
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="text-sm text-muted hover:text-brand">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-muted hover:text-brand">
                  Blog
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

        <div className="mt-10 border-t border-[var(--color-border)] pt-6">
          <h3 className="text-sm font-semibold text-foreground">Mobile Dog Groomers by City</h3>
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
            {cities.map((city) => (
              <li key={city}>
                <Link
                  href={`/groomers/${citySlug(city)}`}
                  className="text-sm text-muted hover:text-brand"
                >
                  {city}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-[var(--color-border)] pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE_NAME}. A local directory for businesses across
            North Carolina. Not affiliated with any city, county, or state government.
          </p>
          <div className="flex shrink-0 gap-4">
            <Link href="/privacy" className="hover:text-brand hover:underline">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-brand hover:underline">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>

        <div className="mt-3 text-[11px] text-muted/80">
          <Link href="/photo-credits" className="hover:text-brand hover:underline">
            photos
          </Link>
        </div>
      </div>
    </footer>
  );
}
