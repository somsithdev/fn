import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, required: true },
    phone: { type: String, required: true },
    dob: { type: Date, required: true },
    led31: { type: Boolean, default: false, required: true },
    led32: { type: Boolean, default: false, required: true },
    led21: { type: Boolean, default: false, required: true },
    led22: { type: Boolean, default: false, required: true },
    led11: { type: Boolean, default: false, required: true },
    gate: { type: Boolean, default: false, required: true },
    roof: { type: Boolean, default: false, required: true },
    car: { type: Boolean, default: false, required: true },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
