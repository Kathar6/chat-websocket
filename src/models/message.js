import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
  _id: String,
  origin: String,
  target: String,
  created_at: Date,
});

/** @type {import("mongoose").Collection} */
const MessageModel = mongoose.model("message", messageSchema);

export default MessageModel;
