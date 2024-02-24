import { Schema, model } from 'mongoose';
const couponSchema = new Schema({
    code: {
        type: String,
        required: [true, 'Please enter the coupon code'],
        unique: true,
    },
    amount: {
        type: Number,
        required: [true, 'Please enter the coupon amount'],
    },
});
export const Coupon = model('Coupon', couponSchema);
