import { describe, test, expect } from "vitest";

import SubscriberManager from "./SubscriberManager.js";

const subscriber = new SubscriberManager();

describe("Test all chat subscriber functionality", () => {
  test("Should subscribe a user", () => {
    const isSubscriberAdded = subscriber.addSubscriber(
      "a86e8bf3-43c0-4122-9f18-a4cb3d050129",
    );
    expect(isSubscriberAdded).not.toBe(false);
  });

  test("Should return a subscriber data", () => {
    const subscriberData = subscriber.getSubscriber(
      "a86e8bf3-43c0-4122-9f18-a4cb3d050129",
    );

    expect(subscriberData).toHaveProperty("chats");
  });
});
