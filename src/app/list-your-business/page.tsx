import type { Metadata } from "next";
import SignupForm from "@/components/SignupForm";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "List Your Business Free",
  description: `List your mobile dog grooming business on ${SITE_NAME} for free. Requires a link to your website and Google Business Profile.`,
};

export default function ListYourBusinessPage() {
  return (
    <div className="bg-[var(--background)] py-12">
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-foreground sm:text-4xl">
          List Your Business: Free
        </h1>
        <p className="mt-3 text-foreground/70">
          Get discovered by pet owners across North Carolina searching for a mobile groomer in their
          area. It takes about five minutes.
        </p>
      </div>

      <div className="mt-10 px-4 sm:px-6 lg:px-8">
        <SignupForm />
      </div>
    </div>
  );
}
