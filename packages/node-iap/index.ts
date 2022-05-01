import { AppleConfig, AppleRequestBody, appleVerify } from './src/apple';
import { GoogleConfig, googleVerify, GoogleVerifyReceiptRequestBody } from './src/google';

export { type AppleConfig, type AppleRequestBody, type GoogleConfig, type GoogleVerifyReceiptRequestBody };

export const verifyAppleReceipt = async (requestBody: AppleRequestBody, config: AppleConfig) =>
  await appleVerify(requestBody, config);

export const verifyGoogleReceipt = async (requestBody: GoogleVerifyReceiptRequestBody, config: GoogleConfig) =>
  await googleVerify(requestBody, config);
