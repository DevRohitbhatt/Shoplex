import { Category } from '../models/categoryModel.js';
import asyncHandler from '../middlewares/asyncHandler.js';
export const createCategory = asyncHandler(async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            throw new Error('Please provide category name.');
        }
        const categoryExists = await Category.findOne({ name });
        if (categoryExists) {
            return res.status(409).json({
                success: false,
                message: 'Category already exists',
            });
        }
        const category = await new Category({ name }).save();
        console.log(category);
        res.status(201).json({
            success: true,
            category: category,
        });
    }
    catch (error) {
        res.status(200).json({
            success: false,
            message: error,
        });
    }
});
export const updateCategory = asyncHandler(async (req, res) => {
    try {
        const { categoryId } = req.params;
        const category = await Category.findOne({ _id: categoryId });
        if (!category) {
            return res.status(409).json({
                success: false,
                message: 'Category not found',
            });
        }
        category.name = req.body.name || category.name;
        const updatedCategory = await category.save();
        res.status(201).json({
            success: true,
            category: updatedCategory,
        });
    }
    catch (error) {
        res.status(200).json({
            success: false,
            message: error,
        });
    }
});
export const removeCategory = asyncHandler(async (req, res) => {
    try {
        const removed = await Category.findByIdAndDelete(req.params.categoryId);
        res.status(201).json({
            success: true,
            message: 'Category removed',
            category: removed,
        });
    }
    catch (error) {
        res.status(200).json({
            success: false,
            message: error,
        });
    }
});
export const listCategory = asyncHandler(async (req, res) => {
    try {
        const categories = await Category.find({});
        res.json(categories);
    }
    catch (error) {
        res.status(200).json({
            success: false,
            message: error,
        });
    }
});
export const readCategory = asyncHandler(async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        res.json(category);
    }
    catch (error) {
        res.status(200).json({
            success: false,
            message: error,
        });
    }
});
