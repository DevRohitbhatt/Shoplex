import { User } from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import createToken from '../utils/createToken.js';
import asyncHandler from '../middlewares/asyncHandler.js';
export const createUser = asyncHandler(async (req, res) => {
    let { name, email, password } = req.body;
    if (!name || !email || !password) {
        throw new Error('Please fill all the inputs.');
    }
    const userExists = await User.findOne({ email });
    if (userExists)
        res.status(409).send('User already exists');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ name, email, password: hashedPassword });
    try {
        await newUser.save();
        createToken(res, newUser._id);
        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
        });
        return;
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err,
        });
        throw new Error('Invalid user data');
    }
});
export const getAllUsers = asyncHandler(async (req, res) => {
    try {
        const user = await User.find({});
        return res.status(201).json({
            success: true,
            user,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error,
        });
    }
});
export const loginUser = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new Error('Please fill all the inputs.');
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            const isMatch = await bcrypt.compare(password, existingUser.password);
            if (isMatch) {
                createToken(res, existingUser._id);
                res.status(201).json({
                    _id: existingUser._id,
                    name: existingUser.name,
                    email: existingUser.email,
                    role: existingUser.role,
                });
                return;
            }
            else {
                res.status(401).json({
                    success: false,
                    message: 'Invalid credentials',
                });
                throw new Error('Invalid credentials');
            }
        }
        else {
            res.status(401).json({
                success: false,
                message: 'User not exist',
            });
            throw new Error('User not exist');
        }
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error,
        });
    }
});
export const logoutUser = asyncHandler(async (req, res) => {
    try {
        res.cookie('jwt', '', {
            httpOnly: true,
            expires: new Date(0),
        });
        return res.status(201).json({
            success: true,
            message: 'Successfully logged out',
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error,
        });
    }
});
export const getUserProfile = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.user?._id);
        if (!user) {
            return res.status(409).json({ message: 'User not found' });
        }
        return res.json({
            _id: user._id,
            username: user.name,
            email: user.email,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error,
        });
    }
});
export const updateUserProfile = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.user?._id);
        if (!user) {
            return res.status(409).json({ message: 'User not found' });
        }
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            user.password = hashedPassword;
        }
        const updatedUser = await user.save();
        return res.status(201).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error,
        });
    }
});
export const deleteUserById = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(409).json({ message: 'User not found' });
        }
        if (user.role === 'admin') {
            return res.status(400).json({ message: 'Cannot delete admin user' });
        }
        await User.deleteOne({ _id: user._id });
        return res.status(201).json({
            success: true,
            message: 'User removed',
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error,
        });
    }
});
export const getUserById = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(409).json({ message: 'User not found' });
        }
        return res.status(201).json({
            success: true,
            user,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error,
        });
    }
});
export const updateUserById = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(409).json({ message: 'User not found' });
        }
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.role = req.body.role || user.role;
        const updatedUser = await user.save();
        return res.status(201).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error,
        });
    }
});
