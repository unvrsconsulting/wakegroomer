"use client";

import dynamic from "next/dynamic";
import type { CityCount } from "./CityHeatmapMap";

const CityHeatmapMap = dynamic(() => import("./CityHeatmapMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[300px] w-full items-center justify-center rounded-2xl bg-brand-light text-sm text-brand-dark sm:h-[420px]">
      Loading map…
    </div>
  ),
});

export default function CityHeatmap({ cityCounts }: { cityCounts: CityCount[] }) {
  return <CityHeatmapMap cityCounts={cityCounts} />;
}
