import { PayRollModel } from "../models/payroll.model.js";
import { UserModel } from "../models/user.model.js";

// Admin - Create payroll entry
export const createPayroll = async (req, res) => {
  try {
    const { userId, month, salaryPaid } = req.body;

    if (!userId || !month || !salaryPaid) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user exists
    const user = await UserModel.findById(userId);
    if (!user || user.role !== "user") {
      return res.status(404).json({ message: "User not found or invalid role" });
    }

    // Check for duplicate payroll for the month
    const existingRecord = await PayRollModel.findOne({ user: userId, month });
    if (existingRecord) {
      return res.status(400).json({ message: "Payroll record already exists for this month" });
    }

    const newPayroll = await PayRollModel.create({
      user: userId,
      month,
      salaryPaid
    });

    res.status(201).json({
      success: true,
      message: "Payroll created successfully",
      data: newPayroll
    });

  } catch (error) {
    console.log("Error in createPayroll:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Admin - Get all payroll records
export const getAllPayrolls = async (req, res) => {
  try {
    const records = await PayRollModel.find().populate("user", "-password").sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: records.length,
      data: records
    });

  } catch (error) {
    console.log("Error in getAllPayrolls:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Admin - Get payroll records by user ID
export const getPayrollByUser = async (req, res) => {
  try {
    const { id } = req.params;

    const payrolls = await PayRollModel.find({ user: id }).populate("user", "-password").sort({ createdAt: -1 });

    if (!payrolls.length) {
      return res.status(404).json({ message: "No payroll records found for this user" });
    }

    res.status(200).json({
      success: true,
      count: payrolls.length,
      data: payrolls
    });

  } catch (error) {
    console.log("Error in getPayrollByUser:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
