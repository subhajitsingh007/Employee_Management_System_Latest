import express from 'express';
import { updateProfile,getUserProfile } from '../controllers/employee.controller.js';
import { protectRoute} from '../middlewares/auth.middleware.js'; // assumes auth middleware

const router = express.Router();

router.post('/update-profile', protectRoute, updateProfile);
// user.routes.js
router.get('/profile', protectRoute, getUserProfile);



export default router;