import { User } from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import createToken from '../utils/createToken.js';
export const createUser = async (req, res, next) => {
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
};
export const getAllUsers = async (req, res, next) => {
    const user = await User.find({});
    res.json(user);
};
