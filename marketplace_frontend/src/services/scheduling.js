import { addMinutes, format, isBefore } from 'date-fns';

// PUBLIC_INTERFACE
export function generateTimeSlots(startHour = 8, endHour = 20, interval = 30) {
  /** Generate time slots for the current day between hours with specified interval (minutes). */
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), startHour, 0, 0, 0);
  const end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), endHour, 0, 0, 0);
  const slots = [];
  let cursor = start;
  while (isBefore(cursor, end)) {
    slots.push({ label: format(cursor, 'hh:mm a'), value: cursor.toISOString() });
    cursor = addMinutes(cursor, interval);
  }
  return slots;
}
