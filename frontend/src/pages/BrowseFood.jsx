import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { ThemeContext } from "../context/ThemeContext";
import { Utensils, MapPin, Clock, Users, Check } from "lucide-react";

export default function BrowseFood() {
  const { theme, isDark } = useContext(ThemeContext);
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const fetchFoods = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/food");
      const available = res.data.filter((f) => !f.claimedBy); // Only unclaimed
      setFoods(available);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  const handleClaim = async (id) => {
    try {
      await axios.post(
        `http://localhost:5000/api/food/claim/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchFoods(); // Refresh list
      alert("Food claimed successfully!");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to claim food");
    }
  };

  const bgClass =
    theme === "dark"
      ? "bg-gray-950 text-gray-100"
      : "bg-gray-100 text-gray-900";
  const cardClass =
    theme === "dark"
      ? "bg-gray-900 border-gray-800"
      : "bg-white border-gray-200";

  if (loading) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className={`min-h-screen ${bgClass} p-6`}>
      <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-green-500 to-lime-400 bg-clip-text text-transparent">
        Available Food Donations
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {foods.length > 0 ? (
          foods.map((food) => (
            <div
              key={food._id}
              className={`border rounded-2xl shadow-lg p-6 ${cardClass}`}
            >
              <h3 className="text-xl font-bold mb-2 flex items-center gap-2 text-green-600">
                <Utensils size={20} /> {food.foodName || "Untitled Food"}
              </h3>
              <p className="text-sm mb-4 text-gray-600">
                {food.description || "No description"}
              </p>
              <p className="flex items-center gap-2">
                <Users size={16} /> Quantity: {food.quantity}
              </p>
              <p className="flex items-center gap-2">
                <Clock size={16} /> Pickup: {food.pickupTime || "Not specified"}
              </p>
              <p className="flex items-center gap-2">
                <MapPin size={16} /> Location:{" "}
                {food.location || "Not specified"}
              </p>

              <button
                onClick={() => handleClaim(food._id)}
                className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl flex items-center justify-center gap-2"
              >
                <Check size={18} /> Get Food
              </button>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No donations available
          </p>
        )}
      </div>
    </div>
  );
}
