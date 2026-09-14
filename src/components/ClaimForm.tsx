"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { EMAIL_RE, PHONE_RE, URL_RE, isLikelyGmbUrl } from "@/lib/validation";
import Honeypot from "./Honeypot";

type FormState = {
  claimant_name: string;
  claimant_email: string;
  claimant_phone: string;
  website: string;
  gmb_url: string;
  message: string;
  wants_verified_badge: boolean;
  wants_featured: boolean;
};

export default function ClaimForm({
  slug,
  businessName,
  suggestedWebsite,
  suggestedGmbUrl,
}: {
  slug: string;
  businessName: string;
  suggestedWebsite: string;
  suggestedGmbUrl: string;
}) {
  const [form, setForm] = useState<FormState>({
    claimant_name: "",
    claimant_email: "",
    claimant_phone: "",
    website: suggestedWebsite,
    gmb_url: suggestedGmbUrl,
    message: "",
    wants_verified_badge: true,
    wants_featured: true,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const renderedAt = useRef(Date.now());

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function validate(): boolean {
    const e: Record<string, string> = {};
    if (!form.claimant_name.trim()) e.claimant_name = "Your name is required.";
    if (!EMAIL_RE.test(form.claimant_email)) e.claimant_email = "Enter a valid email.";
    if (!PHONE_RE.test(form.claimant_phone)) e.claimant_phone = "Enter a valid phone number.";
    if (form.website && !URL_RE.test(form.website)) {
      e.website = "Enter a valid website URL, e.g. https://yourbusiness.com.";
    }
    if (!isLikelyGmbUrl(form.gmb_url)) {
      e.gmb_url =
        "Enter your Google Business Profile share link (from Google Maps, click Share on your listing).";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setSubmitError(null);

    try {
      const company_website = new FormData(e.currentTarget as HTMLFormElement).get("company_website");
      const res = await fetch("/api/claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug,
          ...form,
          company_website,
          form_rendered_at: renderedAt.current,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        if (data.errors) {
          setErrors(data.errors);
          setSubmitError("Please fix the highlighted fields.");
        } else {
          setSubmitError(data.error ?? "Something went wrong. Please try again.");
        }
        return;
      }

      setSuccess(true);
    } catch {
      setSubmitError("Something went wrong. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="card-shadow rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 text-center">
        <div className="text-5xl">✅</div>
        <h2 className="mt-4 text-2xl font-bold text-foreground">Claim submitted</h2>
        <p className="mt-2 text-foreground/70">
          We&apos;re reviewing your claim for <strong>{businessName}</strong>. Once approved,
          you&apos;ll get a verified badge and priority placement in search. This usually takes
          1-2 business days.
        </p>
        <p className="mt-4 rounded-xl border border-[var(--color-border)] bg-brand-light/30 p-4 text-sm text-foreground/70">
          Once you&apos;re verified, consider linking to your listing from your own website or
          social profiles — it helps pet owners find you and gives your listing a boost in search.
        </p>
        <Link
          href={`/groomer/${slug}`}
          className="mt-6 inline-block rounded-full bg-brand px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-dark"
        >
          Back to Listing
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="card-shadow rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-8"
    >
      <Honeypot />
      <p className="text-sm text-muted">
        Claiming lets you keep this listing&apos;s contact info accurate, adds a verified badge,
        and moves it higher in search results.
      </p>

      <div className="mt-6 space-y-5">
        <Field label="Your Name" error={errors.claimant_name}>
          <input
            className={inputClass(errors.claimant_name)}
            value={form.claimant_name}
            onChange={(e) => update("claimant_name", e.target.value)}
            placeholder="e.g. Jenna Cole"
          />
        </Field>

        <Field label="Email" error={errors.claimant_email}>
          <input
            type="email"
            className={inputClass(errors.claimant_email)}
            value={form.claimant_email}
            onChange={(e) => update("claimant_email", e.target.value)}
            placeholder="you@yourbusiness.com"
          />
        </Field>

        <Field label="Phone" error={errors.claimant_phone}>
          <input
            type="tel"
            className={inputClass(errors.claimant_phone)}
            value={form.claimant_phone}
            onChange={(e) => update("claimant_phone", e.target.value)}
            placeholder="(919) 555-0123"
          />
        </Field>

        <Field label="Business Website" error={errors.website} hint="Optional, but recommended.">
          <input
            className={inputClass(errors.website)}
            value={form.website}
            onChange={(e) => update("website", e.target.value)}
            placeholder="https://yourbusiness.com"
          />
        </Field>

        <Field
          label="Google Business Profile Link"
          error={errors.gmb_url}
          hint="We use this to verify you own this business. Open Google Maps, search your business, tap Share, and copy the link."
        >
          <input
            className={inputClass(errors.gmb_url)}
            value={form.gmb_url}
            onChange={(e) => update("gmb_url", e.target.value)}
            placeholder="https://g.page/yourbusiness"
          />
        </Field>

        <Field label="Anything else we should know?" hint="Optional.">
          <textarea
            className={inputClass()}
            rows={3}
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            placeholder="e.g. corrections to make once approved"
          />
        </Field>

        <div className="space-y-3 rounded-xl border border-[var(--color-border)] bg-brand-light/30 p-4">
          <p className="text-sm font-semibold text-foreground">Enhance your listing (optional)</p>
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              className="mt-1"
              checked={form.wants_verified_badge}
              onChange={(e) => update("wants_verified_badge", e.target.checked)}
            />
            <span className="text-sm text-foreground/80">
              <strong>Add a Verified badge</strong> — shows pet owners we&apos;ve confirmed you own
              this business.
            </span>
          </label>
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              className="mt-1"
              checked={form.wants_featured}
              onChange={(e) => update("wants_featured", e.target.checked)}
            />
            <span className="text-sm text-foreground/80">
              <strong>Request Featured placement</strong> — ask to be highlighted higher in search
              results and on the homepage.
            </span>
          </label>
          <p className="text-xs text-muted">
            Both are optional — uncheck either if you&apos;d rather skip it.
          </p>
        </div>

        {submitError && (
          <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">{submitError}</p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-accent-dark disabled:opacity-60"
        >
          {submitting ? "Submitting…" : "Submit Claim"}
        </button>
      </div>
    </form>
  );
}

function inputClass(error?: string) {
  return `w-full rounded-lg border bg-white px-3 py-2.5 text-sm outline-none focus:border-brand ${
    error ? "border-red-400" : "border-[var(--color-border)]"
  }`;
}

function Field({
  label,
  error,
  hint,
  children,
}: {
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-semibold text-foreground">{label}</label>
      {children}
      {hint && !error && <p className="mt-1 text-xs text-muted">{hint}</p>}
      {error && <p className="mt-1 text-xs font-medium text-red-600">{error}</p>}
    </div>
  );
}
