import express from 'express';
import authRouter from './authRouter.js';
import ordersRouter from './api/ordersRouter.js';
import productsRouter from './api/productsRouter.js'; 
import usersRouter from './api/usersRouter.js'; 

const apiRouter = express.Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/orders', ordersRouter);
apiRouter.use('/products', productsRouter);
apiRouter.use('/users', usersRouter);

export default apiRouter;
