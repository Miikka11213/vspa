import originalGuides from "./original-guides.json";
import { SitePhoto, TeamGallery, FeaturedTeam } from "./photos";
import { services, addons, team, guides, business, faq } from "./site-data";
import { ServiceSpotlight, AppointmentPicker, HiringForm } from "./ui";
export function SectionTitle({ eyebrow, title, text, link, label }) {
  return (
    <div className="section-heading">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
        {text && <p>{text}</p>}
      </div>
      {link && (
        <a className="text-link" href={link}>
          {label} <span aria-hidden="true">↗</span>
        </a>
      )}
    </div>
  );
}
export function PageIntro({ eyebrow, title, text }) {
  return (
    <div className="page-intro container">
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      <p>{text}</p>
    </div>
  );
}
export function ServiceCards() {
  return (
    <div className="service-grid">
      {services.map((s, i) => (
        <article className="service-card" key={s.slug}>
          <SitePhoto
            className="service-card-photo"
            slot={s.photoSlot}
            fallback={s.image}
            alt={s.alt}
            loading="lazy"
          />
          <div className="card-top">
            <span className="card-number">0{i + 1}</span>
            <span className="pill">{s.duration}</span>
          </div>
          <h3>{s.title}</h3>
          <p>{s.description}</p>
          <div className="card-bottom">
            <span>
              From <strong>${s.price}</strong>
            </span>
            <a aria-label={"Explore " + s.title} href={"/services/" + s.slug}>
              Explore <span aria-hidden="true">↗</span>
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}
export function Addons() {
  return (
    <div className="addon-list addon-photo-grid">
      {addons.map((s) => (
        <a href={"/services/" + s.slug} key={s.slug}>
          <SitePhoto className="addon-card-photo" slot={s.photoSlot} fallback={s.image} alt={s.alt} loading="lazy" />
          <div className="addon-copy">
            <h3>{s.title}</h3>
            <p>{s.description}</p>
          </div>
          <span className="addon-price">
            ${s.price} <span aria-hidden="true">↗</span>
          </span>
        </a>
      ))}
    </div>
  );
}
export function FAQs() {
  return (
    <section className="section container faq-section">
      <div>
        <span className="eyebrow">Before your visit</span>
        <h2>
          A few things
          <br />
          you might wonder.
        </h2>
        <a className="text-link" href="/contact">
          Talk to our team ↗
        </a>
      </div>
      <div>
        {faq.map(([q, a]) => (
          <details key={q}>
            <summary>
              {q}
              <span aria-hidden="true">+</span>
            </summary>
            <p>{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
export function CTA() {
  return (
    <section className="container cta">
      <div>
        <span className="eyebrow">Your next quiet moment</span>
        <h2>Leave the day at the door.</h2>
        <p>
          Tell us what you have in mind. We’ll help you find the right visit.
        </p>
      </div>
      <a className="button" href="/schedule">
        Plan your appointment <span aria-hidden="true">↗</span>
      </a>
    </section>
  );
}
export function GuideCards({ limit = guides.length + originalGuides.length }) {
  return (
    <div className="guide-grid">
      {[...guides, ...originalGuides].slice(0, limit).map((g, i) => (
        <a className="guide-card" href={g.path || "/guides/" + g.slug} key={g.slug}>
          <span className="eyebrow">THE SPA JOURNAL / 0{i + 1}</span>
          <h3>{g.title}</h3>
          <p>{g.summary}</p>
          <span className="text-link">Read the guide ↗</span>
        </a>
      ))}
    </div>
  );
}
export function Home() {
  return (
    <>
      <section className="hero container original-hero">
        <SitePhoto
          className="hero-photo"
          slot="hero"
          alt="V Spa"
          fetchPriority="high"
        />
        <div className="hero-shade" />
        <div className="hero-original-grid">
          <div className="hero-copy">
            <span className="hero-location">
              Toronto | Peaceful massage escape
            </span>
            <h1>Pure relaxation in Midtown Toronto</h1>
            <h2>Attentive massage and body care in a calm, private setting.</h2>
            <p>
              Experience full-body relaxation and thoughtful care in private
              suites. Choose your preferred massage, and settle into a quiet
              moment on Eglinton.
            </p>
            <div className="actions">
              <a className="button" href="/schedule">
                Reserve a session
              </a>
              <a className="button secondary" href="/services">
                View the service menu
              </a>
            </div>
          </div>
          <aside className="hero-stats">
            <span className="eyebrow">V SPA TORONTO AT A GLANCE</span>
            <div className="hero-stats-grid">
              <div>
                <strong>Our team</strong>
                <span>Personal, attentive care</span>
              </div>
              <div>
                <strong>4</strong>
                <span>Private suites</span>
              </div>
              <div>
                <strong>10 AM – 9 PM</strong>
                <span>Open every day</span>
              </div>
              <div>
                <strong>525 Eglinton Ave W</strong>
                <span>Midtown Toronto</span>
              </div>
            </div>
            <p>
              Private suites. Thoughtful care.
              <br />
              Call or text to confirm your visit.
            </p>
          </aside>
        </div>
      </section>
      <section className="section container">
        <SectionTitle
          eyebrow="The art of slowing down"
          title="A treatment for your kind of day."
          text="A quick reset or a little longer to unwind. Find a massage that meets you where you are."
          link="/services"
          label="All treatments"
        />
        <ServiceSpotlight />
        <ServiceCards />
      </section>
      <section className="section container featured-team-section">
        <SectionTitle
          eyebrow="Featured attendants"
          title="Meet the people behind your visit."
          text="Get to know our team and find the right fit for your next spa appointment."
          link="/attendants"
          label="View all attendants"
        />
        <FeaturedTeam />
      </section>
      <section className="experience-band">
        <div className="container experience-split">
          <div>
            <span className="eyebrow">The V Spa experience</span>
            <h2>
              Quiet details.
              <br />
              <em>A lasting difference.</em>
            </h2>
            <p>
              A warm welcome. A room prepared for your comfort. Care that begins
              with listening to what you need.
            </p>
            <a className="text-link" href="/experience">
              Step inside the experience ↗
            </a>
          </div>
          <div className="experience-points">
            {[
              [
                "01",
                "Your comfort comes first",
                "Share your preferred pressure, focus areas and any sensitivities before your treatment.",
              ],
              [
                "02",
                "A space to settle in",
                "Private rooms, fresh linens and a calm atmosphere help you leave the rush outside.",
              ],
              [
                "03",
                "A personal welcome",
                "Call or text our team to plan your visit. We confirm the details before you arrive.",
              ],
            ].map(([n, t, d]) => (
              <div key={n}>
                <span>{n}</span>
                <div>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <FAQs />
      <section className="section container">
        <SectionTitle
          eyebrow="The spa journal"
          title="Make the most of your visit."
          link="/guides"
          label="All guides"
        />
        <GuideCards limit={3} />
      </section>
      <CTA />
    </>
  );
}
export function Services() {
  return (
    <>
      <PageIntro
        eyebrow="Massage & body care"
        title="Find your moment of calm."
        text="Choose your pace, tell us your preferences, and let the rest of the day wait."
      />
      <section className="container section compact">
        <ServiceCards />
        <p className="note">
          Prices shown are the published starting prices. Confirm your
          treatment, add-ons and final price with the team before your visit.
        </p>
      </section>
      <section className="container section">
        <SectionTitle
          eyebrow="The finishing touches"
          title="A little extra care."
          text="Add a facial, body scrub or grooming treatment. Let us know when booking so we can reserve enough time."
        />
        <Addons />
      </section>
      <FAQs />
      <CTA />
    </>
  );
}
export function Pricing() {
  return (
    <>
      <PageIntro
        eyebrow="Plan your visit"
        title="Time well spent."
        text="Straightforward options for a short reset or a slower, more complete spa visit."
      />
      <section className="container section compact">
        <div className="price-grid">
          {services.map((s) => (
            <article className="price-card" key={s.slug}>
              <span className="eyebrow">{s.duration}</span>
              <h2>{s.title}</h2>
              <div className="price">
                <small>From</small> ${s.price}
              </div>
              <ul>
                {s.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <a className="button secondary full" href={"/services/" + s.slug}>
                Explore treatment ↗
              </a>
            </article>
          ))}
        </div>
        <p className="note">
          Please confirm current pricing and any applicable charges with the
          team before booking.
        </p>
      </section>
      <section className="container section">
        <SectionTitle
          eyebrow="Body care & skincare"
          title="Finishing touches."
        />
        <Addons />
      </section>
      <CTA />
    </>
  );
}
export function ServiceDetail({ service: s }) {
  return (
    <>
      <PageIntro
        eyebrow={
          s.duration
            ? `${s.duration} · From $${s.price}`
            : `Body care · From $${s.price}`
        }
        title={s.title + "."}
        text={s.description}
      />
      <section className="container detail-layout section compact">
        <div className="prose">
          <SitePhoto className="treatment-detail-photo" slot={s.photoSlot} fallback={s.image} alt={s.alt} />
          <h2>Made for your comfort.</h2>
          <p>
            {s.details ||
              "Make space for a little extra care. Share your preferences and any skin sensitivities before your treatment. Our team will confirm the details, products and appointment length with you."}
          </p>
          {s.features && (
            <ul>
              {s.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          )}
          <h2>Before your visit</h2>
          <p>
            Let us know if you would like to combine treatments. Availability
            and final pricing are confirmed directly with the spa before your
            appointment.
          </p>
          <a className="text-link" href="/services">
            ← Back to all services
          </a>
        </div>
        <aside className="booking-panel">
          <span className="eyebrow">Your next appointment</span>
          <h2>{s.title}</h2>
          <p className="price">From ${s.price}</p>
          <p>{s.duration || "Contact us to confirm treatment time"}</p>
          <a className="button full" href="/schedule">
            Check availability ↗
          </a>
          <a className="button secondary full" href={"tel:" + business.tel}>
            Call {business.phone}
          </a>
        </aside>
      </section>
      <CTA />
    </>
  );
}
export function Appointments() {
  return (
    <>
      <PageIntro
        eyebrow="Appointments"
        title="Make a little time for yourself."
        text="Tell us your preferred service and time. Our team will help you plan your visit."
      />
      <section className="container section compact booking-layout">
        <div>
          <div className="availability-note">
            <span className="eyebrow">OPEN EVERY DAY</span>
            <h2>10 AM – 9 PM</h2>
            <p>
              Call or text for current availability. Same-day visits may be
              available.
            </p>
          </div>
          <div className="steps">
            {[
              [
                "01",
                "Choose your treatment",
                "Pick a massage length and any skincare or grooming add-ons.",
              ],
              [
                "02",
                "Contact the spa",
                "Send your preferred day and time, or give us a call.",
              ],
              [
                "03",
                "Wait for confirmation",
                "Our team confirms your appointment and the details before you arrive.",
              ],
            ].map(([n, t, d]) => (
              <div key={n}>
                <span>{n}</span>
                <div>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </div>
              </div>
            ))}
          </div>
          <a className="text-link" href="/attendants">
            Meet our team ↗
          </a>
        </div>
        <AppointmentPicker />
      </section>
      <FAQs />
    </>
  );
}
export function Team() {
  return (
    <>
      <PageIntro
        eyebrow="Our team"
        title="A warm welcome awaits."
        text="Get to know the names behind your spa experience. Contact us to confirm who is available for your preferred treatment."
      />
      <section className="container section compact">
        <div className="team-grid">
          {team.map((t, i) => (
            <article
              id={t.name.toLowerCase()}
              className="team-card"
              key={t.name}
            >
              <TeamGallery name={t.name} />
              <div>
                <span className="eyebrow">SPA TEAM</span>
                <h2>{t.name}</h2>
                <p>{t.specialty}</p>
                <a
                  className="text-link"
                  href={
                    "sms:" +
                    business.tel +
                    "?body=" +
                    encodeURIComponent(
                      `Hi V Spa, is ${t.name} available for a spa appointment?`,
                    )
                  }
                >
                  Ask about availability ↗
                </a>
              </div>
            </article>
          ))}
        </div>
        <p className="note">
          Team information is based on the published website. Please confirm
          current staff and service availability when booking.
        </p>
      </section>
      <CTA />
    </>
  );
}
export function Experience() {
  return (
    <>
      <PageIntro
        eyebrow="The V Spa experience"
        title="Settle into a slower rhythm."
        text="A private Midtown retreat, with thoughtful details from your first welcome to your last moment of quiet."
      />
      <section className="container section compact experience-photo">
        <SitePhoto slot="experience" alt="V Spa experience" />
        <div>
          <span className="eyebrow">Comfort, considered</span>
          <h2>
            Your visit.
            <br />
            Your preferences.
          </h2>
          <p>
            Let us know how you like your massage. We welcome your questions
            about pressure, products, music and lighting.
          </p>
          <a className="button" href="/schedule">
            Plan a visit ↗
          </a>
        </div>
      </section>
      <section className="container section">
        <div className="values-grid">
          {[
            [
              "A warm welcome",
              "Arrive knowing your appointment details have been confirmed. We will help you settle in and answer your questions.",
            ],
            [
              "Space to unwind",
              "Private treatment rooms, fresh linens and a calm setting create room for a little pause.",
            ],
            [
              "Care that listens",
              "Ask to adjust pressure, pacing or products at any point. Your comfort and boundaries matter.",
            ],
            [
              "A fresh start",
              "Take your time after your treatment. Ask the team about aftercare before you head back into your day.",
            ],
          ].map(([t, d]) => (
            <article key={t}>
              <h2>{t}</h2>
              <p>{d}</p>
            </article>
          ))}
        </div>
      </section>
      <CTA />
    </>
  );
}
export function Contact() {
  return (
    <>
      <PageIntro
        eyebrow="Find your quiet corner"
        title="Right here in Midtown."
        text="We’re on Eglinton Avenue West, near Avenue Road. Call or text before visiting to confirm your appointment."
      />
      <section className="container section compact contact-grid">
        <div className="contact-card">
          <span className="eyebrow">Visit us</span>
          <h2>525 Eglinton Ave W</h2>
          <p>
            Second Floor
            <br />
            {business.city}
          </p>
          <a
            className="button"
            href={business.map}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open directions ↗
          </a>
        </div>
        <div className="contact-card">
          <span className="eyebrow">Talk to our team</span>
          <h2>
            <a href={"tel:" + business.tel}>{business.phone}</a>
          </h2>
          <p>Call or text for appointments and questions.</p>
          <a className="text-link" href={"mailto:" + business.email}>
            {business.email} ↗
          </a>
        </div>
        <div className="contact-card">
          <span className="eyebrow">Opening hours</span>
          <h2>
            Every day.
            <br />
            10 AM – 9 PM.
          </h2>
          <p>Ask about daytime offers between 10 AM and 3 PM.</p>
        </div>
      </section>
      <FAQs />
    </>
  );
}
export function About() {
  return (
    <>
      <PageIntro
        eyebrow="About V Spa"
        title="A little calm in the city."
        text="Massage, skincare and body care in a private Midtown Toronto setting."
      />
      <section className="container section compact prose narrow">
        <h2>Welcome to V Spa.</h2>
        <p>
          Find us on Eglinton Avenue West, where a warm welcome and a quiet room
          offer a pause from the day. Choose a 30, 45 or 60 minute massage, or
          add a facial, body scrub or personal grooming treatment.
        </p>
        <p>
          We keep booking personal. Call or text to discuss your preferences,
          confirm your appointment and ask any questions before you arrive.
        </p>
        <h2>Care with clear boundaries.</h2>
        <p>
          Our spa services focus on nonsexual massage, skincare and grooming. We
          value respectful communication, comfort and clear treatment
          boundaries. Tell us what feels right for you, and ask to adjust or
          stop your treatment at any time.
        </p>
        <div className="actions">
          <a className="button" href="/services">
            Explore our services ↗
          </a>
          <a className="text-link" href="/contact">
            Get in touch ↗
          </a>
        </div>
      </section>
      <CTA />
    </>
  );
}
export function Hiring() {
  return (
    <>
      <PageIntro
        eyebrow="Join our team"
        title="Care is at the heart of what we do."
        text="Interested in working with V Spa? Introduce yourself and tell us about your spa, skincare or hospitality experience."
      />
      <section className="container section compact booking-layout">
        <div className="prose">
          <h2>Bring a thoughtful touch.</h2>
          <p>
            We welcome enquiries from people who care about a comfortable,
            respectful spa experience. Tell us about your skills, relevant
            qualifications and availability.
          </p>
          <p>Contact the team to discuss current openings and requirements.</p>
          <a className="text-link" href={"mailto:" + business.email}>
            {business.email} ↗
          </a>
        </div>
        <HiringForm />
      </section>
    </>
  );
}
export function Guides() {
  return (
    <>
      <PageIntro
        eyebrow="The spa journal"
        title="A little guidance, before you go."
        text="Simple reads to help you choose your treatment and feel comfortable on your first visit."
      />
      <section className="container section compact">
        <GuideCards />
      </section>
      <CTA />
    </>
  );
}
export function GuideDetail({ guide: g }) {
  return (
    <>
      <PageIntro eyebrow="The spa journal" title={g.title} text={g.summary} />
      <article className="container section compact prose narrow">
        {g.sections.map(([h, p]) => (
          <section key={h}>
            <h2>{h}</h2>
            <p>{p}</p>
          </section>
        ))}
        <a className="text-link" href="/guides">
          ← All guides
        </a>
      </article>
      <CTA />
    </>
  );
}
