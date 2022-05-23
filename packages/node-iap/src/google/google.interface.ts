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
}

interface BodyWithoutAcknowledge {
  /**
   * To acknowledge a product/subscription purchase.
   *
   * @default false
   */
  acknowledge?: false;

  /**
   * The acknowledge endpoint return an empty response.
   * This boolean forces a get request to return purchase's information.
   *
   * @default false
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

type BodyConditional = BodyWithAcknowledge | BodyWithoutAcknowledge;

export type SubscriptionReceipt = BodyBase &
  BodyConditional & {
    /**
     * The purchased subscription ID (for example, 'monthly001').
     */
    subscriptionId: string;
  };

export type ProductReceipt = BodyBase &
  BodyConditional & {
    /**
     * The inapp product SKU (for example, 'com.some.thing.inapp1').
     */
    productId: string;
  };

export type VerifyReceiptRequestBody = SubscriptionReceipt | ProductReceipt;

interface IntroductoryPriceInfo {
  /**
   * ISO 4217 currency code for the introductory subscription price. For example, if the price is specified in British pounds sterling, priceCurrencyCode is "GBP".
   */
  introductoryPriceCurrencyCode: string;

  /**
   * Introductory price of the subscription, not including tax. The currency is the same as priceCurrencyCode. Price is expressed in micro-units, where 1,000,000 micro-units represents one unit of the currency. For example, if the subscription price is €1.99, priceAmountMicros is 1990000.
   */
  introductoryPriceAmountMicros: string;

  /**
   * Introductory price period, specified in ISO 8601 format. Common values are (but not limited to) "P1W" (one week), "P1M" (one month), "P3M" (three months), "P6M" (six months), and "P1Y" (one year).
   */
  introductoryPricePeriod: string;

  /**
   * The number of billing period to offer introductory pricing.
   */
  introductoryPriceCycles: number;
}

interface SubscriptionCancelSurveyResult {
  /**
   * The cancellation reason the user chose in the survey. Possible values are: 0. Other 1. I don't use this service enough 2. Technical issues 3. Cost-related reasons 4. I found a better app
   */
  cancelSurveyReason: number;

  /**
   * The customized input cancel reason from the user. Only present when cancelReason is 0.
   */
  userInputCancelReason: string;
}

interface Price {
  /**
   * Price in 1/million of the currency base unit, represented as a string.
   */
  priceMicros: string;

  /**
   * 3 letter Currency code, as defined by ISO 4217. See java/com/google/common/money/CurrencyCode.java
   */
  currency: string;
}

interface SubscriptionPriceChange {
  /**
   * The new price the subscription will renew with if the price change is accepted by the user.
   */
  newPrice: Price;

  /**
   * The current state of the price change. Possible values are: 0. Outstanding: State for a pending price change waiting for the user to agree. In this state, you can optionally seek confirmation from the user using the In-App API. 1. Accepted: State for an accepted price change that the subscription will renew with unless it's canceled. The price change takes effect on a future date when the subscription renews. Note that the change might not occur when the subscription is renewed next.
   */
  state: number;
}

export interface VerifyGetReceiptResponse {
  /**
   * This kind represents a subscriptionPurchase object in the androidpublisher service.
   */
  kind: string;

  /**
   * Time at which the subscription was granted, in milliseconds since the Epoch.
   */
  startTimeMillis: string;

  /**
   * Time at which the subscription will expire, in milliseconds since the Epoch.
   */
  expiryTimeMillis: string;

  /**
   * Time at which the subscription will be automatically resumed, in milliseconds since the Epoch. Only present if the user has requested to pause the subscription.
   */
  autoResumeTimeMillis: string;

  /**
   * Whether the subscription will automatically be renewed when it reaches its current expiry time.
   */
  autoRenewing: boolean;

  /**
   * ISO 4217 currency code for the subscription price. For example, if the price is specified in British pounds sterling, priceCurrencyCode is "GBP".
   */
  priceCurrencyCode: string;

  /**
   * Price of the subscription, For tax exclusive countries, the price doesn't include tax. For tax inclusive countries, the price includes tax. Price is expressed in micro-units, where 1,000,000 micro-units represents one unit of the currency. For example, if the subscription price is €1.99, priceAmountMicros is 1990000.
   */
  priceAmountMicros: string;

  /**
   * Introductory price information of the subscription. This is only present when the subscription was purchased with an introductory price.
   * This field does not indicate the subscription is currently in introductory price period.
   */
  introductoryPriceInfo: IntroductoryPriceInfo;

  /**
   * ISO 3166-1 alpha-2 billing country/region code of the user at the time the subscription was granted.
   */
  countryCode: string;

  /**
   * A developer-specified string that contains supplemental information about an order.
   */
  developerPayload: string;

  /**
   * The payment state of the subscription. Possible values are: 0. Payment pending 1. Payment received 2. Free trial 3. Pending deferred upgrade/downgrade
   * Not present for canceled, expired subscriptions.
   */
  paymentState: number;

  /**
   * The reason why a subscription was canceled or is not auto-renewing. Possible values are: 0. User canceled the subscription 1. Subscription was canceled by the system, for example because of a billing problem 2. Subscription was replaced with a new subscription 3. Subscription was canceled by the developer
   */
  cancelReason: number;

  /**
   * The time at which the subscription was canceled by the user, in milliseconds since the epoch. Only present if cancelReason is 0.
   */
  userCancellationTimeMillis: string;

  /**
   * Information provided by the user when they complete the subscription cancellation flow (cancellation reason survey).
   */
  cancelSurveyResult: SubscriptionCancelSurveyResult;

  /**
   * The order id of the latest recurring order associated with the purchase of the subscription. If the subscription was canceled because payment was declined, this will be the order id from the payment declined order.
   */
  orderId: string;

  /**
   * The purchase token of the originating purchase if this subscription is one of the following: 0. Re-signup of a canceled but non-lapsed subscription 1. Upgrade/downgrade from a previous subscription
   * For example, suppose a user originally signs up and you receive purchase token X, then the user cancels and goes through the resignup flow (before their subscription lapses) and you receive purchase token Y, and finally the user upgrades their subscription and you receive purchase token Z. If you call this API with purchase token Z, this field will be set to Y. If you call this API with purchase token Y, this field will be set to X. If you call this API with purchase token X, this field will not be set.
   */
  linkedPurchaseToken: string;

  /**
   * The type of purchase of the subscription. This field is only set if this purchase was not made using the standard in-app billing flow. Possible values are: 0. Test (i.e. purchased from a license testing account) 1. Promo (i.e. purchased using a promo code)
   */
  purchaseType: number;

  /**
   * The latest price change information available. This is present only when there is an upcoming price change for the subscription yet to be applied.
   * Once the subscription renews with the new price or the subscription is canceled, no price change information will be returned.
   */
  priceChange: SubscriptionPriceChange;

  /**
   * The profile name of the user when the subscription was purchased. Only present for purchases made with 'Subscribe with Google'.
   */
  profileName: string;

  /**
   * The email address of the user when the subscription was purchased. Only present for purchases made with 'Subscribe with Google'.
   */
  emailAddress: string;

  /**
   * The given name of the user when the subscription was purchased. Only present for purchases made with 'Subscribe with Google'.
   */
  givenName: string;

  /**
   * The family name of the user when the subscription was purchased. Only present for purchases made with 'Subscribe with Google'.
   */
  familyName: string;

  /**
   * The Google profile id of the user when the subscription was purchased. Only present for purchases made with 'Subscribe with Google'.
   */
  profileId: string;

  /**
   * The acknowledgement state of the subscription product. Possible values are: 0. Yet to be acknowledged 1. Acknowledged
   */
  acknowledgementState: number;

  /**
   * User account identifier in the third-party service. Only present if account linking happened as part of the subscription purchase flow.
   */
  externalAccountId: string;

  /**
   * The type of promotion applied on this purchase. This field is only set if a promotion is applied when the subscription was purchased. Possible values are: 0. One time code 1. Vanity code
   */
  promotionType: number;

  /**
   * The promotion code applied on this purchase. This field is only set if a vanity code promotion is applied when the subscription was purchased.
   */
  promotionCode: string;

  /**
   * An obfuscated version of the id that is uniquely associated with the user's account in your app. Present for the following purchases: * If account linking happened as part of the subscription purchase flow. * It was specified using https://developer.android.com/reference/com/android/billingclient/api/BillingFlowParams.Builder#setobfuscatedaccountid when the purchase was made.
   */
  obfuscatedExternalAccountId: string;

  /**
   * An obfuscated version of the id that is uniquely associated with the user's profile in your app. Only present if specified using https://developer.android.com/reference/com/android/billingclient/api/BillingFlowParams.Builder#setobfuscatedprofileid when the purchase was made.
   */
  obfuscatedExternalProfileId: string;
}

export type VerifyAcknowledgeReceiptResponse = object;

export type DataResponse = VerifyGetReceiptResponse | VerifyAcknowledgeReceiptResponse;

export type StatusResponse = number;
