import express from "express";
import { donateFood, getFoods } from "../controllers/foodController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.post("/donate", authMiddleware, donateFood);
router.get("/", getFoods);

export default router;
