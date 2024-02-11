import mongoose from 'mongoose';
export const connectDB = (url) => {
    try {
        mongoose
            .connect(url, {
            dbName: 'ShopLex',
        })
            .then((c) => console.log(`Connected to ${c.connection.host} 👍`));
    }
    catch (error) {
        console.log(error);
    }
};
