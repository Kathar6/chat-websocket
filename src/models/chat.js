import mongoose from "mongoose";

const chatSchema = mongoose.Schema({
  _id: String,
  origin: String,
  target: String,
  created_at: Date,
});

/** @type {import("mongoose").Collection} */
const ChatModel = mongoose.model("chat", chatSchema);

export default ChatModel;
