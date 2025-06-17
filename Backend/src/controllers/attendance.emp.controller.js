import { AttendanceModel } from "../models/attendance.model.js";

// === Check-in ===
export const checkIn = async (req, res) => {
  try {
    const userId = req.user._id;
    const name = req.user.name;

    const today = new Date();
    today.setHours(0, 0, 0, 0); // reset to midnight to standardize

    const checkInTime = new Date(); // current full timestamp

    const existingRecord = await AttendanceModel.findOne({ userId, date: today });
    if (existingRecord) {
      return res.status(400).json({ message: "You have already checked in today." });
    }

    const attendance = new AttendanceModel({
      userId,
      name,
      date: today,
      checkIn: checkInTime
    });

    await attendance.save();
    res.status(201).json({ message: "Checked in successfully.", attendance });

  } catch (error) {
    console.error("Check-in error:", error);
    res.status(500).json({ message: "Server error during check-in." });
  }
};


export const checkOut = async (req, res) => {
  try {
    const userId = req.user._id;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0); // match the same format

    const checkOutTime = new Date(); // full timestamp

    const attendance = await AttendanceModel.findOne({ userId, date: today });

    if (!attendance) {
      return res.status(404).json({ message: "You haven't checked in today." });
    }

    if (attendance.checkOut) {
      return res.status(400).json({ message: "You have already checked out today." });
    }

    attendance.checkOut = checkOutTime;
    await attendance.save();

    res.status(200).json({ message: "Checked out successfully.", attendance });

  } catch (error) {
    console.error("Check-out error:", error);
    res.status(500).json({ message: "Server error during check-out." });
  }
};

// === Get Today's Attendance ===
export const getTodayAttendance = async (req, res) => {
  try {
    const userId = req.user._id.toString();

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const attendance = await AttendanceModel.findOne({
      userId,
      date: { $gte: todayStart, $lte: todayEnd },
    });

    res.status(200).json({ attendance });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// === Get Last 10 Days History ===
export const getAttendanceHistory = async (req, res) => {
  try {
    const userId = req.user._id.toString();

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 9);
    startDate.setHours(0, 0, 0, 0);

    const records = await AttendanceModel.find({
      userId,
      date: { $gte: startDate },
    });

    const history = [];

    for (let i = 0; i < 10; i++) {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() - i);
      currentDate.setHours(0, 0, 0, 0);

      const match = records.find(
        (r) =>
          new Date(r.date).toISOString().split("T")[0] ===
          currentDate.toISOString().split("T")[0]
      );

      history.push({
        date: currentDate.toISOString(),
        formattedDate: currentDate.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        }),
        status: match ? "Present" : "Absent",
        checkIn: match?.checkIn?.toISOString() || null,
        checkOut: match?.checkOut?.toISOString() || null,
        totalHours: match ? calculateHours(match) : "0.00",
      });
    }

    res.status(200).json({ records: history.reverse() });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// === Helper Function ===
function calculateHours(record) {
  if (!record.checkIn) return "0.00";
  const checkIn = new Date(record.checkIn);
  const checkOut = record.checkOut ? new Date(record.checkOut) : new Date();
  return ((checkOut - checkIn) / 3600000).toFixed(2);
}
