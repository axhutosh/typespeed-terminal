import React, { useState } from 'react'
import Header from './components/Header'
import TypingTest from './components/TypingTest'
import Stats from './components/Stats'
import Heatmap from './components/Heatmap'
import styles from './App.module.css'

export default function App() {
  const [tab, setTab] = useState('TEST')
  const [statsKey, setStatsKey] = useState(0)

  return (
    <div className={styles.app}>
      {/* scanline overlay */}
      <div className={styles.scanline} />

      <div className={styles.window}>
        <Header activeTab={tab} onTab={setTab} />
        <main className={styles.main}>
          {tab === 'TEST' && <TypingTest />}
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
