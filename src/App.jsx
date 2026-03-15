import React, { useState } from 'react'
import Header from './components/Header'
import TypingTest from './components/TypingTest'
import Stats from './components/Stats'
import Heatmap from './components/Heatmap'
import { loadSavedTheme, applyTheme } from './utils/themes'
import styles from './App.module.css'

export default function App() {
  const [tab, setTab] = useState('TEST')
  const [statsKey, setStatsKey] = useState(0)
  const [theme, setTheme] = useState(() => loadSavedTheme())
  const [sound, setSound] = useState(() => localStorage.getItem('ts_sound') || 'clicky')

  const handleTheme = (t) => { applyTheme(t); setTheme(t) }
  const handleSound = (s) => { localStorage.setItem('ts_sound', s); setSound(s) }

  return (
    <div className={styles.app}>
      <div className={styles.scanline} />
      <div className={styles.window}>
        <Header
          activeTab={tab} onTab={setTab}
          theme={theme} onTheme={handleTheme}
          sound={sound} onSound={handleSound}
        />
        <main className={styles.main}>
          {tab === 'TEST' && <TypingTest sound={sound} />}
          {tab === 'STATS' && <Stats key={statsKey} onClear={() => setStatsKey(k => k + 1)} />}
          {tab === 'HEATMAP' && <Heatmap key={statsKey} />}
        </main>
        <footer className={styles.footer}>
          <span>// TYPESPEED TERMINAL — DATA STORED LOCALLY</span>
          <span>WPM = (CHARS / 5) / MINUTES</span>
        </footer>
      </div>
    </div>
  )
}
