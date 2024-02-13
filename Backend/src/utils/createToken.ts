import jwt, { Secret } from 'jsonwebtoken';
import { Response } from 'express';

const createToken = (res: Response, userId: string) => {
	const secret = process.env.JWT_SECRET;
	const expiresIn = '30d';

	const token = jwt.sign({ _id: userId }, secret as Secret, { expiresIn });

	//Set JWT as an HTTP-Only Cookie
	res.cookie('jwt', token, {
		httpOnly: true,
		secure: process.env.NODE_ENV !== 'development',
		sameSite: 'strict',
		maxAge: 30 * 24 * 60 * 60 * 1000,
	});

	return token;
};

export default createToken;
