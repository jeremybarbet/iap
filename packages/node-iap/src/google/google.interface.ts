/**
 * Interfaces extracted from the Google documentation
 * @link https://developers.google.com/android-publisher/api-ref/rest/v3/purchases.products/get
 * @link https://developers.google.com/android-publisher/api-ref/rest/v3/purchases.products/acknowledge
 * @link https://developers.google.com/android-publisher/api-ref/rest/v3/purchases.subscriptions/get
 * @link https://developers.google.com/android-publisher/api-ref/rest/v3/purchases.subscriptions/acknowledge
 */

export interface Config {
  /**
   * Google service account client email.
   */
  clientEmail: string;

  /**
   * Google service account private key.
   */
  privateKey: string;
}

interface BodyBase {
  /**
   * The package name of the application for which this subscription was purchased (for example, 'com.some.thing').
   */
  packageName: string;

  /**
   * The token provided to the user's device when the subscription was purchased.
   */
  token: string;

  /**
   * To acknowledge a product/subscription purchase.
   *
   * @default: false
   */
  acknowledge?: boolean;
}

export interface SubscriptionReceipt extends BodyBase {
  /**
   * The purchased subscription ID (for example, 'monthly001').
   */
  subscriptionId: string;
}

export interface ProductReceipt extends BodyBase {
  /**
   * The inapp product SKU (for example, 'com.some.thing.inapp1').
   */
  productId: string;
}

export type VerifyReceiptRequestBody = SubscriptionReceipt | ProductReceipt;
