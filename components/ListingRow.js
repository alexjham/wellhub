import Rating from "./Rating";
import CopyCode from "./CopyCode";
import { Arrow } from "./Icons";
import s from "./listings.module.css";

const TYPE_LABEL = { ready: "Ready-made", kit: "Meal kit", box: "Food box", baby: "Baby & toddler", supp: "Supplement" };

export default function ListingRow({ l }) {
  const states = l.states.length === 8 ? "All states" : l.states.join(", ");
  return (
    <li className={s.row}>
      <div className={s.name}>
        <b>{l.brand}</b>
        <span>{[l.name, TYPE_LABEL[l.type]].filter(Boolean).join(" · ")}</span>
        <span className={s.states}>Delivers to {states}</span>
      </div>
      <div className={s.facts}>
        {l.rating && <Rating value={l.rating} />}
        <span><b className="num">${l.price.toFixed(2)}</b> <span className="muted">{l.type === "supp" ? "from" : "per serve"}</span></span>
      </div>
      <div className={s.deal}>
        {l.deal && <span className={s.offer}>{l.deal}</span>}
        {l.code && <CopyCode code={l.code} />}
      </div>
      {l.url ? (
        <a className={`btn btn-small ${s.go}`} href={l.url} target="_blank" rel="sponsored nofollow noopener">
          Go to site <Arrow size={16} />
        </a>
      ) : <span />}
    </li>
  );
}
