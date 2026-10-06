import { abs } from "../lib/site";

// Only the live production site is indexed; Vercel previews stay out of Google.
export default function robots() {
  const live = process.env.VERCEL_ENV === "production" || !process.env.VERCEL_ENV;
  return live
    ? { rules: { userAgent: "*", allow: "/", disallow: ["/my-week?"] }, sitemap: abs("/sitemap.xml") }
    : { rules: { userAgent: "*", disallow: "/" } };
}
