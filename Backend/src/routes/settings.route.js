import express from 'express';
import { getUserSettings,updateUserSettings,updatePassword } from '../controllers/settings.controller.js';
import { protectRoute } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get("/", protectRoute, getUserSettings);
router.put("/", protectRoute, updateUserSettings);
// routes/user.routes.js
router.put("/update-password", protectRoute, updatePassword); // You need this controller
export default router;