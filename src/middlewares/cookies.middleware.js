import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/dotenv.config.js';

export const verifyTokenCookie = (req, res, next) => {
    const token = req.cookies.authToken

    if(!token) {
        return res.status(403).json({ message: 'Token no proporcionado' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        req.user = decoded;
        next()
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido o expirado' });
    }
}