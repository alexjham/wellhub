import Link from "next/link";
import { allGuides, reviewerOf } from "../../lib/content";
import { abs } from "../../lib/site";
import s from "../../components/guides.module.css";

export const metadata = {
  title: "Guides: Nutritionist Reviews, Comparisons & Diet Tips",
  description: "Nutritionist reviews of Australian meal delivery services, head-to-head comparisons and practical diet guides from WellHub.",
  alternates: { canonical: "/guides" },
  openGraph: { url: abs("/guides") },
};

const SECTIONS = [
  ["review", "Nutritionist reviews", "Our nutritionists order, taste and assess each service."],
  ["versus", "Head-to-heads", "Two services side by side, so you can pick one."],
  ["guide", "Diet & nutrition guides", "Practical help with eating well, from food labels to starting solids."],
  ["news", "News", "What's changed in Australian meal delivery."],
];

export default function GuidesPage() {
  const guides = allGuides();
  return (
    <div className="wrap" style={{ paddingTop: 40 }}>
      <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 3.2rem)" }}>Guides & <span className="hand" style={{ fontSize: "1.2em" }}>reviews</span></h1>
      <p className="muted" style={{ maxWidth: "60ch", marginBlock: "10px 12px" }}>
        Reviews are based on ordering and tasting the meals. Articles marked as reviewed have been checked by our nutritionist, Alex Hamlin.
      </p>
      {SECTIONS.map(([type, title, blurb]) => {
        const list = guides.filter((g) => g.type === type).sort((a, b) => (b.modified || "").localeCompare(a.modified || ""));
        if (!list.length) return null;
        return (
          <section key={type} className={s.section}>
            <h2>{title}</h2>
            <p className="muted">{blurb}</p>
            <ul className={s.grid}>
              {list.map((g) => {
                const a = reviewerOf(g);
                return (
                  <li key={g.slug}>
                    <Link href={`/${g.slug}`} className={s.card}>
                      {g.image ? <img src={g.image} alt="" loading="lazy" /> : <span className={s.noImg} />}
                      <b>{g.title}</b>
                      {a && <span className="muted">Reviewed by {a.name}</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
