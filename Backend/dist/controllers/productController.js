import { Product } from '../models/productModel.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import { rm } from 'fs';
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
            rm(photo.path, () => {
                console.log('Deleted');
            });
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
        console.log('ujjwal');
        res.status(201).json({
            success: true,
            product: product,
        });
        return;
    }
    catch (error) {
        res.status(200).json({
            success: false,
            message: error,
        });
        return;
    }
});
