import { Category } from '../models/categoryModel.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import { myCache } from '../index.js';
import { invalidateCache } from '../utils/features.js';
export const createCategory = asyncHandler(async (req, res) => {
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
    invalidateCache({ category: true, admin: true });
    return res.status(201).json({
        success: true,
        category: category,
    });
});
export const updateCategory = asyncHandler(async (req, res) => {
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
    invalidateCache({ category: true, admin: true });
    return res.status(201).json({
        success: true,
        category: updatedCategory,
    });
});
export const removeCategory = asyncHandler(async (req, res) => {
    const removed = await Category.findByIdAndDelete(req.params.categoryId);
    invalidateCache({ category: true, admin: true });
    return res.status(201).json({
        success: true,
        message: 'Category removed',
        category: removed,
    });
});
export const listCategory = asyncHandler(async (req, res) => {
    let categories;
    if (myCache.has('all-categories'))
        categories = JSON.parse(myCache.get('all-categories'));
    else {
        categories = await Category.find({});
        myCache.set('all-categories', JSON.stringify(categories));
    }
    return res.status(201).json({
        success: true,
        categories,
    });
});
export const readCategory = asyncHandler(async (req, res) => {
    let category;
    const { id } = req.params;
    if (myCache.has(`category-${id}`))
        category = JSON.parse(myCache.get(`category-${id}`));
    else {
        category = await Category.findById(req.params.id);
        if (!category)
            return res.status(404).json({ message: 'Category not found' });
        myCache.set(`category-${id}`, JSON.stringify(category));
    }
    return res.status(201).json({
        success: true,
        category,
    });
});
