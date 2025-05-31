import {
  AppleEnvironment,
  type AppleVerifyResponse,
  type GoogleVerifyResponse,
  verifyAppleReceipt,
  verifyGoogleReceipt,
} from '../index';

import { loadDataFile } from './load-data-file';

const { apple, google } = loadDataFile();

const responseLog = (name: string, response: AppleVerifyResponse | GoogleVerifyResponse) => {
  console.log(name);
  console.log('├ valid: ', response.valid);
  console.log('├ status: ', response.status);
  console.log('├ message: ', response.message);
  console.log('└ data: ', response.data);
  console.log('\n');
};

const errorLog = (name: string, error: unknown) => {
  console.log(name);
  console.log('└ error', error);
  console.log('\n');
};

const appleTests = async () => {
  if (apple.credentials.password === '' || apple.payload.transactionReceipt === '') {
    throw new Error('Missing credentials and/or payload');
  }

  try {
    const response = await verifyAppleReceipt(
      {
        transactionReceipt: apple.payload.transactionReceipt,
      },
      {
        environment: AppleEnvironment.SANDBOX,
        password: apple.credentials.password,
      },
    );

    responseLog('verifyAppleReceipt', response);
  } catch (error) {
    errorLog('verifyAppleReceipt', error);
  }
};

const googleTests = async () => {
  if (
    google.credentials.clientEmail === '' ||
    google.credentials.privateKey === '' ||
    google.payload.packageNameAndroid === '' ||
    google.payload.productId === '' ||
    google.payload.purchaseToken === ''
  ) {
    throw new Error('Missing credentials and/or payload');
  }

  try {
    const response = await verifyGoogleReceipt(
      {
        packageName: google.payload.packageNameAndroid,
        token: google.payload.purchaseToken,
        productId: google.payload.productId,
      },
      {
        clientEmail: google.credentials.clientEmail,
        privateKey: google.credentials.privateKey,
      },
    );

    responseLog('verifyGoogleReceipt: `acknowledge: false``', response);
  } catch (error) {
    errorLog('verifyGoogleReceipt: `acknowledge: false``', error);
  }

  try {
    const response = await verifyGoogleReceipt(
      {
        packageName: google.payload.packageNameAndroid,
        token: google.payload.purchaseToken,
        productId: google.payload.productId,
        acknowledge: true,
      },
      {
        clientEmail: google.credentials.clientEmail,
        privateKey: google.credentials.privateKey,
      },
    );

    responseLog('verifyGoogleReceipt: `acknowledge: true`', response);
  } catch (error) {
    errorLog('verifyGoogleReceipt: `acknowledge: true`', error);
  }

  try {
    const response = await verifyGoogleReceipt(
      {
        packageName: google.payload.packageNameAndroid,
        token: google.payload.purchaseToken,
        productId: google.payload.productId,
        acknowledge: true,
        fetchResource: true,
      },
      {
        clientEmail: google.credentials.clientEmail,
        privateKey: google.credentials.privateKey,
      },
    );

    responseLog('verifyGoogleReceipt: `acknowledge: true`, `fetchResource: true`', response);
  } catch (error) {
    errorLog('verifyGoogleReceipt: `acknowledge: true`, `fetchResource: true`', error);
  }
};

const main = async () => {
  try {
    await appleTests();
  } catch (error) {
    console.error(error);
  }

  try {
    await googleTests();
  } catch (error) {
    console.error(error);
  }
};

void main();
