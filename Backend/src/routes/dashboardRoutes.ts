import express from 'express';
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js';
import { getDashboardStats } from '../controllers/dashboardController.js';

const router = express.Router();

router.route('/stats').get(authenticate, authorizeAdmin, getDashboardStats);

export default router;
