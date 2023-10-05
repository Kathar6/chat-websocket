// Models
import ChatModel from "../models/chat.js";
import MessageModel from "../models/message.js";

// Utils
import formatBufferToJSON from "../utils/formatBufferToJSON.js";

// Vendor
import { v4 as uuid4 } from "uuid";

class MessageManager {
  /** @type {import("ws").WebSocket} */
  socket = null;

  /**
   * @param {import("ws").WebSocket} socket
   * @param {string} userID
   * @param {string} message
   */
  constructor(socket, userID, message) {
    this.socket = socket;

    const decodedMessage = formatBufferToJSON(message);

    if (decodedMessage?.type == "message") {
      this.sendMessage(userID, decodedMessage?.chat, decodedMessage?.value);
    }
    if (decodedMessage?.type == "create_chat") {
      this.createChat(userID, decodedMessage.target);
    }
  }

  /**
   * @param {string} origin
   * @param {string} target
   */
  async createChat(origin, target) {
    const newChat = new ChatModel({
      _id: uuid4(),
      subscribers: [origin, target],
      created_at: new Date().toISOString(),
    });

    const response = {
      ok: true,
      origin,
      target,
    };
    try {
      await newChat.save();
      return this.socket.send(JSON.stringify(response));
    } catch (error) {
      response.ok = false;
      console.log(error);
      return this.socket.send(JSON.stringify(response));
    }
  }

  /**
   * @param {string} origin
   * @param {string} chatID
   * @param {string} message
   */
  async sendMessage(origin, chatID, message) {
    const newMessage = new MessageModel({
      _id: uuid4(),
      origin,
      chat: chatID,
      message,
      created_at: new Date().toISOString(),
    });

    try {
      await newMessage.save();
    } catch (error) {
      console.log(error);
    }
  }
}

export default MessageManager;
