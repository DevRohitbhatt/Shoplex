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
