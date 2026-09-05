import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";

export default function NavBar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-surface)]/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-lg">
            🐾
          </span>
          <span className="text-lg font-bold tracking-tight text-foreground">
            {SITE_NAME}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/search" className="text-sm font-medium text-foreground/80 hover:text-brand">
            Find a Groomer
          </Link>
          <Link href="/#how-it-works" className="text-sm font-medium text-foreground/80 hover:text-brand">
            How It Works
          </Link>
          <Link
            href="/list-your-business"
            className="rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white transition hover:bg-brand-dark"
          >
            List Your Business Free
          </Link>
        </nav>

        <Link
          href="/list-your-business"
          className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white md:hidden"
        >
          List Free
        </Link>
      </div>
    </header>
  );
}
