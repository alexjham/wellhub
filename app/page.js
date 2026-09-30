import Link from "next/link";
import s from "./home.module.css";
import { listings, deals } from "../lib/listings";
import Rating from "../components/Rating";
import CopyCode from "../components/CopyCode";
import { Arrow, Check } from "../components/Icons";

const DIETS = [
  { label: "Weight loss", q: "goal=lose" },
  { label: "High protein", q: "goal=muscle" },
  { label: "Vegan", q: "diet=vegan" },
  { label: "Vegetarian", q: "diet=veg" },
  { label: "Gluten free", q: "diet=gf" },
  { label: "Dairy free", q: "diet=df" },
  { label: "Keto & low carb", q: "diet=keto" },
  { label: "Halal", q: "diet=halal" },
];

const WEEK = [
  ["Mon", "Kit"], ["Tue", "Soulara"], ["Wed", "Kit"], ["Thu", "Soulara"], ["Fri", "Out"], ["Sat", "—"], ["Sun", "Plan"],
];

export default function Home() {
  const topRated = listings.filter((l) => l.rating === 5).slice(0, 3);
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
              Compare Australian meal delivery services and meal kits, rated by a qualified nutritionist. Answer 5 quick questions and get your top 3, with a discount code for each.
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

          <div className={s.board} aria-label="Example week plan">
            <p className={s.boardTitle}>This week</p>
            <ol className={s.week}>
              {WEEK.map(([day, meal]) => (
                <li key={day} className={meal === "Soulara" ? s.dayPicked : undefined}>
                  <span>{day}</span>
                  {meal}
                </li>
              ))}
            </ol>
            <div className={`note ${s.boardNote}`}>
              <span className="hand">Try this one!</span>
              <strong>Soulara Vegan Meals</strong>
              <span>
                <span className="num">$10.90</span> per serve · <Rating value={5} />
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="wrap">
        <h2 className={s.h2}>How it works</h2>
        <ol className={s.steps}>
          <li><b>Answer 5 questions</b><span>Your goal, how you like to eat, any diet needs, who you're feeding and where you live.</span></li>
          <li><b>Get your top 3</b><span>Matched to your answers and ranked by our nutritionist's rating, not by who pays us most.</span></li>
          <li><b>Grab your code</b><span>Every match comes with the best discount we have, most of them exclusive to WellHub.</span></li>
        </ol>
      </section>

      <section className="wrap">
        <h2 className={s.h2}>Shop by diet</h2>
        <ul className={s.diets}>
          {DIETS.map((d) => (
            <li key={d.label}>
              <Link href={`/quiz?${d.q}`}>
                {d.label} <Arrow size={16} />
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
                <span className="muted">{l.name} · {l.type === "kit" ? "Meal kit" : "Ready-made"}</span>
              </div>
              <Rating value={l.rating} />
              <span><b className="num">${l.price.toFixed(2)}</b> <span className="muted">per serve</span></span>
              <span className={s.listingDeal}>{l.deal}</span>
              {l.code ? <CopyCode code={l.code} /> : <span className="muted">Deal applied by link</span>}
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
