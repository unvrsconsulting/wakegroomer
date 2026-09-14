"use client";

import { useState } from "react";
import { ALL_SERVICES, SERVICE_AREA_CITIES } from "@/lib/constants";
import { EMAIL_RE, PHONE_RE, URL_RE, ZIP_RE, isLikelyGmbUrl } from "@/lib/validation";
import type { Groomer } from "@/lib/db";

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
  rating: string;
  review_count: string;
  featured: boolean;
  is_claimed: boolean;
};

function parseJsonArray(value: string): string[] {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return [];
  }
}

export default function AdminGroomerEditForm({ groomer }: { groomer: Groomer }) {
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
    rating: String(groomer.rating ?? 0),
    review_count: String(groomer.review_count ?? 0),
    featured: groomer.featured === 1,
    is_claimed: groomer.is_claimed === 1,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    setSaved(false);
  }

  function toggleService(service: string) {
    update(
      "services",
      form.services.includes(service)
        ? form.services.filter((s) => s !== service)
        : [...form.services, service]
    );
  }

  function validate(): boolean {
    const e: Record<string, string> = {};

    if (!form.business_name.trim()) e.business_name = "Business name is required.";
    if (form.email && !EMAIL_RE.test(form.email)) e.email = "Enter a valid email.";
    if (form.phone && !PHONE_RE.test(form.phone)) e.phone = "Enter a valid phone number.";
    if (form.website && !URL_RE.test(form.website)) e.website = "Enter a valid website URL.";
    if (form.gmb_url && !isLikelyGmbUrl(form.gmb_url)) {
      e.gmb_url = "That doesn't look like a Google Business Profile link.";
    }
    if (form.facebook_url && !URL_RE.test(form.facebook_url)) {
      e.facebook_url = "Enter a valid Facebook URL.";
    }
    if (!form.city) e.city = "Select a city.";
    if (!ZIP_RE.test(form.zip)) e.zip = "Enter a valid 5-digit zip code.";
    if (!form.neighborhoods.trim()) e.neighborhoods = "List at least one area served.";
    if (form.services.length === 0) e.services = "Select at least one service.";

    const radius = Number(form.service_radius_miles);
    if (!Number.isFinite(radius) || radius <= 0 || radius > 100) {
      e.service_radius_miles = "Enter a radius between 1 and 100 miles.";
    }

    if (form.years_experience) {
      const years = Number(form.years_experience);
      if (!Number.isFinite(years) || years < 0) e.years_experience = "Enter a valid number of years.";
    }

    const rating = Number(form.rating);
    if (!Number.isFinite(rating) || rating < 0 || rating > 5) e.rating = "Rating must be 0–5.";

    const reviewCount = Number(form.review_count);
    if (!Number.isFinite(reviewCount) || reviewCount < 0) e.review_count = "Must be 0 or more.";

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setSubmitError(null);
    setSaved(false);

    try {
      const res = await fetch("/api/admin/groomer-update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: groomer.id,
          ...form,
          neighborhoods: form.neighborhoods
            .split(",")
            .map((n) => n.trim())
            .filter(Boolean),
          service_radius_miles: Number(form.service_radius_miles),
          years_experience: form.years_experience === "" ? null : Number(form.years_experience),
          rating: Number(form.rating),
          review_count: Number(form.review_count),
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

      setSaved(true);
    } catch {
      setSubmitError("Something went wrong. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="card-shadow space-y-5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-8"
    >
      <div className="flex items-center gap-4 rounded-lg border border-[var(--color-border)] bg-[var(--background)] p-3">
        <label className="flex items-center gap-2 text-sm font-medium text-foreground">
          <input
            type="checkbox"
            checked={form.is_claimed}
            onChange={(e) => update("is_claimed", e.target.checked)}
          />
          Verified / Claimed
        </label>
        <label className="flex items-center gap-2 text-sm font-medium text-foreground">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => update("featured", e.target.checked)}
          />
          Featured
        </label>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Rating" error={errors.rating}>
          <input
            type="number"
            step="0.1"
            min="0"
            max="5"
            className={inputClass(errors.rating)}
            value={form.rating}
            onChange={(e) => update("rating", e.target.value)}
          />
        </Field>
        <Field label="Review Count" error={errors.review_count}>
          <input
            type="number"
            min="0"
            className={inputClass(errors.review_count)}
            value={form.review_count}
            onChange={(e) => update("review_count", e.target.value)}
          />
        </Field>
      </div>

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
        />
      </Field>

      <Field label="Google Business Profile Link" error={errors.gmb_url} hint="Optional.">
        <input
          className={inputClass(errors.gmb_url)}
          value={form.gmb_url}
          onChange={(e) => update("gmb_url", e.target.value)}
        />
      </Field>

      <Field label="Facebook Page" error={errors.facebook_url} hint="Optional.">
        <input
          className={inputClass(errors.facebook_url)}
          value={form.facebook_url}
          onChange={(e) => update("facebook_url", e.target.value)}
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

      <Field label="Neighborhoods / Areas Served" error={errors.neighborhoods} hint="Comma-separated.">
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

      <Field label="Hours" error={errors.hours} hint="Optional.">
        <input
          className={inputClass(errors.hours)}
          value={form.hours}
          onChange={(e) => update("hours", e.target.value)}
        />
      </Field>

      <Field label="Pricing Info" error={errors.price_info} hint="Optional.">
        <textarea
          className={inputClass(errors.price_info)}
          rows={2}
          value={form.price_info}
          onChange={(e) => update("price_info", e.target.value)}
        />
      </Field>

      <Field label="Business Description" error={errors.description}>
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
      {saved && (
        <p className="rounded-lg bg-green-50 px-4 py-2 text-sm text-green-700">
          Saved — changes are live.
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-dark disabled:opacity-60"
      >
        {submitting ? "Saving…" : "Save Changes"}
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
