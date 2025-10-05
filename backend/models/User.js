import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // MODIFICATION: Changed 'receiver' to 'ngo' to align with the rest of your app's flow (donation claiming)
    // If you intend to use 'receiver' in the frontend, you must add it here: enum: ["donor", "ngo", "receiver"]
    role: { type: String, enum: ["donor", "ngo"], required: true },
    // I noticed your authMiddleware checks for user.isVerified but it's not on the model.
    // Adding it here (defaulting to true for simplicity, you can implement verification later)
    isVerified: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
