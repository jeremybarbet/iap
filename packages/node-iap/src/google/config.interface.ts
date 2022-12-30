import {
  AcknowledgePurchaseOrSubscription,
  ProductPurchase,
  SubscriptionPurchase,
} from '@jeremybarbet/google-api-types';

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

interface BodyWithAcknowledge {
  /**
   * To acknowledge a product/subscription purchase.
   *
   * @default false
   */
  acknowledge?: true;

  /**
   * The acknowledge endpoint return an empty response.
   * This boolean forces a get request to return purchase's information.
   *
   * @default false
   */
  fetchResource?: boolean;

  /**
   * Payload to attach to the purchase.
   */
  developerPayload?: string;
}

interface BodyWithoutAcknowledge {
  /**
   * To acknowledge a product/subscription purchase.
   */
  acknowledge?: false;

  /**
   * The acknowledge endpoint return an empty response.
   * This boolean forces a get request to return purchase's information.
   */
  fetchResource?: never;
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
}

export type SubscriptionBody = BodyBase &
  (BodyWithAcknowledge | BodyWithoutAcknowledge) & {
    /**
     * The purchased subscription ID (for example, 'monthly001').
     */
    subscriptionId: string;
  };

export type ProductBody = BodyBase &
  (BodyWithAcknowledge | BodyWithoutAcknowledge) & {
    /**
     * The inapp product SKU (for example, 'com.some.thing.inapp1').
     */
    productId: string;
  };

export type RequestBody = SubscriptionBody | ProductBody;

export type DataResponse = SubscriptionPurchase | ProductPurchase | AcknowledgePurchaseOrSubscription;

export type StatusResponse = number;

export interface VerifyResponse {
  valid: boolean;
  data?: DataResponse;
  message?: string;
  status?: StatusResponse;
}
