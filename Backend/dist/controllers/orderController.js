import asyncHandler from '../middlewares/asyncHandler.js';
import { User } from '../models/userModel.js';
import { Product } from '../models/productModel.js';
export const createOrder = asyncHandler(async (req, res) => {
    try {
        const { orderItems, shippingInfo, paymentMethod } = req.body;
        const user = await User.findById(req.user?._id);
        if (orderItems) {
            if (orderItems.length === 0)
                res.status(409).json({ message: 'No Order items' });
            const itemsFromDB = await Product.find({ _id: { $in: orderItems.map((x) => x._id) } });
        }
    }
    catch (error) {
        return res.status(404).json({
            success: false,
            message: error,
        });
    }
});
