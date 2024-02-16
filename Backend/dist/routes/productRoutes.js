import express from 'express';
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js';
import { singleUpload } from '../middlewares/multer.js';
import { addProduct } from '../controllers/productController.js';
const router = express.Router();
router.route('/').post(authenticate, authorizeAdmin, singleUpload, addProduct);
export default router;
