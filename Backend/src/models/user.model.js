import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ["admin", "user"],
            default: "user",
        },
        // Admin-filled fields
        position: {
            type: String,
        },
        department: {
            type: String,
        },
        dateOfJoining: {
            type: Date,
        },
        salary: {
            type: Number,
        },
        // Add settings field
        theme:{
            type: String ,
            default: "light",
            enum: ["light", "dark"]
        },
        language:{
            type:String,
            default:"English",
            enum: ["English", "Hindi", "Bengali", "Spanish"]
        },
         notifications: {
      email: {
         type: Boolean, 
         default: true 
            },
      systemAlerts: {
         type: Boolean,
          default: true 
            }
        }
    },
        
    {
        timestamps: true
    }
);

export const UserModel = mongoose.model("User", userSchema);
