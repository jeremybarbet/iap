import { RequestBody } from './config.interface';
import { endpoints } from './google.constants';

const replaceInUrl = (url: string, extraReplace: [string, string], { packageName, token }: RequestBody) =>
  url
    .replace(...extraReplace)
    .replace('{packageName}', packageName)
    .replace('{token}', token);

export const buildEndpoint = (requestBody: RequestBody) => {
  if ('subscriptionId' in requestBody) {
    return {
      acknowledge: replaceInUrl(
        endpoints.subscriptions.acknowledge,
        ['{subscriptionId}', requestBody.subscriptionId],
        requestBody,
      ),
      get: replaceInUrl(endpoints.subscriptions.get, ['{subscriptionId}', requestBody.subscriptionId], requestBody),
    };
  }

  return {
    acknowledge: replaceInUrl(endpoints.products.acknowledge, ['{productId}', requestBody.productId], requestBody),
    get: replaceInUrl(endpoints.products.get, ['{productId}', requestBody.productId], requestBody),
  };
};
