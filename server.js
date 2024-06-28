import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';
import dotenv from 'dotenv';
import { create } from 'express-handlebars';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import mongoose from 'mongoose';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import viewsRouter from './src/routers/viewsRouter.js';
import authRouter from './src/routers/authRouter.js';
import errorHandler from './src/middlewares/errorHandler.js';
import configurePassport from './src/utils/passport.js';
import compression from 'express-compression';
import logger from './src/utils/logger.js';
import swaggerJSDoc from 'swagger-jsdoc';
import { serve, setup } from 'swagger-ui-express';
import ticketRouter from './src/routers/ticketRouter.js';
import productRouter from './src/routers/productsRouter.js';
import cartRouter from './src/routers/cartRouter.js';
import checkoutRouter from './src/routers/checkoutRouter.js';
import paymentRoutes from './src/routers/paymentRoutes.js';
import proxyRouter from './src/utils/proxyRouter.js';
import Stripe from 'stripe';

dotenv.config();

const server = express();
const PORT = process.env.PORT || 8080;

// Configuración de Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'Tu Matteoli',
      description: 'Documentation of API',
    },
  },
  apis: ['./src/docs/*.yaml'],
};
const specs = swaggerJSDoc(swaggerOptions);
server.use('/api/docs', serve, setup(specs));

// Configuración de Handlebars
const hbs = create({
  extname: '.handlebars',
  defaultLayout: false,
  layoutsDir: path.join(process.cwd(), 'src/views/layouts'),
  partialsDir: path.join(process.cwd(), 'src/views/partials'),
});

server.engine('handlebars', hbs.engine);
server.set('view engine', 'handlebars');
server.set('views', path.join(process.cwd(), 'src/views'));

// Middlewares
server.use(morgan('dev'));
server.use(cookieParser());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.static(path.join(process.cwd(), 'public')));
server.use(
  compression({
    brotli: { enabled: true, zlib: {} },
  })
);

// Configuración de sesión
server.use(
  session({
    secret: process.env.SESSION_SECRET || 'secret',
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
    logger.info('Connected to MongoDB');
  })
  .catch((err) => {
    logger.error(`Failed to connect to MongoDB: ${err.message}`);
    process.exit(1);
  });

// Rutas
server.use('/', viewsRouter);
server.use('/auth', authRouter);
server.use('/api/tickets', ticketRouter);
server.use('/api/products', productRouter);
server.use('/cart', cartRouter);
server.use('/checkout', checkoutRouter);  
server.use('/api/payments', paymentRoutes);
server.use('/proxy', proxyRouter);

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

// Inicialización del servidor
server.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
