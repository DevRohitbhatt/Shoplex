import { Schema, model } from 'mongoose';

interface IOrder {
	_id: string;
	user: string;
	orderItems: [
		{
			name: string;
			quantity: number;
			image: string;
			price: number;
			product: string;
		}
	];
	shippingInfo: {
		address: string;
		city: string;
		state: string;
		zipcode: number;
		country: string;
	};
	subtotal: number;
	tax: number;
	shippingCost: number;
	discount: number;
	total: number;
	orderStatus: 'Processing' | 'Shipped' | 'Delivered';
	createdAt: Date;
	updatedAt: Date;
}

const orderSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		orderItems: [
			{
				name: { type: String, required: true },
				quantity: { type: Number, required: true },
				image: { type: String, required: true },
				price: { type: Number, required: true },
				product: { type: Schema.Types.ObjectId, required: true, ref: 'Product' },
			},
		],

		shippingInfo: {
			address: { type: String, required: true },
			city: { type: String, required: true },
			state: { type: String, required: true },
			zipcode: { type: Number, required: true },
			country: { type: String, required: true },
		},

		subtotal: { type: Number, required: true, default: 0.0 },
		tax: { type: Number, required: true, default: 0.0 },
		shippingCost: { type: Number, required: true, default: 0.0 },
		discount: { type: Number, required: true, default: 0.0 },
		total: { type: Number, required: true, default: 0.0 },
		orderStatus: {
			type: String,
			enum: ['Processing', 'Shipped', 'Delivered'],
			default: 'Processing',
		},
	},
	{
		timestamps: true,
	}
);

export const Order = model<IOrder>('Order', orderSchema);
