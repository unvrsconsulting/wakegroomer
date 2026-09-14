// Lightweight, dependency-free spam heuristics for public forms (signup,
// claim). Two signals, both easy for a human to pass and hard for a
// fill-and-submit bot to avoid: an invisible honeypot field bots tend to
// fill in, and a minimum time-on-page before a submission is plausible.
const MIN_SUBMIT_MS = 1200;

export function isSpamSubmission(body: Record<string, unknown>): boolean {
  const honeypot = String(body.company_website ?? "").trim();
  if (honeypot.length > 0) return true;

  const renderedAt = Number(body.form_rendered_at);
  if (Number.isFinite(renderedAt)) {
    const elapsed = Date.now() - renderedAt;
    if (elapsed < MIN_SUBMIT_MS) return true;
  }

  return false;
}
