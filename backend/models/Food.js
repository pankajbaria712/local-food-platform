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
  },
  { timestamps: true }
);

export default mongoose.model("Food", foodSchema);
