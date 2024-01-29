import { Router } from "express";
import { ProductManager } from "../../data/mongo/manager.mongo.js"; // Actualiza la importación del manager
import propsProducts from "../../middlewares/propsProducts.js";

const productsRouter = Router();

productsRouter.post("/", propsProducts, async (req, res, next) => {
    try {
        const data = req.body;
        const response = await ProductManager.create(data); // Utiliza el manager de productos

        return res.json({
            statusCode: 201,
            response,
        });
    } catch (error) {
        return next(error);
    }
});

productsRouter.get('/', async (req, res, next) => {
    try {
        const products = await ProductManager.read(); // Utiliza el manager de productos
        if (products) {
            return res.json({
                statusCode: 200,
                response: products,
            });
        } else {
            return res.json({
                statusCode: 404,
                message: "Not found!",
            });
        }
    } catch (error) {
        return next(error);
    }
});

productsRouter.get('/:pid', async (req, res, next) => {
    try {
        const { pid } = req.params;
        const product = await ProductManager.readOne(pid); // Utiliza el manager de productos
        if (product) {
            return res.json({
                statusCode: 200,
                response: product,
            });
        } else {
            return res.json({
                statusCode: 404,
                message: "Not found!",
            });
        }
    } catch (error) {
        return next(error);
    }
});

productsRouter.put('/:pid', async (req, res, next) => {
    try {
        const { pid } = req.params;
        const data = req.body;
        const product = await ProductManager.update(pid, data); // Utiliza el manager de productos
        if (product) {
            return res.json({
                statusCode: 200,
                response: product,
            });
        } else {
            return res.json({
                statusCode: 404,
                message: "Not found!",
            });
        }
    } catch (error) {
        return next(error);
    }
});

productsRouter.delete('/:pid', async (req, res, next) => {
    try {
        const { pid } = req.params;
        const product = await ProductManager.destroy(pid); // Utiliza el manager de productos
        if (product) {
            return res.json({
                statusCode: 200,
                response: product,
            });
        } else {
            return res.json({
                statusCode: 404,
                message: "Not found!",
            });
        }
    } catch (error) {
        return next(error);
    }
});

export default productsRouter;
