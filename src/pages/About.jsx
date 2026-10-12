import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SITE, CREW } from '../site.js';

export default function About() {
  useEffect(() => {
    document.title = `About · ${SITE.fullName}`;
    return () => { document.title = SITE.fullName; };
  }, []);

  return (
    <main>
      <section className="about-hero">
        <div className="wrap stack-24">
          <p className="eyebrow">About us</p>
          <h1 className="disp">A flat-top, a window and a good idea.</h1>
          <p className="about-lede">[Owner names] started {SITE.name} in [year] with one truck and two things on the menu. It's still the same two things.</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap story">
          <div className="story-photo">
            <img src="/images/truck-window.jpg" alt="Inside the truck window, string lights and taps behind the counter" />
            <span className="badge">Rolling since [year]</span>
          </div>
          <div className="stack-22">
            <p className="eyebrow red">How it started</p>
            <h2 className="disp h2-sm">[Your story headline]</h2>
            <p className="body-lg">[Tell how the truck began: who you are, where you cooked before, why burgers and fries. Two or three short paragraphs in your own words.]</p>
            <p className="body-lg">[What a day on the truck looks like: when the prep starts, where the beef and potatoes come from, the regulars who keep showing up.]</p>
            <Link className="btn btn-red self-start" to="/#find-us">Find us this week</Link>
          </div>
        </div>
      </section>

      <section className="section section-ink">
        <div className="wrap stack-40">
          <h2 className="disp h2-sm yellow">What we won't skip.</h2>
          <div className="cards">
            <div className="value-card red"><span className="disp">Fresh, never frozen</span><span>[Where your beef comes from and how it's ground.]</span></div>
            <div className="value-card amber"><span className="disp">Cut every morning</span><span>[How the fries are made, and what goes in the seasoning.]</span></div>
            <div className="value-card teal"><span className="disp">Made to order</span><span>[Nothing sits under a heat lamp. A line to say so.]</span></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap stack-40">
          <div className="stack-16">
            <p className="eyebrow red">The crew</p>
            <h2 className="disp h2-sm">Who's at the window.</h2>
          </div>
          <div className="crew">
            {CREW.map((p) => (
              <article key={p.name} className="crew-card">
                {/* Swap the placeholder for <img className="crew-photo" src="/images/…" alt={p.name} /> */}
                <div className="crew-photo" style={{ background: p.color }} role="img" aria-label="Photo placeholder">PHOTO</div>
                <div className="crew-body">
                  <span className="disp">{p.name}</span>
                  <span className="crew-role">{p.role}</span>
                  <span>{p.bio}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="wrap cta-row">
          <h2 className="disp">Hungry crowd coming? We'll bring the truck.</h2>
          <Link className="btn btn-red" to="/#catering">Ask about catering</Link>
        </div>
      </section>
    </main>
  );
}
