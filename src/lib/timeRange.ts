export const TIME_RANGE_OPTIONS = [
  { value: "7", label: "7 days", days: 7 },
  { value: "30", label: "30 days", days: 30 },
  { value: "90", label: "90 days", days: 90 },
  { value: "all", label: "All time", days: null },
] as const;

export type TimeRangeValue = (typeof TIME_RANGE_OPTIONS)[number]["value"];

export function parseTimeRange(value: string | undefined): { value: TimeRangeValue; days: number | null; label: string } {
  const match = TIME_RANGE_OPTIONS.find((o) => o.value === value) ?? TIME_RANGE_OPTIONS[1];
  return match;
}
