import { readFile, writeFile, mkdir, rename } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { photoSlots } from "../../photo-slots";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const manifest = path.join(process.cwd(), "app", "photo-data.json");
const uploadDir = path.join(process.cwd(), "public", "uploads");
let queue = Promise.resolve();
const failure = (message, status = 400) =>
  Response.json({ error: message }, { status });
function allowed(request, mutation = false) {
  if (process.env.NODE_ENV !== "development") return false;
  const host = request.headers.get("host") || "";
  if (!/^(localhost|127\.0\.0\.1|\[::1\])(:\d+)?$/.test(host)) return false;
  if (mutation) {
    try {
      const origin = new URL(request.headers.get("origin"));
      if (
        origin.host !== host ||
        !["http:", "https:"].includes(origin.protocol)
      )
        return false;
    } catch {
      return false;
    }
  }
  return true;
}
async function readPhotos() {
  return JSON.parse(await readFile(manifest, "utf8"));
}
async function update(action) {
  const result = queue.then(async () => {
    const data = await readPhotos();
    await action(data);
    const temporary = manifest + "." + randomUUID() + ".tmp";
    await writeFile(temporary, JSON.stringify(data, null, 2) + "\n");
    await rename(temporary, manifest);
    return data;
  });
  queue = result.catch(() => {});
  return result;
}
function extension(bytes) {
  if (
    bytes.length > 3 &&
    bytes[0] === 255 &&
    bytes[1] === 216 &&
    bytes[2] === 255
  )
    return "jpg";
  if (
    bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))
  )
    return "png";
  if (["GIF87a", "GIF89a"].includes(bytes.subarray(0, 6).toString()))
    return "gif";
  if (
    bytes.subarray(0, 4).toString() === "RIFF" &&
    bytes.subarray(8, 12).toString() === "WEBP"
  )
    return "webp";
  return null;
}
export async function GET(request) {
  if (!allowed(request)) return failure("Not found", 404);
  return Response.json(
    { photos: await readPhotos() },
    { headers: { "Cache-Control": "no-store" } },
  );
}
export async function POST(request) {
  if (!allowed(request, true))
    return failure(
      "This editor is available only from your local website.",
      403,
    );
  if (Number(request.headers.get("content-length") || 0) > 65 * 1024 * 1024)
    return failure("The upload is too large.", 413);
  try {
    const form = await request.formData();
    const slot = photoSlots.find((s) => s.id === form.get("slot"));
    if (!slot) return failure("Unknown photo area.");
    const files = form.getAll("files");
    if (!files.length || files.length > slot.limit)
      return failure("Choose between 1 and " + slot.limit + " photos.");
    const mode = form.get("mode");
    if (!["append", "replace"].includes(mode))
      return failure("Choose add or replace.");
    const alt = String(form.get("alt") || slot.label).slice(0, 180);
    const validated = [];
    for (const file of files) {
      if (
        !(file instanceof File) ||
        file.size === 0 ||
        file.size > 8 * 1024 * 1024
      )
        return failure("Each image must be between 1 byte and 8 MB.");
      const bytes = Buffer.from(await file.arrayBuffer());
      const ext = extension(bytes);
      if (!ext)
        return failure("Only JPG, PNG, WebP and GIF images are supported.");
      validated.push({ bytes, filename: randomUUID() + "." + ext });
    }
    const photos = await update(async (data) => {
      const previous = data[slot.id] || [];
      if (mode === "append" && previous.length + validated.length > slot.limit)
        throw new Error(
          "This area can contain up to " +
            slot.limit +
            " photos. Remove a photo or choose Replace.",
        );
      await mkdir(uploadDir, { recursive: true });
      const added = [];
      for (const { bytes, filename } of validated) {
        await writeFile(path.join(uploadDir, filename), bytes, { flag: "wx" });
        added.push({ src: "/uploads/" + filename, alt });
      }
      data[slot.id] = mode === "append" ? [...previous, ...added] : added;
    });
    return Response.json({ photos });
  } catch (e) {
    console.error("Photo save failed:", e.message);
    return failure(
      e.message.startsWith("This area")
        ? e.message
        : "Could not save the photos. Please try again.",
    );
  }
}
export async function PATCH(request) {
  if (!allowed(request, true))
    return failure(
      "This editor is available only from your local website.",
      403,
    );
  try {
    const { slot, action, src } = await request.json();
    if (
      !photoSlots.some((s) => s.id === slot) ||
      !["cover", "remove"].includes(action) ||
      typeof src !== "string"
    )
      return failure("Invalid photo update.");
    const photos = await update(async (data) => {
      const items = data[slot] || [];
      const selected = items.find((p) => p.src === src);
      if (!selected) throw new Error("Photo not found");
      data[slot] =
        action === "cover"
          ? [selected, ...items.filter((p) => p.src !== src)]
          : items.filter((p) => p.src !== src);
    });
    return Response.json({ photos });
  } catch {
    return failure("Could not update the photo. Refresh and try again.");
  }
}
