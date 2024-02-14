import jwt from 'jsonwebtoken';
import { User } from '../models/userModel.js';
export const authenticate = async (req, res, next) => {
    console.log(req.body);
    let token = req.cookies.jwt;
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded).select('-password');
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
};
