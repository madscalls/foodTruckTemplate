import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { loadStops, dayKey, timeRange, addToCalendarUrl } from '../calendar.js';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function Chevron({ dir }) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={dir === 'prev' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'} />
    </svg>
  );
}

/** Month calendar of truck stops, the selected day's stop, and a "coming up" list. */
export default function Schedule() {
  const today = useMemo(() => { const t = new Date(); t.setHours(0, 0, 0, 0); return t; }, []);
  const [stops, setStops] = useState(null);
  const [error, setError] = useState(false);
  const [month, setMonth] = useState({ y: today.getFullYear(), m: today.getMonth() });
  const [selected, setSelected] = useState(today);

  useEffect(() => {
    let live = true;
    loadStops().then((s) => live && setStops(s)).catch(() => live && setError(true));
    return () => { live = false; };
  }, []);

  const byDay = useMemo(() => {
    const map = {};
    (stops || []).forEach((s) => { (map[dayKey(s.start)] ||= []).push(s); });
    return map;
  }, [stops]);

  const { y, m } = month;
  const first = new Date(y, m, 1);
  const weeks = Math.ceil((first.getDay() + new Date(y, m + 1, 0).getDate()) / 7);
  const cells = Array.from({ length: weeks * 7 }, (_, i) => new Date(y, m, 1 - first.getDay() + i));
  const shift = (n) => setMonth(({ y, m }) => { const d = new Date(y, m + n, 1); return { y: d.getFullYear(), m: d.getMonth() }; });

  const selStops = byDay[dayKey(selected)] || [];
  const isToday = dayKey(selected) === dayKey(today);
  const upcoming = (stops || []).filter((s) => s.end >= today).slice(0, 5);

  return (
    <div className="split">
      <div className="cal">
        <div className="cal-head">
          <button type="button" className="cal-arrow" onClick={() => shift(-1)} aria-label="Previous month"><Chevron dir="prev" /></button>
          <h3 className="disp cal-month" aria-live="polite">{MONTHS[m]} {y}</h3>
          <button type="button" className="cal-arrow" onClick={() => shift(1)} aria-label="Next month"><Chevron dir="next" /></button>
        </div>
        <div className="cal-grid cal-dow" aria-hidden="true">
          {DAYS.map((d) => <span key={d}>{d.slice(0, 3).toUpperCase()}</span>)}
        </div>
        <div className="cal-grid">
          {cells.map((d) => {
            const k = dayKey(d);
            const has = Boolean(byDay[k]);
            const sel = k === dayKey(selected);
            const cls = ['cal-cell', d.getMonth() !== m && 'out', has && 'has', k === dayKey(today) && 'today', sel && 'sel'].filter(Boolean).join(' ');
            return (
              <button key={k} type="button" className={cls} aria-pressed={sel}
                aria-label={`${DAYS[d.getDay()]} ${MONTHS[d.getMonth()]} ${d.getDate()}${has ? ', truck is out' : ''}`}
                onClick={() => { setSelected(d); if (d.getMonth() !== m) setMonth({ y: d.getFullYear(), m: d.getMonth() }); }}>
                <span>{d.getDate()}</span><span className="dot" />
              </button>
            );
          })}
        </div>
        <div className="cal-key">
          <span><i className="key-dot" />Truck's out</span>
          <span><i className="key-today" />Today</span>
        </div>
      </div>

      <div className="schedule-side">
        <div className="day-card" aria-live="polite">
          <p className="eyebrow">{isToday ? 'Today · ' : ''}{DAYS[selected.getDay()]}, {MONTHS[selected.getMonth()]} {selected.getDate()}</p>
          {stops === null && !error && <p className="day-empty">Loading the schedule…</p>}
          {error && <p className="day-empty">The schedule didn't load. Check our Instagram for today's spot.</p>}
          {stops && selStops.map((s) => (
            <div key={s.start.toISOString() + s.title} className="day-stop">
              <span className="disp">{s.title}</span>
              <span className="day-meta">{timeRange(s)}{s.place && ` · ${s.place}`}</span>
              <a href={addToCalendarUrl(s)} target="_blank" rel="noopener noreferrer">Add to my calendar ↗</a>
            </div>
          ))}
          {stops && selStops.length === 0 && (
            <>
              <p className="day-empty">No stop on the books this day. Book us for it?</p>
              <Link to="/#catering" className="day-link">Request a date ↓</Link>
            </>
          )}
        </div>

        <div className="upcoming">
          <p className="eyebrow">Coming up</p>
          {stops && upcoming.length === 0 && <p className="ev-empty">Nothing on the books right now. New dates show up here as they're set.</p>}
          {upcoming.map((s) => (
            <div key={s.start.toISOString() + s.title} className="ev">
              <div className="ev-date">
                <span>{MONTHS[s.start.getMonth()].slice(0, 3).toUpperCase()}</span>
                <span className="disp">{s.start.getDate()}</span>
              </div>
              <div className="ev-body">
                <span className="ev-title">{s.title}</span>
                <span className="ev-meta">{DAYS[s.start.getDay()].slice(0, 3)} · {timeRange(s)}{s.place && ` · ${s.place}`}</span>
              </div>
              <a href={addToCalendarUrl(s)} target="_blank" rel="noopener noreferrer" aria-label={`Add ${s.title} to my calendar`}>+ Calendar</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
