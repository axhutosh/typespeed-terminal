import React, { useEffect, useRef } from 'react'
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, PointElement,
  LineElement, Filler, Tooltip
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { getHistory, getAggregates, clearAll } from '../utils/storage'
import styles from './Stats.module.css'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip)

const GREEN = '#00ff41'
const GREEN_DIM = 'rgba(0,255,65,0.5)'
const GREEN_FILL = 'rgba(0,255,65,0.07)'
const GRID = 'rgba(0,255,65,0.1)'

const chartOptions = {
  responsive: true,
  plugins: { legend: { display: false }, tooltip: {
    backgroundColor: '#0a0a0a',
    borderColor: GREEN,
    borderWidth: 1,
    titleColor: GREEN,
    bodyColor: GREEN_DIM,
    titleFont: { family: "'Share Tech Mono', monospace", size: 12 },
    bodyFont: { family: "'Share Tech Mono', monospace", size: 12 },
  }},
  scales: {
    x: {
      ticks: { color: GREEN_DIM, font: { family: "'Share Tech Mono', monospace", size: 11 } },
      grid: { color: GRID },
    },
    y: {
      ticks: { color: GREEN_DIM, font: { family: "'Share Tech Mono', monospace", size: 11 } },
      grid: { color: GRID },
    },
  },
}

function makeDataset(label, data, color) {
  return {
    label,
    data,
    borderColor: color,
    backgroundColor: GREEN_FILL,
    borderWidth: 2,
    pointBackgroundColor: color,
    pointRadius: 4,
    pointHoverRadius: 6,
    tension: 0.35,
    fill: true,
  }
}

export default function Stats({ onClear }) {
  const history = getHistory()
  const agg = getAggregates()
  const labels = history.map((_, i) => `#${i + 1}`)

  const wpmData = {
    labels,
    datasets: [makeDataset('WPM', history.map(h => h.wpm), GREEN)],
  }
  const accData = {
    labels,
    datasets: [makeDataset('Accuracy', history.map(h => h.accuracy), '#00cc33')],
  }

  const handleClear = () => {
    if (window.confirm('Clear all stored data?')) {
      clearAll()
      onClear?.()
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.statsRow}>
        <div className={styles.stat}>
          <div className={styles.statLabel}>BEST WPM</div>
          <div className={styles.statVal}>{agg.best || '--'}</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statLabel}>AVG WPM</div>
          <div className={styles.statVal}>{agg.avg || '--'}</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statLabel}>AVG ACCURACY</div>
          <div className={styles.statVal}>{agg.avgAcc ? agg.avgAcc + '%' : '--'}</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statLabel}>TESTS TAKEN</div>
          <div className={styles.statVal}>{agg.total}</div>
        </div>
      </div>

      {history.length === 0 ? (
        <div className={styles.empty}>// NO DATA YET — COMPLETE SOME TESTS FIRST</div>
      ) : (
        <>
          <div className={styles.sectionTitle}>&gt; WPM OVER TIME</div>
          <div className={styles.chartBox}>
            <Line data={wpmData} options={chartOptions} />
          </div>

          <div className={styles.sectionTitle}>&gt; ACCURACY OVER TIME</div>
          <div className={styles.chartBox}>
            <Line data={accData} options={chartOptions} />
          </div>
        </>
      )}

      <div className={styles.footer}>
        <button className={styles.clearBtn} onClick={handleClear}>
          [ CLEAR ALL DATA ]
        </button>
        <span className={styles.note}>stored in localStorage — no server</span>
      </div>
    </div>
  )
}
