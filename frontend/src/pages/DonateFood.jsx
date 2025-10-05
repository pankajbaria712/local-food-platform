import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { Loader2 } from "lucide-react";

export default function DonateFood() {
  const navigate = useNavigate();
  const { theme, isDark } = useContext(ThemeContext);
  const [form, setForm] = useState({
    foodName: "",
    description: "",
    quantity: "",
    pickupTime: "",
    location: "",
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
      const token = localStorage.getItem("token");

      await axios.post("http://localhost:5000/api/food/donate", form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      navigate("/my-posts");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // Theme-based colors
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
        className={`w-full max-w-lg border rounded-2xl shadow-lg p-8 ${cardClass} transition-all duration-500`}
      >
        <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-green-500 to-lime-400 bg-clip-text text-transparent">
          Donate Food
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="foodName"
            placeholder="Food title (e.g., Rice, Sandwiches)"
            value={form.foodName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 bg-transparent"
          />

          <textarea
            name="description"
            placeholder="Description (ingredients, condition)"
            value={form.description}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 bg-transparent"
          />

          <input
            type="number"
            name="quantity"
            placeholder="Quantity (people served)"
            value={form.quantity}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 bg-transparent"
          />

          <input
            type="text"
            name="pickupTime"
            placeholder="Pickup time (e.g., 6-8 PM)"
            value={form.pickupTime}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 bg-transparent"
          />

          <input
            type="text"
            name="location"
            placeholder="Pickup location"
            value={form.location}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 bg-transparent"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition flex items-center justify-center"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              "Post Donation"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
``