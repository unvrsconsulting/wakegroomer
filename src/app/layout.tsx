import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import LocationBanner from "@/components/LocationBanner";
import LocationProvider from "@/components/LocationProvider";
import CookieNotice from "@/components/CookieNotice";
import { SITE_NAME } from "@/lib/constants";
import { getAllCities } from "@/lib/listings";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const GTM_ID = "GTM-WX2PB8XR";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${SITE_NAME} | Find Mobile Dog Groomers Across NC`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "The free local directory for mobile dog groomers across North Carolina: Raleigh, Durham, Chapel Hill, Greensboro, and everywhere between. Search by city, zip code, or service and find a trusted groomer that comes to you.",
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Find Mobile Dog Groomers Across NC`,
    description:
      "The free local directory for mobile dog groomers across North Carolina: Raleigh, Durham, Chapel Hill, Greensboro, and everywhere between.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Find Mobile Dog Groomers Across NC`,
    description:
      "The free local directory for mobile dog groomers across North Carolina.",
  },
  verification: {
    google: "ji89YDMVSDO6gvErkV6WcNl1AySCyBXyoGx2RRegUBc",
  },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const cities = await getAllCities();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Script id="gtm-script" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
        <LocationProvider cities={cities}>
          <NavBar />
          <LocationBanner />
          <main className="flex-1">{children}</main>
          <Footer />
          <CookieNotice />
        </LocationProvider>
      </body>
    </html>
  );
}
