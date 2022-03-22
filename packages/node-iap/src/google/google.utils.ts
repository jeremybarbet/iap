import { ReceiptRequestBody, SubscriptionReceipt } from './google.interface';

export const isGoogleSubscriptionReceipt = (requestBody: ReceiptRequestBody): requestBody is SubscriptionReceipt => {
  return (requestBody as SubscriptionReceipt).subscriptionId !== undefined;
};
