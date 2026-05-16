import { getStore } from "@netlify/blobs";
import { slotsForDate } from "./_schedule.mjs";

export default async (req) => {
  const url = new URL(req.url);
  const date = url.searchParams.get("date");
  if (!date) return Response.json({ error: "Missing date" }, { status: 400 });

  const schedule = slotsForDate(date);
  const store = getStore("agenda-bookings");
  const { blobs } = await store.list({ prefix: `${date}/` });
  const booked = new Set(blobs.map((blob) => blob.key.split("/")[1]));

  return Response.json({
    slots: schedule.map((slot) => ({
      ...slot,
      available: !booked.has(slot.time)
    }))
  });
};
