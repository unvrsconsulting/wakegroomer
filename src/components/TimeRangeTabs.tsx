import Link from "next/link";
import { TIME_RANGE_OPTIONS, type TimeRangeValue } from "@/lib/timeRange";

export default function TimeRangeTabs({ basePath, current }: { basePath: string; current: TimeRangeValue }) {
  return (
    <div className="inline-flex rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] p-1">
      {TIME_RANGE_OPTIONS.map((opt) => (
        <Link
          key={opt.value}
          href={opt.value === "30" ? basePath : `${basePath}?range=${opt.value}`}
          className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
            current === opt.value ? "bg-brand text-white" : "text-foreground/70 hover:text-foreground"
          }`}
        >
          {opt.label}
        </Link>
      ))}
    </div>
  );
}
