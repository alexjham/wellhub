import Link from "next/link";
import s from "./home.module.css";
import { deals } from "../lib/deals";
import { catalogue, DIETS } from "../lib/diets";
import Rating from "../components/Rating";
import HeroPlayer from "../components/HeroPlayer";
import CopyCode from "../components/CopyCode";
import { Arrow, Check } from "../components/Icons";

export default function Home() {
  const featured = ["soulara-vegan-meals", "hellofresh-vegan-meal-kit", "marley-spoon-meal-kit"];
  const topRated = featured.map((id) => catalogue.find((l) => l.id === id)).filter(Boolean);
  const featuredDeals = deals.slice(0, 3);

  return (
    <>
      <section className={s.hero}>
        <div className={`wrap ${s.heroGrid}`}>
          <div className={s.heroCopy}>
            <h1>
              Dinner, <span className="hand">sorted</span>
              <br />
              for the week.
            </h1>
            <p className={s.lead}>
              Compare Australian meal delivery services and meal kits, rated by a qualified nutritionist. Answer 4 quick questions and get your top 3, with a discount code for each.
            </p>
            <div className={s.ctaRow}>
              <Link href="/quiz" className="btn">
                Find my match <Arrow />
              </Link>
              <Link href="/deals" className="btn btn-quiet">See all deals</Link>
            </div>
            <ul className={s.trust}>
              <li><Check /> Nutritionist rated</li>
              <li><Check /> Exclusive codes</li>
              <li><Check /> Free to use</li>
            </ul>
          </div>

          <HeroPlayer />
        </div>
      </section>

      <section className="wrap">
        <h2 className={s.h2}>How it works</h2>
        <ol className={s.steps}>
          <li><b>Answer 4 questions</b><span>Your goal, how you like to eat, any diet needs and who you're feeding.</span></li>
          <li><b>Get your top 3</b><span>Matched to your answers and ranked by our nutritionist's rating, not by who pays us most.</span></li>
          <li><b>Grab your code</b><span>Every match comes with the best discount we have, most of them exclusive to WellHub.</span></li>
        </ol>
      </section>

      <section className="wrap">
        <h2 className={s.h2}>Shop by diet</h2>
        <ul className={s.diets}>
          {DIETS.map((d) => (
            <li key={d.slug}>
              <Link href={`/diet/${d.slug}`}>
                {d.label}
                {d.isNew && <span className="pill">New</span>}
                <Arrow size={16} />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="wrap">
        <div className={s.rowHead}>
          <h2 className={s.h2}>Top rated this month</h2>
          <Link href="/meals">See all</Link>
        </div>
        <ul className={s.listings}>
          {topRated.map((l) => (
            <li key={l.id} className={s.listing}>
              <div className={s.listingName}>
                <b>{l.brand}</b>
                <span className="muted">{[l.name, l.type === "kit" ? "Meal kit" : "Ready-made"].filter(Boolean).join(" · ")}</span>
              </div>
              <Rating value={l.rating} />
              <span><b className="num">${l.price.toFixed(2)}</b> <span className="muted">per serve</span></span>
              <span className={s.listingDeal}>{l.deal}</span>
              {l.code ? <CopyCode code={l.code} /> : <span />}
            </li>
          ))}
        </ul>
      </section>

      <section className="wrap">
        <div className={s.rowHead}>
          <h2 className={s.h2}>Codes worth grabbing</h2>
          <Link href="/deals">All {deals.length} deals</Link>
        </div>
        <ul className={s.deals}>
          {featuredDeals.map((d) => (
            <li key={d.brand}>
              <b>{d.brand}</b>
              <span className={s.dealOffer}>{d.offer}</span>
              <CopyCode code={d.code} />
            </li>
          ))}
        </ul>
      </section>

      <section className={`wrap ${s.trustBlock}`}>
        <div>
          <h2 className={s.h2}>Health first, then price</h2>
          <p className="muted">
            Our qualified nutritionist reviews every service for ingredient quality, balance and variety before we list it. Brands can pay for clearly labelled sponsored spots, but never for a better rating.
          </p>
          <p><Link href="/how-we-get-paid">Read how we get paid</Link></p>
        </div>
        <div className={`note ${s.signup}`}>
          <span className="hand">New codes, once a month</span>
          <p>Get the best meal delivery deals for your diet. No spam.</p>
          <Link href="/quiz" className="btn btn-small">Take the quiz to sign up</Link>
        </div>
      </section>
    </>
  );
}
