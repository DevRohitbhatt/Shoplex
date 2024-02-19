import asyncHandler from '../middlewares/asyncHandler.js';
export const createOrder = asyncHandler(async (req, res) => {
    try {
        const { orderItems, shippingInfo, paymentMethod } = req.body;
        const user = await User.findById(req.user?._id);
        if (orderItems && orderItems.length === 0) {
            res.status(409).json({ message: 'No Order items' });
        }
    }
    catch (error) {
        return res.status(404).json({
            success: false,
            message: error,
        });
    }
});
