/**
 * @link https://developer.apple.com/documentation/appstoreserverapi
 */

import {
  AutoRenewStatus,
  ExpirationIntent,
  InAppOwnershipType,
  NotificationSubtype,
  NotificationType,
  OfferType,
  PriceIncreaseStatus,
  SubscriptionStatus,
  Type,
} from './app-store-server.enum';
import { Environment } from './global.interface';

/**
 * @link https://developer.apple.com/documentation/appstoreserverapi/jwsdecodedheader
 */
export interface JWSDecodedHeader {
  /**
   * The algorithm used for signing the JSON Web Signature (JWS).
   */
  alg: string;

  /**
   * The X.509 certificate chain that corresponds to the key that the App Store used to secure the JWS.
   */
  x5c: string[];
}

/**
 * @link https://developer.apple.com/documentation/appstoreserverapi/jwsrenewalinfo
 */
export type JWSTransaction = string;

/**
 * @link https://developer.apple.com/documentation/appstoreserverapi/jwsrenewalinfo
 */
export type JWSRenewalInfo = string;

/**
 * @link https://developer.apple.com/documentation/appstoreservernotifications/data
 */
interface Data {
  /**
   * The unique identifier of the app that the notification applies to.This property is available for apps that are downloaded from the App Store; it isn’t present in the sandbox environment.
   */
  appAppleId: number;

  /**
   * The bundle identifier of the app.
   */
  bundleId: string;

  /**
   * The version of the build that identifies an iteration of the bundle.
   */
  bundleVersion: string;

  /**
   * The server environment that the notification applies to, either sandbox or production.
   */
  environment: Environment;

  /**
   * Subscription renewal information signed by the App Store, in JSON Web Signature format.
   */
  signedRenewalInfo: JWSRenewalInfo;

  /**
   * Transaction information signed by the App Store, in JSON Web Signature format.
   */
  signedTransactionInfo: JWSTransaction;
}

/**
 * @link https://developer.apple.com/documentation/appstoreservernotifications/responsebodyv2decodedpayload
 */
export interface ResponseBodyV2DecodedPayload {
  /**
   * The in-app purchase event for which the App Store sent this version 2 notification.
   * https://developer.apple.com/documentation/appstoreservernotifications/notificationtype
   */
  notificationType: NotificationType;

  /**
   * Additional information that identifies the notification event, or an empty string. The subtype applies only to select version 2 notifications.
   * https://developer.apple.com/documentation/appstoreservernotifications/subtype
   */
  subtype: NotificationSubtype;

  /**
   * A unique identifier for the notification. Use this value to identify a duplicate notification.
   */
  notificationUUID: string;

  /**
   * The object that contains the app metadata and signed renewal and transaction information.
   */
  data: Data;

  /**
   * A string that indicates the App Store Server Notification version number.
   */
  version: string;

  /**
   * The UNIX time, in milliseconds, that the App Store signed the JSON Web Signature data.
   */
  signedDate: string;
}

/**
 * @link https://developer.apple.com/documentation/appstoreserverapi/jwstransactiondecodedpayload
 */
export interface JWSTransactionDecodedPayload {
  /**
   * The UUID you created to identify the user’s in-app account when they made the purchase. If your app doesn’t provide an appAccountToken, this string is empty. For more information, see appAccountToken(_:).
   */
  appAccountToken?: string;

  /**
   * The bundle identifier of the app.
   */
  bundleId: string;

  /**
   * The server environment, either sandbox or production.
   */
  environment: Environment;

  /**
   * The UNIX time, in milliseconds, the subscription expires or renews.
   */
  expiresDate?: number;

  /**
   * A string that describes whether the transaction was purchased by the user, or is available to them through Family Sharing.
   */
  inAppOwnershipType: InAppOwnershipType;

  /**
   * The Boolean value that indicates whether the user upgraded to another subscription.
   */
  isUpgraded?: boolean;

  /**
   * The identifier that contains the promo code or the promotional offer identifier.
   */
  offerIdentifier?: string;

  /**
   * A value that represents the promotional offer type.
   */
  offerType?: OfferType;

  /**
   * The UNIX time, in milliseconds, that represents the purchase date of the original transaction identifier.
   */
  originalPurchaseDate: number;

  /**
   * The transaction identifier of the original purchase.
   */
  originalTransactionId: string;

  /**
   * The unique identifier of the product.
   */
  productId: string;

  /**
   * The UNIX time, in milliseconds, that the App Store charged the user’s account for a purchase, restored product, subscription, or subscription renewal after a lapse.
   */
  purchaseDate: number;

  /**
   * The number of consumable products the user purchased.
   */
  quantity: number;

  /**
   * The UNIX time, in milliseconds, that Apple Support refunded a transaction.
   */
  revocationDate?: number;

  /**
   * The reason that the App Store refunded the transaction or revoked it from family sharing.
   */
  revocationReason?: number;

  /**
   * The UNIX time, in milliseconds, that the App Store signed the JSON Web Signature (JWS) data.
   */
  signedDate: number;

  /**
   * The identifier of the subscription group the subscription belongs to.
   */
  subscriptionGroupIdentifier?: string;

  /**
   * The unique identifier of the transaction.
   */
  transactionId: string;

  /**
   * The type of the in-app purchase.
   */
  type: Type;

  /**
   * A unique ID that identifies subscription purchase events across devices, including subscription renewals.
   */
  webOrderLineItemId: string;
}

/**
 * @link https://developer.apple.com/documentation/appstoreserverapi/jwsrenewalinfodecodedpayload
 */
export interface JWSRenewalInfoDecodedPayload {
  /**
   * The identifier of the product that renews at the next billing period.
   */
  autoRenewProductId: string;

  /**
   * The renewal status of the auto-renewable subscription.
   */
  autoRenewStatus: AutoRenewStatus;

  /**
   * The server environment, either sandbox or production.
   */
  environment: Environment;

  /**
   * The reason the subscription expired.
   */
  expirationIntent?: ExpirationIntent;

  /**
   * The time when the grace period for subscription renewals expires.
   */
  gracePeriodExpiresDate?: number;

  /**
   * The Boolean value that indicates whether the App Store is attempting to automatically renew an expired subscription.
   */
  isInBillingRetryPeriod?: boolean;

  /**
   * The offer code or promotional offer identifier.
   */
  offerIdentifier?: string;

  /**
   * The type of the subscription offer.
   */
  offerType?: OfferType;

  /**
   * The transaction identifier of the original purchase associated with this transaction.
   */
  originalTransactionId: string;

  /**
   * The status that indicates whether the auto-renewable subscription is subject to a price increase.
   */
  priceIncreaseStatus?: PriceIncreaseStatus;

  /**
   * The unique identifier of the product.
   */
  productId: string;

  /**
   * The earliest start date of an auto-renewable subscription in a series of subscription purchases that ignores all lapses of paid service that are 60 days or less.
   */
  recentSubscriptionStartDate: number;

  /**
   * The UNIX time, in milliseconds, that the App Store signed the JSON Web Signature data.
   */
  signedDate: number;
}

/**
 * @link https://developer.apple.com/documentation/appstoreserverapi/lasttransactionsitem
 */
export interface LastTransactionsItem {
  /**
   * The original transaction identifier of the auto-renewable subscription.
   */
  originalTransactionId: string;

  /**
   * The status of the auto-renewable subscription.
   */
  status: SubscriptionStatus;

  /**
   * The subscription renewal information signed by the App Store, in JSON Web Signature (JWS) format.
   */
  signedRenewalInfo: JWSRenewalInfo;

  /**
   * The transaction information signed by the App Store, in JWS format.
   */
  signedTransactionInfo: JWSTransaction;
}

/**
 * @link https://developer.apple.com/documentation/appstoreserverapi/subscriptiongroupidentifieritem
 */
interface SubscriptionGroupIdentifierItem {
  /**
   * The subscription group identifier of the auto-renewable subscriptions in the lastTransactions array.
   */
  subscriptionGroupIdentifier: string;

  /**
   * An array of the most recent App Store-signed transaction information and App Store-signed renewal information for all auto-renewable subscriptions in the subscription group.
   */
  lastTransactions: LastTransactionsItem[];
}

/**
 * @link https://developer.apple.com/documentation/appstoreserverapi/statusresponse
 */
export interface StatusResponse {
  /**
   * An array of information for auto-renewable subscriptions, including App Store-signed transaction information and App Store-signed renewal information.
   */
  data: SubscriptionGroupIdentifierItem[];

  /**
   * The server environment, sandbox or production, in which the App Store generated the response.
   */
  environment: Environment;

  /**
   * Your app’s App Store identifier.
   */
  appAppleId: string;

  /**
   * Your app’s bundle identifier.
   */
  bundleId: string;
}
