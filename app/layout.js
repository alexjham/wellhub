import "@fontsource-variable/instrument-sans";
import "@fontsource/caveat/700.css";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: {
    default: "WellHub | Compare meal delivery & meal kits in Australia",
    template: "%s | WellHub",
  },
  description:
    "Compare Australian meal delivery services, meal kits and supplements, rated by a qualified nutritionist. Take the 5-question quiz to find your match.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-AU">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
