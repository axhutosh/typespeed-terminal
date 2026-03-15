import React, { useRef, useEffect, useState } from 'react'
import { useTypingTest } from '../hooks/useTypingTest'
import { DURATIONS } from '../data/passages'
import { playKeystroke, resumeAudio } from '../utils/sound'
import styles from './TypingTest.module.css'

const DIFFICULTIES = ['easy', 'medium', 'hard']

export default function TypingTest({ sound = 'clicky' }) {
  const [difficulty, setDifficulty] = useState('medium')
  const [duration, setDuration] = useState(60)
  const inputRef = useRef(null)

  const { phase, timeLeft, wpm, accuracy, chars, progress, handleInput, reset } =
    useTypingTest(difficulty, duration)

  const handleReset = () => {
    reset(difficulty, duration)
    setTimeout(() => inputRef.current?.focus(), 50)
  }

  const handleDifficulty = (d) => {
    setDifficulty(d)
    reset(d, duration)
    setTimeout(() => inputRef.current?.focus(), 50)
  }

  const handleDuration = (dur) => {
    setDuration(dur)
    reset(difficulty, dur)
    setTimeout(() => inputRef.current?.focus(), 50)
  }

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <div className={styles.container}>
      {/* Controls */}
      <div className={styles.controls}>
        <div className={styles.controlGroup}>
          <span className={styles.controlLabel}>DIFFICULTY:</span>
          {DIFFICULTIES.map(d => (
            <button
              key={d}
              className={`${styles.pill} ${difficulty === d ? styles.pillActive : ''}`}
              onClick={() => handleDifficulty(d)}
            >
              {d.toUpperCase()}
            </button>
          ))}
        </div>
        <div className={styles.controlGroup}>
          <span className={styles.controlLabel}>TIME:</span>
          {DURATIONS.map(dur => (
            <button
              key={dur}
              className={`${styles.pill} ${duration === dur ? styles.pillActive : ''}`}
              onClick={() => handleDuration(dur)}
            >
              {dur}s
            </button>
          ))}
        </div>
      </div>

      {/* Stats Bar */}
      <div className={styles.statsRow}>
        <div className={styles.stat}>
          <div className={styles.statLabel}>WPM</div>
          <div className={styles.statVal}>{phase === 'idle' ? '--' : wpm}</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statLabel}>ACCURACY</div>
          <div className={styles.statVal}>{phase === 'idle' ? '--' : accuracy + '%'}</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statLabel}>TIME LEFT</div>
          <div className={`${styles.statVal} ${timeLeft <= 10 && phase === 'running' ? styles.urgent : ''}`}>
            {timeLeft}s
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className={styles.progressTrack}>
        <div className={styles.progressFill} style={{ width: progress + '%' }} />
      </div>

      {/* Passage Display */}
      <div className={styles.passage} onClick={() => inputRef.current?.focus()}>
        {chars.map(({ ch, state }, i) => (
          <span key={i} className={`${styles.char} ${styles[state]}`}>
            {ch === ' ' ? '\u00A0' : ch}
          </span>
        ))}
      </div>

      {/* Input */}
      <input
        ref={inputRef}
        className={styles.input}
        type="text"
        value={phase === 'done' ? '' : undefined}
        onChange={e => {
          resumeAudio()
          if (sound !== 'off') playKeystroke(sound)
          handleInput(e.target.value)
        }}
        placeholder={phase === 'idle' ? '> begin typing to start the timer...' : ''}
        disabled={phase === 'done'}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
      />

      {/* Result Panel */}
      {phase === 'done' && (
        <div className={styles.result}>
          <div className={styles.resultTitle}>// TEST COMPLETE</div>
          <div className={styles.resultBig}>{wpm} <span className={styles.resultUnit}>WPM</span></div>
          <div className={styles.resultSub}>ACCURACY: {accuracy}%</div>
        </div>
      )}

      {/* Reset Button */}
      <div className={styles.btnRow}>
        <button className={styles.btn} onClick={handleReset}>
          [ RESET ]
        </button>
        <span className={styles.status}>
          {phase === 'idle' && 'READY — START TYPING'}
          {phase === 'running' && 'TYPING IN PROGRESS...'}
          {phase === 'done' && 'COMPLETE — PRESS RESET FOR NEW TEST'}
        </span>
      </div>
    </div>
  )
}
