import express from 'express';
import authRouter from './authRouter.js';
import viewsRouter from './viewsRouter.js';

const customRouter = express.Router();

customRouter.use('/auth', authRouter);
customRouter.use('/views', viewsRouter);

export default customRouter;
