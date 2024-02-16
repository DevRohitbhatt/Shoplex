import { Schema, model } from 'mongoose';

interface ICategory extends Document {
	_id: string;
	name: string;
	createdAt: Date;
	updatedAt: Date;
}

const schema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		maxLength: 32,
	},
});

export const Category = model<ICategory>('Category', schema);
