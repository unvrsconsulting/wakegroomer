"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ALL_SERVICES, SERVICE_AREA_CITIES } from "@/lib/constants";
import { EMAIL_RE, PHONE_RE, URL_RE, ZIP_RE, isLikelyGmbUrl } from "@/lib/validation";
import type { Groomer } from "@/lib/db";
import Honeypot from "./Honeypot";

type FormState = {
  business_name: string;
  owner_name: string;
  email: string;
  phone: string;
  website: string;
  gmb_url: string;
  facebook_url: string;
  description: string;
  city: string;
  zip: string;
  neighborhoods: string;
  services: string[];
  service_radius_miles: string;
  years_experience: string;
  price_info: string;
  hours: string;
};

function parseJsonArray(value: string): string[] {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return [];
  }
}

export default function GroomerEditForm({ groomer, token }: { groomer: Groomer; token: string }) {
  const [form, setForm] = useState<FormState>({
    business_name: groomer.business_name,
    owner_name: groomer.owner_name ?? "",
    email: groomer.email ?? "",
    phone: groomer.phone ?? "",
    website: groomer.website ?? "",
    gmb_url: groomer.gmb_url ?? "",
    facebook_url: groomer.facebook_url ?? "",
    description: groomer.description ?? "",
    city: groomer.city,
    zip: groomer.zip,
    neighborhoods: parseJsonArray(groomer.neighborhoods).join(", "),
    services: parseJsonArray(groomer.services),
    service_radius_miles: String(groomer.service_radius_miles ?? 15),
    years_experience: groomer.years_experience != null ? String(groomer.years_experience) : "",
    price_info: groomer.price_info ?? "",
    hours: groomer.hours ?? "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
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

  function validate(): boolean {
    const e: Record<string, string> = {};

    if (!form.business_name.trim()) e.business_name = "Business name is required.";
    if (form.email && !EMAIL_RE.test(form.email)) e.email = "Enter a valid email.";
    if (form.phone && !PHONE_RE.test(form.phone)) e.phone = "Enter a valid phone number.";
    if (form.website && !URL_RE.test(form.website)) {
      e.website = "Enter a valid website URL, e.g. https://yourbusiness.com.";
    }
    if (form.gmb_url && !isLikelyGmbUrl(form.gmb_url)) {
      e.gmb_url = "That doesn't look like a Google Business Profile link.";
    }
    if (form.facebook_url && !URL_RE.test(form.facebook_url)) {
      e.facebook_url = "Enter a valid Facebook URL.";
    }
    if (!form.city) e.city = "Select a city.";
    if (!ZIP_RE.test(form.zip)) e.zip = "Enter a valid 5-digit zip code.";
    if (!form.neighborhoods.trim()) e.neighborhoods = "List at least one neighborhood or area you serve.";
    if (form.services.length === 0) e.services = "Select at least one service.";

    const radius = Number(form.service_radius_miles);
    if (!Number.isFinite(radius) || radius <= 0 || radius > 100) {
      e.service_radius_miles = "Enter a radius between 1 and 100 miles.";
    }

    if (form.years_experience) {
      const years = Number(form.years_experience);
      if (!Number.isFinite(years) || years < 0 || years > 75) {
        e.years_experience = "Enter a valid number of years, or leave blank.";
      }
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
      const res = await fetch("/api/groomer-edit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: groomer.slug,
          token,
          ...form,
          neighborhoods: form.neighborhoods
            .split(",")
            .map((n) => n.trim())
            .filter(Boolean),
          service_radius_miles: Number(form.service_radius_miles),
          years_experience: form.years_experience === "" ? null : Number(form.years_experience),
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
        <h2 className="mt-4 text-2xl font-bold text-foreground">Edit submitted</h2>
        <p className="mt-2 text-foreground/70">
          Thanks! Our team will review your changes and publish them once approved. This usually
          takes 1-2 business days.
        </p>
        <p className="mt-4 rounded-xl border border-[var(--color-border)] bg-brand-light/30 p-4 text-sm text-foreground/70">
          While you&apos;re here: linking to your listing from your own website or social
          profiles helps pet owners find you and gives your listing a boost in search.
        </p>
        <Link
          href={`/groomer/${groomer.slug}`}
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
      className="card-shadow space-y-5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-8"
    >
      <Honeypot ref={honeypotRef} />

      <Field label="Business Name" error={errors.business_name}>
        <input
          className={inputClass(errors.business_name)}
          value={form.business_name}
          onChange={(e) => update("business_name", e.target.value)}
        />
      </Field>

      <Field label="Owner / Contact Name" error={errors.owner_name} hint="Optional.">
        <input
          className={inputClass(errors.owner_name)}
          value={form.owner_name}
          onChange={(e) => update("owner_name", e.target.value)}
        />
      </Field>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Email" error={errors.email} hint="Optional.">
          <input
            type="email"
            className={inputClass(errors.email)}
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
          />
        </Field>

        <Field label="Phone" error={errors.phone} hint="Optional.">
          <input
            type="tel"
            className={inputClass(errors.phone)}
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
          />
        </Field>
      </div>

      <Field label="Business Website" error={errors.website} hint="Optional.">
        <input
          className={inputClass(errors.website)}
          value={form.website}
          onChange={(e) => update("website", e.target.value)}
          placeholder="https://yourbusiness.com"
        />
      </Field>

      <Field label="Google Business Profile Link" error={errors.gmb_url} hint="Optional.">
        <input
          className={inputClass(errors.gmb_url)}
          value={form.gmb_url}
          onChange={(e) => update("gmb_url", e.target.value)}
          placeholder="https://g.page/yourbusiness"
        />
      </Field>

      <Field label="Facebook Page" error={errors.facebook_url} hint="Optional.">
        <input
          className={inputClass(errors.facebook_url)}
          value={form.facebook_url}
          onChange={(e) => update("facebook_url", e.target.value)}
          placeholder="https://facebook.com/yourbusiness"
        />
      </Field>

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

        <Field label="Years in Business" error={errors.years_experience} hint="Optional.">
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

      <Field label="Hours" error={errors.hours} hint="Optional, e.g. Mon-Fri 8am-5pm.">
        <input
          className={inputClass(errors.hours)}
          value={form.hours}
          onChange={(e) => update("hours", e.target.value)}
        />
      </Field>

      <Field label="Pricing Info" error={errors.price_info} hint="Optional, shown on your profile.">
        <textarea
          className={inputClass(errors.price_info)}
          rows={2}
          value={form.price_info}
          onChange={(e) => update("price_info", e.target.value)}
        />
      </Field>

      <Field label="Business Description" error={errors.description} hint="What pet owners will see on your profile.">
        <textarea
          className={inputClass(errors.description)}
          rows={4}
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
        />
      </Field>

      {submitError && (
        <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">{submitError}</p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-accent-dark disabled:opacity-60"
      >
        {submitting ? "Submitting…" : "Submit for Review"}
      </button>
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
