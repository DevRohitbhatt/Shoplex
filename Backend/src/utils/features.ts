import { myCache } from '../index.js';
import { InvalidateCacheProps } from '../types/types.js';

export const invalidateCache = ({ product, order, admin, userId, orderId, productId }: InvalidateCacheProps) => {
	if (product) {
		const productKeys: string[] = ['latest-products', 'top-products', 'all-products'];

		if (typeof productId === 'string') productKeys.push(`product-${productId}`);

		if (typeof productId === 'object') productId.forEach((i) => productKeys.push(`product-${i}`));

		myCache.del(productKeys);
	}
};
