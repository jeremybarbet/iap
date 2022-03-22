import { googleReceipt, verifyAppleReceipt, verifyGoogleReceipt } from '../index';

const appleTests = async () => {
  try {
    const res = await verifyAppleReceipt(
      { transactionReceipt: 'some-transaction-receipt' },
      {
        password: '',
      },
    );

    console.log('-verifyAppleReceipt res', res);
  } catch (error) {
    console.log('-verifyAppleReceipt error', error);
  }
};

const googleTests = async () => {
  try {
    const res = await verifyGoogleReceipt(
      {
        packageName: 'some-package',
        token: 'some-token',
        developerPayload: 'some-developer-payload',
        subscriptionId: 'some-subscription-id',
      },
      {
        clientEmail: '',
        privateKey: '',
      },
    );

    console.log('-verifyGoogleReceipt res', res);
  } catch (error) {
    console.log('-verifyGoogleReceipt error', error);
  }

  try {
    const res = await googleReceipt(
      { packageName: 'some-package', token: 'some-token', subscriptionId: 'some-subscription-id' },
      {
        clientEmail: '',
        privateKey: '',
      },
    );

    console.log('-googleReceipt res', res);
  } catch (error) {
    console.log('-googleReceipt error', error);
  }
};

const main = async () => {
  await appleTests();
  await googleTests();
};

void main();
