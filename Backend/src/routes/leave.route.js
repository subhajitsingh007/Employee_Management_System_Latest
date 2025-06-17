import express from 'express';
import { isAdmin, protectRoute } from '../middlewares/auth.middleware.js';
import {
  createLeaveRequest,
  getAllLeaves,
  getMyLeaves,
  updateLeaveStatus
} from '../controllers/leave.controller.js';

const router = express.Router();

// ✅ Apply for leave (employee)
router.post("/apply", protectRoute, createLeaveRequest);

// ✅ View my leaves (employee)
router.get("/my", protectRoute, getMyLeaves);

// ✅ Admin views all leave requests
router.get("/all", protectRoute, isAdmin, getAllLeaves);

// ✅ Admin approves/rejects
router.put("/update/:id", protectRoute, isAdmin, updateLeaveStatus);

export default router;
