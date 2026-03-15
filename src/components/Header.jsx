import React from 'react'
import styles from './Header.module.css'

export default function Header({ activeTab, onTab }) {
  const tabs = ['TEST', 'STATS', 'HEATMAP']
  return (
    <header className={styles.header}>
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
    </header>
  )
}
