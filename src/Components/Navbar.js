import React from 'react'
import { NavLink } from 'react-router-dom'

const sections = [
  { label: 'Home', to: '/DAILY-NEWS-DEV/', end: true },
  { label: 'Business', to: '/DAILY-NEWS-DEV/business' },
  { label: 'Health', to: '/DAILY-NEWS-DEV/health' },
  { label: 'Science', to: '/DAILY-NEWS-DEV/science' },
  { label: 'Sports', to: '/DAILY-NEWS-DEV/sports' },
  { label: 'Technology', to: '/DAILY-NEWS-DEV/technology' },
  { label: 'WWE', to: '/DAILY-NEWS-DEV/WWE' }
];

const Navbar = () => (
  <header className="site-header">
    <div className="masthead">
      <NavLink className="brand" to="/DAILY-NEWS-DEV/" aria-label="Daily Dispatch home">
        <span className="brand-mark">D<span>.</span></span>
        <span className="brand-copy">
          <span className="brand-name">THE DAILY</span>
          <span className="brand-edition">DISPATCH <span>·</span> INDEPENDENT BY DESIGN</span>
        </span>
      </NavLink>
      <div className="masthead-note"><span className="live-dot" /> THE WORLD, IN FOCUS</div>
    </div>
    <nav className="section-nav" aria-label="News sections">
      <div className="section-nav-inner">
        {sections.map(({ label, to, end }) => (
          <NavLink
            key={label}
            className={({ isActive }) => `section-link${isActive ? ' active' : ''}`}
            to={to}
            end={end}
          >
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  </header>
);

export default Navbar;
