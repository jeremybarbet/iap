import { JWT } from 'google-auth-library';

import { ErrorResponse } from '../types/common';

import { AcknowledgePurchaseOrSubscription, ProductPurchase, SubscriptionPurchase } from './google.interface';
import { buildEndpoint } from './google.utils';
import { Config, RequestBody, VerifyResponse } from './google-config.interface';

const getResource = async <T = SubscriptionPurchase | ProductPurchase>(url: string, client: JWT) => {
  const { data: resource } = await client.request<T>({
    method: 'GET',
    url,
  });

  return resource;
};

export const verify = async (requestBody: RequestBody, config: Config): Promise<VerifyResponse> => {
  // Default to false if undefined
  requestBody.acknowledge = requestBody?.acknowledge ?? false;

  const client = new JWT({
    email: config.clientEmail,
    key: config.privateKey,
    scopes: ['https://www.googleapis.com/auth/androidpublisher'],
  });

  const { acknowledge, get } = buildEndpoint(requestBody);

  try {
    const response = await client.request<
      typeof requestBody['acknowledge'] extends true ? AcknowledgePurchaseOrSubscription : (SubscriptionPurchase | ProductPurchase)
    >({
      method: requestBody.acknowledge ? 'POST' : 'GET',
      url: requestBody.acknowledge ? acknowledge : get,
    });

    let data: AcknowledgePurchaseOrSubscription | (SubscriptionPurchase | ProductPurchase) = requestBody.acknowledge
      ? {}
      : response.data;

    if (requestBody.acknowledge && requestBody.fetchResource) {
      data = await getResource(get, client);
    }

    /**
     * https://stackoverflow.com/questions/45688494/google-android-publisher-api-responds-with-410-purchasetokennolongervalid-erro
     */
    if (response.status === 410) {
      return {
        valid: false,
        data,
        message: 'Receipt no longer valid.',
        status: response.status,
      };
    }

    if (response.status > 399) {
      return {
        valid: false,
        data,
        message: 'An error happened.',
        status: response.status,
      };
    }

    return {
      valid: true,
      data,
      message: undefined,
      status: response.status,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An error happened.';
    const status = (error as ErrorResponse)?.response?.status ?? 500;

    let data: VerifyAcknowledgeReceiptResponse | VerifyGetReceiptResponse | undefined = requestBody.acknowledge
      ? {}
      : undefined;

    if (requestBody.acknowledge && requestBody.fetchResource) {
      data = await getResource(get, client);
    }

    return {
      valid: false,
      data,
      message,
      status,
    };
  }
};
