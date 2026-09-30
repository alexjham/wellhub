import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="cols">
          <div>
            <h3>WellHub</h3>
            <p>Australian meal delivery, meal kits and supplements, compared and rated by a qualified nutritionist.</p>
          </div>
          <div>
            <h3>Compare</h3>
            <ul>
              <li><Link href="/meals">Ready-made meals</Link></li>
              <li><Link href="/meal-kits">Meal kits</Link></li>
              <li><Link href="/supplements">Supplements</Link></li>
              <li><Link href="/deals">Deals</Link></li>
            </ul>
          </div>
          <div>
            <h3>Help</h3>
            <ul>
              <li><Link href="/quiz">Find my match</Link></li>
              <li><Link href="/guides">Guides</Link></li>
              <li><Link href="/nutritionist-consult">Nutritionist consult</Link></li>
            </ul>
          </div>
          <div>
            <h3>About</h3>
            <ul>
              <li><Link href="/about-us">About us</Link></li>
              <li><Link href="/how-we-get-paid">How we get paid</Link></li>
              <li><Link href="/list-your-brand">List your brand</Link></li>
              <li><Link href="/privacy-policy">Privacy</Link></li>
            </ul>
          </div>
        </div>
        <p className="fine">
          General information only, not personal medical or dietary advice. Prices, ratings and codes were checked in September 2026 and can change. © {new Date().getFullYear()} WellHub.
        </p>
      </div>
    </footer>
  );
}
