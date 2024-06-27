import express from "express";
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from "../controllers/productController.js";
import { verifyUserRole } from "../middlewares/authMiddleware.js";

const productRouter = express.Router();

// Definición de rutas
productRouter.get("/", getAllProducts);
productRouter.get("/:id", getProductById);
productRouter.post("/", verifyUserRole(["admin"]), createProduct);
productRouter.put("/:id", verifyUserRole(["admin"]), updateProduct);
productRouter.delete("/:id", verifyUserRole(["admin"]), deleteProduct);

export default productRouter;
