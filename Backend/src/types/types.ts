import { Response, Request, NextFunction } from 'express';

export interface NewUserRequestBody {
	name: string;
	email: string;
	password: string;
	gender: string;
	role: string;
	_id: string;
}

export type User = {
	name?: string;
	email?: string;
	gender?: string;
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
	quantity: number;
	productId: string;
};

export type ShippingInfoType = {
	address: string;
	city: string;
	state: string;
	country: string;
	zipCode: number;
};

export interface NewOrderRequestBody {
	shippingInfo: ShippingInfoType;
	orderItems: OrderItemType[];
}
