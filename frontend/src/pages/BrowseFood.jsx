import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import {
  Utensils,
  MapPin,
  Clock,
  Users,
  Check,
  Loader2,
  AlertTriangle,
  X,
  CircleCheck,
  Package,
  List,
  HeartHandshake,
} from "lucide-react";

import { ThemeContext } from "../context/ThemeContext";

// Custom Modal Component to replace alert()
const CustomModal = ({ show, message, type, onClose }) => {
  if (!show) return null;

  const isSuccess = type === "success";
  const icon = isSuccess ? (
    <CircleCheck size={24} />
  ) : (
    <AlertTriangle size={24} />
  );
  const colorClass = isSuccess
    ? "bg-green-100 text-green-700 border-green-300"
    : "bg-red-100 text-red-700 border-red-300";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4">
      <div
        className={`w-full max-w-md rounded-xl shadow-2xl p-6 ${colorClass} border-2`}
        role="alert"
      >
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            {icon}
            <span className="ml-3 font-semibold text-lg">
              {isSuccess ? "Success!" : "Attention!"}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-opacity-50 transition"
          >
            <X size={20} />
          </button>
        </div>
        <p className="mt-4 text-sm">{message}</p>
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition duration-150 ${
              isSuccess
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-red-600 text-white hover:bg-red-700"
            }`}
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};

export default function BrowseFood() {
  // Destructure 'theme' and 'isDark' to align with Login.jsx's pattern
  const { theme, isDark } = useContext(ThemeContext);
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("available"); // 'available', 'claimed', 'myDonations'

  // State for the custom modal
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState(""); // 'success' or 'error'

  // Get user info and token
  // Read token and sanitize common bad values (null, 'undefined', extra quotes)
  let token = localStorage.getItem("token");
  if (!token || token === "undefined" || token === "null") token = null;
  // Trim potential surrounding quotes
  if (token && token.startsWith('"') && token.endsWith('"')) {
    token = token.slice(1, -1);
  }
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  // Utility function to fetch all food items based on the current view mode
  const fetchDonations = async (mode) => {
    setLoading(true);
    setFoods([]); // Clear previous data

    // Check for token requirement
    if ((mode === "claimed" || mode === "myDonations") && !token) {
      setModalMessage(
        "You must be logged in to view your claimed items or donations."
      );
      setModalType("error");
      setShowModal(true);
      setLoading(false);
      return;
    }

    try {
      let res;
      let url = "http://localhost:5000/api/food";
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      if (mode === "claimed") {
        // Endpoint for NGO's claimed food
        url = "http://localhost:5000/api/food/claimed";
        res = await axios.get(url, { headers });
        setFoods(res.data);
      } else {
        // Fetch ALL food items for 'available' and 'myDonations' client-side filtering
        res = await axios.get(url);
        let filteredFoods = res.data;

        if (mode === "available") {
          // Available: Unclaimed items
          filteredFoods = res.data.filter((f) => !f.claimedBy);
        } else if (mode === "myDonations" && user) {
          // My Donations: Items posted by the current user
          filteredFoods = res.data.filter((f) => f.donorId === user.id);
        }

        setFoods(filteredFoods);
      }
    } catch (err) {
      console.error(`Error fetching foods for mode ${mode}:`, err);
      // Fallback for UI feedback
      const errorMsg =
        err.response?.data?.message || `Could not fetch data for ${mode} view.`;
      setModalMessage(errorMsg);
      setModalType("error");
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Only call fetchDonations if viewMode or token changes
    fetchDonations(viewMode);
  }, [viewMode, token]);

  // Handler for the "Claim" button (only visible in 'available' mode)
  const handleClaim = async (id) => {
    if (!token || user?.role !== "ngo") {
      setModalMessage("Only authenticated NGOs can claim food.");
      setModalType("error");
      setShowModal(true);
      return;
    }

    try {
      // API endpoint: POST /api/food/claim/:id
      await axios.post(
        `http://localhost:5000/api/food/claim/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchDonations("available"); // Refresh list to remove the claimed item
      setModalMessage(
        "Food claimed successfully! Check your claimed list for pickup details."
      );
      setModalType("success");
    } catch (err) {
      console.error("Claim error:", err);
      const errorMsg =
        err.response?.data?.message ||
        "Failed to claim food. Check if you are authorized.";
      setModalMessage(errorMsg);
      setModalType("error");
    } finally {
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setModalMessage("");
    setModalType("");
  };

  // --- Theme-based style definitions (same logic as Login/Register) ---
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

  const activeTabClass =
    "border-b-4 border-green-500 text-green-500 font-bold bg-green-500/10";
  // Inactive tab hover style is adjusted for better visibility in dark mode
  const inactiveTabClass = isDark
    ? "border-b-4 border-transparent hover:border-gray-500/50 transition-colors"
    : "border-b-4 border-transparent hover:border-gray-400/50 transition-colors";
  // --- End Theme definitions ---

  // Display date/time nicely
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return (
      date.toLocaleDateString() +
      " " +
      date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
  };

  // Define tab configuration based on user role
  const getTabs = () => {
    const tabs = [
      // Available Food is visible to everyone
      {
        id: "available",
        label: "Available Food",
        icon: <Utensils size={20} />,
        roles: ["donor", "ngo", "guest"],
      },
    ];

    if (user?.role === "ngo") {
      // Only NGOs can see claimed food
      tabs.push({
        id: "claimed",
        label: "My Claimed Food",
        icon: <List size={20} />,
        roles: ["ngo"],
      });
    }
    if (user?.role === "donor") {
      // Only Donors can see their own donations
      tabs.push({
        id: "myDonations",
        label: "My Donations",
        icon: <HeartHandshake size={20} />,
        roles: ["donor"],
      });
    }

    return tabs;
  };

  return (
    <div
      className={`min-h-screen ${bgClass} p-4 sm:p-8 transition-colors duration-300`}
    >
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-6 sm:mb-10 bg-gradient-to-r from-green-500 to-lime-400 bg-clip-text text-transparent">
          {viewMode === "available"
            ? "Browse Available Food Donations"
            : viewMode === "claimed"
            ? "Food I Have Claimed"
            : "My Posted Donations"}
        </h1>

        {/* Tab/Mode Selection UI */}
        <div className="flex justify-center mb-8 sm:mb-12 overflow-x-auto whitespace-nowrap">
          {getTabs().map((tab) => (
            <button
              key={tab.id}
              onClick={() => setViewMode(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 text-lg transition-all duration-200 ${
                viewMode === tab.id ? activeTabClass : inactiveTabClass
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin text-green-500" size={36} />
            <p className="ml-4 text-lg">Loading {viewMode} donations...</p>
          </div>
        ) : foods.length === 0 ? (
          <div
            className={`text-center p-12 rounded-2xl border border-dashed ${
              isDark
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-300"
            }`}
          >
            <Package size={40} className="mx-auto text-green-500 mb-4" />
            <p className="text-xl font-medium">
              {viewMode === "available"
                ? "No food donations are currently available."
                : viewMode === "claimed"
                ? "You have not claimed any food donations yet."
                : "You have not posted any food donations yet."}
            </p>
            <p className="text-gray-500 mt-2">
              {viewMode === "available" &&
                "Check back soon for new opportunities to help."}
              {viewMode === "myDonations" &&
                "Post a new donation to see it here."}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {foods.map((food) => (
              <div
                key={food._id}
                className={`border rounded-2xl shadow-lg p-6 transition transform hover:scale-[1.02] duration-200 ${cardClass} flex flex-col justify-between`}
              >
                <div>
                  <h3 className="text-2xl font-bold mb-3 flex items-center gap-3 text-green-500">
                    <Utensils size={24} /> {food.foodName || "Untitled Food"}
                  </h3>
                  {/* Adjusted text color for dark mode readability */}
                  <p
                    className={`text-md mb-4 italic ${
                      isDark ? "text-gray-300" : "text-gray-500"
                    }`}
                  >
                    {food.description || "No description provided."}
                  </p>
                  <div className="space-y-3 text-sm">
                    <p className="flex items-center gap-2">
                      <Users size={18} className="text-lime-500" />
                      <span className="font-semibold">Quantity:</span>{" "}
                      {food.quantity}
                    </p>
                    <p className="flex items-center gap-2">
                      <Clock size={18} className="text-amber-500" />
                      <span className="font-semibold">
                        Available Until:
                      </span>{" "}
                      {food.pickupTime}
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin size={18} className="text-red-500" />
                      <span className="font-semibold">Location:</span>{" "}
                      {food.location || "Not specified"}
                    </p>
                    <p className="text-xs text-gray-400 pt-2">
                      Donated At: {formatDate(food.createdAt)}
                    </p>
                  </div>
                </div>

                {/* Conditional Button Rendering */}
                {viewMode === "available" && (
                  <button
                    onClick={() => handleClaim(food._id)}
                    className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-bold transition duration-200 shadow-md shadow-green-600/50 flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:shadow-none"
                    disabled={!token || user?.role !== "ngo"}
                  >
                    {!token ? (
                      <span>Log in to Claim</span>
                    ) : user?.role !== "ngo" ? (
                      <span>NGO Login Required to Claim</span>
                    ) : (
                      <>
                        <Check size={20} /> Claim This Donation
                      </>
                    )}
                  </button>
                )}

                {(viewMode === "claimed" || viewMode === "myDonations") && (
                  // Adjusted color for contrast in dark mode
                  <div
                    className={`mt-6 p-3 rounded-xl font-semibold flex items-center justify-center gap-2 ${
                      isDark
                        ? "bg-green-700/30 text-green-300"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    <CircleCheck size={20} />
                    {viewMode === "claimed"
                      ? "Successfully claimed."
                      : "This is your donation."}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <CustomModal
        show={showModal}
        message={modalMessage}
        type={modalType}
        onClose={closeModal}
      />
    </div>
  );
}
