import { Response, Request, NextFunction } from 'express';

export interface NewUserRequestBody {
	name: string;
	email: string;
	password: string;
	role: string;
	_id: string;
}

export type User = {
	name?: string;
	email?: string;
	role?: string;
	_id?: string;
	createdAt?: Date;
	updatedAt?: Date;
};

export type ControllerType = (
	req: Request,
	res: Response,
	next: NextFunction
) => Promise<void | Response<any, Record<string, any>>>;

export interface NewCategoryRequestBody {
	name: string;
	_id: string;
}

export interface NewProductRequestBody {
	name: string;
	description: string;
	price: number;
	brand: string;
	category: string;
	quantity: number;
}

export type SearchRequestQuery = {
	search?: string;
	price?: string;
	category?: string;
	sort?: string;
	page?: string;
};

export interface BaseQuery {
	name?: {
		$regex: string;
		$options: string;
	};
	price?: { $lte: number };
	category?: string;
}

export type InvalidateCacheProps = {
	product?: boolean;
	category?: boolean;
	order?: boolean;
	admin?: boolean;
	userId?: string;
	orderId?: string;
	productId?: string | string[];
	categoryId?: string | string[];
};

export type OrderItemType = {
	_id: string;
	name: string;
	photo: string;
	price: number;
	quantity: number;
	productId: string;
};

export type ShippingInfoType = {
	address: string;
	city: string;
	state: string;
	country: string;
	pinCode: number;
};

export interface NewOrderRequestBody {
	shippingInfo: ShippingInfoType;
	user: string;
	subtotal: number;
	tax: number;
	shippingCharges: number;
	discount: number;
	total: number;
	orderItems: OrderItemType[];
}
