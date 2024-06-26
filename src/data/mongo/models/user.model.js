import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    photo: { type: String, default: "/profile.png" },
    age: { type: Number, default: 18 },
    role: { type: String, enum: ["user", "admin", "premium"], default: "user" },
    products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true }
);

const User = model("User", userSchema);
export default User;
