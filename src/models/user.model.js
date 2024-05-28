import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  firstName: String,
  lastName: String,
  age: Number,
  address: String,
  role: { type: String, enum: ["user", "admin", "premium"], default: "user" },
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
