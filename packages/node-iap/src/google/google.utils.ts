import { SubscriptionReceipt, VerifyReceiptRequestBody } from './google.interface';

export const isGoogleSubscriptionReceipt = (
  requestBody: VerifyReceiptRequestBody,
): requestBody is SubscriptionReceipt => {
  return (requestBody as SubscriptionReceipt).subscriptionId !== undefined;
};
