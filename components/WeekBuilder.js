"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { DAYS, SPECIAL, decodePlan, emptyWeek, encodePlan, loadWeek, onWeekChange, saveWeek } from "../lib/week";
import { Arrow, Check } from "./Icons";
import s from "./week.module.css";

const DAY_NAMES = { Mon: "Monday", Tue: "Tuesday", Wed: "Wednesday", Thu: "Thursday", Fri: "Friday", Sat: "Saturday", Sun: "Sunday" };

export default function WeekBuilder({ listings }) {
  const byId = useMemo(() => Object.fromEntries(listings.map((l) => [l.id, l])), [listings]);
  const params = useSearchParams();
  const shared = params.get("plan");

  const [week, setWeek] = useState(emptyWeek);
  const [viewingShared, setViewingShared] = useState(false);
  const [selected, setSelected] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (shared) {
      setWeek(decodePlan(shared));
      setViewingShared(true);
      return undefined;
    }
    setWeek(loadWeek());
    return onWeekChange(setWeek);
  }, [shared]);

  function update(next) {
    setWeek(next);
    if (!viewingShared) saveWeek(next);
  }

  function place(day, value) {
    const days = { ...week.days };
    if (!value || days[day] === value) delete days[day];
    else days[day] = value;
    update({ ...week, days });
  }

  function onDayClick(day) {
    if (selected) {
      place(day, selected);
      setSelected(null);
    } else if (week.days[day]) {
      place(day, null);
    }
  }

  const picks = week.picks.filter((id) => byId[id]);
  const filled = DAYS.filter((d) => week.days[d]);
  const deliveredNights = filled.filter((d) => byId[week.days[d]]);
  const total = deliveredNights.reduce((sum, d) => sum + byId[week.days[d]].price * week.people, 0);
  const done = filled.length === 7;

  async function share() {
    const url = `${window.location.origin}/my-week?plan=${encodePlan(week)}`;
    try {
      if (navigator.share) await navigator.share({ title: "My WellHub week", url });
      else {
        await navigator.clipboard.writeText(url);
        setMessage("Link copied. Send it to whoever's cooking with you.");
      }
    } catch {
      setMessage(url);
    }
  }

  function keepShared() {
    saveWeek(week);
    setViewingShared(false);
    window.history.replaceState(null, "", "/my-week");
    setMessage("Saved to your week.");
  }

  return (
    <div className={s.layout}>
      <section className={s.boardWrap} aria-labelledby="board-title">
        <div className={s.boardHead}>
          <h2 id="board-title">{viewingShared ? "A shared week" : "This week's dinners"}</h2>
          <p className={s.progress} aria-live="polite">
            <b className="num">{filled.length}</b> of 7 nights sorted
          </p>
        </div>
        <div className={s.meter} aria-hidden="true"><i style={{ transform: `scaleX(${filled.length / 7})` }} /></div>

        <ol className={s.board}>
          {DAYS.map((d) => {
            const v = week.days[d];
            const l = byId[v];
            return (
              <li key={d}>
                <button
                  type="button"
                  className={`${s.day} ${v ? s.dayFilled : ""} ${selected ? s.dayTarget : ""}`}
                  onClick={() => onDayClick(d)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => { e.preventDefault(); place(d, e.dataTransfer.getData("text/plain")); setSelected(null); }}
                  aria-label={`${DAY_NAMES[d]}: ${l ? `${l.brand} ${l.name}` : SPECIAL[v] || "nothing planned"}${selected ? ". Tap to place your selection here" : v ? ". Tap to clear" : ""}`}
                >
                  <span className={s.dayName}>{d}</span>
                  {l ? (
                    <>
                      <b>{l.brand}</b>
                      <span className={s.dayMeta}>${(l.price * week.people).toFixed(2)}</span>
                    </>
                  ) : v ? (
                    <b>{SPECIAL[v]}</b>
                  ) : (
                    <span className={s.dayEmpty}>{selected ? "Place here" : "Empty"}</span>
                  )}
                </button>
              </li>
            );
          })}
        </ol>

        {done && (
          <div className={`note ${s.sorted}`} role="status">
            <span className="hand">Week sorted!</span>
            <p>All 7 dinners planned. Share it with whoever you're feeding.</p>
          </div>
        )}

        <div className={s.totals}>
          <label className={s.people}>
            <span>Feeding</span>
            <select id="week-people" value={week.people} onChange={(e) => update({ ...week, people: Number(e.target.value) })}>
              {[1, 2, 3, 4, 5, 6].map((n) => <option key={n} value={n}>{n} {n === 1 ? "person" : "people"}</option>)}
            </select>
          </label>
          <p>
            Delivered dinners this week: <b className="num">${total.toFixed(2)}</b>
            {deliveredNights.length > 0 && (
              <span className="muted"> · about ${(total / deliveredNights.length).toFixed(2)} a night</span>
            )}
          </p>
          <p className={s.fine}>Based on each brand's price per serve before discounts. Most need a minimum order, so check on their site.</p>
        </div>

        <div className={s.actions}>
          {viewingShared ? (
            <button type="button" className="btn" onClick={keepShared}>Save as my week</button>
          ) : (
            <button type="button" className="btn" onClick={share} disabled={!filled.length}>Share my week</button>
          )}
          {!viewingShared && filled.length > 0 && (
            <button type="button" className="btn btn-quiet" onClick={() => update({ ...week, days: {} })}>Clear the board</button>
          )}
        </div>
        {message && <p className={s.message} role="status">{message}</p>}
      </section>

      <aside className={s.tray} aria-labelledby="tray-title">
        <h2 id="tray-title">Your picks</h2>
        <p className="muted">{selected ? "Now tap a night on the board." : "Tap a pick, then tap a night. On a computer you can also drag."}</p>
        <ul className={s.picks}>
          {picks.map((id) => (
            <li key={id}>
              <button
                type="button"
                draggable
                onDragStart={(e) => e.dataTransfer.setData("text/plain", id)}
                className={s.pick}
                aria-pressed={selected === id}
                onClick={() => setSelected(selected === id ? null : id)}
              >
                <b>{byId[id].brand}</b>
                <span>{byId[id].name || (byId[id].type === "kit" ? "Meal kit" : "Ready-made")} · ${byId[id].price.toFixed(2)}/serve</span>
                {selected === id && <Check size={16} />}
              </button>
            </li>
          ))}
          {Object.entries(SPECIAL).map(([key, label]) => (
            <li key={key}>
              <button type="button" draggable onDragStart={(e) => e.dataTransfer.setData("text/plain", key)} className={`${s.pick} ${s.pickPlain}`} aria-pressed={selected === key} onClick={() => setSelected(selected === key ? null : key)}>
                <b>{label}</b>
                {selected === key && <Check size={16} />}
              </button>
            </li>
          ))}
        </ul>
        {!picks.length && (
          <div className={s.emptyPicks}>
            <p>You haven't saved any meals yet. Take the quiz or browse, then tap <b>Add to my week</b>.</p>
            <div className={s.emptyLinks}>
              <Link href="/quiz" className="btn btn-small">Find my match <Arrow size={16} /></Link>
              <Link href="/meals">Browse meals</Link>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
