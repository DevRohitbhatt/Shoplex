import jwt from 'jsonwebtoken';
import { User } from '../models/userModel.js';
import { NextFunction, Request, Response } from 'express';
import asyncHandler from '../middlewares/asyncHandler.js';
import { NewUserRequestBody } from '../types/types.js';

export const authenticate = asyncHandler(
	async (req: Request<{}, {}, NewUserRequestBody>, res: Response, next: NextFunction) => {
		let token: string = req.cookies.jwt;

		if (token) {
			try {
				const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
				const user = await User.findById(decoded).select('-password');
				req.user = { ...req.body, user };
				console.log(req.body);

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
	}
);

export const authorizeAdmin = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
	if (req.body.user && req.body.user.role === 'admin') {
		next();
	} else {
		res.status(401).send('Not authorized as an admin.');
	}
});
