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
import { CustomRouter } from "./src/routers/customRouter.js";
import { errorHandler } from "./src/middlewares/errorHandler.js";
import passportConfig from "./src/utils/passport.js";
import compression from "express-compression";
import logger from './logger.js';
import swaggerOptions from "./src/utils/swagger.js";
import { serve, setup } from "swagger-ui-express"; 
import { specs } from "./src/utils/swagger.js"
import swaggerJSDoc from "swagger-jsdoc"; 
import swaggerOptions, { options } from "./src/utils/swagger.js";
import ticketRouter from "./src/routers/ticketRouter.js";
import productRouter from "./src/routers/productRouter.js"; 
import supertest from 'supertest'; 
import { describe } from 'mocha'; 
import { expect } from 'chai'; 


dotenv.config();

const server = express(); 
const PORT = process.env.PORT || 8080;

//swagger
const specs = swaggerJSDoc(swaggerOptions); 
server.use("api/docs", serve, setup(specs));  

//Configuracion de Handlebars
server.engine("handlebars", hbs({ defaultLayout: "main" }));
server.set("view engine", "handlebars");

//Middlewares
server.use(morgan("dev"));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.static(path.join(__dirname, "public")));
server.use(
  compression({
    brotli: { enabled: true, zlib: {} },
  })
);

//Configuracion de sesion
server.use(
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
server.use(passport.initialize());
server.use(passport.session());
passportConfig(passport);

// Conexión a la base de datos mongoDB
mongoose.connect(process.env.DB_LINK, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Rutas
server.use("/", CustomRouter);
server.use("/api/tickets", ticketRouter);
server.use("/api/products", productRouter);

// Ruta para probar los logs (Implementación de logger)
server.get('/api/loggers', (req, res) => {
  logger.http('This is an HTTP level log');
  logger.info('This is an INFO level log');
  logger.error('This is an ERROR level log');
  logger.fatal('This is a FATAL level log');
  res.send('Logs generated. Check console and errors.log');
});

// Manejo de errores
server.use(errorHandler);

// Inicializacion del servidor
server.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`); // Utilizar el logger para registrar información sobre el servidor
});

export default server;
