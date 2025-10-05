import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const authMiddleware = async (req, res, next) => {
  // Check for 'Bearer <token>' format
  const token = req.headers.authorization?.split(" ")[1];

  if (!token)
    return res
      .status(401)
      .json({ message: "Access Denied: No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user by ID from the token payload
    const user = await User.findById(decoded.id);

    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid Token: User not found in database" });
    }

    // Check if user is verified (this is why you should add isVerified to User.js)
    if (!user.isVerified) {
      return res
        .status(401)
        .json({
          message:
            "Account Not Verified: Please check your email to verify your account",
        });
    }

    // Attach the user object (including role) to the request for controller access
    req.user = user;

    next();
  } catch (err) {
    // This catches expired/invalid signature/malformed tokens
    console.error("JWT verification error:", err.message);
    res.status(401).json({ message: "Invalid Token: Authentication failed" });
  }
};
