import { Product } from '../models/productModel.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import { Request, Response } from 'express';
import { BaseQuery, NewProductRequestBody, SearchRequestQuery } from '../types/types.js';
import { rm } from 'fs';
import { myCache } from '../index.js';

export const addProduct = asyncHandler(async (req: Request<{}, {}, NewProductRequestBody>, res: Response) => {
	try {
		const { name, description, price, category, quantity, brand } = req.body;
		const photo = req.file;

		if (!photo) {
			return res.status(400).json({
				success: false,
				message: 'Please provide a photo',
			});
		}

		if (!name || !description || !price || !category || !quantity || !brand) {
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
		res.status(201).json({
			success: true,
			product: product,
		});
		return;
	} catch (error) {
		res.status(404).json({
			success: false,
			message: error,
		});
		return;
	}
});

export const updateProductDetails = asyncHandler(async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const { name, description, price, category, quantity, brand } = req.body;
		const photo = req.file;

		const product = await Product.findById(id);

		if (!product) return res.status(404).json({ message: 'Product not found' });

		if (photo) {
			rm(product.image!, () => {
				console.log('Old Photo Deleted');
			});
			product.image = photo.path;
		}

		if (name) product.name = name;
		if (description) product.description = description;
		if (price) product.price = price;
		if (quantity) product.quantity = quantity;
		if (category) product.category = category;
		if (brand) product.brand = brand;

		await product.save();
		res.status(201).json({
			success: true,
			message: 'Product saved successfully',
			product: product,
		});
		return;
	} catch (error) {
		res.status(404).json({
			success: false,
			message: error,
		});
		return;
	}
});

export const removeProduct = asyncHandler(async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const product = await Product.findById(id);

		if (!product) return res.status(404).json({ message: 'Product not found' });

		rm(product.image!, () => {
			console.log('Old Photo Deleted');
		});

		await Product.findByIdAndDelete(id);
		res.status(201).json({
			success: true,
			message: 'Product deleted successfully',
		});
		return;
	} catch (error) {
		res.status(404).json({
			success: false,
			message: error,
		});
		return;
	}
});

export const getProductById = asyncHandler(async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const product = await Product.findById(id);

		if (!product) return res.status(404).json({ message: 'Product not found' });

		res.status(201).json({
			success: true,
			product: product,
		});
		return;
	} catch (error) {
		res.status(404).json({
			success: false,
			message: error,
		});
		return;
	}
});

export const fetchAdminProduct = asyncHandler(async (req: Request, res: Response) => {
	try {
		const products = await Product.find({}).sort({ _createdAt: -1 });
		return res.json(products);
	} catch (error) {
		res.status(404).json({
			success: false,
			message: error,
		});
	}
});

export const fetchAllProducts = asyncHandler(async (req: Request<{}, {}, {}, SearchRequestQuery>, res: Response) => {
	try {
		const { search, category, price, sort } = req.query;
		const page = Number(req.query.page) || 1;

		const limit = Number(process.env.PRODUCT_PER_PAGE) || 16;
		const skip = limit * (page - 1);

		const baseQuery: BaseQuery = {};

		if (search)
			baseQuery.name = {
				$regex: search,
				$options: 'i',
			};

		if (price)
			baseQuery.price = {
				$lte: Number(price),
			};

		if (category) baseQuery.category = category;

		const productPromise = Product.find(baseQuery)
			.sort(sort && { price: sort === 'asc' ? 1 : -1 })
			.limit(limit)
			.skip(skip);

		const [products, filteredOnlyProduct] = await Promise.all([productPromise, Product.find(baseQuery)]);

		const totalPages = Math.ceil(filteredOnlyProduct.length / limit);

		return res.status(201).json({
			success: true,
			products: products,
			totalPages: totalPages,
		});
	} catch (error) {
		console.log('ujjwal error');
		return res.status(404).json({
			success: false,
			message: error,
		});
	}
});

export const fetchLatestProducts = asyncHandler(async (req: Request, res: Response) => {
	try {
		let products = [];

		if (myCache.has('latest-product')) products = JSON.parse(myCache.get('latest-product')!);
		else {
			products = await Product.find({}).sort({ _createdAt: -1 }).limit(4);
			myCache.set('latest-product', JSON.stringify(products));
		}

		return res.status(201).json({
			success: true,
			products: products,
		});
	} catch (error) {
		return res.status(404).json({
			success: false,
			message: error,
		});
	}
});

export const fetchTopProducts = asyncHandler(async (req: Request, res: Response) => {
	try {
		const product = await Product.find({}).sort({ rating: -1 }).limit(4);

		return res.status(201).json({
			success: true,
			products: product,
		});
	} catch (error) {
		return res.status(404).json({
			success: false,
			message: error,
		});
	}
});

export const addProductReview = asyncHandler(async (req: Request, res: Response) => {
	try {
		const { rating, comment } = req.body;
		const { id } = req.params;
		const product = await Product.findById(id);

		if (product) {
			const alreadyReviewed = product.reviews.find((r) => r.user.toString() === req.user?._id?.toString());

			if (alreadyReviewed) return res.status(409).json({ message: 'Product already reviewed' });

			const review = {
				name: req.user?.name!,
				rating: Number(rating),
				comment,
				user: req.user?._id!,
			};

			product.reviews.push(review);

			product.numReviews = product?.reviews.length;

			product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

			await product.save();
		}
	} catch (error) {
		return res.status(404).json({
			success: false,
			message: error,
		});
	}
});
