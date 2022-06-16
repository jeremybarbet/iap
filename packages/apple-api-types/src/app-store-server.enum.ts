/**
 * @link https://developer.apple.com/documentation/appstoreservernotifications/notificationtype
 */
export enum NotificationType {
  ConsumptionRequest = 'CONSUMPTION_REQUEST',
  DidChangeRenewalPref = 'DID_CHANGE_RENEWAL_PREF',
  DidChangeRenewalStatus = 'DID_CHANGE_RENEWAL_STATUS',
  DidFailToRenew = 'DID_FAIL_TO_RENEW',
  DidRenew = 'DID_RENEW',
  Expired = 'EXPIRED',
  GracePeriodExpired = 'GRACE_PERIOD_EXPIRED',
  OfferRedeemed = 'OFFER_REDEEMED',
  PriceIncrease = 'PRICE_INCREASE',
  Refund = 'REFUND',
  RefundDeclined = 'REFUND_DECLINED',
  RenewalExtended = 'RENEWAL_EXTENDED',
  Revoke = 'REVOKE',
  Subscribed = 'SUBSCRIBED',
}

/**
 * @link https://developer.apple.com/documentation/appstoreservernotifications/subtype
 */
export enum NotificationSubtype {
  InitialBuy = 'INITIAL_BUY',
  Resubscribe = 'RESUBSCRIBE',
  Downgrade = 'DOWNGRADE',
  Upgrade = 'UPGRADE',
  AutoRenewEnabled = 'AUTO_RENEW_ENABLED',
  AutoRenewDisabled = 'AUTO_RENEW_DISABLED',
  Voluntary = 'VOLUNTARY',
  BillingRetry = 'BILLING_RETRY',
  PriceIncrease = 'PRICE_INCREASE',
  GracePeriod = 'GRACE_PERIOD',
  BillingRecovery = 'BILLING_RECOVERY',
  Pending = 'PENDING',
  Accepted = 'ACCEPTED',
}

/**
 * @link https://developer.apple.com/documentation/appstoreserverapi/inappownershiptype
 */
export enum InAppOwnershipType {
  Purchased = 'PURCHASED',
  FamilyShared = 'FAMILY_SHARED',
}

// https://developer.apple.com/documentation/appstoreserverapi/type
export enum Type {
  AutoRenewableSubscription = 'Auto-Renewable Subscription',
  NonConsumable = 'Non-Consumable',
  Consumable = 'Consumable',
  NonRenewingSubscription = 'Non-Renewing Subscription',
}

/**
 * @link https://developer.apple.com/documentation/appstoreserverapi/orderlookupstatus
 */
export enum OrderLookupStatus {
  Valid = 0,
  Invalid = 1,
}

/**
 * @link https://developer.apple.com/documentation/appstoreserverapi/autorenewstatus
 */
export enum AutoRenewStatus {
  Off = 0,
  On = 1,
}

/**
 * @link https://developer.apple.com/documentation/appstoreserverapi/expirationintent
 */
export enum ExpirationIntent {
  Canceled = 1,
  BillingError = 2,
  RejectedPriceIncrease = 3,
  ProductUnavailable = 4,
}

/**
 * @link https://developer.apple.com/documentation/appstoreserverapi/offertype
 */
export enum OfferType {
  Introductory = 1,
  Promotional = 2,
  SubscriptionOfferCode = 3,
}

/**
 * @link https://developer.apple.com/documentation/appstoreserverapi/priceincreasestatus
 */
export enum PriceIncreaseStatus {
  NoResponse = 0,
  Consented = 1,
}

/**
 * @link https://developer.apple.com/documentation/appstoreserverapi/status
 */
export enum SubscriptionStatus {
  Active = 1,
  Expired = 2,
  InBillingRetry = 3,
  InBillingGracePeriod = 4,
  Revoked = 5,
}
