import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Sun, Moon } from "lucide-react";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/70 shadow-md border-b border-gray-100 dark:border-gray-800 transition-colors duration-300">
      <div className="container mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-extrabold bg-gradient-to-r from-green-500 to-lime-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-200"
        >
          FoodShare
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center text-gray-700 dark:text-gray-300 font-medium">
          {[
            { to: "/", label: "Home" },
            { to: "/about", label: "About" },
            { to: "/contact", label: "Contact" },
          ].map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="relative hover:text-green-600 dark:hover:text-green-400 after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-green-500 after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}

          {/* Auth / Role-based Links */}
          {!token && (
            <>
              <Link
                to="/login"
                className="hover:text-green-600 dark:hover:text-green-400"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors"
              >
                Register
              </Link>
            </>
          )}

          {token && user?.role === "donor" && (
            <>
              <Link
                to="/donate"
                className="hover:text-green-600 dark:hover:text-green-400"
              >
                Donate Food
              </Link>
              <Link
                to="/myposts"
                className="hover:text-green-600 dark:hover:text-green-400"
              >
                My Posts
              </Link>
              <button
                onClick={handleLogout}
                className="text-red-500 hover:text-red-600"
              >
                Logout
              </button>
            </>
          )}

          {token && user?.role === "receiver" && (
            <>
              <Link
                to="/browse"
                className="hover:text-green-600 dark:hover:text-green-400"
              >
                Browse Food
              </Link>
              <Link
                to="/claimed"
                className="hover:text-green-600 dark:hover:text-green-400"
              >
                Claimed Food
              </Link>
              <button
                onClick={handleLogout}
                className="text-red-500 hover:text-red-600"
              >
                Logout
              </button>
            </>
          )}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:scale-110 transition-transform"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 dark:text-gray-300"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-gray-900/95 border-t border-gray-200 dark:border-gray-800 px-6 py-4 space-y-3 text-gray-700 dark:text-gray-300 animate-slideDown">
          <Link to="/" className="block hover:text-green-500">
            Home
          </Link>
          <Link to="/about" className="block hover:text-green-500">
            About
          </Link>
          <Link to="/contact" className="block hover:text-green-500">
            Contact
          </Link>

          {!token && (
            <>
              <Link to="/login" className="block hover:text-green-500">
                Login
              </Link>
              <Link
                to="/register"
                className="block px-4 py-2 rounded-full bg-green-500 text-white hover:bg-green-600 text-center"
              >
                Register
              </Link>
            </>
          )}

          {token && user?.role === "donor" && (
            <>
              <Link to="/donate" className="block hover:text-green-500">
                Donate Food
              </Link>
              <Link to="/myposts" className="block hover:text-green-500">
                My Posts
              </Link>
              <button
                onClick={handleLogout}
                className="block text-red-500 hover:text-red-600"
              >
                Logout
              </button>
            </>
          )}

          {token && user?.role === "receiver" && (
            <>
              <Link to="/browse" className="block hover:text-green-500">
                Browse Food
              </Link>
              <Link to="/claimed" className="block hover:text-green-500">
                Claimed Food
              </Link>
              <button
                onClick={handleLogout}
                className="block text-red-500 hover:text-red-600"
              >
                Logout
              </button>
            </>
          )}

          <button
            onClick={toggleTheme}
            className="mt-3 p-2 rounded-full bg-gray-200 dark:bg-gray-700 w-full flex justify-center"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      )}
    </nav>
  );
}
