import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const authMiddleware = async (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        next();
    } catch (error) {
        res.status(400).json({ error: 'Invalid token.' });
    }
};

export const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/auth/login');
};

export const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        return next();
    }
    res.status(403).json({ message: 'Access denied. Admins only.' });
};

export const isPremiumUser = (req, res, next) => {
    if (req.user && req.user.role === 'premium') {
        return next();
    }
    res.status(403).json({ message: 'Access denied. Premium users only.' });
};

export const verifyUserRole = (allowedRoles) => {
    return (req, res, next) => {
        if (req.user && allowedRoles.includes(req.user.role)) {
            return next();
        }
        res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
    };
};
