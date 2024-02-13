import jwt from 'jsonwebtoken';
import { User } from '../models/userModel.js';
import { NextFunction, Request, Response } from 'express';

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
	let token: string = req.cookies;
	console.log(token);

	if (token) {
		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
			const user = await User.findById(decoded).select('-password');
			console.log(user);

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
};
