const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    quantity: String,
    type: String,
    pickupAt: Date,
    location: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    claimedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
