# ⌨️ TypeSpeed Terminal

A retro terminal-themed typing speed tracker built with React + Vite + Chart.js.

![Theme: Green on Black Terminal](https://img.shields.io/badge/theme-retro%20terminal-00ff41?style=flat-square&labelColor=0a0a0a)
![Stack: React + Vite](https://img.shields.io/badge/stack-React%20%2B%20Vite-00ff41?style=flat-square&labelColor=0a0a0a)

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Start dev server
```bash
npm run dev
```

### 3. Open in browser
```
http://localhost:5173
```

### 4. Build for production
```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
typespeed/
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx              # React entry point
    ├── index.css             # Global styles + CSS variables
    ├── App.jsx               # Root component + tab routing
    ├── App.module.css
    │
    ├── data/
    │   └── passages.js       # Word passages by difficulty + durations
    │
    ├── hooks/
    │   └── useTypingTest.js  # All game logic (timer, WPM, accuracy)
    │
    ├── utils/
    │   └── storage.js        # localStorage helpers
    │
    └── components/
        ├── Header.jsx/.css       # Top nav + tab switcher
        ├── TypingTest.jsx/.css   # Main typing test UI
        ├── Stats.jsx/.css        # Charts + aggregate stats
        └── Heatmap.jsx/.css      # Per-key mistake heatmap
```

---

## ✨ Features

### TEST Tab
- **Live WPM** — updates every 200ms as you type
- **Live Accuracy** — correct chars / total chars typed
- **Countdown timer** — 15 / 30 / 60 / 120 seconds
- **Difficulty modes** — Easy / Medium / Hard passages
- **Character feedback** — green (correct), red (wrong), blinking cursor
- **Progress bar** — fills as you complete the passage
- **Auto-finish** — ends on timer or passage completion

### STATS Tab
- Best WPM, average WPM, average accuracy, total tests
- **WPM over time** line chart (Chart.js)
- **Accuracy over time** line chart
- Stores up to 50 sessions in localStorage
- Clear all data button

### HEATMAP Tab
- Visual keyboard showing which keys you mistype most
- Color scale: green → red based on error frequency
- Top 5 worst keys with bar chart breakdown
- Persists across sessions via localStorage

---

## 🧮 Formulas

```
WPM      = (words typed) / (minutes elapsed)
Accuracy = (correct characters / total characters typed) × 100
```

---

## 🛠 Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 | UI components + hooks |
| Vite 5 | Dev server + bundler |
| Chart.js 4 + react-chartjs-2 | Line charts in Stats tab |
| CSS Modules | Scoped component styles |
| localStorage | Persistent session history |
| Google Fonts | VT323 + Share Tech Mono |

---

## 🔧 Extending the Project

**Add more passages:**
Edit `src/data/passages.js` — add strings to `easy`, `medium`, or `hard` arrays.

**Add a new difficulty:**
```js
// src/data/passages.js
export const PASSAGES = {
  easy: [...],
  medium: [...],
  hard: [...],
  insane: ["your super hard passages here"],  // ← add this
}
```
Then add `'insane'` to the `DIFFICULTIES` array in `TypingTest.jsx`.

**Add a custom timer duration:**
```js
// src/data/passages.js
export const DURATIONS = [15, 30, 60, 120, 180]  // add 180
```

**Change the color theme:**
Edit the CSS variables in `src/index.css`:
```css
:root {
  --green: #00ff41;      /* primary color */
  --green-dim: ...;      /* muted text */
  --green-faint: ...;    /* surface fills */
  --green-border: ...;   /* borders */
}
```

---

## 📦 Dependencies

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "chart.js": "^4.4.0",
  "react-chartjs-2": "^5.2.0",
  "vite": "^5.0.0",
  "@vitejs/plugin-react": "^4.2.0"
}
```

---

## 💡 Ideas for Next Features

- [ ] Custom word list input
- [ ] Multiplayer mode (WebSockets)
- [ ] Export stats as CSV
- [ ] Dark/light theme toggle
- [ ] Streak counter (days in a row practiced)
- [ ] Sound effects (keyclick, finish chime)
- [ ] Leaderboard (with a backend)
