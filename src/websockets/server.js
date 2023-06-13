import { WebSocketServer } from "ws";

/**
 *
 * @param {import("node:http").Server} server
 */
export const bootstrap = (httpServer) => {
  if (!httpServer) throw new Error("Server not available");
  const server = new WebSocketServer({ server: httpServer });
  return server;
};
