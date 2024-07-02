import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import EmailService from '../services/emailService.js';
import { sendSMS } from '../services/twilioService.js';

const emailService = new EmailService();

const registerUser = async (req, res) => {
    try {
        const { username, email, password, phoneNumber } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationCode = Math.floor(100000 + Math.random() * 900000); // Generate a six-digit verification code
        const newUser = new User({ username, email, password: hashedPassword, verificationCode, phoneNumber });
        await newUser.save();

        // Send verification email
        await emailService.sendVerificationEmail(newUser.email, newUser.verificationCode);

        // Send verification SMS
        const message = `Your verification code is: ${verificationCode}`;
        await sendSMS(phoneNumber, message);

        res.status(201).json({ message: 'User created successfully. Verification email and SMS sent.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const verifyUser = async (req, res) => {
    try {
        const { email, verificationCode } = req.body;
        const user = await User.findOne({ email });

        if (!user || user.verificationCode !== verificationCode) {
            return res.status(400).json({ message: 'Invalid verification code.' });
        }

        user.isVerified = true;
        await user.save();

        res.status(200).json({ message: 'User verified successfully.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { registerUser, verifyUser };
