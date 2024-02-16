import { Product } from '../models/productModel.js';
import asyncHandler from '../middlewares/asyncHandler.js';
export const addProduct = asyncHandler(async (req, res) => {
    try {
        const { name, description, price, category, quantity, brand } = req.body;
        const photo = req.file;
        if (!photo) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a photo',
            });
        }
        if (!name || !description || !price || !category || !quantity) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all fields',
            });
        }
        const product = new Product({
            name,
            description,
            price,
            category,
            quantity,
            brand,
            image: photo.path,
        });
        await product.save();
    }
    catch (error) {
        res.status(200).json({
            success: false,
            message: error,
        });
    }
});
