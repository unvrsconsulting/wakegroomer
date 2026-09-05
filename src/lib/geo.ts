import { CITY_COORDS } from "./constants";

function haversineMiles(a: [number, number], b: [number, number]): number {
  const R = 3958.8; // miles
  const [lat1, lon1] = a;
  const [lat2, lon2] = b;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
}

export function nearestServiceAreaCity(
  lat: number,
  lng: number
): { city: string; distanceMiles: number } | null {
  let closest: { city: string; distanceMiles: number } | null = null;

  for (const [city, coords] of Object.entries(CITY_COORDS)) {
    const distanceMiles = haversineMiles([lat, lng], coords);
    if (!closest || distanceMiles < closest.distanceMiles) {
      closest = { city, distanceMiles };
    }
  }

  return closest;
}
