import { Schema, model } from 'mongoose';
const orderSchema = new Schema({
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
        zipcode: { type: String, required: true },
        country: { type: String, required: true },
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    paymentResult: {
        id: { type: String },
        status: { type: String },
        update_time: { type: String },
        email_address: { type: String },
    },
    subtotal: { type: String, required: true },
    tax: { type: String, required: true },
    shippingCost: { type: String, required: true },
    discount: { type: String, required: true },
    total: { type: String, required: true },
    orderStatus: {
        type: String,
        enum: ['Processing', 'Shipped', 'Delivered'],
        required: true,
    },
    orderDate: { type: Date, required: true },
}, {
    timestamps: true,
});
export const Order = model('Order', orderSchema);
