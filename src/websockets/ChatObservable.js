/**
 * @typedef Observer
 * @prop {(...props: any[]) => any} notify
 */
class Observable {
  constructor() {
    /** @type {Set<Observer>} */
    this.chats = new Set();
  }

  /**
   * @param {Observer} observer
   */
  subscribe(observer) {
    this.chats.add(observer);
  }

  /**
   * @param {Observer} observer
   */
  unsubscribe(observer) {
    this.chats.delete(observer);
  }

  /**
   * @param {unknown[]} args
   */
  notify(...args) {
    this.chats.forEach((subscriber) => {
      subscriber.notify(...args);
    });
  }
}
