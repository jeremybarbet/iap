import { JWT } from 'google-auth-library';

import { ErrorResponse } from '../types/common';

import { Config, VerifyReceiptRequestBody } from './google.interface';
import { isGoogleSubscriptionReceipt } from './google.utils';

const endpoints = {
  products: {
    acknowledge:
      'https://androidpublisher.googleapis.com/androidpublisher/v3/applications/{packageName}/purchases/products/{productId}/tokens/{token}:acknowledge',
    get: 'https://androidpublisher.googleapis.com/androidpublisher/v3/applications/{packageName}/purchases/products/{productId}/tokens/{token}',
  },

  subscriptions: {
    acknowledge:
      'https://androidpublisher.googleapis.com/androidpublisher/v3/applications/{packageName}/purchases/subscriptions/{subscriptionId}/tokens/{token}:acknowledge',
    get: 'https://androidpublisher.googleapis.com/androidpublisher/v3/applications/{packageName}/purchases/subscriptions/{subscriptionId}/tokens/{token}',
  },
};

const buildUrl = (requestBody: VerifyReceiptRequestBody) => {
  const path = requestBody.acknowledge ? 'acknowledge' : 'get';

  const baseUrl = isGoogleSubscriptionReceipt(requestBody)
    ? endpoints.subscriptions[path].replace('{subscriptionId}', requestBody.subscriptionId)
    : endpoints.products[path].replace('{productId}', requestBody.productId);

  return baseUrl.replace('{packageName}', requestBody.packageName).replace('{token}', requestBody.token);
};

export const verify = async (requestBody: VerifyReceiptRequestBody, config: Config) => {
  const { acknowledge = false } = requestBody;

  const client = new JWT({
    email: config.clientEmail,
    key: config.privateKey,
    scopes: ['https://www.googleapis.com/auth/androidpublisher'],
  });

  const url = buildUrl({ ...requestBody, acknowledge });

  try {
    const { data, status } = await client.request({
      method: acknowledge ? 'POST' : 'GET',
      url,
    });

    if (status === 410) {
      /**
       * https://stackoverflow.com/questions/45688494/google-android-publisher-api-responds-with-410-purchasetokennolongervalid-erro
       */
      return {
        valid: false,
        data: undefined,
        message: 'Receipt no longer valid.',
        status,
      };
    }

    if (status > 399) {
      return {
        valid: false,
        data: undefined,
        message: 'An error happened.',
        status,
      };
    }

    return {
      valid: true,
      data,
      message: undefined,
      status,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An error happened.';
    const status = (error as ErrorResponse)?.response?.status ?? 500;

    return {
      valid: false,
      data: undefined,
      message,
      status,
    };
  }
};
