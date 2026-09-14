export function citySlug(city: string): string {
  return `${city.toLowerCase().replace(/\s+/g, "-")}-nc`;
}

export function cityFromSlug(slug: string, cities: string[]): string | null {
  return cities.find((c) => citySlug(c) === slug) ?? null;
}

export function serviceSlug(service: string): string {
  return service
    .toLowerCase()
    .replace(/&/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function serviceFromSlug(slug: string, services: string[]): string | null {
  return services.find((s) => serviceSlug(s) === slug) ?? null;
}
