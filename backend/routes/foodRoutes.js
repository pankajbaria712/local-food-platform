import express from "express";
// Import ALL controller functions (donate, get, claim, getClaimed)
import {
  donateFood,
  getFoods,
  claimFood,
  getClaimedFoods,
  getMyDonations,
  deleteDonation,
} from "../controllers/foodController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// Donate a new food item
router.post("/donate", authMiddleware, donateFood);

// Get all food donations
router.get("/", getFoods);

// NGO claims a food donation
router.post("/claim/:id", authMiddleware, claimFood);

// Get all food donations claimed by the current NGO
router.get("/claimed", authMiddleware, getClaimedFoods);

// Get donations created by the currently authenticated donor
router.get("/my", authMiddleware, getMyDonations);

// Delete a donation (donor only)
router.delete("/:id", authMiddleware, deleteDonation);

export default router;
