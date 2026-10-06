"use client";

import { useMemo, useState } from "react";
import ListingRow from "./ListingRow";
import s from "./listings.module.css";

const STATES = ["NSW", "VIC", "ACT", "QLD", "NT", "SA", "WA", "TAS"];
const FILTER_LABELS = {
  vegan: "Vegan", vegetarian: "Vegetarian", "gluten-free": "Gluten free", "dairy-free": "Dairy free",
  "high-protein": "High protein", "keto-low-carb": "Low carb", halal: "Halal", kosher: "Kosher",
  paleo: "Paleo", pescatarian: "Pescatarian", frozen: "Frozen",
};
const SUB_LABELS = { vitamins: "Vitamins", protein: "Protein powder", greens: "Greens powder" };
const PAGE = 12;

export default function ListingBrowser({ items, exclude = [], defaultSort = "rating" }) {
  const [type, setType] = useState("all");
  const [state, setState] = useState("");
  const [extra, setExtra] = useState([]);
  const [sub, setSub] = useState("all");
  const [sort, setSort] = useState(defaultSort);
  const [shown, setShown] = useState(PAGE);

  const types = useMemo(() => [...new Set(items.map((l) => l.type))], [items]);
  const subs = useMemo(() => [...new Set(items.map((l) => l.sub).filter(Boolean))], [items]);
  const extras = useMemo(() => {
    return Object.keys(FILTER_LABELS).filter((d) => {
      if (exclude.includes(d)) return false;
      const n = items.filter((l) => l.diets.includes(d)).length;
      return n > 0 && n < items.length;
    }).slice(0, 7);
  }, [items, exclude]);

  const results = useMemo(() => {
    const list = items.filter((l) =>
      (type === "all" || l.type === type) &&
      (sub === "all" || l.sub === sub) &&
      (!state || l.states.includes(state)) &&
      extra.every((d) => l.diets.includes(d)),
    );
    return list.sort((a, b) =>
      sort === "price" ? a.price - b.price : (b.rating ?? 0) - (a.rating ?? 0) || a.price - b.price,
    );
  }, [items, type, sub, state, extra, sort]);

  const reset = (fn) => (v) => { fn(v); setShown(PAGE); };
  const toggleExtra = (d) => reset(setExtra)(extra.includes(d) ? extra.filter((x) => x !== d) : [...extra, d]);

  return (
    <div className={s.browser}>
      <div className={s.controls}>
        {types.includes("ready") && types.includes("kit") && (
          <div className={s.segment} role="group" aria-label="Meal type">
            {[["all", "All"], ["ready", "Ready-made"], ["kit", "Meal kits"]].map(([v, label]) => (
              <button key={v} type="button" aria-pressed={type === v} onClick={() => reset(setType)(v)}>{label}</button>
            ))}
          </div>
        )}
        {subs.length > 1 && (
          <div className={s.segment} role="group" aria-label="Product type">
            {[["all", "All"], ...subs.map((v) => [v, SUB_LABELS[v]])].map(([v, label]) => (
              <button key={v} type="button" aria-pressed={sub === v} onClick={() => reset(setSub)(v)}>{label}</button>
            ))}
          </div>
        )}
        <label className={s.select}>
          <span>Delivers to</span>
          <select id="filter-state" value={state} onChange={(e) => reset(setState)(e.target.value)}>
            <option value="">Any state</option>
            {STATES.map((st) => <option key={st} value={st}>{st}</option>)}
          </select>
        </label>
        <label className={s.select}>
          <span>Sort</span>
          <select id="filter-sort" value={sort} onChange={(e) => reset(setSort)(e.target.value)}>
            <option value="rating">Top rated</option>
            <option value="price">Lowest price</option>
          </select>
        </label>
      </div>
      {extras.length > 0 && (
        <div className={s.chips} role="group" aria-label="Also show only">
          {extras.map((d) => (
            <button key={d} type="button" aria-pressed={extra.includes(d)} onClick={() => toggleExtra(d)}>
              {FILTER_LABELS[d]}
            </button>
          ))}
        </div>
      )}

      <p className={s.count} aria-live="polite">
        {results.length} {results.length === 1 ? "option" : "options"}
        {state && ` delivering to ${state}`}
      </p>

      {results.length ? (
        <ul className={s.list}>
          {results.slice(0, shown).map((l) => <ListingRow key={l.id} l={l} />)}
        </ul>
      ) : (
        <p className={s.empty}>Nothing matches all of those filters. Try removing one, or choose "Any state".</p>
      )}
      {shown < results.length && (
        <button type="button" className="btn btn-quiet" onClick={() => setShown((n) => n + PAGE)}>
          Show {Math.min(PAGE, results.length - shown)} more
        </button>
      )}
    </div>
  );
}
