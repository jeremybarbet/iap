import { VerifyReceiptResponse } from './apple.interface';

export type SuccessStatus = keyof typeof successes;
export type ErrorStatus = keyof typeof errors;

const inRange = (x: number, min: number, max: number) => (x - min) * (x - max) <= 0;

const successes = {
  0: 'The receipt is valid.',
};

export const errors = {
  21000: 'The request to the App Store was not made using the HTTP POST request method.',
  21001: 'This status code is no longer sent by the App Store.',
  21002: 'The data in the receipt-data property was malformed or the service experienced a temporary issue. Try again.',
  21003: 'The receipt could not be authenticated.',
  21004: 'The shared secret you provided does not match the shared secret on file for your account.',
  21005: 'The receipt server was temporarily unable to provide the receipt. Try again.',
  21006: `This receipt is valid but the subscription has expired. When this status code is returned to your server, the receipt data is also decoded and returned as part of the response. Only returned for iOS 6-style transaction receipts for auto-renewable subscriptions.`,
  21007: 'This receipt is from the test environment, but it was sent to the production environment for verification.',
  21008: 'This receipt is from the production environment, but it was sent to the test environment for verification.',
  21009: 'Internal data access error. Try again later.',
  21010: 'The user account cannot be found or has been deleted.',
};

const internalDataAccessErrors = [21100, 21199];

export const handleResponse = (data: VerifyReceiptResponse) => {
  if (successes?.[data.status as SuccessStatus]) {
    return {
      valid: true,
      data,
      message: undefined,
      status: data.status,
    };
  }

  if (inRange(data.status, internalDataAccessErrors[0], internalDataAccessErrors[1])) {
    return {
      valid: false,
      data: undefined,
      message: 'Internal data access error. Try again later.',
      status: data.status,
    };
  }

  return {
    valid: false,
    data: undefined,
    message: errors?.[data.status as ErrorStatus],
    status: data.status,
  };
};
