import { Link } from 'react-router-dom';
import { SITE } from '../site.js';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <span className="disp">{SITE.name}</span>
            <p>Smash burgers and fries from a truck in {SITE.city}.</p>
          </div>
          <nav aria-label="Footer" className="footer-nav">
            <Link to="/#menu">Menu</Link>
            <Link to="/#find-us">Find the truck</Link>
            <Link to="/#catering">Catering</Link>
            <Link to="/about">About</Link>
          </nav>
          <div className="footer-contact">
            <span className="footer-label">Say hi</span>
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            <a href={`tel:${SITE.phone.replace(/[^\d+]/g, '')}`}>{SITE.phone}</a>
            <span className="footer-socials">
              {SITE.socials.map((s) => <a key={s.label} href={s.href}>{s.label}</a>)}
            </span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {SITE.fullName}</span>
          <span>Site by Whelk Works</span>
        </div>
      </div>
    </footer>
  );
}
