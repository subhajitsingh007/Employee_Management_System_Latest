import express from 'express';
import {
  createDepartment,
  getAllDepartments,
  getDepartmentDetails,
  deleteDepartment,
  updateDepartment
} from '../controllers/department.controller.js';
import { protectRoute, isAdmin } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Create department (Admin only)
router.post('/create', protectRoute, isAdmin, createDepartment);

// Get all departments (Admin only)
router.get('/all', protectRoute, isAdmin, getAllDepartments);

// Get department details with employees and HRs (Admin only)
router.get('/:id', protectRoute, isAdmin, getDepartmentDetails);

// Update department (Admin only)
router.put('/update/:id', protectRoute, isAdmin, updateDepartment);

// Delete department (Admin only)
router.delete('/delete/:id', protectRoute, isAdmin, deleteDepartment);

export default router;
