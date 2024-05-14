import express from "express";
import { CartController } from "../controllers/cartController.js";
import { ensureAuthenticated } from "../middlewares/authMiddleware.js";

const cartRouter = express.Router();
const cartController = new CartController();

// Endpoint para crear un carrito
cartRouter.post("/", ensureAuthenticated, cartController.createCart);

// Endpoint para ver los productos del carrito
cartRouter.get("/", ensureAuthenticated, cartController.getCartProducts);

// Endpoint para actualizar un producto del carrito
cartRouter.put("/:id", ensureAuthenticated, cartController.updateCartItem);

// Endpoint para eliminar un producto del carrito
cartRouter.delete("/:id", ensureAuthenticated, cartController.deleteCartItem);

export default cartRouter;
