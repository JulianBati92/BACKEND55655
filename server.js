<<<<<<< HEAD
import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import path from "path";
import dotenv from "dotenv";
import hbs from "express-handlebars";
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import passport from "passport";
import { CustomRouter } from "./src/routers/api/custom.router.js";
import { errorHandler } from "./src/middlewares/errorHandler.js";
import passportConfig from "./src/utils/passport.js";
import compression from "express-compression";
=======
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');
const hbs = require('express-handlebars');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose'); 
const passport = require('passport');
const { connectToMongo } = require('./db');
const { Product } = require('./manager.mongo'); 
const { report } = require('./manager.mongo'); 
const errorHandler = require('./middlewares/errorHandler');
const apiRouter = require('./routers/api.router');
>>>>>>> 54372215a19224f9bc41fb75cddb24cbc70aa450

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

//Configuracion de Handlebars
app.engine("handlebars", hbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  compression({
    brotli: { enabled: true, zlib: {} },
  })
);

//Configuracion de sesion
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_LINK }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 dia
    },
  })
);

//Inicializacion de passport
app.use(passport.initialize());
app.use(passport.session());
passportConfig(passport);

<<<<<<< HEAD
// Conexión a la base de datos mongoDB
mongoose.connect(process.env.DB_LINK, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
=======
// Conexión a MongoDB
mongoose.connect(process.env.DB_LINK, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Rutas de la API
app.use('/api', apiRouter);

app.post('/api/products', async (req, res, next) => {
    try {
        const product = await Product.create(req.body);
        res.json(product);
    } catch (error) {
        next(error);
    }
>>>>>>> 54372215a19224f9bc41fb75cddb24cbc70aa450
});

//Rutas
app.use("/", CustomRouter);

//Manejo de errores
app.use(errorHandler);

//Inicializacion del servidor
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
