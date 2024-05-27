import { Router } from "express";
import { MongoManager } from "../data/mongo/manager.mongo.js";
import propsProducts from "../middlewares/propsProducts.js";
import { verifyUserRole } from "../middlewares/authMiddleware.js"; 

const productsRouter = Router();
const ProductManager = new MongoManager("products");

// Ruta para crear un producto
productsRouter.post("/", propsProducts, async (req, res, next) => {
  try {
    const data = req.body;
    // Asignar el ownerId al producto creado
    data.ownerId = req.user._id;
    const response = await ProductManager.create(data);
    return res.json({
      statusCode: 201,
      response,
    });
  } catch (error) {
    return next(error);
  }
});

// Ruta para obtener todos los productos
productsRouter.get("/", async (req, res, next) => {
  try {
    const products = await ProductManager.read({});
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

// Ruta para actualizar un producto por su ID
productsRouter.put(
  "/:pid",
  verifyUserRole(["admin", "premium"]),
  async (req, res, next) => {
    try {
      const { pid } = req.params;
      const data = req.body;
      // Verificar si el usuario tiene permisos para actualizar el producto
      if (
        req.user.role === "premium" &&
        req.user.products.indexOf(pid) === -1
      ) {
        return res.status(403).json({
          message: "You don't have permission to update this product",
        });
      }
      const product = await ProductManager.update(pid, data);
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
  }
);

// Ruta para eliminar un producto por su ID
productsRouter.delete(
  "/:pid",
  verifyUserRole(["admin", "premium"]),
  async (req, res, next) => {
    try {
      const { pid } = req.params;
      // Verificar si el usuario tiene permisos para eliminar el producto
      if (
        req.user.role === "premium" &&
        req.user.products.indexOf(pid) === -1
      ) {
        return res.status(403).json({
          message: "You don't have permission to delete this product",
        });
      }
      const product = await ProductManager.destroy(pid);
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
  }
);

export default productsRouter;
