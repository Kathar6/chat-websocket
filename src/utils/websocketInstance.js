class WebsocketInstace {
  constructor() {
    if (typeof WebsocketInstace.instance === "object") {
      return WebsocketInstace.instance;
    }

    WebsocketInstace.instance = this;

    return this;
  }

  /**
   * @param {import("ws").Server} server
   */
  setClient(server) {
    this.client = server;
  }

  getClient() {
    return this.client;
  }
}
