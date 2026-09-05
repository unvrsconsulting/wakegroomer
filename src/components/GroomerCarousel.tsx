"use client";

import { useRef } from "react";
import GroomerCard from "./GroomerCard";
import { GroomerView } from "@/lib/listings";

export default function GroomerCarousel({ groomers }: { groomers: GroomerView[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  function scrollBy(direction: 1 | -1) {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * Math.min(el.clientWidth * 0.9, 600), behavior: "smooth" });
  }

  if (groomers.length === 0) return null;

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {groomers.map((g) => (
          <div key={g.id} className="w-[280px] shrink-0 snap-start sm:w-[320px]">
            <GroomerCard groomer={g} />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => scrollBy(-1)}
        aria-label="Scroll left"
        className="card-shadow absolute -left-4 top-1/2 hidden -translate-y-1/2 rounded-full bg-white p-2.5 text-foreground hover:text-brand sm:flex"
      >
        <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
          <path
            fillRule="evenodd"
            d="M12.79 5.23a.75.75 0 0 1 0 1.06L9.06 10l3.73 3.71a.75.75 0 1 1-1.06 1.06l-4.25-4.24a.75.75 0 0 1 0-1.06l4.25-4.24a.75.75 0 0 1 1.06 0Z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => scrollBy(1)}
        aria-label="Scroll right"
        className="card-shadow absolute -right-4 top-1/2 hidden -translate-y-1/2 rounded-full bg-white p-2.5 text-foreground hover:text-brand sm:flex"
      >
        <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
          <path
            fillRule="evenodd"
            d="M7.21 14.77a.75.75 0 0 1 0-1.06L10.94 10 7.21 6.29a.75.75 0 1 1 1.06-1.06l4.25 4.24a.75.75 0 0 1 0 1.06l-4.25 4.24a.75.75 0 0 1-1.06 0Z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
}
