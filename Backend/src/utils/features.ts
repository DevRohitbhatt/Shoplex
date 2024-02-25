import { myCache } from '../index.js';
import { Product } from '../models/productModel.js';
import { InvalidateCacheProps, OrderItemType } from '../types/types.js';

export const invalidateCache = ({
	product,
	category,
	order,
	admin,
	userId,
	orderId,
	productId,
	categoryId,
}: InvalidateCacheProps) => {
	if (product) {
		const productKeys: string[] = ['latest-products', 'top-products', 'all-products'];

		if (typeof productId === 'string') productKeys.push(`product-${productId}`);

		if (typeof productId === 'object') productId.forEach((i) => productKeys.push(`product-${i}`));

		myCache.del(productKeys);
	}
	if (category) {
		const categoryKeys: string[] = ['all-categories'];

		if (typeof categoryId === 'string') categoryKeys.push(`category-${categoryId}`);

		if (typeof categoryId === 'object') categoryId.forEach((i) => categoryKeys.push(`category-${i}`));
	}
	if (order) {
		const orderKeys: string[] = ['all-order', `my-orders-${userId}`, `order-${orderId}`];
	}
};

export const calcPrices = (itemFromDB: any[]) => {
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

export const reduceStock = async (orderItems: OrderItemType[]) => {
	for (let i = 0; i < orderItems.length; i++) {
		const order = orderItems[i];
		const product = await Product.findById(order.productId);
		if (!product) throw new Error('Product Not Found');
		product.quantity -= order.quantity;
		await product.save();
	}
};
