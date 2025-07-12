https://illja-popovics.github.io/scoresheet_app/

# 🎯 Score Tracker App

A clean and responsive React app to create custom games, add players, and track scores over multiple rounds. Supports both **numbered** and **named** rounds. All data is stored in your browser using `localStorage`.

---

## 🚀 Features

- 🎮 Create and delete custom games
- 🧑 Add, select, or remove players
- 🔢 Numbered or 🏷️ Named round types
- 📂 Save and persist scores locally
- 📊 View complete game history
- ✅ Responsive and mobile-friendly
- 🔔 Toast notifications for actions

---

## 📆 Installation

```bash
git clone https://github.com/your-username/score-tracker.git
cd score-tracker
npm install
npm start
```

---

## 🧱 Project Structure

```
src/
│
├── components/
│   ├── GameSelector/
│   ├── PlayerSelector/
│   ├── ScorePad/
│   └── GameHistory/
│
├── hooks/
│   ├── useGameFlow.js
│   ├── useGameList.js
│   ├── usePlayers.js
│   └── useScorePad.js
│
├── utils/
│   ├── storage.js
│   └── toast.js
│
├── App.jsx
└── index.js
```

---

## 🚰 Scripts

| Command          | Description                               |
| ---------------- | ----------------------------------------- |
| `npm start`      | Start development server                  |
| `npm run build`  | Create production build                   |
| `npm run deploy` | Deploy via GitHub Pages _(if configured)_ |

---

## 📂 Local Storage Keys

| Purpose      | Key Name      |
| ------------ | ------------- |
| Games        | `games`       |
| Players      | `players`     |
| Game History | `gameResults` |

---

## 📙 Customization Tips

- ✏️ Update the `roundType` default in `useScorePad.js` if you'd prefer named rounds by default.
- 🧪 Add tests with `React Testing Library` for future-proofing.
- 🌐 Want cloud storage? Add Firebase or Supabase integration.

---

## 🌐 Deployment (Optional)

```bash
npm install gh-pages --save-dev
```

In `package.json`:

```json
"homepage": "https://your-username.github.io/score-tracker",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

To deploy:

```bash
npm run deploy
```

---

## 📄 License

MIT – use it freely, modify as needed, and enjoy!

---
