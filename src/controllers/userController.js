import UserModel from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import CustomError from '../utils/errors/CustomError.js';

const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key';

// Verificar usuario
export const verifyUser = async (req, res) => {
  try {
    const { userId, verificationCode } = req.body;
    const user = await UserModel.findById(userId);

    if (!user) {
      throw CustomError.new('USER_NOT_FOUND');
    }

    if (user.verificationCode !== verificationCode) {
      throw CustomError.new('INVALID_VERIFICATION_CODE');
    }

    user.verified = true;
    await user.save();

    res.status(200).json({ message: 'User verified successfully' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

// Subir documentos
export const uploadDocuments = async (req, res) => {
  try {
    const { uid } = req.params;
    const user = await UserModel.findById(uid);

    if (!user) {
      throw CustomError.new('USER_NOT_FOUND');
    }

    const documents = req.files.map(file => ({
      name: file.originalname,
      reference: file.path,
    }));

    user.documents = [...user.documents, ...documents];
    await user.save();

    res.status(200).json({ message: 'Documents uploaded successfully' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

// Promover a premium
export const promoteToPremium = async (req, res) => {
  try {
    const { uid } = req.params;
    const user = await UserModel.findById(uid);

    if (!user) {
      throw CustomError.new('USER_NOT_FOUND');
    }

    const requiredDocuments = ['Identificación', 'Comprobante de domicilio', 'Comprobante de estado de cuenta'];
    const userDocuments = user.documents.map(doc => doc.name);

    const hasAllDocuments = requiredDocuments.every(doc => userDocuments.includes(doc));

    if (!hasAllDocuments) {
      throw CustomError.new('INCOMPLETE_DOCUMENTATION');
    }

    user.role = 'premium';
    await user.save();

    res.status(200).json({ message: 'User promoted to premium successfully' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

// Registrar usuario
export const registerUser = async (req, res) => {
  try {
    const { username, email, password, firstName, lastName, age, address } = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw CustomError.new('EMAIL_ALREADY_IN_USE');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
      firstName,
      lastName,
      age,
      address,
      documents: [],
      last_connection: null,
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

export default { verifyUser, uploadDocuments, promoteToPremium, registerUser };
