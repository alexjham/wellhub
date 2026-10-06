import ListingRow from "./ListingRow";
import { listingsById } from "../lib/content";
import p from "./prose.module.css";
import s from "./listings.module.css";

// Imported article HTML, with the old site's product cards swapped for live WellHub listings.
export default function ArticleBody({ html }) {
  const parts = html.split(/<div data-listings="([^"]*)"><\/div>/);
  return (
    <div className={p.prose}>
      {parts.map((part, i) => {
        if (i % 2 === 0) return part.trim() ? <div key={i} dangerouslySetInnerHTML={{ __html: part }} /> : null;
        const items = listingsById(part.split(",").filter(Boolean));
        if (!items.length) return null;
        return (
          <ul key={i} className={s.list} style={{ margin: "1.5em 0", fontSize: "1rem", lineHeight: 1.55 }}>
            {items.map((l) => <ListingRow key={l.id} l={l} />)}
          </ul>
        );
      })}
    </div>
  );
}
