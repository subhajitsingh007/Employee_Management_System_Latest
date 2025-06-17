import mongoose from 'mongoose';

const salarySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  basicSalary: {
    type: Number,
    required: true,
    min: 0
  },
  bonus: {
    type: Number,
    required: true,
    default: 0,
    min: 0
  },
  deductions: {
    type: Number,
    required: true,
    default: 0,
    min: 0
  },
  netSalary: {
    type: Number,
    required: true,
    min: 0
  },
  month: {
    type: String,
    required: true,
    match: /^\d{4}-(0[1-9]|1[0-2])$/ // Enforces YYYY-MM format
  }
}, {
  timestamps: true // adds createdAt and updatedAt automatically
});

export const salaryModel = mongoose.model("Salary", salarySchema);