import "./globals.css";

export const metadata = {
  title: "WellHub | Coming soon",
  description: "WellHub is getting a fresh new look. Check back soon.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
