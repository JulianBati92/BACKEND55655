import bcrypt from "bcrypt";
import { userService } from "./userService.js";
import jwt from "jsonwebtoken";

const saltRounds = 10;
const JWT_SECRET = process.env.JWT_SECRET;

export const registerUser = async (username, password) => {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return userService.createUser({ username, password: hashedPassword });
};

export const loginUser = async (username, password) => {
    const user = await userService.getUserByUsername(username);
    if (!user || !user.isValidPassword(password)) {
        throw new Error("Nombre de usuario o contraseña incorrectos.");
    }
    return generateJWT(user);
};

const generateJWT = (user) => {
    return jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });
};
