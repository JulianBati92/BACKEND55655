const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const EmailService = require('../services/emailService');
const TwilioService = require('../services/twilioService');

const emailService = new EmailService();
const twilioService = new TwilioService();

const registerUser = async (req, res) => {
    try {
        const { username, email, password, phoneNumber } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationCode = Math.floor(100000 + Math.random() * 900000); // Generar un código de verificación de seis dígitos
        const newUser = new User({ username, email, password: hashedPassword, verificationCode });
        await newUser.save();

        // Enviar correo electrónico de verificación
        await emailService.sendVerificationEmail(newUser.email, newUser.verificationCode);

        // Enviar mensaje de texto de verificación
        const message = `Tu código de verificación es: ${verificationCode}`;
        await twilioService.sendSMS(phoneNumber, message);

        res.status(201).json({ message: 'User created successfully. Verification email and SMS sent.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { registerUser };
