import React from 'react'
import { THEMES } from '../utils/themes'
import styles from './Header.module.css'

const SOUND_OPTIONS = [
  { key: 'off',     label: 'OFF' },
  { key: 'clicky',  label: 'CLICKY' },
  { key: 'thocky',  label: 'THOCKY' },
]

export default function Header({ activeTab, onTab, theme, onTheme, sound, onSound }) {
  const tabs = ['TEST', 'STATS', 'HEATMAP']

  return (
    <header className={styles.header}>
      {/* top row — logo + tabs */}
      <div className={styles.topRow}>
        <div className={styles.logo}>
          <span className={styles.prompt}>&gt;</span> TYPESPEED_TERMINAL
          <span className={styles.version}>v1.0</span>
        </div>
        <nav className={styles.tabs}>
          {tabs.map(t => (
            <button
              key={t}
              className={`${styles.tab} ${activeTab === t ? styles.active : ''}`}
              onClick={() => onTab(t)}
            >
              {t}
            </button>
          ))}
        </nav>
      </div>

      {/* bottom row — theme + sound */}
      <div className={styles.controlRow}>
        <div className={styles.controlGroup}>
          <span className={styles.controlLabel}>THEME</span>
          {Object.entries(THEMES).map(([key, val]) => (
            <button
              key={key}
              className={`${styles.chip} ${theme === key ? styles.chipActive : ''}`}
              style={theme === key ? { borderColor: val['--primary'], color: val['--primary'] } : {}}
              onClick={() => onTheme(key)}
            >
              <span
                className={styles.dot}
                style={{ background: val['--primary'] }}
              />
              {val.label}
            </button>
          ))}
        </div>

        <div className={styles.controlGroup}>
          <span className={styles.controlLabel}>SOUND</span>
          {SOUND_OPTIONS.map(({ key, label }) => (
            <button
              key={key}
              className={`${styles.chip} ${sound === key ? styles.chipActive : ''}`}
              onClick={() => onSound(key)}
            >
              {key === 'clicky' && <span className={styles.icon}>⌨</span>}
              {key === 'thocky' && <span className={styles.icon}>▣</span>}
              {key === 'off'    && <span className={styles.icon}>✕</span>}
              {label}
            </button>
          ))}
        </div>
      </div>
    </header>
  )
}
