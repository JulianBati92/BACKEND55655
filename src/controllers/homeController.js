const { Product } = require('../data/mongo/manager.mongo');

exports.getHomePage = async (req, res, next) => {
    try {
        const products = await Product.find();

        res.render('home', { products, user: req.session.user });
    } catch (error) {
        next(error);
    }
};
