import { myCache } from '../index.js';
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
    }
};
