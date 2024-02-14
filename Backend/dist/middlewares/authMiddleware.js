import jwt from 'jsonwebtoken';
import { User } from '../models/userModel.js';
import asyncHandler from '../middlewares/asyncHandler.js';
export const authenticate = asyncHandler(async (req, res, next) => {
    let token = req.cookies.jwt;
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded).select('-password');
            req.user = { ...req.body, user };
            console.log(req.body);
            next();
        }
        catch (error) {
            res.status(401).json({
                success: false,
                message: 'Unauthorized',
            });
        }
    }
    else {
        res.status(401).json({
            success: false,
            message: 'Unauthorized, Please Login!',
        });
    }
});
export const authorizeAdmin = asyncHandler(async (req, res, next) => {
    if (req.body.user && req.body.user.role === 'admin') {
        next();
    }
    else {
        res.status(401).send('Not authorized as an admin.');
    }
});
