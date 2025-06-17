import cron from "node-cron";
import { AttendanceModel } from "../models/attendance.model.js";
import { UserModel } from "../models/user.model.js";

// Cron job to run every day at 23:59
cron.schedule("59 23 * * *", async () => {
  try {
    console.log("Running daily attendance check...");

    const allUsers = await UserModel.find({ role: "user" });

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize date to compare dates only

    for (let user of allUsers) {
      const record = await AttendanceModel.findOne({ employee: user._id });

      const todayLog = record?.attendanceLog?.find(log => {
        const logDate = new Date(log.logDate);
        logDate.setHours(0, 0, 0, 0);
        return logDate.getTime() === today.getTime();
      });

      if (!record) {
        // No record exists — create and mark absent
        const newRecord = new AttendanceModel({
          employee: user._id,
          status: "absent",
          attendanceLog: [{ logStatus: "absent", logDate: new Date() }]
        });
        await newRecord.save();
        console.log(`Marked absent (no record) for ${user.email}`);
      } else if (!todayLog) {
        // Record exists but no log for today — mark absent
        record.attendanceLog.push({ logStatus: "absent", logDate: new Date() });
        record.status = "absent";
        await record.save();
        console.log(`Marked absent (no log today) for ${user.email}`);
      } else if (todayLog.checkIn && todayLog.checkOut) {
        // Log exists, calculate worked hours
        const hoursWorked = (new Date(todayLog.checkOut) - new Date(todayLog.checkIn)) / (1000 * 60 * 60);
        if (hoursWorked < 6) {
          todayLog.logStatus = "absent";
          record.status = "absent";
          await record.save();
          console.log(`Updated to absent (worked ${hoursWorked.toFixed(2)} hrs) for ${user.email}`);
        }
      }
    }

    console.log("Daily attendance check complete for all users.");

  } catch (error) {
    console.error("Error in attendance cron job:", error.message);
  }
});
