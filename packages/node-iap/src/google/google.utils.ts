import { endpoints } from './google.constants';
import { RequestBody } from './google-config.interface';

const replaceInUrl = (url: string, extraReplace: [string, string], { packageName, token }: RequestBody) =>
  url
    .replace(...extraReplace)
    .replace('{packageName}', packageName)
    .replace('{token}', token);

export const buildEndpoint = (requestBody: RequestBody) => {
  if ('subscriptionId' in requestBody) {
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
