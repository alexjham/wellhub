// "Build your week" state, kept in the visitor's own browser (no account needed).
export const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
export const SPECIAL = {
  cook: "Cook myself",
  out: "Eat out",
  left: "Leftovers",
};
const KEY = "wellhub-week-v1";
const EVENT = "wellhub-week-change";

export const emptyWeek = () => ({ picks: [], days: {}, people: 2 });

export function loadWeek() {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return emptyWeek();
    const w = JSON.parse(raw);
    return { picks: Array.isArray(w.picks) ? w.picks : [], days: w.days || {}, people: Number(w.people) || 2 };
  } catch {
    return emptyWeek();
  }
}

export function saveWeek(week) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(week));
  } catch {
    // Storage can be blocked (private mode); the page still works for this visit.
  }
  window.dispatchEvent(new Event(EVENT));
}

export function onWeekChange(fn) {
  const handler = () => fn(loadWeek());
  window.addEventListener(EVENT, handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener(EVENT, handler);
    window.removeEventListener("storage", handler);
  };
}

export function togglePick(id) {
  const w = loadWeek();
  const has = w.picks.includes(id);
  w.picks = has ? w.picks.filter((p) => p !== id) : [...w.picks, id];
  if (has) for (const d of DAYS) if (w.days[d] === id) delete w.days[d];
  saveWeek(w);
  return !has;
}

// Share links carry the plan in the URL: /my-week?plan=Mon.id~Tue.cook~p.2
export function encodePlan(week) {
  const parts = DAYS.filter((d) => week.days[d]).map((d) => `${d}.${week.days[d]}`);
  parts.push(`p.${week.people}`);
  return parts.join("~");
}

export function decodePlan(text) {
  const week = emptyWeek();
  for (const part of String(text || "").split("~")) {
    const [k, v] = part.split(".");
    if (k === "p") week.people = Math.min(Math.max(Number(v) || 2, 1), 8);
    else if (DAYS.includes(k) && v) week.days[k] = v;
  }
  week.picks = [...new Set(Object.values(week.days).filter((v) => !SPECIAL[v]))];
  return week;
}
