import { Router } from "express";
import { UserManager } from "../../data/mongo/manager.mongo.js"; // Actualiza la importación del manager
import propsUser from "../../middlewares/propsUser.js";
const usersRouter = Router();

usersRouter.post("/", propsUser, async (req, res, next) => {
    try {
        const data = req.body;
        const response = await UserManager.create(data); // Utiliza el manager de usuarios

        return res.json({
            statusCode: 201,
            response,
        });
    } catch (error) {
        return next(error);
    }
});

usersRouter.get('/', async (req, res, next) => {
    try {
        const users = await UserManager.read(); // Utiliza el manager de usuarios
        if (users) {
            return res.json({
                statusCode: 200,
                response: users,
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

usersRouter.get('/:uid', async (req, res, next) => {
    try {
        const { uid } = req.params;
        const user = await UserManager.readOne(uid); // Utiliza el manager de usuarios
        if (user) {
            return res.json({
                statusCode: 200,
                response: user,
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

usersRouter.put('/:uid', async (req, res, next) => {
    try {
        const { uid } = req.params;
        const data = req.body;
        const user = await UserManager.update(uid, data); // Utiliza el manager de usuarios
        if (user) {
            return res.json({
                statusCode: 200,
                response: user,
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

usersRouter.delete('/:uid', async (req, res, next) => {
    try {
        const { uid } = req.params;
        const user = await UserManager.destroy(uid); // Utiliza el manager de usuarios
        if (user) {
            return res.json({
                statusCode: 200,
                response: user,
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

export default usersRouter;
