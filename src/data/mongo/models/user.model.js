import { model, Schema } from "moongose";

const collection = "users";
const schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    photo: { type: String, default: "/profile.png" },
    age: { type: Number, default: 18 },
  },
  { timestramps: true }
);

const User = model(collection, schema);
export default User;
