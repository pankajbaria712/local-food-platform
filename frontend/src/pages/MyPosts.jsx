import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function MyPosts() {
  const { theme, isDark } = useContext(ThemeContext);

  const bgClass =
    theme === "dark"
      ? "bg-gray-950 text-gray-100"
      : theme === "light"
      ? "bg-gray-100 text-gray-900"
      : isDark
      ? "bg-gray-900 text-gray-100"
      : "bg-gray-100 text-gray-900";

  return (
    <div className={`min-h-[60vh] p-8 ${bgClass}`}>
      <h1 className="text-3xl font-bold mb-4">My Posts</h1>
      <p className="text-gray-500">
        Your donations will appear here once you post them.
      </p>
    </div>
  );
}
