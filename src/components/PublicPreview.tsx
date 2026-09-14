"use client";

import { useState } from "react";

export default function PublicPreview({ slug }: { slug: string }) {
  const [open, setOpen] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  return (
    <div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="rounded-full border border-[var(--color-border)] px-4 py-2 text-sm font-semibold text-foreground hover:border-brand hover:text-brand"
        >
          {open ? "Hide Public Preview" : "Show Public Preview"}
        </button>
        {open && (
          <button
            type="button"
            onClick={() => setReloadKey((k) => k + 1)}
            className="rounded-full border border-[var(--color-border)] px-4 py-2 text-sm font-semibold text-foreground hover:border-brand hover:text-brand"
          >
            Refresh
          </button>
        )}
      </div>

      {open && (
        <div className="mt-4 overflow-hidden rounded-2xl border border-[var(--color-border)]">
          <div className="border-b border-[var(--color-border)] bg-[var(--background)] px-4 py-2 text-xs text-muted">
            Live preview of /groomer/{slug} exactly as pet owners see it.
          </div>
          <iframe
            key={reloadKey}
            src={`/groomer/${slug}`}
            title="Public listing preview"
            className="h-[800px] w-full bg-white"
          />
        </div>
      )}
    </div>
  );
}
