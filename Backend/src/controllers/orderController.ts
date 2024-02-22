import asyncHandler from '../middlewares/asyncHandler.js';
import { Request, Response } from 'express';
import { Order } from '../models/orderModel.js';
import { User } from '../models/userModel.js';
import { Product } from '../models/productModel.js';
import { OrderItemType } from '../types/types.js';

export const createOrder = asyncHandler(async (req: Request, res: Response) => {
	try {
		const { orderItems, shippingInfo, paymentMethod } = req.body;
		const user = await User.findById(req.user?._id);

		if (orderItems) {
			if (orderItems.length === 0) res.status(409).json({ message: 'No Order items' });

			const itemsFromDB = await Product.find({ _id: { $in: orderItems.map((x: OrderItemType) => x._id) } });
		}
	} catch (error) {
		return res.status(404).json({
			success: false,
			message: error,
		});
	}
});
