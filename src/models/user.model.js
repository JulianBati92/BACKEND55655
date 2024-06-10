import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  reference: { type: String, required: true },
});

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  firstName: String,
  lastName: String,
  age: Number,
  address: String,
  role: { type: String, enum: ["user", "admin", "premium"], default: "user" },
  documents: [documentSchema],
  last_connection: Date,
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
