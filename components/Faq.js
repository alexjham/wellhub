import s from "./faq.module.css";

export default function Faq({ items, title = "Frequently asked questions" }) {
  if (!items?.length) return null;
  return (
    <section className={s.faq} aria-labelledby="faq-title">
      <h2 id="faq-title">{title}</h2>
      {items.map((f) => (
        <details key={f.q} className={s.item}>
          <summary>{f.q}</summary>
          <p>{f.a}</p>
        </details>
      ))}
    </section>
  );
}
