import express from 'express';
import { isAdmin, protectRoute } from '../middlewares/auth.middleware.js';
import { createSalary, getMySalary, getAllSalary ,updateSalary } from '../controllers/salary.controller.js';

const router = express.Router()

//create salary (for admin)
router.post("/create", protectRoute, isAdmin, createSalary)

//get mysalary (for employee)
router.get("/my", protectRoute, getMySalary)

//get all salary records (for admin)
router.get("/all", protectRoute, isAdmin, getAllSalary)

// Admin - Update an employee's salary record
router.put("/update/:id", protectRoute, isAdmin, updateSalary)

export default router