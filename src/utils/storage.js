const HISTORY_KEY = 'ts_history'
const MISTAKES_KEY = 'ts_mistakes'

export function getHistory() {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]')
  } catch {
    return []
  }
}

export function saveResult(entry) {
  try {
    const h = getHistory()
    h.push({ ...entry, ts: Date.now() })
    if (h.length > 50) h.splice(0, h.length - 50)
    localStorage.setItem(HISTORY_KEY, JSON.stringify(h))
  } catch {}
}

export function getMistakes() {
  try {
    return JSON.parse(localStorage.getItem(MISTAKES_KEY) || '{}')
  } catch {
    return {}
  }
}

export function saveMistakes(map) {
  try {
    const existing = getMistakes()
    const merged = { ...existing }
    Object.entries(map).forEach(([k, v]) => {
      merged[k] = (merged[k] || 0) + v
    })
    localStorage.setItem(MISTAKES_KEY, JSON.stringify(merged))
  } catch {}
}

export function clearAll() {
  try {
    localStorage.removeItem(HISTORY_KEY)
    localStorage.removeItem(MISTAKES_KEY)
  } catch {}
}

export function getAggregates() {
  const h = getHistory()
  if (!h.length) return { best: 0, avg: 0, total: 0, avgAcc: 0 }
  const best = Math.max(...h.map(x => x.wpm))
  const avg = Math.round(h.reduce((a, b) => a + b.wpm, 0) / h.length)
  const avgAcc = Math.round(h.reduce((a, b) => a + b.accuracy, 0) / h.length)
  return { best, avg, total: h.length, avgAcc }
}
