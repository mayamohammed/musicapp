import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Player from './components/Player'
import logo from './assets/logo.png'
import './index.css'

export default function App() {
  const [dark, setDark] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  return (
    <div className="app-root">
      <header className="app-header">
        <button 
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>

        <div className="app-logo">
          <img src={logo} alt="Anasheed Player" />
        </div>

        <div className="theme-toggle">
          <label>
            <input
              type="checkbox"
              checked={dark}
              onChange={() => setDark((s) => !s)}
            />
          </label>
        </div>
      </header>

      {menuOpen && (
        <>
          <div className="menu-overlay" onClick={() => setMenuOpen(false)} />
          <div className="dropdown-menu">
            <a 
              href="https://play.google.com/store/apps/dev?id=5390081211576260098" 
              target="_blank" 
              rel="noopener noreferrer"
              className="menu-item"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
              </svg>
              Play Store
            </a>
            <Link 
              to="/privacy-policy" 
              className="menu-item"
              onClick={() => setMenuOpen(false)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              Politique de confidentialité
            </Link>
          </div>
        </>
      )}

      <main className="app-main">
        <Player />
      </main>
    </div>
  )
}
