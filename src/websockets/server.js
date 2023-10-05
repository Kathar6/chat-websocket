import ChatSubscriber from "./SubscriberManager.js";
import WebSocketHandler from "./SocketHandler.js";

// Vendor
import { WebSocketServer } from "ws";

/**
 *
 * @param {import("express").Server} server
 */
export const bootstrap = (server) => {
  if (!server) throw new Error("Server not available");

  const wsServer = new WebSocketServer({
    noServer: true,
  });

  const handler = new WebSocketHandler(ChatSubscriber);

  handler.checkHeartBeat(wsServer.clients);

  wsServer.on("connection", (socket, request) =>
    handler.handleConnection(socket, request),
  );

  server.on("upgrade", (request, socket, head) => {
    wsServer.handleUpgrade(request, socket, head, (socket) => {
      wsServer.emit("connection", socket, request);
    });
  });

  return server;
};
