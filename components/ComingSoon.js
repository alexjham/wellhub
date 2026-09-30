import Link from "next/link";
import { Arrow } from "./Icons";

export default function ComingSoon({ title, blurb }) {
  return (
    <div className="wrap" style={{ paddingTop: 64, maxWidth: 720 }}>
      <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 3.2rem)" }}>{title}</h1>
      <p className="muted" style={{ marginBlock: "14px 28px", maxWidth: "60ch" }}>{blurb}</p>
      <div className="note" style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "flex-start" }}>
        <span className="hand" style={{ fontSize: 26, lineHeight: 1 }}>This page is on its way</span>
        <p>While we rebuild it, the quiz is the fastest way to find a service that suits you.</p>
        <Link href="/quiz" className="btn btn-small">Find my match <Arrow size={16} /></Link>
      </div>
    </div>
  );
}
