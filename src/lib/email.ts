const SUPPORT_EMAIL = "support@mobilepetgroomnc.com";

export async function sendNotificationEmail(subject: string, html: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn(`RESEND_API_KEY not set — skipped email notification: ${subject}`);
    return;
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "NC Mobile Pet Groomers <notifications@mobilepetgroomnc.com>",
        to: SUPPORT_EMAIL,
        subject,
        html,
      }),
    });

    if (!res.ok) {
      console.error(`Failed to send notification email (${res.status}): ${await res.text()}`);
    }
  } catch (err) {
    console.error("Failed to send notification email:", err);
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function renderNotificationHtml(title: string, fields: Record<string, string>): string {
  const rows = Object.entries(fields)
    .filter(([, value]) => value)
    .map(
      ([label, value]) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#666;white-space:nowrap;vertical-align:top;"><strong>${escapeHtml(
          label
        )}</strong></td><td style="padding:4px 0;">${escapeHtml(value)}</td></tr>`
    )
    .join("");

  return `<div style="font-family:sans-serif;font-size:14px;color:#111;">
    <h2 style="margin:0 0 12px;">${escapeHtml(title)}</h2>
    <table cellpadding="0" cellspacing="0">${rows}</table>
  </div>`;
}
