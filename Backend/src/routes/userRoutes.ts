import express from 'express';
import { createUser, getAllUsers } from '../controllers/userController.js';
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

// route - /api/v1/user/new
router.route('/').post(createUser).get(authenticate, authorizeAdmin, getAllUsers);

export default router;
