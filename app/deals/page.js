import { deals } from "../../lib/deals";
import DealsList from "../../components/DealsList";

export const metadata = {
  title: "Discount codes & deals",
  description: "Current discount codes for Australian meal delivery, meal kits and supplements, most of them exclusive to WellHub.",
};

export default function DealsPage() {
  return (
    <div className="wrap" style={{ paddingTop: 48 }}>
      <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 3.2rem)" }}>
        Deals &amp; <span className="hand" style={{ fontSize: "1.2em" }}>codes</span>
      </h1>
      <p className="muted" style={{ maxWidth: "60ch", marginTop: 12 }}>
        Tap a code to copy it, then use it at checkout. Most of these codes are exclusive to WellHub. Offers are usually for new customers only.
      </p>
      <DealsList deals={deals} />
    </div>
  );
}
