import { Schema, model } from 'mongoose';
const { ObjectId } = Schema;

interface IProduct {
	name: string;
	image: string;
	brand: string;
	quantity: number;
	category: string;
	description: string;
	reviews: string[];
	rating: number;
	numReviews: number;
	price: number;
	countInStock: number;
}

const reviewSchema = new Schema(
	{
		name: { type: String, required: true },
		rating: { type: Number, required: true },
		comment: { type: String, required: true },
		user: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
	},
	{ timestamps: true }
);

const productSchema = new Schema(
	{
		name: { type: String, required: true },
		image: { type: String, required: true },
		brand: { type: String, required: true },
		quantity: { type: Number, required: true },
		category: { type: ObjectId, ref: 'Category', required: true },
		description: { type: String, required: true },
		reviews: [reviewSchema],
		rating: { type: Number, required: true, default: 0 },
		numReviews: { type: Number, required: true, default: 0 },
		price: { type: Number, required: true, default: 0 },
		countInStock: { type: Number, required: true, default: 0 },
	},
	{ timestamps: true }
);

export const Product = model<IProduct>('Product', productSchema);
