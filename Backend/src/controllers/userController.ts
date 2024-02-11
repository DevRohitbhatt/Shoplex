import { NextFunction, Response, Request } from 'express';
import { User } from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import { NewUserRequestBody } from '../types/types.js';

export const createUser = async (req: Request<{}, {}, NewUserRequestBody>, res: Response, next: NextFunction) => {
	let { name, email, password } = req.body;

	if (!name || !email || !password) {
		throw new Error('Please fill all the inputs.');
	}

	const userExists = await User.findOne({ email });
	if (userExists) res.status(400).send('User already exists');

	const salt = bcrypt.getSalt('10');
	const hashedPassword = await bcrypt.hash(password, salt);
	const newUser = new User({ name, email, password: hashedPassword });

	try {
		await newUser.save();

		res.status(201).json({
			_id: newUser._id,
			name: newUser.name,
			email: newUser.email,
			role: newUser.role,
		});
	} catch (err) {
		res.status(200).json({
			success: false,
			message: err,
		});
		throw new Error('Invalid user data');
	}
};