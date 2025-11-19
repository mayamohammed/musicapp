import React, { useState, useEffect } from 'react'
import Player from './components/Player'
import logo from './assets/logo.png'
import './index.css'

export default function App() {
  const [dark, setDark] = useState(true)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  return (
    <div className="app-root">
      <header className="app-header">
        <div className="app-logo">
          <img src={logo} alt="Music Player" />
        </div>
        <div className="theme-toggle">
          <label>
            <input
              type="checkbox"
              checked={dark}
              onChange={() => setDark((s) => !s)}
            />{' '}
            Dark
          </label>
        </div>
      </header>

      <main className="app-main">
        <Player />
      </main>
    </div>
  )
}
