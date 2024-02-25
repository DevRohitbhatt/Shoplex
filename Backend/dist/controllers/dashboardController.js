import asyncHandler from '../middlewares/asyncHandler.js';
import { myCache } from '../index.js';
import { Product } from '../models/productModel.js';
import { User } from '../models/userModel.js';
import { Order } from '../models/orderModel.js';
import { calculatePercentage } from '../utils/features.js';
export const getDashboardStats = asyncHandler(async (req, res) => {
    let stats;
    if (myCache.has('dashboard-stats'))
        stats = JSON.parse(myCache.get('dashboard-stats'));
    else {
        const today = new Date();
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
        const [thisMonthProducts, thisMonthUsers, thisMonthOrders, lastMonthProducts, lastMonthUsers, lastMonthOrders] = await Promise.all([
            thisMonthProductsPromise,
            thisMonthUsersPromise,
            thisMonthOrdersPromise,
            lastMonthProductsPromise,
            lastMonthUsersPromise,
            lastMonthOrdersPromise,
        ]);
        const changePercentage = {
            products = calculatePercentage(thisMonthProducts.length, lastMonthProducts.length),
            users = calculatePercentage(thisMonthUsers.length, lastMonthUsers.length),
            orders = calculatePercentage(thisMonthOrders.length, lastMonthOrders.length),
        };
        stats = {
            changePercentage,
        };
        myCache.set('dashboard-stats', JSON.stringify(stats));
    }
    return res.status(201).json({
        success: true,
        stats,
    });
});
