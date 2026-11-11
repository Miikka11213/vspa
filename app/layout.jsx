import { readFile } from "node:fs/promises";
import path from "node:path";
import { PhotoProvider, LocalPhotoLink } from "./photos";
import "./globals.css";
import { Header, Banner } from "./ui";
import { GoogleAdsTag, PhoneLink } from "./google-ads-tag";
import { business, footerGuideLinks } from "./site-data";
const businessSchema = {
  "@context": "https://schema.org",
  "@type": "HealthAndBeautyBusiness",
  "@id": "https://vspa.ca/#business",
  name: business.name,
  url: "https://vspa.ca/",
  telephone: business.tel,
  address: {
    "@type": "PostalAddress",
    streetAddress: business.address,
    addressLocality: "Toronto",
    addressRegion: "ON",
    postalCode: "M5N 1B1",
    addressCountry: "CA",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: `${business.openingHour}:00`,
    closes: `${business.closingHour}:00`,
  },
};
export const metadata = {
  metadataBase: new URL("https://vspa.ca"),
  title: {
    default: "V Spa Toronto | Massage Spa & Private Suites on Eglinton West",
    template: "%s | V Spa Toronto",
  },
  description:
    "Visit V Spa, a massage spa at 525 Eglinton Ave W in Midtown Toronto. Private massage suites, four-hand hot stone rituals, facials and body care. Open daily 10 AM–9 PM.",
  icons: { icon: "/icon.svg" },
};
export default async function RootLayout({ children }) {
  const initialPhotos = JSON.parse(await readFile(path.join(process.cwd(), 'app', 'photo-data.json'), 'utf8'));
  return (
    <html lang="en">
      <body>
        <GoogleAdsTag />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema).replace(/</g, "\\u003c") }}
        />
        <PhotoProvider initialPhotos={initialPhotos}>
          <a className="skip-link" href="#main">
            Skip to content
          </a>
          <Header />
          <Banner />
          <main id="main">{children}</main>
          <footer className="footer">
            <div className="container footer-grid">
              <div>
                <a className="wordmark" href="/">
                  V Spa<span>TORONTO</span>
                </a>
                <p>Your quiet corner of Midtown.</p>
                <p>
                  {business.address}
                  <br />
                  {business.city}
                </p>
              </div>
              <div>
                <h2>Explore</h2>
                <a href="/services">Services & treatments</a>
                <a href="/attendants">Our team</a>
                <a href="/experience">The experience</a>
                <a href="/guides">Spa guides</a>
              </div>
              <div>
                <h2>Visit</h2>
                <a href="/contact">Contact & directions</a>
                <a href="/schedule">Appointments</a>
                <a href="/about">About V Spa</a>
                <a href="/hiring">Join our team</a>
              </div>
              <div>
                <h2>Stay in touch</h2>
                <PhoneLink />
                <a href={"mailto:" + business.email}>{business.email}</a>
                <p>{business.hours}</p>
              </div>
            </div>
            <nav className="container footer-guides" aria-label="Spa information and guides">
              {footerGuideLinks.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
            </nav>
            <div className="container footer-bottom">
              <span>© {new Date().getFullYear()} V Spa.</span>
              <span>Massage · Skincare · Body care</span>
            </div>
          </footer>
          <LocalPhotoLink />
        </PhotoProvider>
      </body>
    </html>
  );
}
