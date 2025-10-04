const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, enum: ["donor", "receiver"], default: "donor" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
