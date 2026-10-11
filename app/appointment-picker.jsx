"use client";
import { useEffect, useRef, useState } from "react";
import { services, addons, business } from "./site-data";
import { treatmentCategories } from "./treatment-categories";
import { getBookingQuote, getBookingTimes, massageStyles, packageChoices, addonLabel, addonPriceLabel } from "./booking-menu";

export function AppointmentPicker() {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const [service, setService] = useState(services[1].slug);
  const [selected, setSelected] = useState([]);
  const [massageStyle, setMassageStyle] = useState(massageStyles[0]);
  const [time, setTime] = useState("");
  const [status, setStatus] = useState("");
  const [pending, setPending] = useState(false);
  const [sent, setSent] = useState(false);
  const requestKey = useRef(null);
  const busy = useRef(false);
  const quote = getBookingQuote({ service, addons: selected, massageStyle });
  const { service: treatment, extras, total } = quote;
  const category = treatment.categoryId;
  const times = getBookingTimes(quote.durationMinutes);
  const selectedTime = times.includes(time) ? time : "";
  function chooseService(slug) {
    const next = services.find(item => item.slug === slug);
    setService(slug);
    setSelected(next.isPackage ? ["body-scrub", "facials"] : []);
    setMassageStyle(massageStyles[0]);
    setTime("");
  }
  async function submit(event) {
    event.preventDefault();
    if (busy.current) return;
    busy.current = true;
    setPending(true); setStatus("");
    const fields = Object.fromEntries(new FormData(event.currentTarget));
    const payload = { ...fields, service, addons: selected, massageStyle: treatment.isPackage ? massageStyle : null };
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
    <p>Choose your ritual, duration and finishing touches. Send us your preferred time and we’ll confirm your visit.</p>
    <fieldset disabled={!ready || pending || sent}>
      <legend>Your visit</legend>
      <label htmlFor="booking-category">Choose your ritual</label>
      <select id="booking-category" value={category} onChange={e => chooseService(services.find(item => item.categoryId === e.target.value).slug)}>
        {treatmentCategories.map(item => <option key={item.id} value={item.id}>{item.title}</option>)}
      </select>
      <label htmlFor="booking-service">{treatment.isPackage ? "Package & duration" : "Treatment & duration"}</label>
      <select id="booking-service" value={service} onChange={e => chooseService(e.target.value)}>
        {services.filter(item => item.categoryId === category).map(s => <option key={s.slug} value={s.slug}>{s.title} · {s.duration} · {s.isRoomFee ? "Room Fee " : ""}${s.price}{s.isPackage ? " per person" : ""}</option>)}
      </select>
      {category === "four-hand" && <p className="form-note">Two therapists treating one guest.</p>}
      {treatment.isPackage ? <fieldset className="booking-addons booking-package">
        <legend>Included in your $349 package</legend>
        <label htmlFor="booking-massage-style">Your 45-minute massage</label>
        <select id="booking-massage-style" value={massageStyle} onChange={e => setMassageStyle(e.target.value)}>{massageStyles.map(style => <option key={style}>{style}</option>)}</select>
        <label className="booking-addon"><input type="checkbox" checked disabled /><span>Body Scrub · 20 min</span><strong>Included</strong></label>
        <p className="form-note">Choose one finishing treatment:</p>
        {packageChoices.map(id => {
          const addon = addons.find(item => item.slug === id);
          return <label className="booking-addon" key={id}><input type="radio" name="packageFinishing" value={id} checked={selected.includes(id)} onChange={() => setSelected(["body-scrub", id])} /><span>{addonLabel(addon)}{addon.durationMinutes ? ` · ${addon.durationMinutes} min` : ""}</span><strong>Included</strong></label>;
        })}
        {treatment.includedTreatments.map(label => <label className="booking-addon" key={label}><input type="checkbox" checked disabled /><span>{label}</span><strong>Included</strong></label>)}
        <p className="form-note">Allow 2.5 hours for your complete visit.</p>
      </fieldset> : <fieldset className="booking-addons">
        <legend>Optional add-ons · charged once each</legend>
        {addons.map(a => <label className={`booking-addon${a.price == null ? " price-pending" : ""}`} key={a.slug}>
          <input type="checkbox" checked={selected.includes(a.slug)} onChange={e => setSelected(current => e.target.checked ? [...current, a.slug] : current.filter(id => id !== a.slug))} />
          <span>{a.title}{a.durationMinutes ? ` · ${a.durationMinutes} min` : ""}</span><strong>{a.price == null ? addonPriceLabel(a) : `+$${a.price}`}</strong>
        </label>)}
      </fieldset>}
      <div className="booking-estimate" aria-live="polite" aria-atomic="true">
        <div><span>{treatment.isRoomFee ? "Room Fee · " : ""}{treatment.title} · {treatment.duration}</span><span>${treatment.price}</span></div>
        {treatment.suiteExperience && <p className="suite-experience">{treatment.suiteExperience}</p>}
        {treatment.paymentNote && <p className="payment-note">{treatment.paymentNote}</p>}
        {treatment.isPackage && <div><span>{massageStyle} · 45 min</span><span>Included</span></div>}
        {extras.map(a => <div key={a.slug}><span>{treatment.isPackage ? addonLabel(a) : a.title}{a.durationMinutes ? ` · ${a.durationMinutes} min` : ""}</span><span>{treatment.isPackage ? "Included" : addonPriceLabel(a)}</span></div>)}
        {treatment.isPackage && treatment.includedTreatments.map(label => <div key={label}><span>{label}</span><span>Included</span></div>)}
        <div className="booking-total"><strong>{treatment.isPackage ? "Package price" : quote.requiresPriceConfirmation ? "Known subtotal" : "Estimated price"}</strong><strong>${total} CAD{treatment.isPackage ? " / person" : ""}</strong></div>
      </div>
      <p className="form-note">{quote.note}</p>
      <label htmlFor="booking-name">Your name</label>
      <input id="booking-name" name="name" autoComplete="name" required maxLength={100} />
      <div className="form-row">
        <div><label htmlFor="booking-email">Email</label><input id="booking-email" name="email" type="email" autoComplete="email" required maxLength={254} /></div>
        <div><label htmlFor="booking-phone">Phone</label><input id="booking-phone" name="phone" type="tel" autoComplete="tel" required maxLength={30} /></div>
      </div>
      <div className="form-row">
        <div><label htmlFor="booking-date">Preferred date</label><input id="booking-date" name="date" type="date" required /></div>
        <div><label htmlFor="booking-time">Preferred time (Toronto)</label><select id="booking-time" name="time" required value={selectedTime} onChange={e => setTime(e.target.value)}>
          <option value="" disabled>Choose a time</option>
          {times.map(value => { const [h,m] = value.split(":"); const hour = Number(h); return <option key={value} value={value}>{hour > 12 ? hour - 12 : hour}:{m} {hour >= 12 ? "PM" : "AM"}</option>; })}
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
