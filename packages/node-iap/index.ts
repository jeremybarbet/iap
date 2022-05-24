import {
  Config as AppleConfig,
  DataResponse as AppleDataResponse,
  Environnement as AppleEnvironnement,
  RequestBody as AppleRequestBody,
  StatusResponse as AppleStatusResponse,
  verify as appleVerify,
  VerifyReceiptResponse as AppleVerifyReceiptResponse,
  VerifyResponse as AppleVerifyResponse,
} from './src/apple';
import {
  Config as GoogleConfig,
  DataResponse as GoogleDataResponse,
  ProductReceipt as GoogleProductReceipt,
  RequestBody as GoogleRequestBody,
  StatusResponse as GoogleStatusResponse,
  SubscriptionReceipt as GoogleSubscriptionReceipt,
  verify as googleVerify,
  VerifyResponse as GoogleVerifyResponse,
} from './src/google';

export {
  type AppleConfig,
  type AppleDataResponse,
  AppleEnvironnement,
  type AppleRequestBody,
  type AppleStatusResponse,
  type AppleVerifyReceiptResponse,
  type AppleVerifyResponse,
  type GoogleConfig,
  type GoogleDataResponse,
  type GoogleProductReceipt,
  type GoogleStatusResponse,
  type GoogleSubscriptionReceipt,
  type GoogleVerifyReceiptRequestBody,
  type GoogleVerifyResponse,
};

export const verifyAppleReceipt = async (requestBody: AppleRequestBody, config: AppleConfig) =>
  await appleVerify(requestBody, config);

export const verifyGoogleReceipt = async (requestBody: GoogleRequestBody, config: GoogleConfig) =>
  await googleVerify(requestBody, config);
