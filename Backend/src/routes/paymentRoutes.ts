import express from 'express';
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js';
import {
	applyDiscount,
	createPaymentIntent,
	deleteCoupon,
	getAllCoupons,
	newCoupon,
} from '../controllers/paymentController.js';

const router = express.Router();

router.route('/create').post(authenticate, createPaymentIntent);

router.route('/coupon').post(authenticate, authorizeAdmin, newCoupon);

router.route('/discount').get(authenticate, authorizeAdmin, applyDiscount);

router.get('/coupon/all', authenticate, authorizeAdmin, getAllCoupons);

router.route('/coupon/:id').delete(authenticate, authorizeAdmin, deleteCoupon);

export default router;
