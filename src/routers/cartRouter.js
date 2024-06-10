import express from "express";
import { CartController } from "../controllers/cartController.js";
import { verifyUserRole } from "../middlewares/authMiddleware.js";

const cartRouter = express.Router();
const cartController = new CartController();

// Endpoint para crear un carrito
cartRouter.post("/", verifyUserRole(["admin"]), cartController.createCart);

// Endpoint para ver los productos del carrito
cartRouter.get("/", verifyUserRole, cartController.getCartProducts);

// Endpoint para actualizar un producto del carrito
cartRouter.put("/:id", verifyUserRole, cartController.updateCartItem);

// Endpoint para eliminar un producto del carrito
cartRouter.delete("/:id", verifyUserRole, cartController.deleteCartItem);

export default cartRouter;
