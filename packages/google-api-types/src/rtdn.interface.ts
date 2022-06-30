/**
 * @link https://developer.android.com/google/play/billing/rtdn-reference
 */

interface OneTimeProductNotification {
  /**
   * The version of this notification. Initially, this will be "1.0". This version is distinct from other version fields.
   */
  version: string;

  /**
   * The type of notification. It can have the following values:
   * (1) ONE_TIME_PRODUCT_PURCHASED - A one-time product was successfully purchased by a user.
   * (2) ONE_TIME_PRODUCT_CANCELED - A pending one-time product purchase has been canceled by the user.
   */
  notificationType: number;

  /**
   * The token provided to the user’s device when purchase was made.
   */
  purchaseToken: string;

  /**
   * The purchased one-time product ID (for example, "sword_001")
   */
  sku: string;
}

interface SubscriptionNotification {
  /**
   * The version of this notification. Initially, this is "1.0". This version is distinct from other version fields.
   */
  version: string;

  /**
   * The notificationType for a subscription can have the following values:
   * (1) SUBSCRIPTION_RECOVERED - A subscription was recovered from account hold.
   * (2) SUBSCRIPTION_RENEWED - An active subscription was renewed.
   * (3) SUBSCRIPTION_CANCELED - A subscription was either voluntarily or involuntarily cancelled. For voluntary cancellation, sent when the user cancels.
   * (4) SUBSCRIPTION_PURCHASED - A new subscription was purchased.
   * (5) SUBSCRIPTION_ON_HOLD - A subscription has entered account hold (if enabled).
   * (6) SUBSCRIPTION_IN_GRACE_PERIOD - A subscription has entered grace period (if enabled).
   * (7) SUBSCRIPTION_RESTARTED - User has restored their subscription from Play > Account > Subscriptions. The subscription was canceled but had not expired yet when the user restores. For more information, see [Restorations](/google/play/billing/subscriptions#restore).
   * (8) SUBSCRIPTION_PRICE_CHANGE_CONFIRMED - A subscription price change has successfully been confirmed by the user.
   * (9) SUBSCRIPTION_DEFERRED - A subscription's recurrence time has been extended.
   * (10) SUBSCRIPTION_PAUSED - A subscription has been paused.
   * (11) SUBSCRIPTION_PAUSE_SCHEDULE_CHANGED - A subscription pause schedule has been changed.
   * (12) SUBSCRIPTION_REVOKED - A subscription has been revoked from the user before the expiration time.
   * (13) SUBSCRIPTION_EXPIRED - A subscription has expired.
   */
  notificationType: number;

  /**
   * The token provided to the user's device when the subscription was purchased.
   */
  purchaseToken: string;

  /**
   * The purchased subscription's product ID (for example, "monthly001").
   */
  subscriptionId: string;
}

interface TestNotification {
  /**
   * The version of this notification. Initially, this is "1.0". This version is distinct from other version fields.
   */
  version: string;
}

export interface DecodedData {
  /**
   * The version of this notification. Initially, this is "1.0". This version is distinct from other version fields.
   */
  version: string;

  /**
   * The package name of the application that this notification relates to (for example, `com.some.thing`).
   */
  packageName: string;

  /**
   * The timestamp when the event occurred, in milliseconds since the Epoch.
   */
  eventTimeMillis: number;

  /**
   * If this field is present, then this notification is related to a one-time purchase, and this field contains additional information related to the purchase. Note that this field is mutually exclusive with testNotification and subscriptionProductNotification.
   */
  oneTimeProductNotification?: OneTimeProductNotification;

  /**
   * If this field is present, then this notification is related to a subscription, and this field contains additional information related to the subscription. Note that this field is mutually exclusive with testNotification and oneTimeProductNotification.
   */
  subscriptionNotification?: SubscriptionNotification;

  /**
   * If this field is present, then this notification is related to a test publish. These are sent only through the Google Play Developer Console. Note that this field is mutually exclusive with subscriptionNotification and oneTimeProductNotification.
   */
  testNotification?: TestNotification;
}

interface Message {
  attributes: Record<string, any>;
  data: string;
  messageId: string;
}

export interface BodyPayload {
  message: Message;
  subscription: string;
}
