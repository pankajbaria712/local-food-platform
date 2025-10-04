const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const auth = require("../middleware/auth");

// Create post
router.post("/", auth, async (req, res) => {
  try {
    const post = await Post.create({ ...req.body, user: req.user._id });
    res.json(post);
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get all posts
router.get("/", async (req, res) => {
  const posts = await Post.find().sort("-createdAt");
  res.json(posts);
});

// Get my posts
router.get("/mine", auth, async (req, res) => {
  const posts = await Post.find({ user: req.user._id }).sort("-createdAt");
  res.json(posts);
});

// Claim post
router.post("/:id/claim", auth, async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: "Not found" });
  post.claimedBy = req.user._id;
  await post.save();
  res.json({ message: "Claimed" });
});

module.exports = router;
