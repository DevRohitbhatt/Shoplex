import asyncHandler from '../middlewares/asyncHandler.js';
import { Order } from '../models/orderModel.js';
import { User } from '../models/userModel.js';
import { Product } from '../models/productModel.js';
import { calcPrices } from '../utils/features.js';
export const createOrder = asyncHandler(async (req, res) => {
    try {
        const { orderItems, shippingInfo, paymentMethod } = req.body;
        const user = await User.findById(req.user?._id);
        if (orderItems) {
            if (orderItems.length === 0)
                res.status(409).json({ message: 'No Order items' });
            const itemsFromDB = await Product.find({ _id: { $in: orderItems.map((x) => x._id) } });
            const dbOrderItems = orderItems.map((itemFromClient) => {
                const matchingItemFromDB = itemsFromDB.find((itemFromDB) => itemFromDB._id.toString() === itemFromClient._id);
                if (!matchingItemFromDB) {
                    res.status(404);
                    throw new Error(`Product not found: ${itemFromClient._id}`);
                }
                return {
                    ...itemFromClient,
                    product: itemFromClient._id,
                    price: matchingItemFromDB.price,
                };
            });
            const { subtotal, tax, shippingCost, total } = calcPrices(dbOrderItems);
            const newOrder = new Order({
                user: user?._id,
                orderItems: dbOrderItems,
                shippingInfo,
                paymentMethod,
                subtotal,
                tax,
                shippingCost,
                total,
            });
            await newOrder.save();
            return res.status(201).json({
                success: true,
                message: 'Order created successfully',
                order: newOrder,
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            success: false,
            message: error,
        });
    }
});
export const getAllOrders = asyncHandler(async (req, res) => {
    try {
        const orders = await Order.find({}).populate('user', 'id username');
        console.log(orders);
        return res.status(200).json({
            success: true,
            orders,
        });
    }
    catch (error) {
        return res.status(404).json({
            success: false,
            message: error,
        });
    }
});
