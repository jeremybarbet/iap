import { AppleConfig, AppleRequestBody, appleVerify } from './src/apple';
import {
  GoogleConfig,
  googleGet,
  GoogleReceiptRequestBody,
  googleVerify,
  GoogleVerifyReceiptRequestBody,
} from './src/google';

export {
  type AppleConfig,
  type AppleRequestBody,
  type GoogleConfig,
  type GoogleReceiptRequestBody,
  type GoogleVerifyReceiptRequestBody,
};

export enum Validation {
  SUCCESS = 0,
  FAILURE = 1,
  POSSIBLE_HACK = 2,
}

export const verifyAppleReceipt = async (requestBody: AppleRequestBody, config: AppleConfig) =>
  await appleVerify(requestBody, config);

export const googleReceipt = async (requestBody: GoogleReceiptRequestBody, config: GoogleConfig) =>
  await googleGet(requestBody, config);

export const verifyGoogleReceipt = async (requestBody: GoogleVerifyReceiptRequestBody, config: GoogleConfig) =>
  await googleVerify(requestBody, config);
