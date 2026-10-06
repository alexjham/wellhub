import "@fontsource-variable/instrument-sans";
import "@fontsource/caveat/700.css";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import JsonLd from "../components/JsonLd";
import { SITE_URL, SITE_NAME, abs } from "../lib/site";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  openGraph: { type: "website", siteName: SITE_NAME, locale: "en_AU" },
  twitter: { card: "summary_large_image" },
  title: {
    default: "Compare Meal Delivery & Meal Kits Australia (2026) | WellHub",
    template: "%s | WellHub",
  },
  description:
    "Compare Australian meal delivery services, meal kits and supplements, rated by a qualified nutritionist. Take the 5-question quiz to find your match.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-AU">
      <body>
        <JsonLd data={[
          { "@context": "https://schema.org", "@type": "Organization", name: SITE_NAME, url: abs("/"), logo: abs("/icon.svg") },
          { "@context": "https://schema.org", "@type": "WebSite", name: SITE_NAME, url: abs("/") },
        ]} />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
