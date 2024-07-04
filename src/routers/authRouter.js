import express from 'express';
import passport from 'passport';
import { registerUser, loginUser, resetPassword, getUserDetails, signoutUser } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/password', resetPassword);
router.post('/user', passport.authenticate('jwt', { session: false }), getUserDetails);
router.post('/signout', passport.authenticate('jwt', { session: false }), signoutUser);

export default router;
