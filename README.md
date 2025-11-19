# React Music Player (Vite)

Small Vite + React demo music player with the following features:

## ✨ Features

- 🎨 Dark mode + glassmorphism UI
- ▶️ Play / Pause
- ⏭️ Next / Previous
- 🔀 Shuffle
- 🔁 Repeat (none / all / one)
- 📊 Progress bar with seek
- 🔊 Volume control + mute
- 📱 Dynamic playlist loaded from JSON
- 🎭 Animated rotating cover while playing
- 📱 **Mobile optimized** (responsive design, touch-friendly)
- 👆 **Swipe gestures** (swipe left/right on cover to change tracks)
- 🌐 **PWA support** (installable on mobile)
- 🔄 **Landscape mode** support

## 🚀 How to run

```bash
cd /home/mayamohammed/reactapp
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

## 📱 Mobile Features

- **Swipe gestures**: Swipe left on the cover to go to next track, swipe right for previous
- **PWA**: Install the app on your mobile device from the browser menu
- **Landscape mode**: Optimized layout when phone is horizontal
- **Touch-optimized**: Large tap targets, smooth animations

## 📝 Notes

- The playlist uses public sample audio files (SoundHelix). You can replace `src/data/playlist.json` with your own tracks.
- If the browser blocks autoplay, click Play manually once to allow sound.
- On mobile, add the app to your home screen for a native-like experience.

## 🎨 Customization

Edit `src/data/playlist.json` to add your own tracks:

```json
{
  "id": "4",
  "title": "Your Song",
  "artist": "Your Artist",
  "cover": "https://your-image-url.jpg",
  "audio": "https://your-audio-url.mp3",
  "duration": "3:45"
}
```

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
# musicapp
