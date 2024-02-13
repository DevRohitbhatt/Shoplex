import jwt from 'jsonwebtoken';
const createToken = (res, userId) => {
    const secret = process.env.JWT_SECRET;
    const expiresIn = '30d';
    const token = jwt.sign({ _id: userId }, secret, { expiresIn });
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
