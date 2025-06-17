import mongoose from "mongoose";


const leaveRequestSchema = new mongoose.Schema(
    {
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        leaveType: {
            type: String,
            enum: ["Sick Leave", "Casual Leave", "Other Leave"],
            required: true
        },
        startDate:{
            type: Date,
            required: true
        },
        endDate:{
            type: Date,
            required: true
        },
        reason:{
            type: String
        },
        status:{
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending"
        }
    },
    {
        timestamps: true
    }
)

export const leaveRequestModel = mongoose.model("LeaveRequest", leaveRequestSchema)
