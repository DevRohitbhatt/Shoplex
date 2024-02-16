import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
dotenv.config({
    path: './.env',
});
const port = process.env.PORT || 4000;
const mongoUrl = process.env.MONGO_URI || '';
connectDB(mongoUrl);
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.get('/', (req, res) => {
    res.send('API Working with /api/v1');
});
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/category', categoryRoutes);
app.listen(port, () => {
    console.log(`server listening on port: ${port}`);
});
