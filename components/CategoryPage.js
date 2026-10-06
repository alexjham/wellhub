import Link from "next/link";
import ListingBrowser from "./ListingBrowser";
import { DIETS } from "../lib/diets";
import { Arrow } from "./Icons";
import s from "./category.module.css";

export default function CategoryPage({ title, hand, intro, note, items, exclude, defaultSort, current, showDiets = false }) {
  return (
    <div className="wrap">
      <nav className={s.crumbs} aria-label="Breadcrumb">
        <Link href="/">Home</Link> <span aria-hidden="true">/</span> <span>{title}</span>
      </nav>
      <header className={s.head}>
        <div className={s.headText}>
          <h1>
            {title}
            {hand && <>, <span className="hand">{hand}</span></>}
          </h1>
          <p className={s.intro}>{intro}</p>
          {note && <p className={s.caution}>{note}</p>}
        </div>
        <div className={`note ${s.quizNote}`}>
          <span className="hand">Not sure where to start?</span>
          <p>Answer 5 questions and we'll pick your top 3.</p>
          <Link href="/quiz" className="btn btn-small">Find my match <Arrow size={16} /></Link>
        </div>
      </header>

      {showDiets && (
        <ul className={s.diets} aria-label="Shop by diet">
          {DIETS.map((d) => (
            <li key={d.slug}>
              <Link href={`/diet/${d.slug}`} aria-current={current === d.slug ? "page" : undefined}>
                {d.label}{d.isNew && <span className={s.newTag}>New</span>}
              </Link>
            </li>
          ))}
        </ul>
      )}

      <ListingBrowser items={items} exclude={exclude} defaultSort={defaultSort} />

      <p className={s.fine}>
        Prices are per serve before discounts and were checked in September 2026. Ratings are our nutritionist's. We may earn a commission when you use these links; it never changes a rating. <Link href="/how-we-get-paid">How we get paid</Link>
      </p>
    </div>
  );
}
