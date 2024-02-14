import { NextFunction, Request, Response } from 'express';
import { ControllerType } from '../types/types.js';

const asyncHandler = (fn: ControllerType) => (req: Request, res: Response, next: NextFunction) => {
	Promise.resolve(fn(req, res, next)).catch((error) => {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	});
};

export default asyncHandler;
