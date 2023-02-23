import { Environment as AppleEnvironment } from '@jeremybarbet/apple-api-types';
import {
  type AcknowledgePurchaseOrSubscription as GoogleAcknowledgePurchaseOrSubscription,
  type ProductPurchase as GoogleProductPurchase,
  type SubscriptionPurchase as GoogleSubscriptionPurchase,
} from '@jeremybarbet/google-api-types';

import {
  type Config as AppleConfig,
  type DataResponse as AppleDataResponse,
  type RequestBody as AppleRequestBody,
  type StatusResponse as AppleStatusResponse,
  type VerifyResponse as AppleVerifyResponse,
  verify as verifyAppleReceipt,
} from './src/apple';
import {
  type Config as GoogleConfig,
  type DataResponse as GoogleDataResponse,
  type RequestBody as GoogleRequestBody,
  type StatusResponse as GoogleStatusResponse,
  type VerifyResponse as GoogleVerifyResponse,
  verify as verifyGoogleReceipt,
} from './src/google';

export {
  type AppleConfig,
  type AppleDataResponse,
  AppleEnvironment,
  type AppleRequestBody,
  type AppleStatusResponse,
  verifyAppleReceipt,
  type AppleVerifyResponse,
  type GoogleAcknowledgePurchaseOrSubscription,
  type GoogleConfig,
  type GoogleDataResponse,
  type GoogleProductPurchase,
  type GoogleRequestBody,
  type GoogleStatusResponse,
  type GoogleSubscriptionPurchase,
  verifyGoogleReceipt,
  type GoogleVerifyResponse,
};
