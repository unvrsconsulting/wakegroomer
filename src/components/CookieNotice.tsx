"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const DISMISSED_KEY = "wdg_cookie_notice_dismissed";

export default function CookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(DISMISSED_KEY)) setVisible(true);
    } catch {
      // Storage unavailable (private browsing, blocked) — skip the banner.
    }
  }, []);

  function dismiss() {
    setVisible(false);
    try {
      localStorage.setItem(DISMISSED_KEY, "1");
    } catch {
      // Ignore — the banner will just reappear next visit, which is fine.
    }
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 py-4 text-center sm:flex-row sm:justify-between sm:text-left sm:px-6 lg:px-8">
        <p className="text-sm text-foreground/80">
          We use cookies for functionality and analytics.{" "}
          <Link href="/privacy" className="text-brand hover:underline">
            Privacy Policy
          </Link>
        </p>
        <button
          onClick={dismiss}
          className="shrink-0 rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
        >
          Got it
        </button>
      </div>
    </div>
  );
}
