import express from 'express';
import authRouter from './auth.router.js';
import viewsRouter from './views.router.js';

const customRouter = express.Router();

customRouter.use('/auth', authRouter);
customRouter.use('/views', viewsRouter);

export default customRouter;
