import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Logo from './Logo.jsx';
import { SITE } from '../site.js';

const LINKS = [
  ['/#menu', 'Menu'],
  ['/#find-us', 'Find the truck'],
  ['/#catering', 'Catering'],
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const close = () => setOpen(false);
  return (
    <header className="site-header">
      <div className="wrap header-row">
        <Link to="/" className="brand" onClick={close}>
          <Logo />
          <span className="disp">{SITE.name}</span>
        </Link>
        <nav className={'nav' + (open ? ' is-open' : '')} aria-label="Main" id="main-nav">
          {LINKS.map(([to, label]) => <Link key={to} to={to} onClick={close}>{label}</Link>)}
          <NavLink to="/about" onClick={close} aria-current={pathname === '/about' ? 'page' : undefined}>About</NavLink>
        </nav>
        <div className="header-actions">
          <Link className="btn btn-amber btn-sm" to="/#catering" onClick={close}>Book catering</Link>
          <button type="button" className="menu-toggle" aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen(!open)}>
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
            <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
