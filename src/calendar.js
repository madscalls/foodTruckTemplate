import { SAMPLE_STOPS, SITE } from './site.js';

const GCAL_ID = import.meta.env.VITE_GCAL_ID;
const GCAL_KEY = import.meta.env.VITE_GCAL_KEY;

/** Is the schedule coming from a real Google Calendar? */
export const isLive = Boolean(GCAL_ID && GCAL_KEY);

/**
 * The truck's stops as [{ title, place, start: Date, end: Date, allDay }], soonest first.
 * Live: Google Calendar API v3 events.list on a public calendar (from the start of this month).
 * Otherwise: SAMPLE_STOPS from site.js.
 */
export async function getStops() {
  if (!isLive) return sampleStops();
  const from = new Date();
  from.setDate(1);
  from.setHours(0, 0, 0, 0);
  const url = new URL(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(GCAL_ID)}/events`);
  url.search = new URLSearchParams({
    key: GCAL_KEY,
    timeMin: from.toISOString(),
    singleEvents: 'true',
    orderBy: 'startTime',
    maxResults: '100',
  });
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Calendar request failed (${res.status})`);
  const data = await res.json();
  return (data.items || []).map((e) => {
    const allDay = !e.start.dateTime;
    return {
      title: e.summary || 'On the road',
      place: e.location || '',
      allDay,
      // all-day dates ("2026-10-14") are local days, not UTC midnights
      start: allDay ? localDay(e.start.date) : new Date(e.start.dateTime),
      end: allDay ? localDay(e.end.date) : new Date(e.end.dateTime),
    };
  });
}

function localDay(ymd) {
  const [y, m, d] = ymd.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function sampleStops() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const at = (days, hm) => {
    const [h, m] = hm.split(':').map(Number);
    const d = new Date(today);
    d.setDate(d.getDate() + days);
    d.setHours(h, m, 0, 0);
    return d;
  };
  return SAMPLE_STOPS.map((s) => ({ title: s.title, place: s.place, allDay: false, start: at(s.in, s.start), end: at(s.in, s.end) }));
}

export const dayKey = (d) => `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;

const timeFmt = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit' });
/** "11:00 AM – 2:00 PM", or "All day". */
export function timeRange(stop) {
  if (stop.allDay) return 'All day';
  return `${timeFmt.format(stop.start)} – ${timeFmt.format(stop.end)}`;
}

/** A Google Calendar "add this event" link for one stop. */
export function addToCalendarUrl(stop) {
  const pad = (n) => String(n).padStart(2, '0');
  const stamp = (d) => stop.allDay
    ? `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`
    : `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;
  const q = new URLSearchParams({
    action: 'TEMPLATE',
    text: `${SITE.fullName}: ${stop.title}`,
    dates: `${stamp(stop.start)}/${stamp(stop.end)}`,
    location: stop.place,
  });
  return `https://calendar.google.com/calendar/render?${q}`;
}

let cached;
/** getStops(), fetched once and shared by everything on the page. */
export function loadStops() {
  cached ||= getStops().catch((err) => { cached = undefined; throw err; });
  return cached;
}
