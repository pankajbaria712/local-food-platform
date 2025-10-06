import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import foodRoutes from "./routes/foodRoutes.js";
import postRoutes from "./routes/posts.js";

dotenv.config();

const app = express();
app.use(cors({
  origin: [
    "https://local-food-platform.vercel.app",
    "http://localhost:5173"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/food", foodRoutes);
app.use("/api/posts", postRoutes);

app.get("/", (req, res) => res.send("API is running ✅"));

const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() =>
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`))
  )
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));
