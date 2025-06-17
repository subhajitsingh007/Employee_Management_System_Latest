import express from 'express';
import { isAdmin , protectRoute  } from '../middlewares/auth.middleware.js';
import {createEmployee,getAllEmployees, getEmployeeById, updateEmployee, deleteEmployee,promoteToAdmin} from '../controllers/admin.controller.js'


const router = express.Router()

//Employee management routes

//get all employees
// Protect all admin routes with both middlewares
router.post("/employees/create", protectRoute, isAdmin, createEmployee);
router.get("/employees", protectRoute, isAdmin, getAllEmployees);
router.get("/employees/:id", protectRoute, isAdmin, getEmployeeById);
router.put("/employees/:id", protectRoute, isAdmin, updateEmployee);
router.delete("/employees/:id", protectRoute, isAdmin, deleteEmployee);
router.put("/employees/promote/:id", protectRoute, isAdmin, promoteToAdmin);

export default router