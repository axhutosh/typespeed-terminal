import { useState, useEffect, useRef, useCallback } from 'react'
import { PASSAGES } from '../data/passages'
import { saveResult, saveMistakes } from '../utils/storage'

function pickPassage(difficulty) {
  const list = PASSAGES[difficulty]
  return list[Math.floor(Math.random() * list.length)]
}

export function useTypingTest(difficulty = 'medium', duration = 60) {
  const [passage, setPassage] = useState(() => pickPassage(difficulty))
  const [typed, setTyped] = useState('')
  const [phase, setPhase] = useState('idle') // idle | running | done
  const [timeLeft, setTimeLeft] = useState(duration)
  const [wpm, setWpm] = useState(0)
  const [accuracy, setAccuracy] = useState(100)
  const mistakeMapRef = useRef({})
  const startTimeRef = useRef(null)
  const intervalRef = useRef(null)

  const calcStats = useCallback((currentTyped, startTime) => {
    const elapsed = (Date.now() - startTime) / 60000
    const words = currentTyped.trim().split(/\s+/).filter(Boolean).length
    const newWpm = elapsed > 0 ? Math.round(words / elapsed) : 0
    let correct = 0
    for (let i = 0; i < currentTyped.length; i++) {
      if (currentTyped[i] === passage[i]) correct++
    }
    const newAcc = currentTyped.length > 0
      ? Math.round((correct / currentTyped.length) * 100)
      : 100
    setWpm(newWpm)
    setAccuracy(newAcc)
    return { wpm: newWpm, accuracy: newAcc }
  }, [passage])

  const finish = useCallback((currentTyped) => {
    clearInterval(intervalRef.current)
    setPhase('done')
    const { wpm: finalWpm, accuracy: finalAcc } = calcStats(currentTyped, startTimeRef.current)
    saveResult({ wpm: finalWpm, accuracy: finalAcc, difficulty, duration })
    saveMistakes(mistakeMapRef.current)
  }, [calcStats, difficulty, duration])

  const handleInput = useCallback((value) => {
    if (phase === 'done') return

    if (phase === 'idle') {
      setPhase('running')
      startTimeRef.current = Date.now()
      intervalRef.current = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000)
        const left = Math.max(0, duration - elapsed)
        setTimeLeft(left)
        if (left <= 0) {
          setTyped(prev => {
            finish(prev)
            return prev
          })
        }
      }, 200)
    }

    // track mistakes
    for (let i = 0; i < value.length; i++) {
      if (value[i] !== passage[i] && passage[i] && passage[i] !== ' ') {
        mistakeMapRef.current[passage[i]] = (mistakeMapRef.current[passage[i]] || 0) + 1
      }
    }

    setTyped(value)
    calcStats(value, startTimeRef.current)

    if (value.length >= passage.length) {
      finish(value)
    }
  }, [phase, passage, duration, calcStats, finish])

  const reset = useCallback((newDifficulty, newDuration) => {
    clearInterval(intervalRef.current)
    mistakeMapRef.current = {}
    const d = newDifficulty || difficulty
    setPassage(pickPassage(d))
    setTyped('')
    setPhase('idle')
    setTimeLeft(newDuration || duration)
    setWpm(0)
    setAccuracy(100)
    startTimeRef.current = null
  }, [difficulty, duration])

  useEffect(() => () => clearInterval(intervalRef.current), [])

  // character-level render data
  const chars = passage.split('').map((ch, i) => {
    if (i < typed.length) {
      return { ch, state: typed[i] === ch ? 'correct' : 'wrong' }
    }
    if (i === typed.length) return { ch, state: 'cursor' }
    return { ch, state: 'pending' }
  })

  const progress = Math.min((typed.length / passage.length) * 100, 100)

  return { passage, typed, phase, timeLeft, wpm, accuracy, chars, progress, handleInput, reset }
}
