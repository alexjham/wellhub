import Link from "next/link";
import { notFound } from "next/navigation";
import CopyCode from "../../../../components/CopyCode";
import Rating from "../../../../components/Rating";
import AddToWeek from "../../../../components/AddToWeek";
import Faq from "../../../../components/Faq";
import JsonLd from "../../../../components/JsonLd";
import ListingRow from "../../../../components/ListingRow";
import { Arrow } from "../../../../components/Icons";
import { allPlans, getBrand, getPlan, TYPE_LABEL, DIET_WORDS } from "../../../../lib/content";
import { abs, breadcrumbLd, faqLd } from "../../../../lib/site";
import s from "../../../../components/brand.module.css";
import p from "../../../../components/prose.module.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return allPlans().map((l) => ({ slug: l.brandSlug, plan: l.id }));
}

const fullName = (l) => (l.name ? `${l.brand} ${l.name}` : l.brand);
const states = (l) => (l.states.length === 8 ? "all Australian states" : l.states.join(", "));

export async function generateMetadata({ params }) {
  const { slug, plan } = await params;
  const l = getPlan(slug, plan);
  if (!l) return {};
  const isMeal = l.type === "ready" || l.type === "kit";
  const title = `${fullName(l)}: ${isMeal ? "Menu, Prices" : "Prices"} & Review`;
  const description = `${fullName(l)} from $${l.price.toFixed(2)} per serve${l.rating ? `, rated ${l.rating}/5 by our nutritionist` : ""}. Delivers to ${states(l)}.${l.code ? ` Code ${l.code}.` : ""}`;
  return { title, description, alternates: { canonical: `/brands/${slug}/${plan}` }, openGraph: { title, description, url: abs(`/brands/${slug}/${plan}`) } };
}

export default async function PlanPage({ params }) {
  const { slug, plan } = await params;
  const l = getPlan(slug, plan);
  const b = getBrand(slug);
  if (!l || !b) notFound();
  const others = b.plans.filter((x) => x.id !== l.id);
  const diets = l.diets.filter((d) => DIET_WORDS[d] && d !== "family").map((d) => DIET_WORDS[d]);
  const qa = [
    { q: `How much does ${fullName(l)} cost?`, a: `${fullName(l)} costs about $${l.price.toFixed(2)} per serve before discounts (checked September 2026).${l.deal ? ` Current offer: ${l.deal.replace(/!$/, "")}.` : ""}` },
    { q: `Does ${l.brand} deliver to my area?`, a: `This plan delivers to ${states(l)}. Check your postcode on ${l.brand}'s site.` },
  ];
  if (diets.length) qa.push({ q: `Who is ${fullName(l)} best for?`, a: `It suits ${diets.join(", ")} diets. Check each meal's ingredients if you have an allergy.` });

  return (
    <div className="wrap">
      <JsonLd data={[
        breadcrumbLd([{ name: "Home", path: "/" }, { name: "Brands", path: "/brands" }, { name: b.name, path: `/brands/${slug}` }, { name: l.name || b.name, path: `/brands/${slug}/${plan}` }]),
        faqLd(qa),
      ]} />
      <nav className={s.crumbs} aria-label="Breadcrumb">
        <Link href="/">Home</Link> <span aria-hidden="true">/</span> <Link href={`/brands/${slug}`}>{b.name}</Link> <span aria-hidden="true">/</span> <span>{l.name || "Plan"}</span>
      </nav>
      <header className={s.head}>
        <div className={s.headText}>
          {b.logo && <img src={b.logo} alt={`${b.name} logo`} className={s.logo} width="160" height="64" />}
          <h1>{fullName(l)}</h1>
          <ul className={s.facts}>
            {l.rating && <li><Rating value={l.rating} /> <span className="muted">nutritionist rating</span></li>}
            <li><b className="num">${l.price.toFixed(2)}</b> <span className="muted">per serve</span></li>
            <li><b>{TYPE_LABEL[l.type]}</b></li>
            <li><span className="muted">Delivers to</span> <b>{l.states.length === 8 ? "all states" : l.states.join(", ")}</b></li>
          </ul>
        </div>
        <aside className={`note ${s.dealNote}`}>
          <span className="hand">{l.deal ? "WellHub deal" : "Try it"}</span>
          {l.deal && <b>{l.deal}</b>}
          {l.code && <span className={s.codeRow}>Code <CopyCode code={l.code} /></span>}
          {l.url && (
            <a className="btn btn-small" href={l.url} target="_blank" rel="sponsored nofollow noopener">
              Go to {l.brand} <Arrow size={16} />
            </a>
          )}
          {(l.type === "ready" || l.type === "kit") && <AddToWeek id={l.id} />}
        </aside>
      </header>

      {l.html && (
        <section className={s.section} aria-labelledby="about-title">
          <h2 id="about-title">Our nutritionist's notes</h2>
          <div className={p.prose} dangerouslySetInnerHTML={{ __html: l.html }} />
        </section>
      )}

      {others.length > 0 && (
        <section className={s.section} aria-labelledby="more-title">
          <h2 id="more-title">More {b.name} plans</h2>
          <ul className={s.list}>
            {others.map((o) => <ListingRow key={o.id} l={o} />)}
          </ul>
          <p><Link href={`/brands/${slug}`}>{b.name} review, prices and code</Link></p>
        </section>
      )}

      <div className={s.section}><Faq items={qa} /></div>
    </div>
  );
}
