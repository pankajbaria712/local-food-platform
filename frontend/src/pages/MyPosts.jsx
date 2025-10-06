import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import {
  Utensils,
  MapPin,
  Clock,
  Users,
  Loader2,
  AlertTriangle,
  X,
  CircleCheck,
  Package,
  Trash2, // Added for deletion
  Info,
} from "lucide-react";
import { ThemeContext } from "../context/ThemeContext";

// Custom Modal Component to replace alert() and window.confirm
const CustomModal = ({ show, message, type, onClose, onConfirm }) => {
  if (!show) return null;

  const isSuccess = type === "success";
  const isConfirm = type === "confirm";
  const isError = type === "error";

  // Configuration for modal colors based on type
  const colorConfig = isConfirm
    ? {
        icon: <Info size={24} />,
        bg: "bg-yellow-100 dark:bg-yellow-900/50",
        text: "text-yellow-700 dark:text-yellow-300",
        border: "border-yellow-300",
      }
    : isSuccess
    ? {
        icon: <CircleCheck size={24} />,
        bg: "bg-green-100 dark:bg-green-900/50",
        text: "text-green-700 dark:text-green-300",
        border: "border-green-300",
      }
    : {
        icon: <AlertTriangle size={24} />,
        bg: "bg-red-100 dark:bg-red-900/50",
        text: "text-red-700 dark:text-red-300",
        border: "border-red-300",
      };

  // Theme class for the modal container itself
  const darkClass = "dark:bg-gray-800 dark:border-gray-700 dark:shadow-2xl"; // Use shadow-2xl for prominence

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4">
      <div
        className={`w-full max-w-md rounded-xl shadow-2xl p-6 ${colorConfig.bg} ${colorConfig.text} border-2 ${colorConfig.border} ${darkClass}`}
        role="alert"
      >
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center">
            {colorConfig.icon}
            <h3 className="ml-3 text-lg font-semibold">{message}</h3>
          </div>
          <button
            onClick={onClose}
            className={`p-1 rounded-full hover:bg-opacity-80 ${colorConfig.text}`}
          >
            <X size={20} />
          </button>
        </div>

        {isConfirm && (
          <div className="flex justify-end space-x-3 mt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 bg-white hover:bg-gray-100 transition text-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 text-sm font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 transition shadow-md"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default function MyPosts() {
  // Now uses useContext(ThemeContext) directly, like your Login.jsx
  const { theme, isDark } = useContext(ThemeContext);

  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for the notification/info modal
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("info"); // success, error, confirm, info

  // State for the deletion confirmation modal
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [donationToDelete, setDonationToDelete] = useState(null);

  // Read user and token from localStorage
  let token = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  if (!token || token === "undefined" || token === "null") token = null;
  if (token && token.startsWith('"') && token.endsWith('"'))
    token = token.slice(1, -1);

  // --- Theme Logic (Consistent with Login, About, Contact pages) ---
  const bgClass =
    theme === "dark"
      ? "bg-gray-950 text-gray-100"
      : theme === "light"
      ? "bg-gray-100 text-gray-900"
      : isDark // System theme detection (if available)
      ? "bg-gray-900 text-gray-100"
      : "bg-gray-100 text-gray-900";

  const cardBgClass =
    theme === "dark" || (theme === "system" && isDark)
      ? "bg-gray-800 border-gray-700"
      : "bg-white border-gray-200";

  const cardTextClass =
    theme === "dark" || (theme === "system" && isDark)
      ? "text-gray-200"
      : "text-gray-800";

  const subTextColor = "text-gray-500 dark:text-gray-400";
  // --- End Theme Logic ---

  const closeModal = () => setShowModal(false);
  const closeConfirmModal = () => {
    setShowConfirmModal(false);
    setDonationToDelete(null);
  };

  const showNotification = (message, type = "info") => {
    setModalMessage(message);
    setModalType(type);
    setShowModal(true);
  };

  /**
   * Fetches the donation posts created by the current user (mocked).
   */
  const fetchMyDonations = async () => {
    if (!token) {
      setLoading(false);
      setError("Please log in to view your posts.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("http://localhost:5000/api/food/my", {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Normalize backend Food model fields to the frontend shape
      const normalized = (res.data || []).map((f) => ({
        _id: f._id || f.id,
        title: f.foodName || f.title || f.name || "Untitled",
        description: f.description || f.desc || "",
        quantity: f.quantity,
        type: f.type || "Mixed",
        pickupAddress: f.location || f.pickupAddress || f.location || "",
        readyTime: f.pickupTime || f.readyTime || f.pickupAt || f.createdAt,
        claimed: !!f.claimedBy,
        raw: f,
      }));
      setDonations(normalized);
    } catch (err) {
      console.error("Error fetching my posts:", err);
      setError(
        err.response?.data?.message ||
          "Failed to load your posts. Please try again later."
      );
      // fallback to mock data for improved UX during dev
      setDonations(mockDonations);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Initiates the confirmation process for deletion.
   */
  const initiateDelete = (donationId) => {
    if (!token) {
      showNotification("You must be logged in to delete a post.", "error");
      return;
    }
    setDonationToDelete(donationId);
    setModalMessage(
      "Are you sure you want to delete this donation post? This action cannot be undone."
    );
    setModalType("confirm");
    setShowConfirmModal(true);
  };

  /**
   * Handles the confirmed deletion of a specific donation post (mocked).
   */
  const handleDeleteDonation = async () => {
    const donationId = donationToDelete;
    closeConfirmModal(); // Close the confirmation modal

    setLoading(true); // Set loading while processing the deletion
    try {
      // Real API call to delete donation
      await axios.delete(`http://localhost:5000/api/food/${donationId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Update the state to remove the deleted item instantly
      setDonations((prev) => prev.filter((d) => d._id !== donationId));
      showNotification("Donation successfully deleted.", "success");
    } catch (err) {
      console.error("Error deleting donation:", err);
      showNotification(
        err.response?.data?.message || "Failed to delete donation.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyDonations();
  }, [token]);

  // Placeholder data for preview
  const mockDonations = [
    {
      _id: "mock1",
      title: "Freshly Baked Bread Loaves",
      description:
        "5 large loaves of sourdough bread, baked this morning. Perfect for local charity distribution.",
      quantity: 5,
      type: "Bakery",
      pickupAddress: "123 Main St, Anytown",
      readyTime: new Date(Date.now() - 3600000).toISOString(),
      claimed: false,
    },
    {
      _id: "mock2",
      title: "Bulk Canned Vegetables",
      description: "Case of 24 canned green beans. Non-perishable.",
      quantity: 24,
      type: "Pantry",
      pickupAddress: "456 Oak Ave, Anytown",
      readyTime: new Date(Date.now() - 86400000 * 2).toISOString(),
      claimed: true,
    },
    {
      _id: "mock3",
      title: "Excess Farm Produce (Carrots)",
      description:
        "About 50kg of fresh carrots, harvested yesterday. Needs immediate pickup.",
      quantity: 50,
      type: "Produce",
      pickupAddress: "789 Farm Rd, Greentown",
      readyTime: new Date(Date.now() - 86400000 * 0.5).toISOString(),
      claimed: false,
    },
  ];

  const displayDonations = donations;

  const formatReadyTime = (isoString) => {
    const date = new Date(isoString);
    // Formats date and time nicely
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      className={`min-h-screen p-4 sm:p-8 ${bgClass} transition-colors duration-500`}
    >
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-2 text-green-500">
          My Food Donations
        </h1>
        <p className={`${subTextColor} mb-8 text-lg`}>
          Manage the food donations you have posted for local NGOs to claim.
        </p>

        {loading && donations.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin text-green-500" size={40} />
            <p className="ml-4 text-xl">Loading your posts...</p>
          </div>
        ) : error && donations.length === 0 && !token ? (
          <div className="text-center p-10 border rounded-xl border-red-500/30 bg-red-500/10 dark:bg-red-900/10">
            <AlertTriangle className="text-red-500 mx-auto" size={32} />
            <p className="mt-4 text-red-500 font-medium">
              Please log in to manage your posts.
            </p>
          </div>
        ) : displayDonations.length === 0 ? (
          <div
            className={`text-center p-10 border rounded-xl border-green-500/30 ${cardBgClass}`}
          >
            <Package className="text-green-500 mx-auto mb-4" size={32} />
            <p className="font-semibold text-lg">
              No donation posts found yet!
            </p>
            <p className={subTextColor}>
              Start sharing surplus food by creating a new post.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayDonations.map((donation) => (
              <div
                key={donation._id}
                className={`p-6 rounded-2xl border shadow-lg hover:shadow-xl transition duration-300 ${cardBgClass}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className={`text-2xl font-bold ${cardTextClass}`}>
                    {donation.title}
                  </h2>
                  <div
                    className={`p-2 rounded-full ${
                      donation.claimed
                        ? "bg-green-500/20 text-green-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    } text-sm font-semibold`}
                  >
                    {donation.claimed ? "Claimed" : "Available"}
                  </div>
                </div>

                <p className={`${subTextColor} text-sm mb-4 line-clamp-2`}>
                  {donation.description}
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm">
                    <Package className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className={subTextColor}>Type: </span>
                    <span className="ml-2 font-medium">
                      {donation.type || "Mixed"}
                    </span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Users className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className={subTextColor}>Quantity: </span>
                    <span className="ml-2 font-medium">
                      {donation.quantity} servings/items
                    </span>
                  </div>
                  <div className="flex items-center text-sm">
                    <MapPin className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className={subTextColor}>Location: </span>
                    <span className="ml-2 font-medium truncate">
                      {donation.pickupAddress || "Not specified"}
                    </span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className={subTextColor}>Ready Since: </span>
                    <span className="ml-2 font-medium">
                      {formatReadyTime(donation.readyTime)}
                    </span>
                  </div>
                </div>

                {/* Action button: Delete */}
                <button
                  onClick={() => initiateDelete(donation._id)}
                  className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition duration-200 
                    bg-red-600 text-white hover:bg-red-700 shadow-md hover:shadow-lg
                    disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:shadow-none`}
                  disabled={loading} // Use general loading state
                >
                  <Trash2 size={20} /> Delete Post
                </button>

                {donation.claimed && (
                  <div className="mt-4 p-3 rounded-xl font-semibold flex items-center justify-center gap-2 bg-green-500/10 text-green-500 dark:bg-green-700/30 dark:text-green-300">
                    <CircleCheck size={20} /> Claimed by an NGO.
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Standard notification/info modal */}
      <CustomModal
        show={showModal && modalType !== "confirm"}
        message={modalMessage}
        type={modalType}
        onClose={closeModal}
      />

      {/* Confirmation modal for deletion */}
      <CustomModal
        show={showConfirmModal}
        message={modalMessage}
        type="confirm"
        onClose={closeConfirmModal}
        onConfirm={handleDeleteDonation}
      />
    </div>
  );
}
