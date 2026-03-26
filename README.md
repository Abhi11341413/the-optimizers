# DeepSpace Focus Workspace 🎧⏱️

A single-page, fully responsive focus workspace designed for deep work. It combines a seamless third-party Lofi music player, a Pomodoro timer, and a persistent task management panel into one cohesive, Spotify-inspired interface.

## Tech Stack
* **Frontend:** React + Vite
* **Styling:** Tailwind CSS
* **Icons:** Lucide-React
* **State Management:** React Hooks (`useState`, `useEffect`, `useRef`)
* **Storage:** Browser `localStorage` (for task persistence)
* **Audio:** HTML5 Native Audio API natively streaming third-party `.mp3` / Icecast endpoints.

## Bounty Features Attempted
1. **Animated SVG Timer Ring (+15 Points):** * Custom-built SVG circle using `stroke-dashoffset` math to create a smooth, real-time depleting progress ring wrapped around the countdown timer.
2. **Keyboard Shortcut System (+10 Points):** * Implemented global event listeners for seamless control without a mouse:
     * `Spacebar`: Play/Pause music
     * `S`: Start/Pause Pomodoro Timer
     * `N`: Focus the "Add Task" input field
     * `C`: Clear all completed tasks

## Build & Run Instructions
To run this project locally:

1. Clone the repository:
   ```bash
   git clone <your-github-repo-url>