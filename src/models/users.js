import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  _id: String,
  email: String,
  password: String,
  created_at: Date,
  updated_at: Date,
});

/** @type {import("mongoose").Collection} */
const UserModel = mongoose.model("users", userSchema);

export default UserModel;
