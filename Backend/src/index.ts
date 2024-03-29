import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db.js';
import NodeCache from 'node-cache';
import Stripe from 'stripe';

import userRoutes from './routes/userRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';

dotenv.config({
	path: './.env',
});

const port = process.env.PORT || 4000;
const mongoUrl = process.env.MONGO_URI || '';
const stripeKey = process.env.STRIPE_KEY || '';

connectDB(mongoUrl);

export const stripe = new Stripe(stripeKey);
export const myCache = new NodeCache();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.json());

app.get('/', (req, res) => {
	res.send('API Working with /api/v1');
});

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/product', productRoutes);
app.use('/api/v1/order', orderRoutes);
app.use('/api/v1/payment', paymentRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);

app.use('./uploads', express.static('uploads'));

app.listen(port, () => {
	console.log(`server listening on port: ${port}`);
});
