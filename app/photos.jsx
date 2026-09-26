"use client";
import { createContext, useContext, useEffect, useState, useRef } from "react";

import { team } from "./site-data";
const PhotoContext = createContext({});
export function PhotoProvider({ children, initialPhotos }) {
  const [photos, setPhotos] = useState(initialPhotos);
  useEffect(() => {
    setPhotos(initialPhotos);
  }, [initialPhotos]);
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;
    const refresh = () =>
      fetch("/api/photos", { cache: "no-store" })
        .then((r) => (r.ok ? r.json() : null))
        .then((data) => {
          if (data?.photos) setPhotos(data.photos);
        })
        .catch(() => {});
    refresh();
    window.addEventListener("focus", refresh);
    return () => window.removeEventListener("focus", refresh);
  }, []);
  return (
    <PhotoContext.Provider value={photos}>{children}</PhotoContext.Provider>
  );
}
export function SitePhoto({
  slot,
  fallback = "/images/spa-still-life.png",
  alt = "",
  ...props
}) {
  const photos = useContext(PhotoContext);
  const photo = photos[slot]?.[0];
  return (
    <img {...props} src={photo?.src || fallback} alt={photo?.alt || alt} />
  );
}
export function TeamGallery({ name }) {
  const photos = useContext(PhotoContext);
  const items = photos["team-" + name.toLowerCase()] || [];
  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const dialog = useRef(null);
  const current = items[Math.min(index, Math.max(items.length - 1, 0))];
  useEffect(() => {
    if (expanded) dialog.current?.showModal();
    else dialog.current?.close();
  }, [expanded]);
  const previous = () => setIndex((i) => (i - 1 + items.length) % items.length);
  const next = () => setIndex((i) => (i + 1) % items.length);
  if (!current)
    return (
      <div className="portrait-empty">
        <span>{name[0]}</span>
        <p>{name}</p>
      </div>
    );
  return (
    <div className="portrait-gallery">
      <div className="portrait-main">
        <button
          className="portrait-open"
          onClick={() => setExpanded(true)}
          aria-label={"Enlarge photo of " + name}
        >
          <img
            src={current.src}
            alt={current.alt || name + " portrait"}
            loading="lazy"
          />
        </button>
        {items.length > 1 && (
          <>
            <button
              className="gallery-arrow previous"
              aria-label={"Previous photo of " + name}
              onClick={previous}
            >
              ‹
            </button>
            <button
              className="gallery-arrow next"
              aria-label={"Next photo of " + name}
              onClick={next}
            >
              ›
            </button>
          </>
        )}
        <span className="photo-count">
          {Math.min(index + 1, items.length)} / {items.length}
        </span>
      </div>
      {items.length > 1 && (
        <div className="gallery-thumbs">
          {items.map((photo, i) => (
            <button
              key={photo.src}
              aria-label={"View photo " + (i + 1) + " of " + name}
              aria-pressed={index === i}
              onClick={() => setIndex(i)}
            >
              <img src={photo.src} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      )}
      <dialog
        ref={dialog}
        className="photo-lightbox"
        onClose={() => setExpanded(false)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setExpanded(false);
        }}
        onKeyDown={(e) => {
          if (items.length > 1 && e.key === "ArrowRight") next();
          if (items.length > 1 && e.key === "ArrowLeft") previous();
        }}
      >
        <button
          className="lightbox-close"
          aria-label="Close enlarged photo"
          onClick={() => setExpanded(false)}
        >
          ✕
        </button>
        <img src={current.src} alt={current.alt || name + " portrait"} />
        <p>
          {name} · {Math.min(index + 1, items.length)} / {items.length}
        </p>
        {items.length > 1 && (
          <div className="lightbox-controls">
            <button onClick={previous}>← Previous</button>
            <button onClick={next}>Next →</button>
          </div>
        )}
      </dialog>
    </div>
  );
}
export function FeaturedTeam() {
  const rail = useRef(null);
  const photos = useContext(PhotoContext);
  return (
    <div className="featured-team">
      <div className="team-rail" ref={rail}>
        {team.map((t) => (
          <a
            className="featured-person"
            href={"/attendants#" + t.name.toLowerCase()}
            key={t.name}
          >
            {photos["team-" + t.name.toLowerCase()]?.[0] ? (
              <SitePhoto
                slot={"team-" + t.name.toLowerCase()}
                alt={t.name}
                loading="lazy"
              />
            ) : (
              <div className="portrait-empty">
                <span>{t.name[0]}</span>
              </div>
            )}
            <div className="featured-person-caption">
              <span>SPA TEAM</span>
              <h3>{t.name}</h3>
            </div>
          </a>
        ))}
      </div>
      <div className="rail-controls">
        <button
          aria-label="Scroll team photos left"
          onClick={() =>
            rail.current?.scrollBy({ left: -350, behavior: "smooth" })
          }
        >
          ←
        </button>
        <button
          aria-label="Scroll team photos right"
          onClick={() =>
            rail.current?.scrollBy({ left: 350, behavior: "smooth" })
          }
        >
          →
        </button>
      </div>
    </div>
  );
}
export function LocalPhotoLink() {
  return process.env.NODE_ENV === "development" ? (
    <a className="local-photo-link" href="/manage-photos">
      Manage photos
    </a>
  ) : null;
}
