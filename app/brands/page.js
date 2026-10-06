import Link from "next/link";
import { allBrands } from "../../lib/content";
import { abs } from "../../lib/site";

export const metadata = {
  title: "Brands A–Z: Meal Delivery, Meal Kits & Supplements",
  description: "Every meal delivery, meal kit and supplement brand WellHub compares, from A Life Plus to Youfoodz, with prices, ratings and discount codes.",
  alternates: { canonical: "/brands" },
  openGraph: { url: abs("/brands") },
};

export default function BrandsPage() {
  const brands = allBrands();
  const groups = {};
  for (const b of brands) {
    const k = /[a-z]/i.test(b.name[0]) ? b.name[0].toUpperCase() : "#";
    (groups[k] ||= []).push(b);
  }
  return (
    <div className="wrap" style={{ paddingTop: 40 }}>
      <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 3.2rem)" }}>Brands <span className="hand" style={{ fontSize: "1.2em" }}>A–Z</span></h1>
      <p className="muted" style={{ maxWidth: "60ch", marginBlock: "10px 32px" }}>
        All {brands.length} brands we compare, with their plans, prices, nutritionist ratings and any WellHub codes.
      </p>
      <div style={{ columns: "240px", columnGap: 32 }}>
        {Object.entries(groups).map(([k, list]) => (
          <section key={k} style={{ breakInside: "avoid", marginBottom: 24 }}>
            <h2 style={{ fontSize: "1.3rem", color: "var(--teal)", marginBottom: 6 }}>{k}</h2>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 4 }}>
              {list.map((b) => <li key={b.slug}><Link href={`/brands/${b.slug}`}>{b.name}</Link></li>)}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
