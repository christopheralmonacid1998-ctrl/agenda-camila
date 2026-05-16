export const SCHEDULE = {
  1: [
    { time: "15:30", tipo: "domicilio" },
    { time: "16:30", tipo: "domicilio" },
    { time: "17:30", tipo: "domicilio" }
  ],
  2: [{ time: "17:30", tipo: "domicilio" }],
  3: [{ time: "17:30", tipo: "domicilio" }],
  4: [{ time: "17:30", tipo: "domicilio" }],
  5: []
};

export function slotsForDate(dateStr) {
  const day = new Date(`${dateStr}T12:00:00`).getDay();
  return SCHEDULE[day] || [];
}
