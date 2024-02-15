import jwt from 'jsonwebtoken';
import { User } from '../models/userModel.js';
import { NextFunction, Request, Response } from 'express';
import asyncHandler from '../middlewares/asyncHandler.js';

export const authenticate = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
	let token: string = req.cookies.jwt;

	if (token) {
		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
			req.user = await User.findById(decoded).select('-password');

			next();
		} catch (error) {
			res.status(401).json({
				success: false,
				message: 'Unauthorized',
			});
		}
	} else {
		res.status(401).json({
			success: false,
			message: 'Unauthorized, Please Login!',
		});
	}
});

export const authorizeAdmin = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
	if (req.user && req.user.role === 'admin') {
		next();
	} else {
		res.status(401).send('Not authorized as an admin.');
	}
});
