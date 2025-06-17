import { AttendanceModel } from "../models/attendance.model.js";

// === Admin - Get All Attendance ===
export const getAllAttendance = async (req, res) => {
  try {
    const records = await AttendanceModel.find()
      .populate("userId", "name email position department dateOfJoining salary")
      .sort({ createdAt: -1 });

    if (records.length === 0) {
      console.log("No attendance records found.");
    }

    res.status(200).json({ records });
  } catch (error) {
    console.error("Error in getAllAttendance controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// === Admin - Get Attendance by Employee ID ===
export const getAttendanceByEmployeeId = async (req, res) => {
  const employeeId = req.params.id;

  try {
    const attendance = await AttendanceModel.find({ userId: employeeId }) // find all, not just one
      .sort({ date: -1 })
      .populate("userId", "name email position department");

    if (!attendance || attendance.length === 0) {
      return res.status(404).json({ message: "No attendance records found for this employee." });
    }

    res.status(200).json({ attendance });
  } catch (error) {
    console.error("Error in getAttendanceByEmployeeId controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
