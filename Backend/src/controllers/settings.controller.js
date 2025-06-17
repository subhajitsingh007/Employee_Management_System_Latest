import { UserModel } from "../models/user.model.js";
import bcrypt from "bcryptjs";
// Get user settings
export const getUserSettings = async (req, res) => {
  const userId = req.user._id;

  try {
    const user = await UserModel.findById(userId).select("theme language notifications");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ settings: user });
  } catch (error) {
    console.error("Error fetching settings:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update user settings with validation
export const updateUserSettings = async (req, res) => {
    console.log("Settings route hit"); // debug log
  const userId = req.user._id;
  const { theme, language, notifications } = req.body;

  // Validate settings
  const validThemes = ["light", "dark"];
  const validLanguages = ["English", "Hindi", "Spanish", "French"];
  
  if (theme && !validThemes.includes(theme)) {
    return res.status(400).json({ message: "Invalid theme value." });
  }

  if (language && !validLanguages.includes(language)) {
    return res.status(400).json({ message: "Invalid language value." });
  }

  if (notifications && typeof notifications.email !== "boolean") {
    return res.status(400).json({ message: "Invalid email notification value." });
  }

  if (notifications && typeof notifications.systemAlerts !== "boolean") {
    return res.status(400).json({ message: "Invalid system alerts notification value." });
  }

  try {
    const user = await UserModel.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (theme) user.theme = theme;
    if (language) user.language = language;
    if (notifications) user.notifications = notifications;

    await user.save();
    res.status(200).json({ message: "Settings updated successfully", settings: user });
  } catch (error) {
    console.error("Error updating settings:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};


//update password controller
export const updatePassword = async (req, res) => {
  const userId = req.user._id;
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await UserModel.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: "Incorrect current password" });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Password update error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};