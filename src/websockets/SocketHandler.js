import WebSocketAuthenticator from "./Authenticator.js";
import MessageManager from "./MessageManager.js";

import WebSocket from "ws";

import SubscriberManager from "./SubscriberManager.js";
// config
import { HEART_BEAT_INTERVAL } from "./config.js";

class WebSocketHandler {
  /**
   * @param {typeof SubscriberManager} subscriber
   */
  constructor(subscriber) {
    this.subscriber = new subscriber();
  }

  /**
   * @param {WebSocket} socket
   */
  _setClientAlive(socket) {
    socket.isAlive = true;
  }

  /**
   * @param {Set<WebSocket>} clients
   */
  checkHeartBeat(clients) {
    setInterval(() => {
      clients.forEach((client) => {
        if (client.isAlive === false) {
          return client.terminate();
        }

        client.isAlive = false;

        client.ping(() =>
          console.log("client number", client.protocol, "alive"),
        );
      });
    }, HEART_BEAT_INTERVAL);
  }

  /**
   * @param {WebSocket} socket
   * @param {import("http").IncomingMessage} request
   */
  async handleConnection(socket, request) {
    const authenticator = new WebSocketAuthenticator(request.headers);

    const authenticatorData = await authenticator.authenticate();

    if (!authenticatorData.isValid) return socket.close();

    this.subscriber.addSubscriber(authenticatorData?.id);

    socket.on(
      "message",
      (message) => new MessageManager(socket, authenticatorData?.id, message),
    );

    socket.on("pong", (socket) => this._setClientAlive(socket));
  }
}

export default WebSocketHandler;
