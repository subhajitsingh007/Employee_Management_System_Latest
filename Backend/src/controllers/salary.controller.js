import { UserModel } from "../models/user.model.js";
import { salaryModel } from "../models/salary.model.js";

// Admin - Create salary record
export const createSalary = async (req, res) => {
    const { userId, basicSalary, bonus = 0, deductions = 0, month } = req.body;

    try {
        if (!userId || basicSalary == null || month == null) {
            return res.status(400).json({ message: "Please provide all the required fields" });
        }

        const user = await UserModel.findById(userId).select("-password");
        if (!user || user.role !== "user") {
            return res.status(404).json({ message: "User not found" });
        }

        const existingSalary = await salaryModel.findOne({ user: userId, month });
        if (existingSalary) {
            return res.status(400).json({ message: "Salary record already exists for this month" });
        }

        const basic = Number(basicSalary);
        const bon = Number(bonus);
        const ded = Number(deductions);

        const netSalary = basic + bon - ded

        

       const newSalary = await salaryModel.create({
        user: userId,
        basicSalary: basic,
        bonus: bon,
        deductions: ded,
        netSalary,
        month
    });
// Populate the user field before sending the response
    const populatedSalary = await salaryModel.findById(newSalary._id).populate('user', 'name email');

    res.status(201).json({
        success: true,
        message: "Salary record created successfully",
        data: populatedSalary
    });
    } catch (error) {
        console.error("Error in create salary controller:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Get logged-in user's salary records
export const getMySalary = async (req, res) => {
    try {
        const salary = await salaryModel.find({ user: req.user._id }).sort({ createdAt: -1 });

        if (!salary || salary.length === 0) {
            return res.status(404).json({ message: "Salary record not found" });
        }

        return res.status(200).json({
            success: true,
            message: "Salary records fetched successfully",
            count: salary.length,
            data: salary
        });

    } catch (error) {
        console.error("Error in get my salary controller:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Admin - Get all salary records
export const getAllSalary = async (req, res) => {
  try {
    const salaries = await salaryModel
      .find()
      .populate("user", "name email role") // Include only relevant fields
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Salary records fetched successfully",
      count: salaries.length,
      data: salaries
    });

  } catch (error) {
    console.error("Error in get all salary controller:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};


// Admin - Update an employee's salary record
export const updateSalary = async (req, res) => {
    try {
        const { id } = req.params;
        const { basicSalary, bonus, deductions } = req.body;

        const salaryRecord = await salaryModel.findById(id);
        if (!salaryRecord) {
            return res.status(404).json({ message: "Salary record not found" });
        }

        // Safely parse and update
        if (basicSalary !== undefined) salaryRecord.basicSalary = Number(basicSalary);
        if (bonus !== undefined) salaryRecord.bonus = Number(bonus);
        if (deductions !== undefined) salaryRecord.deductions = Number(deductions);

        // Recalculate netSalary
        salaryRecord.netSalary =
            salaryRecord.basicSalary + salaryRecord.bonus - salaryRecord.deductions;

        await salaryRecord.save();

        res.status(200).json({
            success: true,
            message: "Salary record updated successfully",
            data: salaryRecord,
        });
    } catch (error) {
        console.error("Error in update salary controller:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};
