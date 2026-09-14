"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ALL_SERVICES, SERVICE_AREA_CITIES } from "@/lib/constants";
import Honeypot from "./Honeypot";

type FormState = {
  business_name: string;
  owner_name: string;
  email: string;
  phone: string;
  website: string;
  gmb_url: string;
  description: string;
  city: string;
  zip: string;
  neighborhoods: string;
  services: string[];
  service_radius_miles: string;
  years_experience: string;
  wants_verified_badge: boolean;
  wants_featured: boolean;
};

const initialState: FormState = {
  business_name: "",
  owner_name: "",
  email: "",
  phone: "",
  website: "",
  gmb_url: "",
  description: "",
  city: "",
  zip: "",
  neighborhoods: "",
  services: [],
  service_radius_miles: "15",
  years_experience: "",
  wants_verified_badge: true,
  wants_featured: true,
};

const STEPS = ["Business Info", "Online Presence", "Service Details", "Review & Submit"];

export default function SignupForm() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{ slug: string } | null>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const renderedAt = useRef(Date.now());

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function toggleService(service: string) {
    setForm((f) => ({
      ...f,
      services: f.services.includes(service)
        ? f.services.filter((s) => s !== service)
        : [...f.services, service],
    }));
  }

  function validateStep(current: number): boolean {
    const e: Record<string, string> = {};

    if (current === 0) {
      if (!form.business_name.trim()) e.business_name = "Business name is required.";
      if (!form.owner_name.trim()) e.owner_name = "Contact name is required.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email.";
      if (!/^[\d\s()+.-]{7,20}$/.test(form.phone)) e.phone = "Enter a valid phone number.";
    }

    if (current === 1) {
      if (!/^https?:\/\/[^\s]+\.[^\s]+$/i.test(form.website)) {
        e.website = "Enter a valid website URL, e.g. https://yourbusiness.com.";
      }
      const gmbLower = form.gmb_url.toLowerCase();
      const looksValid =
        /^https?:\/\/[^\s]+\.[^\s]+$/i.test(form.gmb_url) &&
        ["google.com/maps", "g.page", "business.google.com", "goo.gl/maps", "maps.app.goo.gl"].some((h) =>
          gmbLower.includes(h)
        );
      if (!looksValid) {
        e.gmb_url =
          "Enter your Google Business Profile share link (from Google Maps, click Share on your listing).";
      }
    }

    if (current === 2) {
      if (!form.city) e.city = "Select a city.";
      if (!/^\d{5}$/.test(form.zip)) e.zip = "Enter a valid 5-digit zip code.";
      if (!form.neighborhoods.trim()) e.neighborhoods = "List at least one neighborhood or area you serve.";
      if (form.services.length === 0) e.services = "Select at least one service.";
      const radius = Number(form.service_radius_miles);
      if (!Number.isFinite(radius) || radius <= 0 || radius > 100) {
        e.service_radius_miles = "Enter a radius between 1 and 100 miles.";
      }
      const years = Number(form.years_experience);
      if (!Number.isFinite(years) || years < 0 || years > 75) {
        e.years_experience = "Enter a valid number of years.";
      }
      if (!form.description.trim() || form.description.trim().length < 20) {
        e.description = "Description should be at least 20 characters.";
      }
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function next() {
    if (validateStep(step)) setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }

  function back() {
    setStep((s) => Math.max(s - 1, 0));
  }

  async function handleSubmit() {
    if (!validateStep(0) || !validateStep(1) || !validateStep(2)) {
      setStep(0);
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          neighborhoods: form.neighborhoods
            .split(",")
            .map((n) => n.trim())
            .filter(Boolean),
          service_radius_miles: Number(form.service_radius_miles),
          years_experience: Number(form.years_experience),
          company_website: honeypotRef.current?.value ?? "",
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

      setSuccess({ slug: data.slug });
    } catch {
      setSubmitError("Something went wrong. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="card-shadow mx-auto max-w-xl rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 text-center">
        <div className="text-5xl">🎉</div>
        <h2 className="mt-4 text-2xl font-bold text-foreground">You&apos;re all set!</h2>
        <p className="mt-2 text-foreground/70">
          Thanks for listing <strong>{form.business_name}</strong>. Our team reviews every new
          listing to confirm the Google Business Profile link before it goes live. This usually
          takes 1-2 business days.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-full bg-brand px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-dark"
        >
          Back to Directory
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <Honeypot ref={honeypotRef} />
      {/* Stepper */}
      <div className="mb-8 flex items-center justify-between">
        {STEPS.map((label, i) => (
          <div key={label} className="flex flex-1 items-center">
            <div className="flex flex-col items-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                  i <= step ? "bg-brand text-white" : "bg-[var(--color-border)] text-muted"
                }`}
              >
                {i + 1}
              </div>
              <span className={`mt-1.5 hidden text-center text-xs sm:block ${i <= step ? "text-foreground font-medium" : "text-muted"}`}>
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`mx-2 h-0.5 flex-1 ${i < step ? "bg-brand" : "bg-[var(--color-border)]"}`} />
            )}
          </div>
        ))}
      </div>

      <div className="card-shadow rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-8">
        {step === 0 && (
          <div className="space-y-5">
            <h2 className="text-xl font-bold text-foreground">Tell us about your business</h2>

            <Field label="Business Name" error={errors.business_name}>
              <input
                className={inputClass(errors.business_name)}
                value={form.business_name}
                onChange={(e) => update("business_name", e.target.value)}
                placeholder="e.g. Raleigh Paws on Wheels"
              />
            </Field>

            <Field label="Owner / Contact Name" error={errors.owner_name}>
              <input
                className={inputClass(errors.owner_name)}
                value={form.owner_name}
                onChange={(e) => update("owner_name", e.target.value)}
                placeholder="e.g. Jenna Cole"
              />
            </Field>

            <Field label="Email" error={errors.email}>
              <input
                type="email"
                className={inputClass(errors.email)}
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="you@yourbusiness.com"
              />
            </Field>

            <Field label="Phone" error={errors.phone}>
              <input
                type="tel"
                className={inputClass(errors.phone)}
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                placeholder="(919) 555-0123"
              />
            </Field>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-5">
            <h2 className="text-xl font-bold text-foreground">Connect your online presence</h2>
            <p className="text-sm text-muted">
              Every free listing requires a link to your business website and your Google Business
              Profile. This helps pet owners verify you&apos;re a real, established business.
            </p>

            <Field label="Business Website" error={errors.website}>
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
              hint="Open Google Maps, search your business, tap Share, and copy the link. It usually looks like g.page/... or maps.app.goo.gl/..."
            >
              <input
                className={inputClass(errors.gmb_url)}
                value={form.gmb_url}
                onChange={(e) => update("gmb_url", e.target.value)}
                placeholder="https://g.page/yourbusiness"
              />
            </Field>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <h2 className="text-xl font-bold text-foreground">Where and what you groom</h2>

            <div className="grid grid-cols-2 gap-4">
              <Field label="City" error={errors.city}>
                <select
                  className={inputClass(errors.city)}
                  value={form.city}
                  onChange={(e) => update("city", e.target.value)}
                >
                  <option value="">Select city</option>
                  {SERVICE_AREA_CITIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Zip Code" error={errors.zip}>
                <input
                  className={inputClass(errors.zip)}
                  value={form.zip}
                  onChange={(e) => update("zip", e.target.value)}
                  placeholder="27601"
                />
              </Field>
            </div>

            <Field
              label="Neighborhoods / Areas Served"
              error={errors.neighborhoods}
              hint="Comma-separated, e.g. North Hills, Five Points, Midtown"
            >
              <input
                className={inputClass(errors.neighborhoods)}
                value={form.neighborhoods}
                onChange={(e) => update("neighborhoods", e.target.value)}
                placeholder="North Hills, Five Points, Midtown"
              />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Service Radius (miles)" error={errors.service_radius_miles}>
                <input
                  type="number"
                  className={inputClass(errors.service_radius_miles)}
                  value={form.service_radius_miles}
                  onChange={(e) => update("service_radius_miles", e.target.value)}
                />
              </Field>

              <Field label="Years in Business" error={errors.years_experience}>
                <input
                  type="number"
                  className={inputClass(errors.years_experience)}
                  value={form.years_experience}
                  onChange={(e) => update("years_experience", e.target.value)}
                />
              </Field>
            </div>

            <Field label="Services Offered" error={errors.services}>
              <div className="flex flex-wrap gap-2">
                {ALL_SERVICES.map((s) => {
                  const active = form.services.includes(s);
                  return (
                    <button
                      type="button"
                      key={s}
                      onClick={() => toggleService(s)}
                      className={`rounded-full border px-3 py-1.5 text-sm font-medium transition ${
                        active
                          ? "border-brand bg-brand-light text-brand-dark"
                          : "border-[var(--color-border)] text-foreground/70 hover:border-brand"
                      }`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </Field>

            <Field
              label="Business Description"
              error={errors.description}
              hint="A couple sentences pet owners will see on your profile."
            >
              <textarea
                className={inputClass(errors.description)}
                rows={4}
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
                placeholder="Tell pet owners what makes your grooming service great..."
              />
            </Field>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5">
            <h2 className="text-xl font-bold text-foreground">Review your listing</h2>

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
                  <strong>Add a Verified badge</strong> — shows pet owners we&apos;ve confirmed you
                  own this business.
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
                  <strong>Request Featured placement</strong> — ask to be highlighted higher in
                  search results and on the homepage.
                </span>
              </label>
              <p className="text-xs text-muted">
                Both are optional — uncheck either if you&apos;d rather skip it. Our team reviews
                every request before anything goes live.
              </p>
            </div>

            <dl className="divide-y divide-[var(--color-border)] rounded-xl border border-[var(--color-border)]">
              <Row label="Business" value={form.business_name} />
              <Row label="Contact" value={`${form.owner_name} · ${form.email} · ${form.phone}`} />
              <Row label="Website" value={form.website} />
              <Row label="Google Business Profile" value={form.gmb_url} />
              <Row label="Location" value={`${form.city}, NC ${form.zip}`} />
              <Row label="Areas Served" value={form.neighborhoods} />
              <Row label="Services" value={form.services.join(", ")} />
              <Row label="Radius / Experience" value={`${form.service_radius_miles} mi · ${form.years_experience} yrs`} />
              <Row label="Description" value={form.description} />
            </dl>

            <p className="text-xs text-muted">
              By submitting, you confirm this information is accurate and that you are authorized
              to list this business. Listings are reviewed before appearing publicly.
            </p>

            {submitError && (
              <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">{submitError}</p>
            )}
          </div>
        )}

        <div className="mt-8 flex items-center justify-between">
          {step > 0 ? (
            <button
              onClick={back}
              className="rounded-full border border-[var(--color-border)] px-5 py-2.5 text-sm font-semibold text-foreground hover:border-brand"
            >
              Back
            </button>
          ) : (
            <span />
          )}

          {step < STEPS.length - 1 ? (
            <button
              onClick={next}
              className="rounded-full bg-brand px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-dark"
            >
              Continue
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-white hover:bg-accent-dark disabled:opacity-60"
            >
              {submitting ? "Submitting…" : "Submit Listing"}
            </button>
          )}
        </div>
      </div>
    </div>
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

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-3 gap-4 px-4 py-3 text-sm">
      <dt className="font-medium text-muted">{label}</dt>
      <dd className="col-span-2 break-words text-foreground">{value || "N/A"}</dd>
    </div>
  );
}
