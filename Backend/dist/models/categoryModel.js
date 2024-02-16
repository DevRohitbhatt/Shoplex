import { Schema, model } from 'mongoose';
const schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxLength: 32,
    },
});
export const Category = model('Category', schema);
