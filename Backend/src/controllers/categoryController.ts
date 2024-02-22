import { Request, Response } from 'express';
import { Category } from '../models/categoryModel.js';
import { NewCategoryRequestBody } from '../types/types.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import { myCache } from '../index.js';
import { invalidateCache } from '../utils/features.js';

export const createCategory = asyncHandler(async (req: Request<{}, {}, NewCategoryRequestBody>, res: Response) => {
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

		invalidateCache({ category: true, admin: true });

		res.status(201).json({
			success: true,
			category: category,
		});
	} catch (error) {
		res.status(200).json({
			success: false,
			message: error,
		});
	}
});

export const updateCategory = asyncHandler(async (req: Request, res: Response) => {
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

		invalidateCache({ category: true, admin: true });

		res.status(201).json({
			success: true,
			category: updatedCategory,
		});
	} catch (error) {
		res.status(200).json({
			success: false,
			message: error,
		});
	}
});

export const removeCategory = asyncHandler(async (req: Request, res: Response) => {
	try {
		const removed = await Category.findByIdAndDelete(req.params.categoryId);

		invalidateCache({ category: true, admin: true });

		res.status(201).json({
			success: true,
			message: 'Category removed',
			category: removed,
		});
	} catch (error) {
		res.status(200).json({
			success: false,
			message: error,
		});
	}
});

export const listCategory = asyncHandler(async (req: Request, res: Response) => {
	try {
		let categories;

		if (myCache.has('all-categories')) categories = JSON.parse(myCache.get('all-categories')!);
		else {
			categories = await Category.find({});
			myCache.set('all-categories', JSON.stringify(categories));
		}

		res.status(201).json({
			success: true,
			categories,
		});
	} catch (error) {
		res.status(200).json({
			success: false,
			message: error,
		});
	}
});

export const readCategory = asyncHandler(async (req: Request, res: Response) => {
	try {
		let category;
		const { id } = req.params;

		if (myCache.has(`category-${id}`)) category = JSON.parse(myCache.get(`category-${id}`)!);
		else {
			category = await Category.findById(req.params.id);
			if (!category) return res.status(404).json({ message: 'Category not found' });
			myCache.set(`category-${id}`, JSON.stringify(category));
		}

		res.status(201).json({
			success: true,
			category,
		});
	} catch (error) {
		res.status(200).json({
			success: false,
			message: error,
		});
	}
});
