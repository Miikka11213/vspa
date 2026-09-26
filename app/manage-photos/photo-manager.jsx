"use client";
import { useState, useEffect } from "react";
import { photoSlots } from "../photo-slots";

export default function PhotoManager() {
  const [photos, setPhotos] = useState({});
  const [slotId, setSlotId] = useState("hero");
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [alt, setAlt] = useState("");
  const [mode, setMode] = useState("replace");
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const slot = photoSlots.find((s) => s.id === slotId);
  const items = photos[slotId] || [];
  useEffect(() => {
    fetch("/api/photos", { cache: "no-store" })
      .then((r) => {
        if (!r.ok)
          throw new Error("Open this page using npm run dev on your computer.");
        return r.json();
      })
      .then((d) => setPhotos(d.photos))
      .catch((e) => setError(e.message));
  }, []);
  useEffect(() => {
    const urls = files.map((f) => URL.createObjectURL(f));
    setPreviews(urls);
    return () => urls.forEach(URL.revokeObjectURL);
  }, [files]);
  function chooseFiles(selected) {
    setError("");
    setStatus("");
    const next = Array.from(selected);
    if (
      next.some(
        (f) =>
          !["image/jpeg", "image/png", "image/webp", "image/gif"].includes(
            f.type,
          ),
      )
    ) {
      setError("Choose JPG, PNG, WebP or GIF images.");
      return;
    }
    if (next.some((f) => f.size > 8 * 1024 * 1024)) {
      setError("Each photo must be 8 MB or smaller.");
      return;
    }
    if (next.length > slot.limit) {
      setError(
        "Choose up to " +
          slot.limit +
          " photo" +
          (slot.limit === 1 ? "" : "s") +
          " for this area.",
      );
      return;
    }
    setFiles(next);
  }
  async function request(body, method = "POST") {
    const response = await fetch("/api/photos", {
      method,
      body,
      headers:
        method === "PATCH" ? { "Content-Type": "application/json" } : undefined,
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Could not save photos.");
    setPhotos(data.photos);
    return data;
  }
  async function upload(e) {
    e.preventDefault();
    if (!files.length) return;
    setBusy(true);
    setError("");
    setStatus("");
    try {
      const data = new FormData();
      data.append("slot", slotId);
      data.append("mode", mode);
      data.append("alt", alt.trim() || slot.label);
      files.forEach((f) => data.append("files", f));
      await request(data);
      setFiles([]);
      setStatus("Saved. Your website now uses these photos.");
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }
  async function edit(action, src) {
    setBusy(true);
    setError("");
    setStatus("");
    try {
      await request(JSON.stringify({ slot: slotId, action, src }), "PATCH");
      setStatus(
        action === "cover"
          ? "Cover photo updated."
          : "Photo removed from this area. The original file is kept in your project.",
      );
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <>
      <div className="container page-intro photo-manager-intro">
        <span className="eyebrow">Local photo manager</span>
        <h1>Your photos. Your website.</h1>
        <p>
          Choose an area, select your pictures, and save. Changes are stored in
          your Desktop/vspa project.
        </p>
        <a
          className="text-link"
          href="/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Preview website ↗
        </a>
      </div>
      <section className="container photo-manager-layout">
        <aside className="photo-area-list">
          <h2>Website areas</h2>
          {photoSlots.map((s) => (
            <button
              key={s.id}
              disabled={busy}
              aria-pressed={slotId === s.id}
              onClick={() => {
                setSlotId(s.id);
                setFiles([]);
                setAlt("");
                setError("");
                setStatus("");
                setMode(s.limit === 1 ? "replace" : "append");
              }}
            >
              {s.label}
              <span>{photos[s.id]?.length || 0}</span>
            </button>
          ))}
        </aside>
        <div className="photo-manager-main">
          <form onSubmit={upload} className="upload-panel">
            <span className="eyebrow">EDITING</span>
            <h2>{slot.label}</h2>
            <p>{slot.hint}</p>
            <label
              className="upload-drop"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                if (!busy) chooseFiles(e.dataTransfer.files);
              }}
            >
              <span>＋</span>
              <strong>Choose photos or drop them here</strong>
              <small>JPG, PNG, WebP or GIF · up to 8 MB each</small>
              <input
                key={slotId}
                aria-label="Choose photos"
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                multiple={slot.limit > 1}
                disabled={busy}
                onChange={(e) => chooseFiles(e.target.files)}
              />
            </label>
            {previews.length > 0 && (
              <div className="pending-previews">
                {previews.map((url, i) => (
                  <figure key={url}>
                    <img src={url} alt="Selected photo preview" />
                    <figcaption>{files[i]?.name}</figcaption>
                  </figure>
                ))}
              </div>
            )}
            <label htmlFor="photo-alt">Photo description</label>
            <input
              id="photo-alt"
              maxLength={180}
              placeholder={
                "For example: " +
                (slotId.startsWith("team-")
                  ? slot.label.replace(" gallery", "") + " portrait"
                  : "Spa lounge with warm lighting")
              }
              value={alt}
              disabled={busy}
              onChange={(e) => setAlt(e.target.value)}
            />
            {slot.limit > 1 && (
              <fieldset className="upload-mode">
                <legend>When saving</legend>
                <label>
                  <input
                    type="radio"
                    name="mode"
                    value="append"
                    checked={mode === "append"}
                    onChange={() => setMode("append")}
                    disabled={busy}
                  />{" "}
                  Add to this gallery
                </label>
                <label>
                  <input
                    type="radio"
                    name="mode"
                    value="replace"
                    checked={mode === "replace"}
                    onChange={() => setMode("replace")}
                    disabled={busy}
                  />{" "}
                  Replace gallery photos
                </label>
              </fieldset>
            )}
            <button
              className="button"
              type="submit"
              disabled={busy || files.length === 0}
            >
              {busy ? "Saving…" : "Save photos"}{" "}
              <span aria-hidden="true">↗</span>
            </button>
            <p role="status" className="save-status">
              {status}
            </p>
            {error && (
              <p role="alert" className="save-error">
                {error}
              </p>
            )}
          </form>
          <section className="current-photos">
            <h2>
              Current photos{" "}
              <span>
                {items.length} / {slot.limit}
              </span>
            </h2>
            {items.length === 0 ? (
              <p>
                No photos added yet. A placeholder will appear on the website.
              </p>
            ) : (
              <div className="current-photo-grid">
                {items.map((p, i) => (
                  <article key={p.src}>
                    <img src={p.src} alt={p.alt} />
                    <div>
                      <span className="cover-label">
                        {i === 0 ? "Cover photo" : "Photo " + (i + 1)}
                      </span>
                      <p>{p.alt}</p>
                      <div className="photo-item-actions">
                        {i > 0 && (
                          <button
                            disabled={busy}
                            onClick={() => edit("cover", p.src)}
                          >
                            Use as cover
                          </button>
                        )}
                        <button
                          disabled={busy}
                          onClick={() => edit("remove", p.src)}
                        >
                          Remove from page
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
          <p className="photo-local-note">
            This editor works on your computer only. It does not publish changes
            or send pictures to another service.
          </p>
        </div>
      </section>
    </>
  );
}
