import express from "express";
import Post from "../models/Post.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// Create post
router.post("/create", authMiddleware, async (req, res) => {
  try {
    const { title, description, quantity, type, pickupAt, location } = req.body;

    if (!title || !quantity || !pickupAt || !location) {
      return res
        .status(400)
        .json({ message: "All required fields must be provided" });
    }

    const newPost = await Post.create({
      title,
      description,
      quantity,
      type,
      pickupAt,
      location,
      user: req.user.id,
    });

    res
      .status(201)
      .json({ message: "Post created successfully!", post: newPost });
  } catch (err) {
    console.error("Error creating post:", err.message);
    res.status(500).json({ message: "Server error while creating post" });
  }
});

export default router;
