import express from 'express';
import { checkIn, checkOut ,getTodayAttendance} from '../controllers/attendance.emp.controller.js';
import { protectRoute } from '../middlewares/auth.middleware.js';


const router = express.Router();

router.post('/checkin', protectRoute, checkIn);
router.post('/checkout', protectRoute, checkOut);
router.get('/today', protectRoute, getTodayAttendance);
//router.get('/history', protectRoute, getAttendanceHistory);

export default router;