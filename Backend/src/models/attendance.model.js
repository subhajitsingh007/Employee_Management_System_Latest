import mongoose from "mongoose";

const AttendanceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    name: {
      type: String,
      required: true
    },
    date: {
      type: String, // format: YYYY-MM-DD
      required: true
    },
    checkIn: {
      type: String // format: HH:mm or HH:mm:ss
    },
    checkOut: {
      type: String // format: HH:mm or HH:mm:ss
    }
  },
  {
    timestamps: true
  }
);

export const AttendanceModel = mongoose.model("Attendance", AttendanceSchema);
