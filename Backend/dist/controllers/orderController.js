import asyncHandler from '../middlewares/asyncHandler.js';
import { Order } from '../models/orderModel.js';
import { User } from '../models/userModel.js';
import { Product } from '../models/productModel.js';
import { calcPrices, invalidateCache, reduceStock } from '../utils/features.js';
import { myCache } from '../index.js';
export const createOrder = asyncHandler(async (req, res) => {
    const { orderItems, shippingInfo } = req.body;
    const user = await User.findById(req.user?._id);
    if (orderItems) {
        if (orderItems.length === 0)
            return res.status(409).json({ message: 'No Order items' });
        const itemsFromDB = await Product.find({
            _id: { $in: orderItems.map((x) => x.productId) },
        });
        const dbOrderItems = orderItems.map((itemFromClient) => {
            const matchingItemFromDB = itemsFromDB.find((itemFromDB) => itemFromDB._id.toString() === itemFromClient.productId);
            if (!matchingItemFromDB) {
                res.status(404);
                throw new Error(`Product not found: ${itemFromClient.productId}`);
            }
            return {
                name: matchingItemFromDB.name,
                quantity: itemFromClient.quantity,
                image: matchingItemFromDB.image,
                product: matchingItemFromDB._id,
                price: matchingItemFromDB.price,
            };
        });
        const { subtotal, tax, shippingCost, total } = calcPrices(dbOrderItems);
        const newOrder = new Order({
            user: user?._id,
            orderItems: dbOrderItems,
            shippingInfo,
            subtotal,
            tax,
            shippingCost,
            total,
        });
        await newOrder.save();
        await reduceStock(orderItems);
        invalidateCache({
            product: true,
            order: true,
            admin: true,
            userId: user?._id,
            productId: orderItems.map((item) => String(item.productId)),
        });
        return res.status(201).json({
            success: true,
            message: 'Order created successfully',
            order: newOrder,
        });
    }
});
export const getAllOrders = asyncHandler(async (req, res) => {
    let orders;
    if (myCache.has('all-orders'))
        orders = JSON.parse(myCache.get('all-orders'));
    else {
        orders = await Order.find({}).populate('user', 'id name');
        myCache.set('all-orders', JSON.stringify(orders));
    }
    return res.status(200).json({
        success: true,
        orders,
    });
});
export const getUserOrders = asyncHandler(async (req, res) => {
    const userId = req.user?._id;
    let orders;
    if (myCache.has(`my-orders-${userId}`))
        orders = JSON.parse(myCache.get(`my-orders-${userId}`));
    else {
        orders = await Order.find({ user: req.user?._id });
        myCache.set(`my-orders-${userId}`, JSON.stringify(orders));
    }
    return res.status(201).json({
        success: true,
        orders,
    });
});
export const getOrderById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    let order;
    if (myCache.has(`order-${id}`))
        order = JSON.parse(myCache.get(`order-${id}`));
    else {
        order = await Order.findById(req.params.id);
        if (!order)
            return res.status(409).json({ message: 'Order not found' });
        myCache.set(`order-${id}`, JSON.stringify(order));
    }
    return res.status(201).json({
        success: true,
        order,
    });
});
export const processOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (!order)
        return res.status(409).json({ message: 'Order not found' });
    switch (order.orderStatus) {
        case 'Processing':
            order.orderStatus = 'Shipped';
            break;
        case 'Shipped':
            order.orderStatus = 'Delivered';
            break;
        default:
            order.orderStatus = 'Delivered';
            break;
    }
    await order.save();
    invalidateCache({
        product: false,
        order: true,
        admin: true,
        userId: order.user,
        orderId: String(order._id),
    });
    return res.status(201).json({
        success: true,
        message: 'Order Processed Successfully',
        order,
    });
});
export const deleteOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (!order)
        return res.status(409).json({ message: 'Order not found' });
    await Order.findByIdAndDelete(req.params.id);
    invalidateCache({
        product: false,
        order: true,
        admin: true,
        userId: order.user,
        orderId: String(order._id),
    });
    return res.status(201).json({
        success: true,
        message: 'Order Deleted Successfully',
    });
});
