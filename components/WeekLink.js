"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { DAYS, loadWeek, onWeekChange } from "../lib/week";

export default function WeekLink({ className }) {
  const [sorted, setSorted] = useState(0);
  useEffect(() => {
    const count = (w) => DAYS.filter((d) => w.days[d]).length;
    setSorted(count(loadWeek()));
    return onWeekChange((w) => setSorted(count(w)));
  }, []);
  return (
    <Link href="/my-week" className={className}>
      My week{sorted > 0 && <span className="week-count" aria-label={`${sorted} of 7 nights planned`}>{sorted}/7</span>}
    </Link>
  );
}
