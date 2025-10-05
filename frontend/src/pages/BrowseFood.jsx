import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { ThemeContext } from "../context/ThemeContext";
import { Utensils, MapPin, Clock, Users } from "lucide-react";

export default function BrowseFood() {
  const { theme, isDark } = useContext(ThemeContext);
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/food");
        setFoods(res.data);
      } catch (err) {
        console.error("Error fetching foods:", err);
      }
    };
    fetchFoods();
  }, []);

  // Theme classes
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
    <div className={`min-h-screen ${bgClass} p-6`}>
      <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-green-500 to-lime-400 bg-clip-text text-transparent">
        Available Food Donations
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {foods.length > 0 ? (
          foods.map((food) => (
            <div
              key={food._id}
              className={`border rounded-2xl shadow-lg p-6 ${cardClass} transition-all duration-300 hover:shadow-xl`}
            >
              {/* Food Name */}
              <h3 className="text-xl font-bold mb-2 flex items-center gap-2 text-green-600 dark:text-green-400">
                <Utensils size={20} />
                {food.foodName || "Untitled Food"}
              </h3>

              {/* Description */}
              <p className="text-sm mb-4 text-gray-600 dark:text-gray-300">
                {food.description || "No description provided."}
              </p>

              {/* Info */}
              <div className="space-y-2 text-sm">
                <p className="flex items-center gap-2 font-medium">
                  <Users size={16} />
                  Quantity: {food.quantity || "N/A"} people
                </p>
                <p className="flex items-center gap-2">
                  <Clock size={16} />
                  Pickup Time: {food.pickupTime || "Not specified"}
                </p>
                <p className="flex items-center gap-2">
                  <MapPin size={16} />
                  Location: {food.location || "Not specified"}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No donations available yet.
          </p>
        )}
      </div>
    </div>
  );
}
