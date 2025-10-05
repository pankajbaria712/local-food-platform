import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { Sun, Moon, Monitor, Menu, X } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const { theme, toggleTheme, isDark } = useContext(ThemeContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Load user/token once
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    let storedToken = localStorage.getItem("token");
    if (!storedToken || storedToken === "undefined" || storedToken === "null")
      storedToken = null;
    if (storedToken && storedToken.startsWith('"') && storedToken.endsWith('"'))
      storedToken = storedToken.slice(1, -1);
    setUser(storedUser ? JSON.parse(storedUser) : null);
    setToken(storedToken);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    navigate("/");
    setMenuOpen(false);
  };

  const baseLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  const authLinks = !token
    ? [
        { to: "/login", label: "Login" },
        { to: "/register", label: "Register", special: true },
      ]
    : user?.role === "donor"
    ? [
        { to: "/donate", label: "Donate Food" },
        { to: "/myposts", label: "My Posts" },
        { label: "Logout", action: handleLogout, danger: true },
      ]
    : [
        { to: "/browse", label: "Browse Food" },
        { to: "/claimed", label: "Claimed Food" },
        { label: "Logout", action: handleLogout, danger: true },
      ];

  // Theme icon
  // Map to intuitive icons: Monitor=system, Sun=light, Moon=dark
  const themeIcon =
    theme === "system" ? (
      <Monitor size={18} />
    ) : theme === "dark" ? (
      <Moon size={18} />
    ) : (
      <Sun size={18} />
    );

  // Helper: get navbar classes depending on theme & isDark
  const navbarClasses = () => {
    if (theme === "light") return "bg-white text-gray-700 border-gray-100";
    if (theme === "dark") return "bg-gray-950 text-gray-100 border-gray-800"; // darker than system
    // system mode
    return isDark
      ? "bg-gray-900 text-gray-300 border-gray-800" // system dark
      : "bg-white text-gray-700 border-gray-100"; // system light
  };
  const hoverTextClass = (special = false) => {
    if (special) return "";
    if (theme === "light") return "hover:text-green-600";
    if (theme === "dark") return "dark:hover:text-green-400";
    return isDark ? "dark:hover:text-green-400" : "hover:text-green-600";
  };

  const buttonBgClass = () => {
    if (theme === "light") return "bg-gray-200";
    if (theme === "dark") return "bg-gray-700";
    return isDark ? "bg-gray-800" : "bg-gray-200";
  };

  const handleLinkClick = (action) => {
    if (action) action();
    setMenuOpen(false);
  };

  return (
    <nav
      className={`sticky top-0 z-50 backdrop-blur-md shadow-md border-b transition-colors duration-300 ${navbarClasses()}`}
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-extrabold bg-gradient-to-r from-green-500 to-lime-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-200"
          onClick={() => setMenuOpen(false)}
        >
          FoodShare
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6 font-medium">
          {[...baseLinks, ...authLinks].map((link, idx) =>
            link.action ? (
              <button
                key={idx}
                onClick={link.action}
                className={`transition-colors ${
                  link.danger
                    ? "text-red-500 hover:text-red-600"
                    : hoverTextClass()
                }`}
              >
                {link.label}
              </button>
            ) : (
              <Link
                key={link.to}
                to={link.to}
                className={`relative transition-colors ${
                  link.special
                    ? "px-4 py-2 rounded-full bg-green-500 text-white hover:bg-green-600"
                    : hoverTextClass()
                } after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-green-500 after:transition-all after:duration-300 hover:after:w-full`}
              >
                {link.label}
              </Link>
            )
          )}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className={`p-2 rounded-full ${buttonBgClass()} hover:scale-110 transition-transform`}
          >
            {themeIcon}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          aria-label="Toggle menu"
          className={`${isDark ? "text-gray-300" : "text-gray-700"} md:hidden`}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div
          className={`md:hidden px-6 py-4 space-y-3 border-t transition-colors duration-300 ${
            isDark
              ? "bg-gray-900 border-gray-800 text-gray-300"
              : "bg-white border-gray-200 text-gray-700"
          }`}
        >
          {[...baseLinks, ...authLinks].map((link, idx) =>
            link.action ? (
              <button
                key={idx}
                onClick={() => handleLinkClick(link.action)}
                className={`block w-full text-left transition-colors ${
                  link.danger
                    ? "text-red-500 hover:text-red-600"
                    : hoverTextClass()
                }`}
              >
                {link.label}
              </button>
            ) : (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => handleLinkClick()}
                className={`block text-center transition-colors ${
                  link.special
                    ? "px-4 py-2 rounded-full bg-green-500 text-white hover:bg-green-600"
                    : hoverTextClass()
                }`}
              >
                {link.label}
              </Link>
            )
          )}

          {/* Theme toggle for mobile */}
          <button
            onClick={toggleTheme}
            className={`mt-3 p-2 rounded-full w-full flex justify-center ${buttonBgClass()} hover:scale-105 transition-transform`}
          >
            {themeIcon}
          </button>
        </div>
      )}
    </nav>
  );
}
