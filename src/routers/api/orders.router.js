import { Router } from "express";
import { OrderManager } from "../../data/mongo/manager.mongo.js";
import propsOrder from "../../middlewares/propsOrders.js";

const ordersRouter = Router();

ordersRouter.post("/", propsOrder, async (req, res, next) => {
    try {
        const data = req.body;
        const response = await OrderManager.create(data);

        return res.json({
            statusCode: 201,
            response,
        });
    } catch (error) {
        return next(error);
    }
});

ordersRouter.get('/', async (req, res, next) => {
    try {
        const orders = await OrderManager.read();
        if (orders) {
            return res.json({
                statusCode: 200,
                response: orders
            });
        } else {
            return res.json({
                statusCode: 404,
                message: "Not found!"
            });
        }

    } catch (error) {
        return next(error);
    }

});

ordersRouter.get('/:uid', async (req, res, next) => {
    try {
        const { uid } = req.params;
        const order = await OrderManager.readOne(uid);
        if (order) {
            return res.json({
                statusCode: 200,
                response: order
            });
        } else {
            return res.json({
                statusCode: 404,
                message: "Not found!"
            });
        }

    } catch (error) {
        return next(error);
    }

});

ordersRouter.delete('/:oid', async (req, res, next) => {
    try {
        const { oid } = req.params;
        const order = await OrderManager.destroy(oid);
        if (order) {
            return res.json({
                statusCode: 200,
                response: order
            });
        } else {
            return res.json({
                statusCode: 404,
                message: "Not found!"
            });
        }

    } catch (error) {
        return next(error);
    }
});

ordersRouter.put('/:oid/:quantity/:state', async (req, res, next) => {
    try {
        const { oid, quantity, state } = req.params;
        const order = await OrderManager.update(oid, { quantity, state });
        if (order) {
            return res.json({
                statusCode: 200,
                response: order
            });
        } else {
            return res.json({
                statusCode: 404,
                message: "Not found!"
            });
        }

    } catch (error) {
        return next(error);
    }
});

export default ordersRouter;
