"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { nearestServiceAreaCity } from "@/lib/geo";

const DISMISSED_KEY = "wdg_location_banner_dismissed";
const MAX_RELEVANT_MILES = 60;

type LocationContextValue = {
  city: string | null;
  dismissed: boolean;
  dismiss: () => void;
};

const LocationContext = createContext<LocationContextValue>({
  city: null,
  dismissed: false,
  dismiss: () => {},
});

export function useDetectedLocation() {
  return useContext(LocationContext);
}

export default function LocationProvider({
  cities,
  children,
}: {
  cities: string[];
  children: ReactNode;
}) {
  const [city, setCity] = useState<string | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !("geolocation" in navigator)) return;
    if (sessionStorage.getItem(DISMISSED_KEY)) {
      setDismissed(true);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const nearest = nearestServiceAreaCity(
          position.coords.latitude,
          position.coords.longitude,
          cities
        );
        if (nearest && nearest.distanceMiles <= MAX_RELEVANT_MILES) {
          setCity(nearest.city);
        }
      },
      () => {
        // Permission denied, unavailable, or timed out: fail silently.
      },
      { timeout: 8000, maximumAge: 10 * 60 * 1000 }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function dismiss() {
    setDismissed(true);
    sessionStorage.setItem(DISMISSED_KEY, "1");
  }

  return (
    <LocationContext.Provider value={{ city, dismissed, dismiss }}>
      {children}
    </LocationContext.Provider>
  );
}
