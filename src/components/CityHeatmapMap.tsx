"use client";

import { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, TileLayer, CircleMarker, Tooltip, useMap } from "react-leaflet";
import { useRouter } from "next/navigation";
import { CITY_COORDS } from "@/lib/constants";
import { citySlug } from "@/lib/slugs";

export type CityCount = { city: string; count: number };

// Centered to fit the full Triangle-to-Triad coverage area (Wake/Durham/Orange/
// Alamance/Guilford counties). FitBounds (below) refines this on mount.
const REGION_CENTER: [number, number] = [35.86, -79.1];

function FitBoundsToCities({ coords }: { coords: [number, number][] }) {
  const map = useMap();

  useEffect(() => {
    if (coords.length === 0) return;
    const bounds = L.latLngBounds(coords);
    map.fitBounds(bounds, { padding: [30, 30] });
  }, [map, coords]);

  return null;
}

function colorForIntensity(t: number): string {
  // t in [0,1] — light teal (low density) to deep orange (high density)
  const from = { r: 0xe6, g: 0xf2, b: 0xef }; // brand-light
  const to = { r: 0x9a, g: 0x34, b: 0x12 }; // accent-dark
  const r = Math.round(from.r + (to.r - from.r) * t);
  const g = Math.round(from.g + (to.g - from.g) * t);
  const b = Math.round(from.b + (to.b - from.b) * t);
  return `rgb(${r}, ${g}, ${b})`;
}

export default function CityHeatmapMap({ cityCounts }: { cityCounts: CityCount[] }) {
  const router = useRouter();
  const maxCount = Math.max(1, ...cityCounts.map((c) => c.count));
  const markerCoords = cityCounts
    .map((c) => CITY_COORDS[c.city])
    .filter((c): c is [number, number] => Boolean(c));

  return (
    <MapContainer
      center={REGION_CENTER}
      zoom={9}
      scrollWheelZoom={false}
      className="h-[300px] w-full rounded-2xl sm:h-[420px]"
    >
      <FitBoundsToCities coords={markerCoords} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {cityCounts.map(({ city, count }) => {
        const coords = CITY_COORDS[city];
        if (!coords) return null;
        const t = count / maxCount;
        const radius = 14 + t * 26;

        return (
          <CircleMarker
            key={city}
            center={coords}
            radius={radius}
            pathOptions={{
              color: "#0a4f44",
              weight: 1,
              fillColor: colorForIntensity(t),
              fillOpacity: 0.65,
              className: "cursor-pointer",
            }}
            eventHandlers={{
              click: () => router.push(`/groomers/${citySlug(city)}`),
            }}
          >
            <Tooltip direction="top" offset={[0, -radius]}>
              <strong>{city}</strong>: {count} groomer{count === 1 ? "" : "s"}
              <br />
              Click to view
            </Tooltip>
          </CircleMarker>
        );
      })}
    </MapContainer>
  );
}
