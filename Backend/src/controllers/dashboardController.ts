import { Request, Response } from 'express';
import asyncHandler from '../middlewares/asyncHandler.js';
import { myCache } from '../index.js';
import { Product } from '../models/productModel.js';
import { User } from '../models/userModel.js';
import { Order } from '../models/orderModel.js';
import { calculatePercentage, getInventories } from '../utils/features.js';
import { Category } from '../models/categoryModel.js';

export const getDashboardStats = asyncHandler(async (req: Request, res: Response) => {
	let stats;

	if (myCache.has('dashboard-stats')) stats = JSON.parse(myCache.get('dashboard-stats')!);
	else {
		const today = new Date();
		const sixMonthAgo = new Date();
		sixMonthAgo.setMonth(sixMonthAgo.getMonth() - 6);

		const thisMonth = {
			start: new Date(today.getFullYear(), today.getMonth(), 1),
			end: today,
		};

		const lastMonth = {
			start: new Date(today.getFullYear(), today.getMonth() - 1, 1),
			end: new Date(today.getFullYear(), today.getMonth(), 0),
		};

		const thisMonthProductsPromise = Product.find({
			createdAt: {
				$gte: thisMonth.start,
				$lte: thisMonth.end,
			},
		});

		const lastMonthProductsPromise = Product.find({
			createdAt: {
				$gte: lastMonth.start,
				$lte: lastMonth.end,
			},
		});

		const thisMonthUsersPromise = User.find({
			createdAt: {
				$gte: thisMonth.start,
				$lte: thisMonth.end,
			},
		});

		const lastMonthUsersPromise = User.find({
			createdAt: {
				$gte: lastMonth.start,
				$lte: lastMonth.end,
			},
		});

		const thisMonthOrdersPromise = Order.find({
			createdAt: {
				$gte: thisMonth.start,
				$lte: thisMonth.end,
			},
		});

		const lastMonthOrdersPromise = Order.find({
			createdAt: {
				$gte: lastMonth.start,
				$lte: lastMonth.end,
			},
		});

		const lastSixMonthOrdersPromise = Order.find({
			createdAt: {
				$gte: sixMonthAgo,
				$lte: today,
			},
		});

		const latestOrdersPromise = Order.find({}).select(['orderItems', 'discount', 'total', 'orderStatus']).limit(4);

		const [
			thisMonthProducts,
			thisMonthUsers,
			thisMonthOrders,
			lastMonthProducts,
			lastMonthUsers,
			lastMonthOrders,
			productsCount,
			usersCount,
			allOrders,
			lastSixMonthOrders,
			categories,
			femaleUsersCount,
			latestOrders,
		] = await Promise.all([
			thisMonthProductsPromise,
			thisMonthUsersPromise,
			thisMonthOrdersPromise,
			lastMonthProductsPromise,
			lastMonthUsersPromise,
			lastMonthOrdersPromise,
			Product.countDocuments(),
			User.countDocuments(),
			Order.find({}).select('total'),
			lastSixMonthOrdersPromise,
			Category.find({}).distinct('name'),
			User.countDocuments({ gender: 'female' }),
			latestOrdersPromise,
		]);

		const thisMonthRevenue = thisMonthOrders.reduce((total, order) => total + (order.total || 0), 0);

		const lastMonthRevenue = lastMonthOrders.reduce((total, order) => total + (order.total || 0), 0);

		const totalRevenue = allOrders.reduce((total, order) => total + (order.total || 0), 0);

		const changePercentage = {
			revenue: calculatePercentage(thisMonthRevenue, lastMonthRevenue),
			products: calculatePercentage(thisMonthProducts.length, lastMonthProducts.length),
			users: calculatePercentage(thisMonthUsers.length, lastMonthUsers.length),
			orders: calculatePercentage(thisMonthOrders.length, lastMonthOrders.length),
		};

		const counts = {
			revenue: totalRevenue,
			product: productsCount,
			user: usersCount,
			order: allOrders.length,
		};

		const orderMonthCounts = new Array(6).fill(0);
		const orderMonthyRevenue = new Array(6).fill(0);

		lastSixMonthOrders.forEach((order) => {
			const creationDate = order.createdAt;
			const monthDiff = (today.getMonth() - creationDate.getMonth() + 12) % 12;

			if (monthDiff < 6) {
				orderMonthCounts[6 - monthDiff - 1] += 1;
				orderMonthyRevenue[6 - monthDiff - 1] += order.total;
			}
		});

		const categoryCount = await getInventories({
			categories,
			productsCount,
		});

		const userRatio = {
			male: usersCount - femaleUsersCount,
			female: femaleUsersCount,
		};

		const modifiedLatestOrders = latestOrders.map((i) => ({
			_id: i._id,
			discount: i.discount,
			amount: i.total,
			quantity: i.orderItems.length,
			status: i.orderStatus,
		}));

		const stats = {
			categoryCount,
			changePercentage,
			counts,
			chart: {
				order: orderMonthCounts,
				revenue: orderMonthyRevenue,
			},
			userRatio,
			latestOrders: modifiedLatestOrders,
		};

		myCache.set('dashboard-stats', JSON.stringify(stats));
	}

	return res.status(201).json({
		success: true,
		stats,
	});
});
