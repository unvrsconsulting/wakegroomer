import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `The terms of use for ${SITE_NAME}.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold text-foreground">Terms &amp; Conditions</h1>
      <p className="mt-2 text-sm text-muted">Last updated: September 7, 2026</p>

      <div className="prose-content mt-8 space-y-6 text-foreground/80">
        <p>
          By using mobilepetgroomnc.com (the &quot;Site&quot;), you agree to these terms. If you
          don&apos;t agree, please don&apos;t use the Site.
        </p>

        <section>
          <h2 className="text-lg font-bold text-foreground">What this Site is</h2>
          <p className="mt-2">
            {SITE_NAME} is a free directory that helps pet owners in North Carolina find mobile
            dog groomers. We don&apos;t employ, train, insure, or supervise any groomer listed
            here, and we&apos;re not a party to any booking, service, or payment between you and
            a groomer. All bookings and transactions happen directly between you and the
            business.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">Listing accuracy</h2>
          <p className="mt-2">
            We make a good-faith effort to keep listings accurate, but many listings are compiled
            from publicly available sources and haven&apos;t been confirmed by the business
            owner. These are marked &quot;unclaimed&quot; on their profile page. Ratings, hours,
            pricing, and service details can change without notice. Always confirm details
            directly with the business before booking.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">Listing a business or filing a claim</h2>
          <p className="mt-2">
            If you submit a business listing or claim, you confirm the information you provide is
            accurate and that you&apos;re authorized to submit it (for a claim, that you own or
            represent that business). We review submissions before publishing and may reject,
            edit, or remove any listing at our discretion: for example, if it&apos;s inaccurate,
            fraudulent, spam, or outside our service area.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">No warranty</h2>
          <p className="mt-2">
            The Site is provided &quot;as is,&quot; without warranties of any kind. We don&apos;t
            guarantee the Site will be uninterrupted, error-free, or that any groomer listed will
            meet your expectations. To the fullest extent permitted by law, we disclaim all
            warranties, express or implied.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">Limitation of liability</h2>
          <p className="mt-2">
            To the fullest extent permitted by law, {SITE_NAME} and its operators aren&apos;t
            liable for any damages arising from your use of the Site or your dealings with any
            business listed on it, including but not limited to the quality of grooming services
            received.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">Intellectual property</h2>
          <p className="mt-2">
            Site design, code, and original text are owned by {SITE_NAME}. Business photos are
            sourced from Wikimedia Commons under their respective Creative Commons or public
            domain licenses and credited on each profile page.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">Governing law</h2>
          <p className="mt-2">
            These terms are governed by the laws of the State of North Carolina, without regard
            to conflict-of-law principles.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">Changes to these terms</h2>
          <p className="mt-2">
            We may update these terms as the Site changes. Continued use of the Site after a
            change means you accept the updated terms.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">Contact</h2>
          <p className="mt-2">
            Questions about these terms? Reach us at{" "}
            <a href="mailto:support@mobilepetgroomnc.com" className="text-brand hover:underline">
              support@mobilepetgroomnc.com
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
