import Food from "../models/Food.js"; // Now points to the correct model file

// Donate a new food item
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
      donorId: req.user.id, // From auth middleware
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
    const foods = await Food.find().sort({ createdAt: -1 }); // Latest first
    res.json(foods);
  } catch (error) {
    console.error("Error in getFoods:", error.message);
    res.status(500).json({ message: "Server error while fetching foods" });
  }
};

// Claim a food donation
export const claimFood = async (req, res) => {
  try {
    const foodId = req.params.id;
    const userId = req.user.id; // From auth middleware

    // Find the food
    const food = await Food.findById(foodId);
    if (!food) return res.status(404).json({ message: "Food not found" });

    // Check if already claimed
    if (food.claimedBy) {
      return res.status(400).json({ message: "Food already claimed" });
    }

    // Update the food’s claimedBy field
    food.claimedBy = userId;
    await food.save();

    res.json({ message: "Food claimed successfully", food });
  } catch (error) {
    console.error("Error in claimFood:", error.message);
    res.status(500).json({ message: "Server error while claiming food" });
  }
};

// Get all food donations claimed by the current NGO
export const getClaimedFoods = async (req, res) => {
  try {
    const userId = req.user.id;
    const claimed = await Food.find({ claimedBy: userId }).sort({
      createdAt: -1,
    });
    res.json(claimed);
  } catch (error) {
    console.error("Error in getClaimedFoods:", error.message);
    res
      .status(500)
      .json({ message: "Server error while fetching claimed foods" });
  }
};
