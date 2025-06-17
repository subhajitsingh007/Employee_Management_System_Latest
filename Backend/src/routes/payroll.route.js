import express from "express";
import { protectRoute, isAdmin } from "../middlewares/auth.middleware.js";
import { createPayroll, getAllPayrolls, getPayrollByUser } from "../controllers/payroll.controller.js";

const router = express.Router();

// Admin - Create payroll
router.post("/create", protectRoute, isAdmin, createPayroll);

// Admin - Get all payroll records
router.get("/all", protectRoute, isAdmin, getAllPayrolls);

// Admin - Get payrolls by employee
router.get("/user/:id", protectRoute, isAdmin, getPayrollByUser);

export default router;
