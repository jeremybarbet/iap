import {
  AppleConfig,
  AppleEnvironnement,
  AppleRequestBody,
  appleVerify,
  AppleVerifyReceiptResponse,
} from './src/apple';
import {
  GoogleConfig,
  GoogleProductReceipt,
  GoogleSubscriptionReceipt,
  googleVerify,
  GoogleVerifyReceiptRequestBody,
} from './src/google';

export {
  AppleEnvironnement,
  type AppleConfig,
  type AppleRequestBody,
  type AppleVerifyReceiptResponse,
  type GoogleConfig,
  type GoogleProductReceipt,
  type GoogleSubscriptionReceipt,
  type GoogleVerifyReceiptRequestBody,
};

export const verifyAppleReceipt = async (requestBody: AppleRequestBody, config: AppleConfig) =>
  await appleVerify(requestBody, config);

export const verifyGoogleReceipt = async (requestBody: GoogleVerifyReceiptRequestBody, config: GoogleConfig) =>
  await googleVerify(requestBody, config);
