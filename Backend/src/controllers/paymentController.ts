import asyncHandler from '../middlewares/asyncHandler.js';
import { Request, Response } from 'express';
import { Coupon } from '../models/coupon.js';

export const newCoupon = asyncHandler(async (req: Request, res: Response) => {
	const { coupon, amount } = req.body;

	if (!coupon || !amount) return res.status(409).json({ message: '"Please enter both coupon and amount' });

	const newCoupon = new Coupon({ code: coupon, amount });

	await newCoupon.save();
	return res.status(201).json({
		success: true,
		message: 'Coupon saved successfully',
		newCoupon,
	});
});
