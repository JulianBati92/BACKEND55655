import express from 'express';
import authRouter from './auth.router.js';
import viewsRouter from './views.router.js';

const indexRouter = express.Router();

indexRouter.use('/api', apiRouter);
indexRouter.use('/auth', authRouter);
indexRouter.use('/views', viewsRouter);

export default indexRouter;
