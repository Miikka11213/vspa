"use client";
import { useState, useEffect } from "react";
import { SitePhoto } from "./photos";
import { usePathname } from "next/navigation";
import { navigation, services, business } from "./site-data";
export function Header() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  useEffect(() => {
    setOpen(false);
  }, [path]);
  return (
    <header className="header">
      <div className="container header-inner">
        <a href="/" className="brand" aria-label="V Spa home">
          <img src="/images/logo.png" alt="" width="45" height="45" />
          <span>V Spa</span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map(([label, href]) => (
            <a
              key={href}
              href={href}
              aria-current={path === href ? "page" : undefined}
            >
              {label}
            </a>
          ))}
        </nav>
        <a className="button small header-book" href="/schedule">
          Reserve a visit <span aria-hidden="true">↗</span>
        </a>
        <button
          className="menu-button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>
      {open && (
        <nav
          id="mobile-nav"
          className="mobile-nav"
          aria-label="Mobile navigation"
          onKeyDown={(e) => {
            if (e.key === "Escape") setOpen(false);
          }}
        >
          {navigation.map(([label, href]) => (
            <a
              key={href}
              href={href}
              aria-current={path === href ? "page" : undefined}
            >
              {label}
            </a>
          ))}
          <a href="/hiring">Join our team</a>
        </nav>
      )}
    </header>
  );
}
export function Banner() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    try {
      setVisible(sessionStorage.getItem("vspa-banner") !== "dismissed");
    } catch {}
  }, []);
  if (!visible) return null;
  return (
    <aside className="offer">
      <div className="container offer-inner">
        <span className="eyebrow">Special pricing</span>
        <p>
          Daytime discount from 10:00 AM – 3:00 PM. Ask our team for current
          offers.
        </p>
        <button
          aria-label="Dismiss offer"
          onClick={() => {
            setVisible(false);
            try {
              sessionStorage.setItem("vspa-banner", "dismissed");
            } catch {}
          }}
        >
          ✕
        </button>
      </div>
    </aside>
  );
}
export function ServiceSpotlight() {
  const [active, setActive] = useState(0);
  const item = services[active];
  return (
    <div className="spotlight">
      <div className="spotlight-image">
        <SitePhoto slot={item.photoSlot} fallback={item.image} alt={item.alt} />
        <span className="photo-label">THE V SPA COLLECTION</span>
      </div>
      <div className="spotlight-copy">
        <div className="service-meta">
          <span>{item.duration}</span>
          <span>{item.isPackage ? "Per person" : "Room Fee"} ${item.price}</span>
        </div>
        <h3>{item.title}</h3>
        {item.suiteExperience && <p className="suite-experience">{item.suiteExperience}</p>}
        {item.paymentNote && <p className="payment-note">{item.paymentNote}</p>}
        <p>{item.description}</p>
        <a className="text-link" href={"/services/" + item.slug}>
          Explore this massage <span aria-hidden="true">↗</span>
        </a>
        <div className="slide-controls" aria-label="Choose a featured massage">
          {services.map((s, i) => (
            <button
              key={s.slug}
              aria-label={"Show " + s.title}
              aria-pressed={active === i}
              onClick={() => setActive(i)}
            >
              {String(i + 1).padStart(2, "0")}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
export { AppointmentPicker } from "./appointment-picker";
export function HiringForm() {
  const [status, setStatus] = useState("");
  function submit(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const body = `Name: ${data.get("name")}\nContact: ${data.get("email")}\nRole: ${data.get("role")}\n\n${data.get("notes")}`;
    window.location.href = `mailto:${business.email}?subject=${encodeURIComponent("V Spa team application")}&body=${encodeURIComponent(body)}`;
    setStatus(
      "Your email app should open with your application. Review it and send it there. Nothing has been submitted by this website.",
    );
  }
  return (
    <form className="booking-panel" onSubmit={submit}>
      <h2>Introduce yourself</h2>
      <label htmlFor="name">Full name</label>
      <input
        id="name"
        name="name"
        autoComplete="name"
        required
        maxLength={120}
      />
      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        autoComplete="email"
        required
      />
      <label htmlFor="role">Role you are interested in</label>
      <input id="role" name="role" required maxLength={150} />
      <label htmlFor="notes">Experience and availability</label>
      <textarea id="notes" name="notes" rows={5} maxLength={2000} required />
      <button className="button full" type="submit">
        Create application email <span aria-hidden="true">↗</span>
      </button>
      <p className="form-note">
        This opens a draft in your email app. You choose when to send it. You
        can also email {business.email} directly.
      </p>
      <p role="status">{status}</p>
    </form>
  );
}
