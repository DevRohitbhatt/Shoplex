import { Schema, model } from 'mongoose';
import validator from 'validator';

interface IUser extends Document {
	_id: string;
	name: string;
	email: string;
	role: 'admin' | 'user';
	createdAt: Date;
	updatedAt: Date;
}

const userSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, 'Please enter Name'],
		},
		email: {
			type: String,
			unique: [true, 'Email already Exist'],
			required: [true, 'Please enter Email'],
			validate: validator.default.isEmail,
		},
		password: {
			type: String,
			required: [true, 'Please enter Password'],
		},
		role: {
			type: String,
			enum: ['admin', 'user'],
			required: true,
			default: 'user',
		},
	},
	{
		timestamps: true,
	}
);

export const User = model<IUser>('User', userSchema);
