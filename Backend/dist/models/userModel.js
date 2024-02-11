import { Schema, model } from 'mongoose';
import validator from 'validator';
const userSchema = new Schema({
    _id: {
        type: String,
        required: [true, 'Please enter ID'],
    },
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
    photo: {
        type: String,
        required: [true, 'Please add Photo'],
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    },
}, {
    timestamps: true,
});
export const User = model('User', userSchema);
