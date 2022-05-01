# @jeremy.barbet/node-iap

Node.js library for Apple and Google IAP.

## Installation

```bash
yarn add @jeremy.barbet/node-iap -E
```

### Google

Getting a service account up and running is surprisingly really hard. Mostly, because of a mix of permissions, scopes, and order in which you are doing all these operations has a huge impact.

- I recommend following [this official documentation](https://developers.google.com/android-publisher/getting_started?hl=en#configure_oauth_and_service_accounts) to create a new service account. This library use service account's clientEmail and privateKey, so you can ignore the "OAuth client" paragraphs.

### Apple

- Generate an Apple password through the [App Store Connect](https://help.apple.com/app-store-connect/#/devf341c0f01). I recommend creating an "app-specific shared secret".

## Usage

```ts
import { verifyAppleReceipt, verifyGoogleReceipt } from '@jeremy.barbet/node-iap';

const { data } = verifyAppleReceipt(
  {
    transactionReceipt: 'BASE_64_RECEIPT',
  },
  {
    password: 'APPLE_PASSWORD',
  },
);

const { data } = verifyGoogleReceipt(
  {
    packageName: 'PACKAGE_NAME',
    token: 'TOKEN',
    productId: 'PRODUCT_ID',
  },
  {
    clientEmail: 'GOOGLE_CLIENT_EMAIL',
    privateKey: 'GOOGLE_PRIVATE_KEY',
  },
);
```

## Example

You can find an example in the [example](./example/index.ts) directory.

You will first, need to duplicate the `data.example.json` file, rename it `data.json` and provide your own Apple and Google credentials and receipt data. Then you can run the example:

```bash
yarn ts-node ./packages/node-iap/example/index.ts
```

## Supported platforms

- Apple
- Google

## Acknowledgments

- Part of the code and features are inspired by [in-app-purchase](https://github.com/voltrue2/in-app-purchase)'s library.

## License

This library is licensed under the MIT License.
