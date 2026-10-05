// Custom next/image loader. Serves Wikimedia Commons photos straight from
// Wikimedia's own thumbnail CDN instead of Vercel's image optimizer, which
// returns 402 (OPTIMIZED_IMAGE_REQUEST_PAYMENT_REQUIRED) for any new image size
// once the account's optimization quota is used up.
//
// Wikimedia only serves thumbnails at a fixed set of widths (other widths 400),
// so the requested width is snapped up to the nearest allowed step.
const THUMB_STEPS = [250, 330, 500, 960, 1280, 1920];

const COMMONS_FILE = /^https:\/\/upload\.wikimedia\.org\/wikipedia\/commons\/([0-9a-f])\/([0-9a-f]{2})\/([^/?#]+)/;

export default function wikimediaLoader({ src, width }: { src: string; width: number; quality?: number }): string {
  const match = COMMONS_FILE.exec(src);
  if (!match) return src;

  const [, a, ab, file] = match;
  const step = THUMB_STEPS.find((s) => s >= width) ?? THUMB_STEPS[THUMB_STEPS.length - 1];
  return `https://upload.wikimedia.org/wikipedia/commons/thumb/${a}/${ab}/${file}/${step}px-${file}`;
}
