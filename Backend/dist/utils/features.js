import { myCache } from '../index.js';
import { Product } from '../models/productModel.js';
export const invalidateCache = ({ product, category, order, admin, userId, orderId, productId, categoryId, }) => {
    if (product) {
        const productKeys = ['latest-products', 'top-products', 'all-products'];
        if (typeof productId === 'string')
            productKeys.push(`product-${productId}`);
        if (typeof productId === 'object')
            productId.forEach((i) => productKeys.push(`product-${i}`));
        myCache.del(productKeys);
    }
    if (category) {
        const categoryKeys = ['all-categories'];
        if (typeof categoryId === 'string')
            categoryKeys.push(`category-${categoryId}`);
        if (typeof categoryId === 'object')
            categoryId.forEach((i) => categoryKeys.push(`category-${i}`));
        myCache.del(categoryKeys);
    }
    if (order) {
        const orderKeys = ['all-order', `my-orders-${userId}`, `order-${orderId}`];
        myCache.del(orderKeys);
    }
    if (admin) {
        myCache.del(['dashboard-stats']);
    }
};
export const calcPrices = (itemFromDB) => {
    const subtotal = Number(itemFromDB.reduce((acc, item) => acc + item.price * item.quantity, 0));
    const shippingCost = subtotal > 100 ? 0 : 99;
    const taxRate = 0.18;
    const tax = (subtotal * taxRate).toFixed(2);
    const total = (subtotal + shippingCost + parseFloat(tax)).toFixed(2);
    return {
        subtotal: subtotal.toFixed(2),
        shippingCost: shippingCost.toFixed(2),
        tax,
        total,
    };
};
export const reduceStock = async (orderItems) => {
    for (let i = 0; i < orderItems.length; i++) {
        const order = orderItems[i];
        const product = await Product.findById(order.productId);
        if (!product)
            throw new Error('Product Not Found');
        product.quantity -= order.quantity;
        await product.save();
    }
};
export const calculatePercentage = (thisMonth, lastMonth) => {
    if (lastMonth === 0)
        return thisMonth * 100;
    const percent = ((thisMonth - lastMonth) / lastMonth) * 100;
    return Number(percent.toFixed(0));
};
export const getInventories = async ({ categories, productsCount, }) => {
    const productPerCategoriesCountPromise = categories.map((category) => Product.countDocuments({ category }));
    const productPerCategoriesCount = await Promise.all(productPerCategoriesCountPromise);
    const categoryCount = [];
    categories.forEach((category, i) => {
        categoryCount.push({
            [category]: Math.round((productPerCategoriesCount[i] / productsCount) * 100),
        });
    });
    return categoryCount;
};
