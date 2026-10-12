import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Schedule from '../components/Schedule.jsx';
import CateringForm from '../components/CateringForm.jsx';
import Check from '../components/Check.jsx';
import { SITE, MENU } from '../site.js';
import { loadStops, dayKey, timeRange } from '../calendar.js';

const TICKER = 'Smash burgers ✸ Fresh-cut fries ✸ Made to order ✸ ';

function MenuCard({ title, tone, img, alt, items, imgPos }) {
  return (
    <article className="menu-card">
      <img src={img} alt={alt} style={imgPos ? { objectPosition: imgPos } : undefined} />
      <div className="menu-card-body">
        <h3 className={`disp menu-title ${tone}`}>{title}</h3>
        {items.map((it) => (
          <div key={it.name} className="menu-item">
            <div>
              <span className="menu-name">{it.name}</span>
              <span className="menu-desc">{it.desc}</span>
            </div>
            <span className="menu-price">{it.price}</span>
          </div>
        ))}
      </div>
    </article>
  );
}

function useTodayStop() {
  const [label, setLabel] = useState('Checking the schedule…');
  useEffect(() => {
    const k = dayKey(new Date());
    loadStops()
      .then((stops) => {
        const s = stops.find((x) => dayKey(x.start) === k);
        setLabel(s ? `${s.place.replace(/[[\]]/g, '') || s.title} · ${timeRange(s)}` : 'Off today · see the schedule');
      })
      .catch(() => setLabel('See the schedule below'));
  }, []);
  return label;
}

export default function Home() {
  const today = useTodayStop();
  return (
    <main id="top">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Burgers on wheels · {SITE.city}</p>
          <h1 className="disp">Smash burgers. Hot fries. That's it.</h1>
          <p className="hero-lede">Two things, done right, out of a truck window. Find us around town, or bring us to your party.</p>
          <div className="btn-row">
            <Link className="btn btn-yellow" to="/#find-us">Where we're parked</Link>
            <Link className="btn btn-ghost" to="/#menu">See the menu</Link>
          </div>
        </div>
        <div className="hero-photo">
          <img src="/images/truck-yellow.jpg" alt="The truck parked outside a diner, serving window open" />
          <Link className="sticker" to="/#find-us">
            <span className="eyebrow">Today</span>
            <span>{today}</span>
          </Link>
        </div>
      </section>

      <div className="ticker" aria-hidden="true">
        <div className="ticker-track disp">{TICKER.repeat(6)}</div>
      </div>

      <section id="menu" className="section">
        <div className="wrap stack-48">
          <div className="sec-head">
            <div className="stack-16">
              <p className="eyebrow red">The menu</p>
              <h2 className="disp h2">Short on purpose.</h2>
            </div>
            <p className="sec-lede">Fresh beef smashed on the flat-top, potatoes cut every morning. Ask at the window about today's special.</p>
          </div>
          <div className="menu-grid">
            <MenuCard title="Burgers" tone="red" img="/images/burger-box.jpg" alt="A cheeseburger in a paper tray with fries" imgPos="50% 35%" items={MENU.burgers} />
            <MenuCard title="Fries & extras" tone="amber" img="/images/fries.jpg" alt="Seasoned fries on a speckled plate" items={MENU.fries} />
          </div>
          <div className="combo">
            <span className="combo-main">{MENU.combo}</span>
            <span>{MENU.note}</span>
          </div>
        </div>
      </section>

      <section id="find-us" className="section section-ink">
        <div className="wrap stack-48">
          <div className="sec-head">
            <div className="stack-16">
              <p className="eyebrow teal">Find the truck</p>
              <h2 className="disp h2 yellow">Where we'll be.</h2>
            </div>
            <p className="sec-lede">Pick a day to see where we're parked. The schedule updates straight from our calendar, so it's always current.</p>
          </div>
          <Schedule />
        </div>
      </section>

      <section className="photo-band" aria-label="Photos">
        <img src="/images/burgers-stack.jpg" alt="Stacked burgers and fries packed in paper trays" loading="lazy" />
        <img src="/images/truck-window.jpg" alt="Inside the truck window under string lights" loading="lazy" style={{ objectPosition: '50% 30%' }} />
      </section>

      <section id="catering" className="section section-amber">
        <div className="wrap split">
          <div className="stack-22">
            <p className="eyebrow">Catering</p>
            <h2 className="disp h2">Bring the truck to you.</h2>
            <p className="catering-lede">Birthdays, office lunches, weddings, block parties. We pull up, open the window and feed your crowd. Tell us about it and we'll send a quote within {SITE.replyTime}.</p>
            <ul className="checks">
              <li><Check />{SITE.cateringMin} guests and up</li>
              <li><Check />{SITE.cateringRadius}</li>
              <li><Check />Full menu, or build your own</li>
            </ul>
          </div>
          <div className="form-card">
            <CateringForm />
          </div>
        </div>
      </section>
    </main>
  );
}
