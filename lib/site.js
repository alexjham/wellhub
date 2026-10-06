// Canonical site address. Set NEXT_PUBLIC_SITE_URL in Vercel if the domain changes.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://wellhub.com.au").replace(/\/$/, "");
export const SITE_NAME = "WellHub";
export const YEAR = 2026;

export const abs = (path = "/") => `${SITE_URL}${path === "/" ? "" : path}`;

export function breadcrumbLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: abs(it.path) })),
  };
}

export function faqLd(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}
