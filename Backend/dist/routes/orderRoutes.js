import express from 'express';
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js';
import { createOrder, deleteOrder, getAllOrders, getOrderById, getUserOrders, processOrder, } from '../controllers/orderController.js';
const router = express.Router();
router.route('/').post(authenticate, createOrder).get(authenticate, authorizeAdmin, getAllOrders);
router.route('/mine').get(authenticate, getUserOrders);
router
    .route('/:id')
    .get(authenticate, getOrderById)
    .put(authenticate, authorizeAdmin, processOrder)
    .delete(authenticate, authorizeAdmin, deleteOrder);
export default router;
