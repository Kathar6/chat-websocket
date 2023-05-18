import { WebSocketServer } from "ws"

/**
 *
 * @param {import("node:http").Server} server
 */
export const bootstrap = (server) => {
  if (!server) throw new Error("Server not available")
  const wsServer = new WebSocketServer({ server })
  return wsServer
}
