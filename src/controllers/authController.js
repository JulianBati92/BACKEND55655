const User = require('../data/mongo/models/user.model');

exports.getRegisterPage = (req, res) => {
    res.render('register');
};

exports.registerUser = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            res.status(400).json({ error: 'El nombre de usuario ya está en uso.' });
        } else {
            const newUser = new User({ username, password });
            await newUser.save();
            res.status(201).json({ message: 'Usuario registrado exitosamente.' });
        }
    } catch (error) {
        next(error);
    }
};

exports.getLoginPage = (req, res) => {
    res.render('login');
};

exports.loginUser = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (user && user.isValidPassword(password)) {
            req.session.user = {
                username: user.username,
            };
            
            res.status(200).json({ message: 'Inicio de sesión exitoso.' });
        } else {
            res.status(401).json({ error: 'Nombre de usuario o contraseña incorrectos.' });
        }
    } catch (error) {
        next(error);
    }
};

exports.logoutUser = async (req, res, next) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                next(err);
            } else {
                res.clearCookie('connect.sid'); 
                res.status(200).json({ message: 'Sesión cerrada exitosamente.' });
            }
        });
    } catch (error) {
        next(error);
    }
};
