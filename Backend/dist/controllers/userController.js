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
        res.status(400).send('User already exists');
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
    }
    catch (err) {
        res.status(200).json({
            success: false,
            message: err,
        });
        throw new Error('Invalid user data');
    }
});
export const getAllUsers = asyncHandler(async (req, res) => {
    const user = await User.find({});
    res.json(user);
});
export const loginUser = asyncHandler(async (req, res) => {
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
});
export const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({
        success: true,
        message: 'Successfully logged out',
    });
});
export const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user?._id);
    if (user) {
        res.json({
            _id: user._id,
            username: user.name,
            email: user.email,
        });
    }
    else {
        res.status(404);
        throw new Error('User not found.');
    }
});
export const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user?._id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            user.password = hashedPassword;
        }
        const updatedUser = await user.save();
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
        });
    }
    else {
        res.status(404);
        throw new Error('User not found.');
    }
});
export const deleteUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        if (user.role === 'admin') {
            res.status(400);
            throw new Error('Cannot delete admin user');
        }
        await User.deleteOne({ _id: user._id });
        res.json({
            success: true,
            message: 'User removed',
        });
    }
    else {
        res.status(404);
        throw new Error('User not found.');
    }
});
export const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        res.json(user);
    }
    else {
        res.status(404);
        throw new Error('User not found');
    }
});
export const updateUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.role = req.body.role || user.role;
        const updatedUser = await user.save();
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
        });
    }
    else {
        res.status(404);
        throw new Error('User not found');
    }
});
