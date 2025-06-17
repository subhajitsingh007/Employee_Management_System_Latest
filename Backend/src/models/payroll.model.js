import mongoose from 'mongoose';

const payrollSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  salaryRecord: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Salary",
    required: true
  },
  salaryPaid: {
    type: Number,
    required: true,
    min: 0
  },
  month: {
    type: String,
    required: true,
    match: /^\d{4}-(0[1-9]|1[0-2])$/ // Matches YYYY-MM
  },
  paymentDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

export const PayRollModel = mongoose.model("Payroll", payrollSchema);
