import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.route.js'
import adminRoutes from './routes/admin.route.js'
import leaveRoutes from './routes/leave.route.js'
import departmentRoutes from './routes/department.route.js'
import attendanceRoutes from './routes/attendance.route.js'
import salaryRoutes from './routes/salary.route.js'
import payrollRoutes from './routes/payroll.route.js'
import settingsRoutes from './routes/settings.route.js'
import EmployeeAttendanceRoutes from './routes/attendance.emp.route.js';
import employeeRoutes from './routes/employee.route.js';
const app = express()

app.use(cors({
    origin: "http://localhost:3000", // my frontend
    credentials: true
  }))

app.use(express.json()) // Middleware to parse JSON requests

app.use(cookieParser()) // Middleware to parse cookies

app.use("/api/auth", authRoutes)// Authentication routes
app.use("/api/admin", adminRoutes)// Admin routes
app.use("/api/leave", leaveRoutes)// Leave management routes
app.use("/api/department", departmentRoutes);// Department routes
app.use("/api/attendance", attendanceRoutes);// Attendance routes
app.use("/api/salary", salaryRoutes);// Salary routes
app.use("/api/payroll",payrollRoutes)// Payroll routes
app.use("/api/settings",settingsRoutes)// Settings routes
app.use("/api/employee/attendance", EmployeeAttendanceRoutes);// Employee attendance routes


app.use('/api/employee', employeeRoutes);
export default app

