import express from 'express';
import { createUser } from '../controllers/userController.js';
const router = express.Router();
// route - /api/v1/user/new
router.post('/', createUser);
export default router;
