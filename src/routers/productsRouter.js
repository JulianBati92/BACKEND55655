import express from "express";
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct, getMyProducts, createMyProduct, updateMyProduct, deleteMyProduct, } from "../controllers/productController.js";
import { isAuthenticated, isAdmin, isPremiumUser, } from "../middlewares/authMiddleware.js";

const productRouter = express.Router();

// Rutas abiertas
productRouter.get("/", getAllProducts);
productRouter.get("/:id", getProductById);

// Rutas para administradores
productRouter.post("/", isAuthenticated, isAdmin, createProduct);
productRouter.put("/:id", isAuthenticated, isAdmin, updateProduct);
productRouter.delete("/:id", isAuthenticated, isAdmin, deleteProduct);

// Rutas para usuarios premium
productRouter.get("/me", isAuthenticated, isPremiumUser, getMyProducts);
productRouter.post("/me", isAuthenticated, isPremiumUser, createMyProduct);
productRouter.put("/me/:id", isAuthenticated, isPremiumUser, updateMyProduct);
productRouter.delete( "/me/:id", isAuthenticated, isPremiumUser, deleteMyProduct);

export default productRouter;
