import { Router } from "express";
import ensureAuthenticated from "../middlewares/ensureAuthenticated.js";
import { OrderManager } from "../data/mongo/manager.mongo.js";

const ordersRouter = Router();

// Obtener y mostrar órdenes del usuario autenticado
ordersRouter.get("/", ensureAuthenticated, async (req, res, next) => {
    try {
        const userId = req.user._id; // Obtén el ID del usuario autenticado

        // Utiliza userId para buscar órdenes específicas del usuario en la base de datos
        const orders = await OrderManager.getOrdersByUserId(userId);

        if (orders.length > 0) {
            res.json({
                statusCode: 200,
                response: orders,
            });
        } else {
            res.json({
                statusCode: 404,
                message: "No se encontraron órdenes para este usuario.",
            });
        }
    } catch (error) {
        next(error);
    }
});

export default ordersRouter;

