import Link from "next/link";
import { Magnet } from "./Icons";

export default function Header() {
  return (
    <>
      <p className="disclosure">
        WellHub is free to use. When you buy through our links we may earn a commission.{" "}
        <Link href="/how-we-get-paid">How we get paid</Link>
      </p>
      <header className="header">
        <div className="wrap">
          <Link href="/" className="logo" aria-label="WellHub home">
            <Magnet /> WellHub
          </Link>
          <nav className="nav" aria-label="Main">
            <Link className="nav-link" href="/meals">Ready-made meals</Link>
            <Link className="nav-link" href="/meal-kits">Meal kits</Link>
            <Link className="nav-link" href="/supplements">Supplements</Link>
            <Link className="nav-link nav-keep" href="/deals">Deals</Link>
            <Link className="nav-link" href="/guides">Guides</Link>
            <Link href="/quiz" className="btn btn-small">Find my match</Link>
          </nav>
        </div>
      </header>
    </>
  );
}
