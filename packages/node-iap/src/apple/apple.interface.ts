/**
 * Interfaces extracted from the Apple documentation
 * @link https://developer.apple.com/documentation/appstorereceipts
 */

import { errors } from './apple.utils';

type ValidReceipt = 0;

export enum Environnement {
  PRODUCTION = 'production',
  SANDBOX = 'sandbox',
}

interface LatestReceiptInfo {
  /**
   * The appAccountToken associated with this transaction. This field is only present if your app supplied an appAccountToken(_: ) or provided a UUID for the applicationUsername property when the user made the purchase.
   */
  app_account_token: string;

  /**
   * The time the App Store refunded a transaction or revoked it from family sharing, in a date-time format similar to the ISO 8601. This field is present only for refunded or revoked transactions.
   */
  cancellation_date: string;

  /**
   * The time the App Store refunded a transaction or revoked it from family sharing, in UNIX epoch time format, in milliseconds. This field is present only for refunded or revoked transactions. Use this time format for processing dates.
   */
  cancellation_date_ms: string;

  /**
   * The time the App Store refunded a transaction or revoked it from family sharing, in Pacific Standard Time. This field is present only for refunded or revoked transactions.
   */
  cancellation_date_pst: string;

  /**
   * The reason for a refunded or revoked transaction. A value of 1 indicates that the customer canceled their transaction due to an actual or perceived issue within your app. A value of 0 indicates that the transaction was canceled for another reason; for example, if the customer made the purchase accidentally.
   */
  cancellation_reason: '0' | '1';

  /**
   * The time a subscription expires or when it will renew, in a date-time format similar to the ISO 8601.
   */
  expires_date: string;

  /**
   * The time a subscription expires or when it will renew, in UNIX epoch time format, in milliseconds. Use this time format for processing dates.
   */
  expires_date_ms: string;

  /**
   * The time a subscription expires or when it will renew, in Pacific Standard Time.
   */
  expires_date_pst: string;

  /**
   * A value that indicates whether the user is the purchaser of the product or is a family member with access to the product through Family Sharing.
   */
  in_app_ownership_type: 'FAMILY_SHARED' | 'PURCHASED';

  /**
   * An indicator of whether an auto-renewable subscription is in the introductory price period. See is_in_intro_offer_period for more information.
   */
  is_in_intro_offer_period: 'true' | 'false';

  /**
   * An indicator of whether a subscription is in the free trial period.
   */
  is_trial_period: 'true' | 'false';

  /**
   * An indicator that a subscription has been canceled due to an upgrade. This field is only present for upgrade transactions.
   */
  is_upgraded?: 'true';

  /**
   * The reference name of a subscription offer that you configured in App Store Connect. This field is present when a customer redeems a subscription offer code. For more information about offer codes, see Set Up Offer Codes, and Implementing Offer Codes in Your App.
   */
  offer_code_ref_name: string;

  /**
   * The time of the original app purchase, in a date-time format similar to ISO 8601.
   */
  original_purchase_date: string;

  /**
   * The time of the original app purchase, in UNIX epoch time format, in milliseconds. Use this time format for processing dates. For an auto-renewable subscription, this value indicates the date of the subscription’s initial purchase. The original purchase date applies to all product types and remains the same in all transactions for the same product ID. This value corresponds to the original transaction’s transactionDate property in StoreKit.
   */
  original_purchase_date_ms: string;

  /**
   * The time of the original app purchase, in Pacific Standard Time.
   */
  original_purchase_date_pst: string;

  /**
   * The transaction identifier of the original purchase.
   */
  original_transaction_id: string;

  /**
   * The unique identifier of the product purchased. You provide this value when creating the product in App Store Connect, and it corresponds to the productIdentifier property of the SKPayment object stored in the transaction’s payment property.
   */
  product_id: string;

  /**
   * The identifier of the subscription offer redeemed by the user.
   */
  promotional_offer_id: string;

  /**
   * The time the App Store charged the user’s account for a purchased or restored product, or the time the App Store charged the user’s account for a subscription purchase or renewal after a lapse, in a date-time format similar to ISO 8601.
   */
  purchase_date: string;

  /**
   * For consumable, non-consumable, and non-renewing subscription products, the time the App Store charged the user’s account for a purchased or restored product, in the UNIX epoch time format, in milliseconds. For auto-renewable subscriptions, the time the App Store charged the user’s account for a subscription purchase or renewal after a lapse, in the UNIX epoch time format, in milliseconds. Use this time format for processing dates.
   */
  purchase_date_ms: string;

  /**
   * The time the App Store charged the user’s account for a purchased or restored product, or the time the App Store charged the user’s account for a subscription purchase or renewal after a lapse, in Pacific Standard Time.
   */
  purchase_date_pst: string;

  /**
   * The number of consumable products purchased. This value corresponds to the quantity property of the SKPayment object stored in the transaction’s payment property. The value is usually 1 unless modified with a mutable payment. The maximum value is 10.
   */
  quantity: string;

  /**
   * The identifier of the subscription group to which the subscription belongs. The value for this field is identical to the subscriptionGroupIdentifier property in SKProduct.
   */
  subscription_group_identifier: string;

  /**
   * A unique identifier for purchase events across devices, including subscription-renewal events. This value is the primary key for identifying subscription purchases.
   */
  web_order_line_item_id: string;

  /**
   * A unique identifier for a transaction such as a purchase, restore, or renewal.
   */
  transaction_id: string;
}

interface PendingRenewalInfo {
  /**
   * The value for this key corresponds to the productIdentifier property of the product that the customer’s subscription renews.
   */
  auto_renew_product_id: string;

  /**
   * The current renewal status for the auto-renewable subscription. See auto_renew_status for more information.
   * @argument '0' The subscription will renew at the end of the current subscription period.
   * @argument '1' The customer has turned off automatic renewal for the subscription.
   */
  auto_renew_status: '0' | '1';

  /**
   * The reason a subscription expired. This field is only present for a receipt that contains an expired auto-renewable subscription.
   * @argument '1' The customer voluntarily canceled their subscription.
   * @argument '2' Billing error; for example, the customer's payment information was no longer valid.
   * @argument '3' The customer did not agree to a recent price increase.
   * @argument '4' The product was not available for purchase at the time of renewal.
   * @argument '5' Unknown error.
   */
  expiration_intent: '1' | '2' | '3' | '4' | '5';

  /**
   * The time at which the grace period for subscription renewals expires, in a date-time format similar to the ISO 8601.
   */
  grace_period_expires_date: string;

  /**
   * The time at which the grace period for subscription renewals expires, in UNIX epoch time format, in milliseconds. This key is only present for apps that have Billing Grace Period enabled and when the user experiences a billing error at the time of renewal. Use this time format for processing dates.
   */
  grace_period_expires_date_ms: string;

  /**
   * The time at which the grace period for subscription renewals expires, in the Pacific Time zone.
   */
  grace_period_expires_date_pst: string;

  /**
   * A flag that indicates Apple is attempting to renew an expired subscription automatically. This field is only present if an auto-renewable subscription is in the billing retry state. See is_in_billing_retry_period for more information.
   * @argument '1' The App Store is attempting to renew the subscription.
   * @argument '0' The App Store has stopped attempting to renew the subscription.
   */
  is_in_billing_retry_period: '0' | '1';

  /**
   * The reference name of a subscription offer that you configured in App Store Connect. This field is present when a customer redeemed a subscription offer code. For more information, see offer_code_ref_name.
   */
  offer_code_ref_name: string;

  /**
   * The transaction identifier of the original purchase.
   */
  original_transaction_id: string;

  /**
   * The price consent status for a subscription price increase. This field is only present if the customer was notified of the price increase. The default value is "0" and changes to "1" if the customer consents.
   */
  price_consent_status: '0' | '1';

  /**
   * The unique identifier of the product purchased. You provide this value when creating the product in App Store Connect, and it corresponds to the productIdentifier property of the SKPayment object stored in the transaction's payment property.
   */
  product_id: string;

  /**
   * The identifier of the promotional offer for an auto-renewable subscription that the user redeemed. You provide this value in the Promotional Offer Identifier field when you create the promotional offer in App Store Connect.
   */
  promotional_offer_id: string;
}

interface InApp {
  /**
   * The time the App Store refunded a transaction or revoked it from family sharing, in a date-time format similar to the ISO 8601. This field is present only for refunded or revoked transactions.
   */
  cancellation_date: string;

  /**
   * The time the App Store refunded a transaction or revoked it from family sharing, in UNIX epoch time format, in milliseconds. This field is present only for refunded or revoked transactions. Use this time format for processing dates. See cancellation_date_ms for more information.
   */
  cancellation_date_ms: string;

  /**
   * The time the App Store refunded a transaction or revoked it from family sharing, in the Pacific Time zone. This field is present only for refunded or revoked transactions.
   */
  cancellation_date_pst: string;

  /**
   * The reason for a refunded or revoked transaction. A value of “1” indicates that the customer canceled their transaction due to an actual or perceived issue within your app. A value of “0” indicates that the transaction was canceled for another reason; for example, if the customer made the purchase accidentally.
   */
  cancellation_reason: '0' | '1';

  /**
   * The time a subscription expires or when it will renew, in a date-time format similar to the ISO 8601.
   */
  expires_date: string;

  /**
   * The time a subscription expires or when it will renew, in UNIX epoch time format, in milliseconds. Use this time format for processing dates. See expires_date_ms for more information.
   */
  expires_date_ms: string;

  /**
   * The time a subscription expires or when it will renew, in the Pacific Time zone.
   */
  expires_date_pst: string;

  /**
   * An indicator of whether an auto-renewable subscription is in the introductory price period. See is_in_intro_offer_period for more information.
   */
  is_in_intro_offer_period: 'true' | 'false';

  /**
   * An indication of whether a subscription is in the free trial period. See is_trial_period for more information.
   */
  is_trial_period: 'true' | 'false';

  /**
   * The time of the original in-app purchase, in a date-time format similar to ISO 8601.
   */
  original_purchase_date: string;

  /**
   * The time of the original in-app purchase, in UNIX epoch time format, in milliseconds. For an auto-renewable subscription, this value indicates the date of the subscription's initial purchase. The original purchase date applies to all product types and remains the same in all transactions for the same product ID. This value corresponds to the original transaction’s transactionDate property in StoreKit. Use this time format for processing dates.
   */
  original_purchase_date_ms: string;

  /**
   * The time of the original in-app purchase, in the Pacific Time zone.
   */
  original_purchase_date_pst: string;

  /**
   * The transaction identifier of the original purchase. See original_transaction_id for more information.
   */
  original_transaction_id: string;

  /**
   * The unique identifier of the product purchased. You provide this value when creating the product in App Store Connect, and it corresponds to the productIdentifier property of the SKPayment object stored in the transaction's payment property.
   */
  product_id: string;

  /**
   * The identifier of the subscription offer redeemed by the user. See promotional_offer_id for more information.
   */
  promotional_offer_id: string;

  /**
   * The time the App Store charged the user's account for a purchased or restored product, or the time the App Store charged the user’s account for a subscription purchase or renewal after a lapse, in a date-time format similar to ISO 8601.
   */
  purchase_date: string;

  /**
   * For consumable, non-consumable, and non-renewing subscription products, the time the App Store charged the user's account for a purchased or restored product, in the UNIX epoch time format, in milliseconds. For auto-renewable subscriptions, the time the App Store charged the user’s account for a subscription purchase or renewal after a lapse, in the UNIX epoch time format, in milliseconds. Use this time format for processing dates.
   */
  purchase_date_ms: string;

  /**
   * The time the App Store charged the user's account for a purchased or restored product, or the time the App Store charged the user’s account for a subscription purchase or renewal after a lapse, in the Pacific Time zone.
   */
  purchase_date_pst: string;

  /**
   * The number of consumable products purchased. This value corresponds to the quantity property of the SKPayment object stored in the transaction's payment property. The value is usually “1” unless modified with a mutable payment. The maximum value is 10.
   */
  quantity: string;

  /**
   * A unique identifier for a transaction such as a purchase, restore, or renewal. See transaction_id for more information.
   */
  transaction_id: string;

  /**
   * A unique identifier for purchase events across devices, including subscription-renewal events. This value is the primary key for identifying subscription purchases.
   */
  web_order_line_item_id: string;
}

interface Receipt {
  /**
   * See app_item_id.
   */
  adam_id: number;

  /**
   * Generated by App Store Connect and used by the App Store to uniquely identify the app purchased. Apps are assigned this identifier only in production. Treat this value as a 64-bit long integer.
   */
  app_item_id: number;

  /**
   * The app’s version number. The app's version number corresponds to the value of CFBundleVersion (in iOS) or CFBundleShortVersionString (in macOS) in the Info.plist. In production, this value is the current version of the app on the device based on the receipt_creation_date_ms. In the sandbox, the value is always "1.0".
   */
  application_version: string;

  /**
   * The bundle identifier for the app to which the receipt belongs. You provide this string on App Store Connect. This corresponds to the value of CFBundleIdentifier in the Info.plist file of the app.
   */
  bundle_id: string;

  /**
   * A unique identifier for the app download transaction.
   */
  download_id: number;

  /**
   * The time the receipt expires for apps purchased through the Volume Purchase Program, in a date-time format similar to the ISO 8601.
   */
  expiration_date: string;

  /**
   * The time the receipt expires for apps purchased through the Volume Purchase Program, in UNIX epoch time format, in milliseconds. If this key is not present for apps purchased through the Volume Purchase Program, the receipt does not expire. Use this time format for processing dates.
   */
  expiration_date_ms: string;

  /**
   * The time the receipt expires for apps purchased through the Volume Purchase Program, in the Pacific Time zone.
   */
  expiration_date_pst: string;

  /**
   * An array that contains the in-app purchase receipt fields for all in-app purchase transactions.
   */
  in_app: InApp[];

  /**
   * The version of the app that the user originally purchased. This value does not change, and corresponds to the value of CFBundleVersion (in iOS) or CFBundleShortVersionString (in macOS) in the Info.plist file of the original purchase. In the sandbox environment, the value is always "1.0".
   */
  original_application_version: string;

  /**
   * The time of the original app purchase, in a date-time format similar to ISO 8601.
   */
  original_purchase_date: string;

  /**
   * The time of the original app purchase, in UNIX epoch time format, in milliseconds. Use this time format for processing dates.
   */
  original_purchase_date_ms: string;

  /**
   * The time of the original app purchase, in the Pacific Time zone.
   */
  original_purchase_date_pst: string;

  /**
   * The time the user ordered the app available for pre-order, in a date-time format similar to ISO 8601.
   */
  preorder_date: string;

  /**
   * The time the user ordered the app available for pre-order, in UNIX epoch time format, in milliseconds. This field is only present if the user pre-orders the app. Use this time format for processing dates.
   */
  preorder_date_ms: string;

  /**
   * The time the user ordered the app available for pre-order, in the Pacific Time zone.
   */
  preorder_date_pst: string;

  /**
   * The time the App Store generated the receipt, in a date-time format similar to ISO 8601.
   */
  receipt_creation_date: string;

  /**
   * The time the App Store generated the receipt, in UNIX epoch time format, in milliseconds. Use this time format for processing dates. This value does not change.
   */
  receipt_creation_date_ms: string;

  /**
   * The time the App Store generated the receipt, in the Pacific Time zone.
   */
  receipt_creation_date_pst: string;

  /**
   * The type of receipt generated. The value corresponds to the environment in which the app or VPP purchase was made.
   */
  receipt_type: 'Production' | 'ProductionVPP' | 'ProductionSandbox' | 'ProductionVPPSandbox';

  /**
   * The time the request to the verifyReceipt endpoint was processed and the response was generated, in a date-time format similar to ISO 8601.
   */
  request_date: string;

  /**
   * The time the request to the verifyReceipt endpoint was processed and the response was generated, in UNIX epoch time format, in milliseconds. Use this time format for processing dates.
   */
  request_date_ms: string;

  /**
   * The time the request to the verifyReceipt endpoint was processed and the response was generated, in the Pacific Time zone.
   */
  request_date_pst: string;

  /**
   * An arbitrary number that identifies a revision of your app. In the sandbox, this key's value is “0”.
   */
  version_external_identifier: number;
}

export interface VerifyReceiptResponse {
  /**
   * The environment for which the receipt was generated.
   */
  environment: Environnement;

  /**
   * An indicator that an error occurred during the request. A value of 1 indicates a temporary issue; retry validation for this receipt at a later time. A value of 0 indicates an unresolvable issue; do not retry validation for this receipt. Only applicable to status codes 21100-21199.
   */
  'is-retryable'?: boolean;

  /**
   * The latest Base64 encoded app receipt. Only returned for receipts that contain auto-renewable subscriptions.
   */
  latest_receipt?: string;

  /**
   * An array that contains all in-app purchase transactions. This excludes transactions for consumable products that have been marked as finished by your app. Only returned for receipts that contain auto-renewable subscriptions.
   */
  latest_receipt_info?: LatestReceiptInfo[];

  /**
   * In the JSON file, an array where each element contains the pending renewal information for each auto-renewable subscription identified by the product_id. Only returned for app receipts that contain auto-renewable subscriptions.
   */
  pending_renewal_info?: PendingRenewalInfo[];

  /**
   * A JSON representation of the receipt that was sent for verification.
   */
  receipt: Receipt;

  /**
   * Either 0 if the receipt is valid, or a status code if there is an error. The status code reflects the status of the app receipt as a whole. See status for possible status codes and descriptions.
   */
  status: keyof typeof errors | ValidReceipt;
}

export interface Config {
  /**
   * Define the environnement to use to connect to Apple endpoint.
   * @default Environnement.PRODUCTION
   */
  environnement?: Environnement;

  /**
   * Your app’s shared secret, which is a hexadecimal string. For more information about the shared secret, see [Generate a Receipt Validation Code](@link https://help.apple.com/app-store-connect/#/devf341c0f01).
   */
  password: string;

  /**
   * Set this value to true for the response to include only the latest renewal transaction for any subscriptions. Use this field only for app receipts that contain auto-renewable subscriptions.
   * @default true
   */
  excludeOldTransactions?: boolean;
}

export interface RequestBody {
  transactionReceipt: string;
}
