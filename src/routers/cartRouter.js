import express from "express";
import { CartController } from "../controllers/cartController.js";
import { verifyUserRole } from "../middlewares/authMiddleware.js";

const cartRouter = express.Router();
const cartController = new CartController();

// Endpoint para crear un carrito
cartRouter.post("/", verifyUserRole(["admin"]), cartController.createCart);

// Endpoint para ver los productos del carrito
cartRouter.get("/", verifyUserRole(["admin", "user", "premium"]), cartController.getCartProducts);

// Endpoint para actualizar un producto del carrito
cartRouter.put("/:id", verifyUserRole(["admin", "user", "premium"]), cartController.updateCartItem);

// Endpoint para eliminar un producto del carrito
cartRouter.post('/remove-from-cart/:id', verifyUserRole(["admin", "user", "premium"]), cartController.deleteCartItem);

export default cartRouter;
