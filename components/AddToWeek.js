"use client";

import { useEffect, useState } from "react";
import { loadWeek, onWeekChange, togglePick } from "../lib/week";

export default function AddToWeek({ id, className = "" }) {
  const [added, setAdded] = useState(false);
  useEffect(() => {
    setAdded(loadWeek().picks.includes(id));
    return onWeekChange((w) => setAdded(w.picks.includes(id)));
  }, [id]);

  return (
    <button
      type="button"
      className={`add-week${added ? " is-added" : ""} ${className}`}
      aria-pressed={added}
      onClick={() => setAdded(togglePick(id))}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        {added ? <path d="M4 12.5l5 5L20 6.5" /> : <path d="M12 5v14M5 12h14" />}
      </svg>
      {added ? "In my week" : "Add to my week"}
    </button>
  );
}
