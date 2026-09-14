import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${SITE_NAME} collects, uses, and protects information.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold text-foreground">Privacy Policy</h1>
      <p className="mt-2 text-sm text-muted">Last updated: September 7, 2026</p>

      <div className="prose-content mt-8 space-y-6 text-foreground/80">
        <p>
          {SITE_NAME} (&quot;we,&quot; &quot;us&quot;) operates mobilepetgroomnc.com, a free
          directory of mobile dog groomers in North Carolina. This page explains what
          information we collect, why, and what you can do about it.
        </p>

        <section>
          <h2 className="text-lg font-bold text-foreground">Information we collect</h2>
          <p className="mt-2">We collect information in three ways:</p>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li>
              <strong>Business listing submissions.</strong> When you submit a business through
              &quot;List Your Business,&quot; we collect the business name, owner/contact name,
              email, phone number, website, Google Business Profile link, description, city, zip
              code, service area, and services offered.
            </li>
            <li>
              <strong>Claim requests.</strong> When you claim an existing listing, we collect
              your name, email, phone number, and Google Business Profile link, used only to
              verify you&apos;re authorized to manage that listing.
            </li>
            <li>
              <strong>Publicly available business information.</strong> Some listings on this
              site were compiled from publicly available sources (business websites, Google
              Maps, Yelp) rather than submitted directly by the business. Unclaimed listings are
              marked as such on the profile page. If you are a business owner and want a listing
              corrected, updated, or removed, claim it or contact us using the details below.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">What we don&apos;t do</h2>
          <p className="mt-2">
            We don&apos;t sell personal information to anyone. The only feature that reads your
            device&apos;s location is the &quot;groomers near you&quot; banner, which asks your
            browser for your approximate location. It&apos;s used once, in your browser, to
            suggest a nearby city, and is never sent to or stored on our servers.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">Cookies and analytics</h2>
          <p className="mt-2">
            We use a small number of strictly necessary cookies and browser storage items: for
            example, keeping an administrator signed in, or remembering that you dismissed a
            banner so it doesn&apos;t reappear on your next visit. We also use Google Tag Manager
            to load analytics tags that help us understand how visitors use this site (e.g. which
            pages are popular). These tools may set cookies and collect information such as your
            IP address, browser, device, and pages visited. We don&apos;t currently run
            advertising or retargeting campaigns, but Google Tag Manager could be used to add
            those tags in the future. This page will be updated first if that changes. You can
            control cookies through your browser settings, and tools like the Google Analytics
            opt-out browser add-on.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">How we use information</h2>
          <p className="mt-2">
            Submitted business and claim information is used to review, publish, and maintain
            listings on this directory, and to contact you about your submission. When you submit
            a listing or claim, a copy of what you entered is also emailed to our support inbox so
            our team can review it. We don&apos;t share it with third parties except the service
            providers that host our database, email delivery, and application infrastructure, who
            process it only on our behalf.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">Third-party content</h2>
          <p className="mt-2">
            Photos used on business profile pages are sourced from Wikimedia Commons under
            Creative Commons or public domain licenses, credited on each page. Links to business
            websites and Google Maps take you to third-party sites with their own privacy
            practices, which we don&apos;t control.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">Your choices</h2>
          <p className="mt-2">
            You can ask us to correct, update, or remove information about your business, or
            delete a claim/signup submission, at any time by contacting us. Business owners can
            also claim their listing directly to take control of its content.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">Contact</h2>
          <p className="mt-2">
            Questions about this policy or a request about your data? Reach us at{" "}
            <a href="mailto:support@mobilepetgroomnc.com" className="text-brand hover:underline">
              support@mobilepetgroomnc.com
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">Changes to this policy</h2>
          <p className="mt-2">
            We may update this page as the site changes. Material changes will update the date
            at the top of this page.
          </p>
        </section>
      </div>
    </div>
  );
}
