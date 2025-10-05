import React, { createContext, useCallback, useEffect, useState } from "react";

// Context with default values
export const ThemeContext = createContext({
  theme: "system", // 'system' | 'dark' | 'light'
  setTheme: () => {},
  toggleTheme: () => {},
  isDark: false,
});

export function ThemeProvider({ children }) {
  // Load saved theme or default to 'system'
  const [theme, setThemeState] = useState(() => {
    try {
      return localStorage.getItem("theme") || "system";
    } catch {
      return "system";
    }
  });

  // Computed boolean: is dark mode active?
  const [isDark, setIsDark] = useState(() => {
    return (
      theme === "dark" ||
      (theme === "system" &&
        typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  });

  // Check system preference
  const prefersDark = () =>
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  // Apply theme to html.document
  const applyTheme = useCallback((t) => {
    const root = document.documentElement;
    const useDark = t === "dark" || (t === "system" && prefersDark());
    if (useDark) root.classList.add("dark");
    else root.classList.remove("dark");

    // Optional: update mobile meta theme color
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", useDark ? "#111827" : "#ffffff");

    setIsDark(useDark);
  }, []);

  // Set theme: save in state + localStorage + apply
  const setTheme = (t) => {
    setThemeState(t);
    try {
      localStorage.setItem("theme", t);
    } catch {}
    applyTheme(t);
  };

  // Cycle theme: system → dark → light → system ...
  const toggleTheme = () => {
    const order = ["system", "dark", "light"];
    const idx = order.indexOf(theme);
    const next = order[(idx + 1) % order.length];
    setTheme(next);
  };

  // Apply theme on mount and listen for system changes
  useEffect(() => {
    applyTheme(theme);

    if (typeof window === "undefined" || !window.matchMedia) return;

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => {
      if (theme === "system") applyTheme("system");
    };

    // Listen for system theme changes
    if (mq.addEventListener) mq.addEventListener("change", handleChange);
    else mq.addListener(handleChange);

    return () => {
      if (mq.removeEventListener)
        mq.removeEventListener("change", handleChange);
      else mq.removeListener(handleChange);
    };
  }, [theme, applyTheme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
}
