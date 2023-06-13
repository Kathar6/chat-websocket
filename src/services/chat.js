class ChatService {
  server;
  heartBeatInterval = 30000;

  /**
   *
   * @param {import("ws").WebSocketServer} server
   */
  constructor(server) {
    this.server = server;
  }

  /**
   *
   * @param {import("ws").WebSocket} socket
   */
  toggleHeartbeat(socket) {
    socket.isAlive = true;
  }

  /**
   *
   * @param {import("ws").WebSocket} socket
   * @param {any} request
   */
  onConnection(socket, request) {
    socket.isAlive = true;
    socket.on("pong", toggleHeartbeat);
  }

  connectionEvent() {
    this.server.on("connection", this.onConnection);
  }

  closeEvent() {
    this.server.on("close");
  }

  /**
   *
   * @param {import("ws").WebSocket} socket
   */
  checkHeartbeat(socket) {
    if (!socket.isAlive) {
      return socket.terminate();
    }

    socket.isAlive = false;
  }

  handleHeartbeat() {
    this.server.clients.forEach((client) => this.checkHeartbeat(client));
  }

  /**
   * Start all the ws events to handle chats
   */
  bootstrapEvents() {}
}

export default ChatService;
