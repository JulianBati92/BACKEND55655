module.exports = (req, res, next) => {
    const { password } = req.body;
    
    if (password.length >= 8) {
        next();
    } else {
        res.status(400).json({ error: 'La contraseña debe tener al menos 8 caracteres.' });
    }
};