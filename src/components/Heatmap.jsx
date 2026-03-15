import React from 'react'
import { getMistakes } from '../utils/storage'
import styles from './Heatmap.module.css'

const KEYBOARD_ROWS = [
  ['q','w','e','r','t','y','u','i','o','p'],
  ['a','s','d','f','g','h','j','k','l'],
  ['z','x','c','v','b','n','m'],
]

export default function Heatmap() {
  const mistakes = getMistakes()
  const maxVal = Math.max(1, ...Object.values(mistakes))

  function getKeyStyle(key) {
    const count = mistakes[key] || 0
    if (!count) return {}
    const ratio = count / maxVal
    const r = 255
    const g = Math.round(255 - ratio * 255)
    const b = Math.round(255 - ratio * 255)
    return {
      background: `rgba(${r},${g},${g},${0.08 + ratio * 0.6})`,
      borderColor: `rgba(255,${g},${g},${0.3 + ratio * 0.5})`,
      color: `rgb(255,${Math.max(0, g - 30)},${Math.max(0, g - 30)})`,
    }
  }

  const total = Object.values(mistakes).reduce((a, b) => a + b, 0)
  const worstKeys = Object.entries(mistakes)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)

  return (
    <div className={styles.container}>
      <div className={styles.sectionTitle}>&gt; MISTAKE HEATMAP — DARKER RED = MORE ERRORS</div>

      <div className={styles.keyboard}>
        {KEYBOARD_ROWS.map((row, ri) => (
          <div key={ri} className={styles.row} style={{ paddingLeft: ri * 18 + 'px' }}>
            {row.map(key => {
              const count = mistakes[key] || 0
              return (
                <div key={key} className={styles.key} style={getKeyStyle(key)}>
                  <span className={styles.keyLabel}>{key.toUpperCase()}</span>
                  {count > 0 && <span className={styles.keyCount}>{count}</span>}
                </div>
              )
            })}
          </div>
        ))}
      </div>

      {total === 0 ? (
        <div className={styles.empty}>// NO MISTAKE DATA YET — COMPLETE SOME TESTS</div>
      ) : (
        <div className={styles.breakdown}>
          <div className={styles.sectionTitle} style={{ marginTop: 24 }}>&gt; TOP MISTAKES</div>
          <div className={styles.topList}>
            {worstKeys.map(([key, count]) => (
              <div key={key} className={styles.topItem}>
                <span className={styles.topKey}>{key.toUpperCase()}</span>
                <div className={styles.bar}>
                  <div
                    className={styles.barFill}
                    style={{ width: Math.round((count / maxVal) * 100) + '%' }}
                  />
                </div>
                <span className={styles.topCount}>{count}</span>
              </div>
            ))}
          </div>
          <div className={styles.totalNote}>TOTAL MISTAKES: {total}</div>
        </div>
      )}
    </div>
  )
}
