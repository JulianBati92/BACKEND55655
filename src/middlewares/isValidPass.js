const User = require('../data/mongo/models/user.model');

module.exports = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (user && user.isValidPassword(password)) {
            next();
        } else {
            res.status(401).json({ error: 'Nombre de usuario o contraseña incorrectos.' });
        }
    } catch (error) {
        next(error);
    }
};
