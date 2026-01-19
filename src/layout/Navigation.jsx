import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navigation() {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  const navLinks = [
    { to: '/repairs', label: 'Repairs' },
    { to: '/locations', label: 'Locations' },
    { to: '/about', label: 'About' },
    { to: '/faq', label: 'FAQ' },
  ]

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/')

  return (
    <>
      <nav className="desktop-nav">
        <ul style={{ 
          display: 'flex', 
          gap: 'var(--sp-md)', 
          listStyle: 'none', 
          margin: 0, 
          padding: 0, 
          alignItems: 'center' 
        }}>
          {navLinks.map(link => (
            <li key={link.to}>
              <Link 
                to={link.to} 
                style={{ 
                  fontSize: '15px',
                  fontWeight: isActive(link.to) ? 600 : 400,
                  color: isActive(link.to) ? 'var(--color-primary)' : 'inherit',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease'
                }}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link to="/contact">
              <button variant="primary" size="sm">Contact</button>
            </Link>
          </li>
        </ul>
      </nav>
      <button 
        className="mobile-nav-toggle"
        onClick={() => setMobileOpen(!mobileOpen)}
        style={{
          display: 'none',
          background: 'none',
          border: 'none',
          fontSize: '24px',
          cursor: 'pointer',
          padding: 'var(--sp-xs)'
        }}
        aria-label="Toggle menu"
      >
        {mobileOpen ? '✕' : '☰'}
      </button>
      {mobileOpen && (
        <nav className="mobile-nav" style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: 'var(--color-surface)',
          borderTop: '1px solid rgba(15, 23, 42, 0.06)',
          padding: 'var(--sp-md)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--sp-sm)'
        }}>
          {navLinks.map(link => (
            <Link 
              key={link.to}
              to={link.to} 
              onClick={() => setMobileOpen(false)}
              style={{ 
                fontSize: '16px',
                fontWeight: isActive(link.to) ? 600 : 400,
                color: isActive(link.to) ? 'var(--color-primary)' : 'inherit',
                textDecoration: 'none',
                padding: 'var(--sp-sm) 0'
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/contact" onClick={() => setMobileOpen(false)}>
            <button variant="primary" size="md" style={{ width: '100%', marginTop: 'var(--sp-xs)' }}>
              Contact
            </button>
          </Link>
        </nav>
      )}
    </>
  )
}
