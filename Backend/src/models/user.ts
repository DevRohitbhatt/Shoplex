import { Schema, Types, model } from 'mongoose';

interface IUser extends Document {
	_id: Types.ObjectId;
	name: string;
	email: string;
	photo: string;
	role: 'admin' | 'user';
	gender: 'male' | 'female';
	dob: Date;
	createdAt: Date;
	updatedAt: Date;
	//   Virtual Attribute
	age: number;
}

const userSchema = new Schema<IUser>(
	{
		_id: {
			type: Schema.Types.ObjectId,
			required: [true, 'Please enter ID'],
		},
		name: {
			type: String,
			required: [true, 'Please enter Name'],
		},
		email: {
			type: String,
			unique: [true, 'Email already Exist'],
			required: [true, 'Please enter Name'],
		},
		photo: {
			type: String,
			required: [true, 'Please add Photo'],
		},
		role: {
			type: String,
			enum: ['admin', 'user'],
			default: 'user',
		},
		gender: {
			type: String,
			enum: ['male', 'female'],
			required: [true, 'Please enter Gender'],
		},
		dob: {
			type: Date,
			required: [true, 'Please enter Date of birth'],
		},
	},
	{
		timestamps: true,
	}
);

export const User = model('User', userSchema);
