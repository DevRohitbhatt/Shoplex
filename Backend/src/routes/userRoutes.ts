import express from 'express';
import {
	createUser,
	deleteUserById,
	getAllUsers,
	getUserById,
	getUserProfile,
	loginUser,
	logoutUser,
	updateUserById,
	updateUserProfile,
} from '../controllers/userController.js';
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

// route - /api/v1/user/new
router.route('/').post(createUser).get(authenticate, authorizeAdmin, getAllUsers);

router.post('/auth', loginUser);
router.post('/logout', logoutUser);

router.route('/profile').get(authenticate, getUserProfile).put(authenticate, updateUserProfile);

router
	.route('/:id')
	.delete(authenticate, authorizeAdmin, deleteUserById)
	.get(authenticate, authorizeAdmin, getUserById)
	.put(authenticate, authorizeAdmin, updateUserById);

export default router;
