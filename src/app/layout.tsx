import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import LocationBanner from "@/components/LocationBanner";
import { SITE_NAME } from "@/lib/constants";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${SITE_NAME} | Find Mobile Dog Groomers in the NC Piedmont`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "The free local directory for mobile dog groomers across North Carolina's Piedmont — Raleigh, Durham, Chapel Hill, Greensboro, and everywhere between. Search by neighborhood, city, or zip code and find a trusted groomer that comes to you.",
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Find Mobile Dog Groomers in the NC Piedmont`,
    description:
      "The free local directory for mobile dog groomers across North Carolina's Piedmont — Raleigh, Durham, Chapel Hill, Greensboro, and everywhere between.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Find Mobile Dog Groomers in the NC Piedmont`,
    description:
      "The free local directory for mobile dog groomers across North Carolina's Piedmont.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NavBar />
        <LocationBanner />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
