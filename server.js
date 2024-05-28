import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import path from "path";
import dotenv from "dotenv";
import { engine as exphbs } from "express-handlebars"; 
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import passport from "passport";
import CustomRouter from "./src/routers/customRouter.js";
import { errorHandler } from "./src/middlewares/errorHandler.js";
import configurePassport from "./src/utils/passport.js"; 
import compression from "express-compression";
import logger from "./src/utils/logger.js";
import swaggerJSDoc from "swagger-jsdoc";
import { serve, setup } from "swagger-ui-express";
import ticketRouter from "./src/routers/ticketRouter.js";
import productRouter from "./src/routers/productsRouter.js";

dotenv.config();

const server = express();
const PORT = process.env.PORT || 8080;

// Swagger
const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Tu Matteoli",
      description: "Documentation of API",
    },
  },
  apis: ["./src/docs/*.yaml"],
};
const specs = swaggerJSDoc(swaggerOptions);
server.use("/api/docs", serve, setup(specs));

// Configuración de Handlebars
server.engine("handlebars", exphbs({ defaultLayout: "main" })); 
server.set("view engine", "handlebars");

// Middlewares
server.use(morgan("dev"));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.static(path.join(process.cwd(), "public"))); 
server.use(
  compression({
    brotli: { enabled: true, zlib: {} },
  })
);

// Configuración de sesión
server.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_LINK }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 día
    },
  })
);

// Inicialización de passport
server.use(passport.initialize());
server.use(passport.session());

// Conexión a la base de datos MongoDB
mongoose
  .connect(process.env.DB_LINK, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info("Connected to MongoDB");
  })
  .catch((err) => {
    logger.error(`Failed to connect to MongoDB: ${err.message}`);
    process.exit(1);
  });

// Rutas
server.use("/", CustomRouter);
server.use("/api/tickets", ticketRouter);
server.use("/api/products", productRouter);

// Ruta para probar los logs (Implementación de logger)
server.get("/api/loggers", (req, res) => {
  logger.http("This is an HTTP level log");
  logger.info("This is an INFO level log");
  logger.error("This is an ERROR level log");
  logger.fatal("This is a FATAL level log");
  res.send("Logs generated. Check console and errors.log");
});

// Manejo de errores
server.use(errorHandler);

// Inicialización del servidor
server.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
