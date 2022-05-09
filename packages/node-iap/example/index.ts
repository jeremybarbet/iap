import { verifyAppleReceipt, verifyGoogleReceipt } from '../index';
import { Environnement } from '../src/apple/apple.interface';

import { loadDataFile } from './load-data-file';

const { apple, google } = loadDataFile();

const responseLog = (name: string, response: Record<string, unknown>) => {
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
        environnement: Environnement.SANDBOX,
        password: apple.credentials.password,
      },
    );

    responseLog('Apple verify receipt', response);
  } catch (error) {
    errorLog('Apple verify receipt', error);
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

    responseLog('Google get receipt', response);
  } catch (error) {
    errorLog('Google get receipt', error);
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

    responseLog('Google verify receipt', response);
  } catch (error) {
    errorLog('Google verify receipt', error);
  }
};

const main = async () => {
  await appleTests();
  await googleTests();
};

void main();
