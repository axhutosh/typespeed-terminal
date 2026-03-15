export const THEMES = {
  matrix: {
    label: 'MATRIX',
    '--primary': '#00ff41',
    '--primary-dim': 'rgba(0,255,65,0.6)',
    '--primary-faint': 'rgba(0,255,65,0.08)',
    '--primary-border': 'rgba(0,255,65,0.25)',
    '--bg': '#0a0a0a',
    '--bg-surface': 'rgba(0,255,65,0.05)',
  },
  amber: {
    label: 'AMBER',
    '--primary': '#ffb000',
    '--primary-dim': 'rgba(255,176,0,0.6)',
    '--primary-faint': 'rgba(255,176,0,0.08)',
    '--primary-border': 'rgba(255,176,0,0.25)',
    '--bg': '#0d0900',
    '--bg-surface': 'rgba(255,176,0,0.05)',
  },
  cyan: {
    label: 'CYAN',
    '--primary': '#00cfff',
    '--primary-dim': 'rgba(0,207,255,0.6)',
    '--primary-faint': 'rgba(0,207,255,0.08)',
    '--primary-border': 'rgba(0,207,255,0.25)',
    '--bg': '#00080d',
    '--bg-surface': 'rgba(0,207,255,0.05)',
  },
}

export function applyTheme(themeKey) {
  const theme = THEMES[themeKey]
  if (!theme) return
  const root = document.documentElement
  Object.entries(theme).forEach(([k, v]) => {
    if (k !== 'label') root.style.setProperty(k, v)
  })
  localStorage.setItem('ts_theme', themeKey)
}

export function loadSavedTheme() {
  const saved = localStorage.getItem('ts_theme') || 'matrix'
  applyTheme(saved)
  return saved
}
