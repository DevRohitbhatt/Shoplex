import express from 'express';
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js';
import { singleUpload } from '../middlewares/multer.js';
import { addProduct, fetchAllProducts, fetchAdminProduct, getProductById, removeProduct, updateProductDetails, fetchLatestProducts, fetchTopProducts, addProductReview, } from '../controllers/productController.js';
const router = express.Router();
router
    .route('/')
    .get(authenticate, authorizeAdmin, fetchAdminProduct)
    .post(authenticate, authorizeAdmin, singleUpload, addProduct);
router.get('/all', fetchAllProducts);
router.route('/:id/reviews').post(authenticate, authorizeAdmin, addProductReview);
router.get('/latest', fetchLatestProducts);
router.get('/top', fetchTopProducts);
router
    .route('/:id')
    .get(getProductById)
    .put(authenticate, authorizeAdmin, singleUpload, updateProductDetails)
    .delete(authenticate, authorizeAdmin, removeProduct);
export default router;
