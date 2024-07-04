import express from 'express';
import passport from 'passport';
import { calculateTotal } from '../controllers/ticketController.js';

const router = express.Router();

router.get('/', passport.authenticate('jwt', { session: false }), calculateTotal);

export default router;
