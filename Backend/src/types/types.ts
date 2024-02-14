import { Response, Request, NextFunction } from 'express';

export interface NewUserRequestBody {
	name: string;
	email: string;
	password: string;
	role: string;
	photo: string;
	_id: string;
}

export type ControllerType = (
	req: Request,
	res: Response,
	next: NextFunction
) => Promise<void | Response<any, Record<string, any>>>;
