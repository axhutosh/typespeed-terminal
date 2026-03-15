# ⌨️ TypeSpeed Terminal

A retro terminal-themed typing speed tracker. Green phosphor. Black background. No distractions — just you and the keyboard.

![Theme: Retro Terminal](https://img.shields.io/badge/theme-retro%20terminal-00ff41?style=flat-square&labelColor=0a0a0a)
![Stack: React + Vite](https://img.shields.io/badge/React%20%2B%20Vite-00ff41?style=flat-square&labelColor=0a0a0a)
![Storage: localStorage](https://img.shields.io/badge/storage-localStorage-00ff41?style=flat-square&labelColor=0a0a0a)

---

## Features

**Typing Test** — live WPM and accuracy as you type, character-by-character feedback (green = correct, red = wrong), countdown timer, progress bar, and auto-finish on passage completion.

**Stats Dashboard** — tracks your best WPM, average WPM, accuracy, and total tests taken. Visualized as line charts over time using Chart.js. All data persists in localStorage.

**Mistake Heatmap** — a visual keyboard that highlights which keys you mistype most, color-scaled from green to red. Includes a top-5 worst keys breakdown.

**Difficulty Modes** — Easy (common short sentences), Medium (tech/general), Hard (code-heavy with punctuation and symbols).

**Timer Options** — 15s / 30s / 60s / 120s.

---

## Tech Stack

| | |
|---|---|
| **React 18** | UI components and custom hooks |
| **Vite 5** | Dev server and bundler |
| **Chart.js 4** + react-chartjs-2 | Line charts for stats |
| **CSS Modules** | Scoped per-component styles |
| **localStorage** | Persistent session history, no backend |
| **Google Fonts** | VT323 + Share Tech Mono |

---

## Getting Started
```bash
npm install
npm run dev
# → http://localhost:5173
```
```bash
# production build
npm run build
npm run preview
```

---

## Customization

**Add passages** — edit `src/data/passages.js`, add strings to `easy`, `medium`, or `hard`.

**Change theme color** — swap `--green` in `src/index.css`:
```css
:root {
  --green: #00ff41;   /* try #ff6600 for amber, #00cfff for cyan */
}
```

**Add a timer duration** — add a number to `DURATIONS` in `src/data/passages.js`.

---

## Formulas
```
WPM      = (words typed) / (minutes elapsed)
Accuracy = (correct characters / total typed) × 100
```

---

## Roadmap

- [ ] Custom word list input
- [ ] Sound effects (keyclick, finish chime)
- [ ] Export stats as CSV
- [ ] Streak counter
- [ ] Leaderboard with backend