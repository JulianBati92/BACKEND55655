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
import viewsRouter from "./src/routers/viewsRouter.js";
import authRouter from "./src/routers/authRouter.js";
import { errorHandler } from "./src/middlewares/errorHandler.js";
import configurePassport from "./src/utils/passport.js";
import compression from "express-compression";
import logger from "./src/utils/logger.js";
import swaggerJSDoc from "swagger-jsdoc";
import { serve, setup } from "swagger-ui-express";
import ticketRouter from "./src/routers/ticketRouter.js";
import productRouter from "./src/routers/productsRouter.js";
import cartRouter from "./routers/cartRouter.js";
import checkoutRouter from "./routers/checkoutRouter.js";

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
server.engine("handlebars", exphbs({ defaultLayout: false }));
server.set("view engine", "handlebars");
server.set("views", path.join(process.cwd(), "src/views"));

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
configurePassport();
server.use(passport.initialize());
server.use(passport.session());

// Conexión a la base de datos MongoDB
mongoose
  .connect(process.env.DB_LINK)
  .then(() => {
    logger.info("Connected to MongoDB");
  })
  .catch((err) => {
    logger.error(`Failed to connect to MongoDB: ${err.message}`);
    process.exit(1);
  });

// Rutas
server.use("/", viewsRouter);
server.use("/auth", authRouter); // Asegúrate de usar /auth para las rutas de autenticación
server.use("/api/tickets", ticketRouter);
server.use("/api/products", productRouter);
server.use("/cart", cartRouter);
serve.use("/checkout", checkoutRouter);

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
