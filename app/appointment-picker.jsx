"use client";
import { useEffect, useRef, useState } from "react";
import { services, addons, business } from "./site-data";

export function AppointmentPicker() {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const [service, setService] = useState(services[1].slug);
  const [selected, setSelected] = useState([]);
  const [status, setStatus] = useState("");
  const [pending, setPending] = useState(false);
  const [sent, setSent] = useState(false);
  const requestKey = useRef(null);
  const busy = useRef(false);
  const treatment = services.find(s => s.slug === service);
  const extras = addons.filter(a => selected.includes(a.slug));
  const total = treatment.price + extras.reduce((sum, a) => sum + a.price, 0);
  async function submit(event) {
    event.preventDefault();
    if (busy.current) return;
    busy.current = true;
    setPending(true); setStatus("");
    const fields = Object.fromEntries(new FormData(event.currentTarget));
    const payload = { ...fields, service, addons: selected };
    const fingerprint = JSON.stringify(payload);
    if (requestKey.current?.fingerprint !== fingerprint) {
      requestKey.current = { fingerprint, id: crypto.randomUUID() };
    }
    try {
      const response = await fetch("/api/appointments", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, requestId: requestKey.current.id }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to send. Please call the spa.");
      setSent(true);
      setStatus("Request sent — awaiting confirmation. Our team will contact you to confirm availability and the details. No payment has been taken.");
    } catch (error) {
      setStatus(error.message || "Unable to send. Please try again or call the spa.");
    } finally { busy.current = false; setPending(false); }
  }
  return <form className="booking-panel appointment-menu" method="post" onSubmit={submit}>
    <span className="eyebrow">Plan your appointment</span>
    <h2>Make it your own.</h2>
    <p>Choose your massage and finishing touches. Send us your preferred time and we’ll confirm your visit.</p>
    <fieldset disabled={!ready || pending || sent}>
      <legend>Your visit</legend>
      <label htmlFor="booking-service">Massage & duration</label>
      <select id="booking-service" value={service} onChange={e => setService(e.target.value)}>
        {services.map(s => <option key={s.slug} value={s.slug}>{s.title} · {s.duration} · ${s.price}</option>)}
      </select>
      <fieldset className="booking-addons">
        <legend>Optional add-ons · charged once each</legend>
        {addons.map(a => <label className="booking-addon" key={a.slug}>
          <input type="checkbox" checked={selected.includes(a.slug)} onChange={e => setSelected(current => e.target.checked ? [...current, a.slug] : current.filter(id => id !== a.slug))} />
          <span>{a.title}</span><strong>+${a.price}</strong>
        </label>)}
      </fieldset>
      <div className="booking-estimate" aria-live="polite" aria-atomic="true">
        <div><span>{treatment.title} · {treatment.duration}</span><span>${treatment.price}</span></div>
        {extras.map(a => <div key={a.slug}><span>{a.title}</span><span>${a.price}</span></div>)}
        <div className="booking-total"><strong>Estimated price</strong><strong>${total} CAD</strong></div>
      </div>
      <p className="form-note">Add-ons extend your visit. Our team will confirm the total appointment length and final price.</p>
      <label htmlFor="booking-name">Your name</label>
      <input id="booking-name" name="name" autoComplete="name" required maxLength={100} />
      <div className="form-row">
        <div><label htmlFor="booking-email">Email</label><input id="booking-email" name="email" type="email" autoComplete="email" required maxLength={254} /></div>
        <div><label htmlFor="booking-phone">Phone</label><input id="booking-phone" name="phone" type="tel" autoComplete="tel" required maxLength={30} /></div>
      </div>
      <div className="form-row">
        <div><label htmlFor="booking-date">Preferred date</label><input id="booking-date" name="date" type="date" required /></div>
        <div><label htmlFor="booking-time">Preferred time (Toronto)</label><select id="booking-time" name="time" required defaultValue="">
          <option value="" disabled>Choose a time</option>
          {Array.from({length:21}, (_, i) => { const h = 10 + Math.floor(i / 2); const m = i % 2 ? "30" : "00"; return <option key={i} value={`${h}:${m}`}>{h > 12 ? h - 12 : h}:{m} {h >= 12 ? "PM" : "AM"}</option>; })}
        </select></div>
      </div>
      <label htmlFor="booking-notes">Anything else? (optional)</label>
      <textarea id="booking-notes" name="notes" rows={3} maxLength={1000} placeholder="For example, a preferred attendant. Please avoid sensitive health information." />
      <div className="booking-trap" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <p className="form-note">By sending this request, you agree that V Spa may use these details to contact you about your appointment. Your appointment is confirmed only after our team replies.</p>
      <button type="submit" className="button full">{pending ? "Sending request…" : sent ? "Request sent" : "Request appointment ↗"}</button>
    </fieldset>
    <p role="status" className="booking-status">{status}</p>
    <a className="button secondary full" href={"tel:" + business.tel}>Call {business.phone}</a>
  </form>;
}

