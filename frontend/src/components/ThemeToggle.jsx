import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

/*
  This component shows:
  - a cycle-button (click to cycle system->dark->light)
  - a small select (optional, visible on larger screens) for explicit choice
*/

export default function ThemeToggle() {
  const { theme, setTheme, toggleTheme, isDark } = useContext(ThemeContext);

  // simple emoji icons. Replace with SVG icons if you prefer.
  const icon = theme === "system" ? "🖥️" : theme === "dark" ? "🌙" : "☀️";

  return (
    <div className="flex items-center gap-2">
      {/* Cycle button */}
      <button
        aria-label="Toggle theme"
        title={`Theme: ${theme}`}
        onClick={toggleTheme}
        className="p-2 rounded-md border dark:border-gray-700 bg-white/70 dark:bg-gray-800/70"
      >
        <span className="text-lg">{icon}</span>
      </button>

      {/* Explicit selector (optional) */}
      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
        className="hidden sm:block text-sm p-1 rounded border dark:bg-gray-800 dark:border-gray-700"
        aria-label="Select theme"
      >
        <option value="system">System</option>
        <option value="dark">Dark</option>
        <option value="light">Light</option>
      </select>
    </div>
  );
}
