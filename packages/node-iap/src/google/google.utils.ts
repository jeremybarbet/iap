import { endpoints } from './google.constants';
import { SubscriptionReceipt, VerifyReceiptRequestBody } from './google.interface';

const isGoogleSubscriptionReceipt = (requestBody: VerifyReceiptRequestBody): requestBody is SubscriptionReceipt => {
  return (requestBody as SubscriptionReceipt).subscriptionId !== undefined;
};

const replaceInUrl = (url: string, extraReplace: [string, string], { packageName, token }: VerifyReceiptRequestBody) =>
  url
    .replace(...extraReplace)
    .replace('{packageName}', packageName)
    .replace('{token}', token);

export const buildEndpoint = (requestBody: VerifyReceiptRequestBody) => {
  if (isGoogleSubscriptionReceipt(requestBody)) {
    return {
      acknowledge: replaceInUrl(
        endpoints.products.acknowledge,
        ['{subscriptionId}', requestBody.subscriptionId],
        requestBody,
      ),
      get: replaceInUrl(endpoints.products.get, ['{subscriptionId}', requestBody.subscriptionId], requestBody),
    };
  }

  return {
    acknowledge: replaceInUrl(endpoints.products.acknowledge, ['{productId}', requestBody.productId], requestBody),
    get: replaceInUrl(endpoints.products.get, ['{productId}', requestBody.productId], requestBody),
  };
};
