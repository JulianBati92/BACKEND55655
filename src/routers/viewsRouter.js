import express from "express";
import { getAllProducts } from "../controllers/productController.js";

const viewsRouter = express.Router();

viewsRouter.get("/", async (req, res) => {
  try {
    const productsAll = await getAllProducts();

    const simplifiedProducts = productsAll.map((product) => {
      const productJson = JSON.parse(JSON.stringify(product));
      return productJson;
    });

    res.render("home", { title: "Home", products: simplifiedProducts });
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).send("Error interno del servidor");
  }
});

viewsRouter.get("/login", (req, res) => {
  res.render("login", { title: "Login" });
});

viewsRouter.get("/register", (req, res) => {
  res.render("register", { title: "Register" });
});

viewsRouter.get("/form", (req, res) => {
  res.render("form", { title: "Form" });
});

viewsRouter.get("/real", (req, res) => {
  res.render("real", { title: "Real" });
});

export default viewsRouter;
