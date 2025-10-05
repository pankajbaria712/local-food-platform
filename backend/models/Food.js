import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
  {
    foodName: { type: String, required: true },
    description: { type: String },
    quantity: { type: String, required: true },
    pickupTime: { type: String, required: true },
    location: { type: String, required: true },
    donorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    claimedBy: {
      // Tracks who claimed the food (null = unclaimed)
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true } // Adds createdAt/updatedAt
);

const Food = mongoose.model("Food", foodSchema);

export default Food;
