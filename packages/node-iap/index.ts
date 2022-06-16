import { Environment as AppleEnvironment } from '@jeremybarbet/apple-api-types';
import {
  AcknowledgePurchaseOrSubscription as GoogleAcknowledgePurchaseOrSubscription,
  ProductPurchase as GoogleProductPurchase,
  SubscriptionPurchase as GoogleSubscriptionPurchase,
} from '@jeremybarbet/google-api-types';

import {
  Config as AppleConfig,
  DataResponse as AppleDataResponse,
  RequestBody as AppleRequestBody,
  StatusResponse as AppleStatusResponse,
  verify as verifyAppleReceipt,
  VerifyResponse as AppleVerifyResponse,
} from './src/apple';
import {
  Config as GoogleConfig,
  DataResponse as GoogleDataResponse,
  RequestBody as GoogleRequestBody,
  StatusResponse as GoogleStatusResponse,
  verify as verifyGoogleReceipt,
  VerifyResponse as GoogleVerifyResponse,
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
