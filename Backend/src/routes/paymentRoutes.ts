import express from 'express';
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js';
import { newCoupon } from '../controllers/paymentController.js';

const router = express.Router();

router.route('/coupon').post(authenticate, authorizeAdmin, newCoupon);

export default router;
