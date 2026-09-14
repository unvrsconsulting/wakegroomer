"use client";

import { useState } from "react";
import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-surface)]/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-2" onClick={() => setMenuOpen(false)}>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand text-lg">
            🐾
          </span>
          <span className="truncate text-lg font-bold tracking-tight text-foreground">
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
          <Link href="/blog" className="text-sm font-medium text-foreground/80 hover:text-brand">
            Blog
          </Link>
          <Link
            href="/list-your-business"
            className="rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white transition hover:bg-brand-dark"
          >
            List Your Business Free
          </Link>
        </nav>

        <div className="flex shrink-0 items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--color-border)] text-foreground"
          >
            {menuOpen ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="flex flex-col border-t border-[var(--color-border)] px-4 py-3 md:hidden">
          <Link
            href="/search"
            onClick={() => setMenuOpen(false)}
            className="py-2.5 text-sm font-medium text-foreground/80 hover:text-brand"
          >
            Find a Groomer
          </Link>
          <Link
            href="/#how-it-works"
            onClick={() => setMenuOpen(false)}
            className="py-2.5 text-sm font-medium text-foreground/80 hover:text-brand"
          >
            How It Works
          </Link>
          <Link
            href="/blog"
            onClick={() => setMenuOpen(false)}
            className="py-2.5 text-sm font-medium text-foreground/80 hover:text-brand"
          >
            Blog
          </Link>
          <Link
            href="/list-your-business"
            onClick={() => setMenuOpen(false)}
            className="mt-2 rounded-full bg-brand px-5 py-2.5 text-center text-sm font-semibold text-white"
          >
            List Your Business Free
          </Link>
        </nav>
      )}
    </header>
  );
}
