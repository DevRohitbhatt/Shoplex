import asyncHandler from '../middlewares/asyncHandler.js';
import { Request, Response } from 'express';
import { Coupon } from '../models/couponModel.js';

export const newCoupon = asyncHandler(async (req: Request, res: Response) => {
	const { coupon, amount } = req.body;

	if (!coupon || !amount) return res.status(409).json({ message: '"Please enter both coupon and amount' });

	const newCoupon = new Coupon({ code: coupon, amount });

	await newCoupon.save();
	return res.status(201).json({
		success: true,
		message: `Coupon ${coupon} Created Successfully`,
	});
});

export const getAllCoupons = asyncHandler(async (req: Request, res: Response) => {
	const coupons = await Coupon.find({});
	return res.status(201).json({
		success: true,
		coupons,
	});
});

export const deleteCoupon = asyncHandler(async (req: Request, res: Response) => {
	const coupon = await Coupon.findById(req.params.id);

	if (!coupon) return res.status(404).json({ message: 'Coupon not found' });

	await Coupon.findByIdAndDelete(req.params.id);
	return res.status(201).json({
		success: true,
		message: `Coupon ${coupon.code} Deleted Successfully`,
	});
});

export const applyDiscount = asyncHandler(async (req: Request, res: Response) => {
	const { coupon } = req.query;

	const discount = await Coupon.findOne({ code: coupon });

	if (!discount) return res.status(404).json({ message: 'Coupon not found' });

	return res.status(201).json({
		success: true,
		discount: discount.amount,
	});
});
