import React, { useState, useContext } from "react";
import axios from "axios";
const API_BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
import { useNavigate, Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { Loader2 } from "lucide-react";

export default function Register() {
  const navigate = useNavigate();
  const { theme, isDark } = useContext(ThemeContext);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "donor",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(`${API_BASE}/api/auth/register`, form);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      // Only store token if returned and valid
      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
      } else {
        localStorage.removeItem("token");
      }
      navigate("/");
      window.location.reload();
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Theme-based background and card styles
  const bgClass =
    theme === "dark"
      ? "bg-gray-950 text-gray-100"
      : theme === "light"
      ? "bg-gray-100 text-gray-900"
      : isDark
      ? "bg-gray-900 text-gray-100"
      : "bg-gray-100 text-gray-900";

  const cardClass =
    theme === "dark" || (theme === "system" && isDark)
      ? "bg-gray-900 border-gray-800"
      : "bg-white border-gray-200";

  return (
    <div
      className={`flex justify-center items-center min-h-screen ${bgClass} transition-colors duration-500`}
    >
      <div
        className={`w-full max-w-md border rounded-2xl shadow-lg p-8 ${cardClass} transition-all duration-500 animate-fadeIn`}
      >
        <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-green-500 to-lime-400 bg-clip-text text-transparent">
          Create Account
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-transparent"
          />

          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-transparent"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-transparent"
          />

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-transparent"
          >
            <option value="donor">Donor (Restaurant / Household)</option>
            {/* send 'ngo' so it matches backend checks for user.role === 'ngo' */}
            <option value="ngo">Receiver (NGO / Charity)</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition flex items-center justify-center"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              "Register"
            )}
          </button>
        </form>

        <p className="text-sm text-center mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-green-600 dark:text-green-400 hover:underline font-medium"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
