import express from "express";
// Import ALL controller functions (donate, get, claim, getClaimed)
import {
  donateFood,
  getFoods,
  claimFood,
  getClaimedFoods,
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

export default router;
