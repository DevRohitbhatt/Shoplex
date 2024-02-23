import express from 'express';
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js';
import { createOrder, getAllOrders } from '../controllers/orderController.js';
const router = express.Router();
router.route('/').post(authenticate, createOrder).get(authenticate, authorizeAdmin, getAllOrders);
export default router;
