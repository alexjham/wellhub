import Link from "next/link";
import { notFound } from "next/navigation";
import ListingRow from "../../../components/ListingRow";
import CopyCode from "../../../components/CopyCode";
import Rating from "../../../components/Rating";
import Faq from "../../../components/Faq";
import JsonLd from "../../../components/JsonLd";
import { Arrow } from "../../../components/Icons";
import { allBrands, getBrand, TYPE_LABEL, DIET_WORDS, reviewerOf } from "../../../lib/content";
import { abs, breadcrumbLd, faqLd, YEAR } from "../../../lib/site";
import s from "../../../components/brand.module.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return allBrands().map((b) => ({ slug: b.slug }));
}

const money = (n) => `$${n.toFixed(2)}`;
const list = (arr) => (arr.length < 2 ? arr.join("") : `${arr.slice(0, -1).join(", ")} and ${arr[arr.length - 1]}`);

function intro(b) {
  if (b.description) return b.description;
  const types = list(b.types.map((t) => TYPE_LABEL[t].toLowerCase()));
  const diets = b.diets.filter((d) => DIET_WORDS[d] && d !== "family").slice(0, 5).map((d) => DIET_WORDS[d]);
  return `${b.name} offers ${types}${b.states.length === 8 ? " Australia-wide" : ` in ${list(b.states)}`}. We compare ${b.plans.length} ${b.name} ${b.plans.length === 1 ? "plan" : "plans"}${b.minPrice ? ` from ${money(b.minPrice)} per serve` : ""}${diets.length ? `, including ${list(diets)} options` : ""}.`;
}

function faqs(b) {
  const out = [];
  if (b.minPrice) {
    out.push({
      q: `How much does ${b.name} cost?`,
      a: b.minPrice === b.maxPrice
        ? `${b.name} costs about ${money(b.minPrice)} per serve before discounts (checked September 2026).`
        : `${b.name} plans range from ${money(b.minPrice)} to ${money(b.maxPrice)} per serve before discounts (checked September 2026). Bigger orders usually cost less per serve.`,
    });
  }
  out.push({
    q: `Where does ${b.name} deliver?`,
    a: b.states.length === 8 ? `${b.name} delivers to all Australian states and territories. Check your postcode on their site.` : `${b.name} delivers to ${list(b.states)}. Check your postcode on their site.`,
  });
  out.push({
    q: `Is there a ${b.name} discount code?`,
    a: b.code ? `Yes. Use code ${b.code} for ${b.deal ? b.deal.replace(/!$/, "").toLowerCase() : "a discount"}. Offers are usually for new customers.` : b.deal ? `Yes: ${b.deal.replace(/!$/, "")} when you sign up through WellHub's link.` : `We don't have a ${b.name} code at the moment. Check our deals page for current offers.`,
  });
  const diets = b.diets.filter((d) => DIET_WORDS[d] && !["family", "frozen", "seniors", "ndis"].includes(d)).map((d) => DIET_WORDS[d]);
  if (diets.length) out.push({ q: `What diets does ${b.name} cater for?`, a: `${b.name} has options for ${list(diets)} diets. Always check each meal's ingredients if you have an allergy.` });
  if (b.rating) {
    out.push({
      q: `Is ${b.name} healthy?`,
      a: `Our nutritionist rates ${b.name} ${b.rating} out of 5 on average across its plans, looking at ingredient quality, balance and variety.${b.reviews.length ? ` Read our full review for the detail.` : ""}`,
    });
  }
  return out;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const b = getBrand(slug);
  if (!b) return {};
  const title = `${b.name} Review ${YEAR}: Prices, Plans${b.code || b.deal ? " & Discount Code" : ""}`;
  const description = `Is ${b.name} worth it? Nutritionist rating${b.rating ? ` ${b.rating}/5` : ""}${b.minPrice ? `, from ${money(b.minPrice)} per serve` : ""}${b.code ? `, plus code ${b.code}` : ""}. Compare every ${b.name} plan.`;
  return {
    title,
    description,
    alternates: { canonical: `/brands/${slug}` },
    openGraph: { title, description, url: abs(`/brands/${slug}`), images: b.logo ? [abs(b.logo)] : undefined },
  };
}

export default async function BrandPage({ params }) {
  const { slug } = await params;
  const b = getBrand(slug);
  if (!b) notFound();
  const qa = faqs(b);

  return (
    <div className="wrap">
      <JsonLd data={[
        breadcrumbLd([{ name: "Home", path: "/" }, { name: "Brands", path: "/brands" }, { name: b.name, path: `/brands/${slug}` }]),
        faqLd(qa),
      ]} />
      <nav className={s.crumbs} aria-label="Breadcrumb">
        <Link href="/">Home</Link> <span aria-hidden="true">/</span> <Link href="/brands">Brands</Link> <span aria-hidden="true">/</span> <span>{b.name}</span>
      </nav>

      <header className={s.head}>
        <div className={s.headText}>
          {b.logo && <img src={b.logo} alt={`${b.name} logo`} className={s.logo} width="160" height="64" />}
          <h1>{b.name} review: prices, plans{b.code || b.deal ? " & code" : ""}</h1>
          <ul className={s.facts}>
            {b.rating && <li><Rating value={b.rating} /> <span className="muted">nutritionist rating</span></li>}
            {b.minPrice && <li><b className="num">{money(b.minPrice)}</b> <span className="muted">per serve, from</span></li>}
            <li><b>{b.states.length === 8 ? "All states" : `${b.states.length} states`}</b> <span className="muted">delivery</span></li>
            <li><b className="num">{b.plans.length}</b> <span className="muted">{b.plans.length === 1 ? "plan" : "plans"} compared</span></li>
          </ul>
          <p className={s.intro}>{intro(b)}</p>
        </div>
        {(b.code || b.deal || b.url) && (
          <aside className={`note ${s.dealNote}`}>
            <span className="hand">WellHub deal</span>
            {b.deal && <b>{b.deal}</b>}
            {b.code && <span className={s.codeRow}>Code <CopyCode code={b.code} /></span>}
            {b.url && (
              <a className="btn btn-small" href={b.url} target="_blank" rel="sponsored nofollow noopener">
                Go to {b.name} <Arrow size={16} />
              </a>
            )}
          </aside>
        )}
      </header>

      <section className={s.section} aria-labelledby="plans-title">
        <h2 id="plans-title">{b.name} plans compared</h2>
        <ul className={s.list}>
          {b.plans.map((p) => <ListingRow key={p.id} l={p} />)}
        </ul>
      </section>

      {b.reviews.length > 0 && (
        <section className={s.section} aria-labelledby="reviews-title">
          <h2 id="reviews-title">Our {b.name} reviews</h2>
          <ul className={s.reviews}>
            {b.reviews.map((g) => {
              const a = reviewerOf(g);
              return (
                <li key={g.slug}>
                  <Link href={`/${g.slug}`}>
                    <b>{g.title}</b>
                    <span className="muted">{a ? `Reviewed by ${a.name}` : "WellHub"}{g.modified ? ` · Updated ${new Date(g.modified).toLocaleDateString("en-AU", { month: "long", year: "numeric" })}` : ""}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      <div className={s.section}><Faq items={qa} title={`${b.name} FAQs`} /></div>

      <p className={s.fine}>
        Prices and offers were checked in September 2026 and can change. WellHub may earn a commission when you use these links; it never changes a rating. <Link href="/how-we-get-paid">How we get paid</Link>
      </p>
    </div>
  );
}
