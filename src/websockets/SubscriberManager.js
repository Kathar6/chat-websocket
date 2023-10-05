class SubscriberManager {
  constructor() {
    if (typeof SubscriberManager.instance === "object") {
      return SubscriberManager.instance;
    }
    /** @type {Map<string, {chats: string[]>} */
    this.subscribers = new Map();

    SubscriberManager.instance = this;
    return this;
  }

  /**
   * @param {string} userID
   * @param {any} listener
   */
  subscribe(userID, listener) {
    if (this.subscribers.has(userID)) return false;

    this.subscribers.set(userID, listener);
  }

  /**
   * @param {string} userId
   */
  addSubscriber(userId) {
    if (this.subscribers.has(userId)) return false;

    this.subscribers.set(userId, {
      chats: [],
    });

    return true;
  }

  /**
   * @param {string} userId
   */
  getSubscriber(userId) {
    return this.subscribers.get(userId);
  }
}

export default SubscriberManager;
