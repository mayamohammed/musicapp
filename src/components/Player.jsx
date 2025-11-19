import React, { useEffect, useRef, useState } from 'react'
import playlistData from '../data/playlist.json'
import logo from '../assets/logo.png'
import { NotificationService } from '../services/notifications'

export default function Player() {
  const audioRef = useRef(null)
  const coverRef = useRef(null)
  const [playlist] = useState(playlistData)
  const [index, setIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.9)
  const [muted, setMuted] = useState(false)
  const [shuffle, setShuffle] = useState(false)
  const [repeat, setRepeat] = useState('none') // 'none' | 'one' | 'all'

  const current = playlist[index]

  // Initialize notifications
  useEffect(() => {
    NotificationService.init()
    NotificationService.registerActionTypes()
    
    // Handle notification actions
    NotificationService.onNotificationAction((actionId) => {
      if (actionId === 'play-pause') togglePlay()
      if (actionId === 'next') handleNext()
      if (actionId === 'previous') handlePrev()
    })
  }, [])

  // Update notification when track changes or play state changes
  useEffect(() => {
    if (isPlaying) {
      NotificationService.showNowPlayingNotification(current)
    } else {
      NotificationService.clearNotification()
    }
  }, [isPlaying, current])

  // Swipe gesture handling
  useEffect(() => {
    const cover = coverRef.current
    if (!cover) return

    let touchStartX = 0
    let touchEndX = 0

    const handleTouchStart = (e) => {
      touchStartX = e.changedTouches[0].screenX
    }

    const handleTouchEnd = (e) => {
      touchEndX = e.changedTouches[0].screenX
      handleSwipe()
    }

    const handleSwipe = () => {
      const swipeThreshold = 50
      if (touchEndX < touchStartX - swipeThreshold) {
        // Swipe left -> Next
        handleNext()
      }
      if (touchEndX > touchStartX + swipeThreshold) {
        // Swipe right -> Previous
        handlePrev()
      }
    }

    cover.addEventListener('touchstart', handleTouchStart)
    cover.addEventListener('touchend', handleTouchEnd)

    return () => {
      cover.removeEventListener('touchstart', handleTouchStart)
      cover.removeEventListener('touchend', handleTouchEnd)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, shuffle, repeat, playlist.length])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = volume
    audio.muted = muted
  }, [volume, muted])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const onTime = () => {
      setProgress(audio.currentTime)
      setDuration(audio.duration || 0)
    }

    const onEnded = () => {
      if (repeat === 'one') {
        audio.currentTime = 0
        audio.play()
        return
      }

      handleNext()
    }

    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('loadedmetadata', onTime)
    audio.addEventListener('ended', onEnded)

    return () => {
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('loadedmetadata', onTime)
      audio.removeEventListener('ended', onEnded)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, repeat, shuffle])

  useEffect(() => {
    // autoplay when track changes if already playing
    const audio = audioRef.current
    if (!audio) return
    audio.pause()
    audio.load()
    if (isPlaying) {
      const p = audio.play()
      if (p && p.catch) p.catch(() => setIsPlaying(false))
    }
  }, [index])

  function togglePlay() {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false))
    }
  }

  function handlePrev() {
    if (audioRef.current.currentTime > 3) {
      audioRef.current.currentTime = 0
      return
    }
    if (shuffle) {
      setIndex((i) => Math.floor(Math.random() * playlist.length))
      return
    }
    setIndex((i) => (i - 1 + playlist.length) % playlist.length)
  }

  function handleNext() {
    if (shuffle) {
      setIndex((i) => {
        let next = Math.floor(Math.random() * playlist.length)
        if (next === i && playlist.length > 1) next = (i + 1) % playlist.length
        return next
      })
      return
    }

    setIndex((i) => {
      const next = i + 1
      if (next >= playlist.length) {
        if (repeat === 'all') return 0
        return i // stop at last
      }
      return next
    })
  }

  function seek(e) {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = Number(e.target.value)
    setProgress(audio.currentTime)
  }

  const formatTime = (t) => {
    if (!t || isNaN(t)) return '0:00'
    const m = Math.floor(t / 60)
    const s = Math.floor(t % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }

  return (
    <div className="player glass">
      <audio ref={audioRef} src={current.audio} preload="metadata" />

      <div className="player-left">
        <div ref={coverRef} className={`cover ${isPlaying ? 'rotating' : ''}`}>
          <img src={current.cover} alt={current.title} />
          <div className="swipe-hint">← Swipe →</div>
        </div>
        <div className="meta">
          <h3>{current.title}</h3>
          <p className="artist">{current.artist}</p>
        </div>
      </div>

      <div className="player-center">
        <div className="controls">
          <button onClick={() => setShuffle((s) => !s)} className={`ctrl-btn ${shuffle ? 'active' : ''}`} title="Shuffle">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="16 3 21 3 21 8"></polyline>
              <line x1="4" y1="20" x2="21" y2="3"></line>
              <polyline points="21 16 21 21 16 21"></polyline>
              <line x1="15" y1="15" x2="21" y2="21"></line>
              <line x1="4" y1="4" x2="9" y2="9"></line>
            </svg>
          </button>
          
          <button onClick={handlePrev} className="ctrl-btn prev-btn" title="Previous">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 6h2v12H6V6zm3.5 6l8.5 6V6l-8.5 6z"/>
            </svg>
          </button>
          
          <button onClick={togglePlay} className="ctrl-btn play-btn" title="Play/Pause">
            {isPlaying ? (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
              </svg>
            ) : (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg>
            )}
          </button>
          
          <button onClick={handleNext} className="ctrl-btn next-btn" title="Next">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 18h2V6h-2v12zM6 18l8.5-6L6 6v12z"/>
            </svg>
          </button>
          
          <button
            onClick={() => setRepeat((r) => (r === 'none' ? 'all' : r === 'all' ? 'one' : 'none'))}
            className={`ctrl-btn ${repeat !== 'none' ? 'active' : ''}`}
            title="Repeat"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="17 1 21 5 17 9"></polyline>
              <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
              <polyline points="7 23 3 19 7 15"></polyline>
              <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
            </svg>
            {repeat === 'one' && <span className="repeat-badge">1</span>}
          </button>
        </div>

        <div className="progress">
          <span className="time">{formatTime(progress)}</span>
          <input
            type="range"
            min={0}
            max={duration || 0}
            value={progress}
            onChange={seek}
            step="0.1"
            style={{
              '--progress-percent': `${duration > 0 ? (progress / duration) * 100 : 0}%`
            }}
          />
          <span className="time">{formatTime(duration)}</span>
        </div>

        <div className="volume">
          <button onClick={() => setMuted((m) => !m)} title="Mute">
            {muted ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
              </svg>
            )}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={muted ? 0 : volume}
            onChange={(e) => { setVolume(Number(e.target.value)); setMuted(false) }}
            style={{
              '--volume-percent': `${volume * 100}%`
            }}
          />
        </div>
      </div>

      <aside className="player-right">
        <h4 className="playlist-header">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="8" y1="6" x2="21" y2="6"></line>
            <line x1="8" y1="12" x2="21" y2="12"></line>
            <line x1="8" y1="18" x2="21" y2="18"></line>
            <line x1="3" y1="6" x2="3.01" y2="6"></line>
            <line x1="3" y1="12" x2="3.01" y2="12"></line>
            <line x1="3" y1="18" x2="3.01" y2="18"></line>
          </svg>
          Playlist
        </h4>
        <ul className="playlist">
          {playlist.map((t, i) => (
            <li key={t.id} className={i === index ? 'active' : ''} onClick={() => setIndex(i)}>
              <img src={t.cover} alt="cover" />
              <div className="pmeta">
                <div className="ptitle">{t.title}</div>
                <div className="partist">{t.artist}</div>
              </div>
              <div className="pduration">{t.duration || ''}</div>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  )
}
