import express from "express";
const viewsRouter = express.Router();

viewsRouter.get("/", (req, res) => {
  res.render("home", { title: "Home" });
  console.log("Reached the home route");
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
