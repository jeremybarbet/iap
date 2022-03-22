# @jeremy.barbet/node-iap

Raw node JS library for Apple and Google IAP.

## Installation

```bash
yarn add @jeremy.barbet/node-iap -E
```

### Google

- Make sure to [enable the Google API](https://console.cloud.google.com/apis/library/androidpublisher.googleapis.com) required to use the library.

### Apple

- Generate an Apple password through the [App Store Connect](https://help.apple.com/app-store-connect/#/devf341c0f01).

## Usage

```ts
import { verifyAppleReceipt, verifyGoogleReceipt } from '@jeremy.barbet/node-iap';

const { data } = verifyAppleReceipt({
  transactionReceipt: 'receipt-id',
  password: 'APPLE_PASSWORD',
});

const { data } = verifyGoogleReceipt({
  packageName: 'PACKAGE_NAME',
  token: 'TOKEN',
  developerPayload: 'DEVELOPER_PAYLOAD',
  clientEmail: 'GOOGLE_CLIENT_EMAIL',
  privateKey: 'GOOGLE_PRIVATE_KEY',
});
```

## Supported platforms

- Apple
- Google

## Example

```bash
yarn workspace @jeremy.barbet/node-iap ts-node ./node-example.ts
```

## Acknowledgments

- Parts of the code and features are inspired by [in-app-purchase](https://github.com/voltrue2/in-app-purchase)
