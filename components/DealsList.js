"use client";

import { useState } from "react";
import CopyCode from "./CopyCode";
import s from "./deals.module.css";

const FILTERS = [
  ["all", "All"],
  ["ready", "Ready-made"],
  ["kit", "Meal kits"],
  ["supp", "Supplements"],
  ["other", "Food boxes & baby"],
];

export default function DealsList({ deals }) {
  const [filter, setFilter] = useState("all");
  const shown = deals.filter((d) => filter === "all" || d.group === filter);

  return (
    <>
      <div className={s.filters} role="group" aria-label="Filter deals">
        {FILTERS.map(([value, label]) => (
          <button key={value} type="button" aria-pressed={filter === value} onClick={() => setFilter(value)}>
            {label}
          </button>
        ))}
      </div>
      <ul className={s.grid}>
        {shown.map((d) => (
          <li key={d.brand}>
            <b>{d.brand}</b>
            <span className={s.offer}>{d.offer}</span>
            <span className={s.tags}>
              {d.tags.map((t) => <span key={t}>{t}</span>)}
            </span>
            <span className={s.foot}>
              <CopyCode code={d.code} />
              <span className={s.checked}>Checked Sep 2026</span>
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}
