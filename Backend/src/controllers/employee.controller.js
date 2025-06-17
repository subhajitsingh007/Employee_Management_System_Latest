import { UserModel } from "../models/user.model.js";

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, email, phone, address, emergencyContact } = req.body;

    const updated = await UserModel.findByIdAndUpdate(
      userId,
      { name, email, phone, address, emergencyContact },
      { new: true }
    );

    res.status(200).json({ message: "Profile updated", updated });
  } catch (error) {
    console.error("Update failed:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // assuming you're using a middleware to decode JWT
    const user = await UserModel.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


