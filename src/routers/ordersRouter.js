import { Router } from "express";
import ensureAuthenticated from "../middlewares/ensureAuthenticated.js";
import { OrderManager } from "../data/mongo/manager.mongo.js";

const ordersRouter = Router();
const orderManager = new OrderManager();

// Obtener y mostrar órdenes del usuario autenticado
ordersRouter.get("/", ensureAuthenticated, async (req, res, next) => {
    try {
        const userId = req.user._id; // Obtén el ID del usuario autenticado
        const orders = await orderManager.getOrdersByUserId(userId);

        if (orders.length > 0) {
            res.json({
                statusCode: 200,
                response: orders,
            });
        } else {
            res.status(404).json({
                statusCode: 404,
                message: "No se encontraron órdenes para este usuario.",
            });
        }
    } catch (error) {
        next(error);
    }
});

// Crear una nueva orden
ordersRouter.post("/", ensureAuthenticated, async (req, res, next) => {
    try {
        const userId = req.user._id;
        const { products } = req.body;

        const newOrder = await orderManager.createOrder(userId, products);

        res.status(201).json({
            statusCode: 201,
            response: newOrder,
        });
    } catch (error) {
        next(error);
    }
});

// Actualizar una orden existente
ordersRouter.put("/:oid", ensureAuthenticated, async (req, res, next) => {
    try {
        const userId = req.user._id;
        const orderId = req.params.oid;
        const { products } = req.body;

        const updatedOrder = await orderManager.updateOrder(userId, orderId, products);

        if (updatedOrder) {
            res.json({
                statusCode: 200,
                response: updatedOrder,
            });
        } else {
            res.status(404).json({
                statusCode: 404,
                message: "Orden no encontrada o no se pudo actualizar.",
            });
        }
    } catch (error) {
        next(error);
    }
});

// Eliminar una orden existente
ordersRouter.delete("/:oid", ensureAuthenticated, async (req, res, next) => {
    try {
        const userId = req.user._id;
        const orderId = req.params.oid;

        const deletedOrder = await orderManager.deleteOrder(userId, orderId);

        if (deletedOrder) {
            res.json({
                statusCode: 200,
                message: "Orden eliminada exitosamente.",
            });
        } else {
            res.status(404).json({
                statusCode: 404,
                message: "Orden no encontrada o no se pudo eliminar.",
            });
        }
    } catch (error) {
        next(error);
    }
});

export default ordersRouter;
