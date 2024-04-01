import { User } from "../data/mongo/models";
import bcrypt from "bcrypt";

const saltRounds = 10;

export const createUser = async ({ username, password }) => {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({ username, password: hashedPassword });
    return await newUser.save();
};

export const getUserByUsername = async (username) => {
    return await User.findOne({ username });
};
