import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  _id: String,
  email: String,
  password: String,
});

const UserModel = mongoose.model("users", userSchema);

export default UserModel;
