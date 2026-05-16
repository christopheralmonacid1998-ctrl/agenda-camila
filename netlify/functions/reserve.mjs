import { getStore } from "@netlify/blobs";
import { slotsForDate } from "./_schedule.mjs";

export default async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const body = await req.json().catch(() => null);
  const date = body?.date;
  const time = body?.time;
  if (!date || !time) {
    return Response.json({ error: "Missing date or time" }, { status: 400 });
  }

  const scheduledSlot = slotsForDate(date).find((slot) => slot.time === time);
  if (!scheduledSlot) {
    return Response.json({ error: "Slot not available" }, { status: 400 });
  }

  const store = getStore("agenda-bookings");
  const key = `${date}/${time}`;
  const existing = await store.get(key);
  if (existing !== null) {
    return Response.json({ error: "Slot already booked" }, { status: 409 });
  }

  await store.setJSON(key, {
    date,
    time,
    tipo: scheduledSlot.tipo,
    createdAt: new Date().toISOString()
  });

  return Response.json({ ok: true, tipo: scheduledSlot.tipo });
};
