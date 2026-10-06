import Link from "next/link";
import { notFound } from "next/navigation";
import ArticleBody from "../../components/ArticleBody";
import JsonLd from "../../components/JsonLd";
import { allGuides, getGuide, reviewerOf, getBrand } from "../../lib/content";
import { abs, breadcrumbLd, SITE_NAME } from "../../lib/site";
import s from "../../components/article.module.css";

// Articles keep their original wellhub.com.au addresses (e.g. /a-nutritionists-review-of-youfoodz).
export const dynamicParams = false;

export function generateStaticParams() {
  return allGuides().map((g) => ({ slug: g.slug }));
}

const fmt = (d) => new Date(d).toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" });

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) return {};
  return {
    title: g.title,
    description: g.description || undefined,
    alternates: { canonical: `/${slug}` },
    openGraph: { type: "article", title: g.title, description: g.description || undefined, url: abs(`/${slug}`), images: g.image ? [abs(g.image)] : undefined, publishedTime: g.published, modifiedTime: g.modified },
  };
}

export default async function GuidePage({ params }) {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) notFound();
  const reviewer = reviewerOf(g);
  const brands = g.brands.map(getBrand).filter(Boolean);

  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: g.title,
    description: g.description || undefined,
    image: g.image ? [abs(g.image)] : undefined,
    datePublished: g.published,
    dateModified: g.modified || g.published,
    author: { "@type": "Organization", name: SITE_NAME, url: abs("/") },
    reviewedBy: reviewer ? { "@type": "Person", name: reviewer.name, jobTitle: reviewer.credential, url: abs(`/people/${reviewer.slug}`) } : undefined,
    publisher: { "@type": "Organization", name: SITE_NAME, url: abs("/") },
    mainEntityOfPage: abs(`/${slug}`),
  };

  return (
    <article className="wrap">
      <JsonLd data={[article, breadcrumbLd([{ name: "Home", path: "/" }, { name: "Guides", path: "/guides" }, { name: g.title, path: `/${slug}` }])]} />
      <nav className={s.crumbs} aria-label="Breadcrumb">
        <Link href="/">Home</Link> <span aria-hidden="true">/</span> <Link href="/guides">Guides</Link>
      </nav>
      <header className={s.head}>
        <h1>{g.title}</h1>
        <div className={s.byline}>
          {reviewer?.photo && <img src={reviewer.photo} alt="" width="44" height="44" className={s.avatar} />}
          <div>
            {reviewer && (
              <>
                Reviewed by <Link href={`/people/${reviewer.slug}`}>{reviewer.name}</Link>, {reviewer.credential}
              </>
            )}
            <span className="muted">
              {reviewer && g.reviewedOn ? ` · ${fmt(g.reviewedOn)}` : g.modified ? `Updated ${fmt(g.modified)}` : g.published ? `Published ${fmt(g.published)}` : ""}
            </span>
          </div>
        </div>
      </header>
      <div className={s.layout}>
        <div className={s.main}>
          {g.image && <img src={g.image} alt="" className={s.hero} />}
          <ArticleBody html={g.html} />
        </div>
        {brands.length > 0 && (
          <aside className={s.side}>
            <div className={`note ${s.sideNote}`}>
              <span className="hand">Compare plans</span>
              {brands.map((b) => (
                <Link key={b.slug} href={`/brands/${b.slug}`}>
                  {b.name}{b.minPrice ? ` from $${b.minPrice.toFixed(2)}/serve` : ""}
                </Link>
              ))}
              {brands.find((b) => b.code) && <span className="muted">Codes on each brand page.</span>}
            </div>
          </aside>
        )}
      </div>
      <p className={s.fine}>
        General information only, not personal medical or dietary advice. This article was first published on WellHub{g.published ? ` in ${new Date(g.published).getFullYear()}` : ""}; prices and offers may have changed since. <Link href="/how-we-get-paid">How we get paid</Link>
      </p>
    </article>
  );
}
