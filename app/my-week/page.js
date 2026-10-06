import { Suspense } from "react";
import WeekBuilder from "../../components/WeekBuilder";
import { catalogue } from "../../lib/diets";

export const metadata = {
  alternates: { canonical: "/my-week" },
  title: "Build Your Week: Dinner Planner & Cost Calculator",
  description: "Plan a week of dinners from your saved meal delivery picks and see the weekly cost for your household.",
};

export default function MyWeekPage() {
  const listings = catalogue
    .filter((l) => l.type === "ready" || l.type === "kit")
    .map(({ id, brand, name, type, price }) => ({ id, brand, name, type, price }));

  return (
    <div className="wrap" style={{ paddingTop: 40 }}>
      <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 3.2rem)" }}>
        Build your <span className="hand" style={{ fontSize: "1.2em" }}>week</span>
      </h1>
      <p className="muted" style={{ maxWidth: "60ch", marginBlock: "10px 28px" }}>
        Put your saved meals on the nights you'll use them and see what the week costs. Your plan is saved on this device.
      </p>
      <Suspense fallback={<p>Loading your week…</p>}>
        <WeekBuilder listings={listings} />
      </Suspense>
    </div>
  );
}
