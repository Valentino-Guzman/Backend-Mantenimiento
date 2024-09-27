import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/dotenv.config.js';

export const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']

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

export const isAdmin = (req, res, next) => {
    if(req.user.rol !== 'admin') {
        return res.status(403).json({ message: 'Acceso denegado: no sos administrador' });
    }
    next()
}