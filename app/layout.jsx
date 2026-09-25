import './globals.css';
import { Header, Banner } from './ui';
import { business } from './site-data';
export const metadata = {
  metadataBase:new URL('https://vspa.ca'),
  title:{default:'V Spa Toronto | Your Midtown Massage Retreat',template:'%s | V Spa Toronto'},
  description:'Massage, facials and body care in a quiet Midtown Toronto spa. Find us at 525 Eglinton Ave W. Open daily, 10 AM to 9 PM.',
  icons:{icon:'/icon.svg'},
};
export default function RootLayout({children}){
  return <html lang="en"><body><a className="skip-link" href="#main">Skip to content</a><Header/><Banner/><main id="main">{children}</main><footer className="footer"><div className="container footer-grid"><div><a className="wordmark" href="/">V Spa<span>TORONTO</span></a><p>Your quiet corner of Midtown.</p><p>{business.address}<br/>{business.city}</p></div><div><h2>Explore</h2><a href="/services">Services & treatments</a><a href="/attendants">Our team</a><a href="/experience">The experience</a><a href="/guides">Spa guides</a></div><div><h2>Visit</h2><a href="/contact">Contact & directions</a><a href="/schedule">Appointments</a><a href="/about">About V Spa</a><a href="/hiring">Join our team</a></div><div><h2>Stay in touch</h2><a href={'tel:'+business.tel}>{business.phone}</a><a href={'mailto:'+business.email}>{business.email}</a><p>{business.hours}</p></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} V Spa.</span><span>Massage · Skincare · Body care</span></div></footer></body></html>
}
