import { JWT } from 'google-auth-library';

import { Validation } from '../../index';

import { Config, ReceiptRequestBody, VerifyReceiptRequestBody } from './google.interface';
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
    cancel: null,
    defer: null,
    get: 'https://androidpublisher.googleapis.com/androidpublisher/v3/applications/{packageName}/purchases/subscriptions/{subscriptionId}/tokens/{token}',
    refund: null,
    revoke: null,
  },
};

const buildGetUrl = (requestBody: ReceiptRequestBody) => {
  const baseUrl = isGoogleSubscriptionReceipt(requestBody)
    ? endpoints.subscriptions.get.replace('{subscriptionId}', requestBody.subscriptionId)
    : endpoints.products.get.replace('{productId}', requestBody.productId);

  return baseUrl.replace('{packageName}', requestBody.packageName).replace('{token}', requestBody.token);
};

const buildPostUrl = (requestBody: VerifyReceiptRequestBody) => {
  const baseUrl = isGoogleSubscriptionReceipt(requestBody)
    ? endpoints.subscriptions.acknowledge.replace('{subscriptionId}', requestBody.subscriptionId)
    : endpoints.products.acknowledge.replace('{productId}', requestBody.productId);

  return baseUrl.replace('{packageName}', requestBody.packageName).replace('{token}', requestBody.token);
};

export const get = async (requestBody: ReceiptRequestBody, config: Config) => {
  const client = new JWT({
    email: config.clientEmail,
    key: config.privateKey,
    scopes: ['https://www.googleapis.com/auth/androidpublisher'],
  });

  const url = buildGetUrl(requestBody);

  try {
    const { data, status } = await client.request({
      method: 'GET',
      url,
    });

    console.log('-data', data);
    console.log('-status', status);
  } catch (error) {
    throw {
      success: Validation.FAILURE,
      message: '',
    };
  }
};

export const verify = async (requestBody: VerifyReceiptRequestBody, config: Config) => {
  const client = new JWT({
    email: config.clientEmail,
    key: config.privateKey,
    scopes: ['https://www.googleapis.com/auth/androidpublisher'],
  });

  const url = buildPostUrl(requestBody);

  try {
    const { data, status } = await client.request({
      method: 'POST',
      url,
      body: {
        developerPayload: requestBody.developerPayload,
      },
    });

    console.log('-data', data);

    if (status === 410) {
      /**
       * https://stackoverflow.com/questions/45688494/google-android-publisher-api-responds-with-410-purchasetokennolongervalid-erro
       */
      throw {
        status: Validation.FAILURE,
        message: 'ReceiptNoLongerValid',
      };
    }

    if (status > 399) {
      console.log('-data', data);

      // let msg;
      // try {
      //   msg = JSON.stringify(body, null, 2);
      // } catch (e) {
      //   msg = body;
      // }

      // return cb(new Error('Status:' + res.statusCode + ' - ' + msg), {
      //   status: Validation.FAILURE,
      //   message: body,
      //   data: receipt,
      // });

      throw {
        status: Validation.FAILURE,
        message: '',
      };
    }

    return {
      status: Validation.SUCCESS,
      ...requestBody,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw {
        status: Validation.FAILURE,
        message: error.message,
      };
    }
  }
};
