import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const authMiddleware = async (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) {
        return res.status(401).json({ error: 'Acceso denegado. No se ha proporcionado token.' });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(verified.id).select('-password');
        next();
    } catch (err) {
        res.status(400).json({ error: 'Token inválido.' });
    }
};

export const verifyUserRole = (roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return res.status(403).json({ error: 'Acceso denegado. No tienes permisos.' });
    }
    next();
};
