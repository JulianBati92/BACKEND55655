import express from "express";
import productService from "../services/productService.js";

const viewsRouter = express.Router();

viewsRouter.get("/", async (req, res) => {
  const productsAll = await productService.getAll();
  const simplifiedProducts = productsAll.map((product) =>
    JSON.parse(JSON.stringify(product))
  );
  res.render("home", { title: "Home", products: simplifiedProducts });
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


viewsRouter.post("/id", async (req, res) => {
  const productId = req.body.id; 
  try {
      const product = await productService.getById(productId);

      if (product && product.stock > 0) {
          product.stock -= 1;
          await productService.update(productId, { stock: product.stock });

          const productInCart = {
              id: product._id, 
              name: product.name,
              description: product.description,
              price: product.price,
              imageUrl: product.imageUrl,
          };

          req.session.cart = req.session.cart || [];
          req.session.cart.push(productInCart);
          res.redirect("/real");
      } else {
          res.status(400).send("Product out of stock");
      }
  } catch (error) {
      res.status(500).send("Error adding product to cart");
  }
});


viewsRouter.post("/checkout", (req, res) => {
  const cart = req.session.cart || [];
  const orderId = Math.floor(Math.random() * 1000000); 
  req.session.cart = []; 
  res.render("checkout", { title: "Checkout", orderId: orderId, cart: cart });
});

// Nueva ruta para el pago

viewsRouter.get("/payment", (req, res) => {
  res.render("payment", { title: "Payment", stripePublicKey: process.env.STRIPE_PUBLIC_KEY });
});

export default viewsRouter;
