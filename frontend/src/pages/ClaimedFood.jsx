import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { ThemeContext } from "../context/ThemeContext";
import { Utensils, MapPin, Clock, Users } from "lucide-react";

export default function ClaimedFood() {
  const { theme } = useContext(ThemeContext);
  const [claimed, setClaimed] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchClaimed = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/food/claimed", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setClaimed(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchClaimed();
  }, []);

  const bgClass =
    theme === "dark"
      ? "bg-gray-950 text-gray-100"
      : "bg-gray-100 text-gray-900";
  const cardClass =
    theme === "dark"
      ? "bg-gray-900 border-gray-800"
      : "bg-white border-gray-200";

  return (
    <div className={`min-h-screen ${bgClass} p-6`}>
      <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-green-500 to-lime-400 bg-clip-text text-transparent">
        Claimed Food
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {claimed.length > 0 ? (
          claimed.map((food) => (
            <div
              key={food._id}
              className={`border rounded-2xl shadow-lg p-6 ${cardClass}`}
            >
              <h3 className="text-xl font-bold mb-2 text-green-600">
                {food.foodName || "Untitled Food"}
              </h3>
              <p className="text-sm mb-4">
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
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No claimed foods yet
          </p>
        )}
      </div>
    </div>
  );
}
