import Food from "../models/Food.js";

export const donateFood = async (req, res) => {
  try {
    const { foodName, description, quantity, pickupTime, location } = req.body;

    if (!foodName || !quantity || !pickupTime || !location) {
      return res
        .status(400)
        .json({ message: "All required fields must be provided" });
    }

    const newFood = await Food.create({
      foodName,
      description,
      quantity,
      pickupTime,
      location,
      donorId: req.user.id,
    });

    res
      .status(201)
      .json({ message: "Food donation added successfully!", food: newFood });
  } catch (error) {
    console.error("Error in donateFood:", error.message);
    res.status(500).json({ message: "Server error while donating food" });
  }
};
// Get all food donations
export const getFoods = async (req, res) => {
  try {
    const foods = await Food.find().sort({ createdAt: -1 }); // latest first
    res.json(foods);
  } catch (error) {
    console.error("Error in getFoods:", error.message);
    res.status(500).json({ message: "Server error while fetching foods" });
  }
};
