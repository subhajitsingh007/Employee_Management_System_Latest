import express from "express";
import { isAdmin, protectRoute } from "../middlewares/auth.middleware.js";
import {  getAttendanceByEmployeeId , getAllAttendance  } from "../controllers/attendance.controller.js";


const router = express.Router()
//mark attendance for employee


//get all attendance for admin
router.get("/admin/all", protectRoute, isAdmin, getAllAttendance)

//get attendance by employee id for admin
router.get("/admin/:id", protectRoute, isAdmin, getAttendanceByEmployeeId)



export default router