import {
  BarChart3,
  Blocks,
  BookOpen,
  FlaskConical,
  Home,
  Library,
  Menu,
  X,
} from 'lucide-react'
import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { useLearner } from '../context/LearnerContext'
import { calculateCompletion } from '../lib/engine'
import { Brand } from './Brand'

const navItems = [
  { to: '/home', label: 'Home', icon: Home },
  { to: '/path', label: 'My path', icon: BookOpen },
  { to: '/practice', label: 'Practice', icon: FlaskConical },
  { to: '/library', label: 'Library', icon: Library },
  { to: '/studio', label: 'Studio', icon: Blocks },
  { to: '/impact', label: 'Impact', icon: BarChart3 },
]

export function AppShell() {
  const { state } = useLearner()
  const [menuOpen, setMenuOpen] = useState(false)
  const completion = calculateCompletion(state)

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <header className="app-header">
        <Brand />
        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `nav-link ${isActive ? 'nav-link--active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="app-header__actions">
          <NavLink className="path-progress" to="/path" aria-label={`Path ${completion}% complete`}>
            <span className="path-progress__dot" aria-hidden="true" />
            <span>{completion}% complete</span>
          </NavLink>
          <button
            className="icon-button menu-button"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {menuOpen && (
        <nav id="mobile-menu" className="mobile-menu" aria-label="Mobile navigation">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => (isActive ? 'active' : '')}
                onClick={() => setMenuOpen(false)}
              >
                <Icon size={18} aria-hidden="true" />
                {item.label}
              </NavLink>
            )
          })}
        </nav>
      )}

      <main id="main-content" tabIndex={-1}>
        <Outlet />
      </main>

      <footer className="app-footer">
        <div>
          <Brand />
          <p>Free, model-neutral practice for practical AI judgment.</p>
        </div>
        <div className="app-footer__links">
          <NavLink to="/about">Method &amp; sources</NavLink>
          <NavLink to="/about#privacy">Privacy</NavLink>
          <a href="https://github.com/edcadet10/brief-and-verify" target="_blank" rel="noreferrer">Source code</a>
        </div>
      </footer>
    </div>
  )
}
