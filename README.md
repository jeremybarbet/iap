# In App Purchase

Libraries to server-side verify in-app purchases for iOS and Android. Additionally, with Google Play Billing Library version 3, can acknowledge a subscription to be successfully process by the Google Play Store.

## Features

- 💸 Verify in-app purchases for iOS and Android receipts in Node.js
- 🔌 [NestJS](https://nestjs.com) wrapper to easily integrates the library in your project.
- Uses [axios](https://github.com/axios/axios) under the hood for the requests.
- Typescript definition for App Store Receipts, App Store Server API and Google Play Developer API.
- All types come with their descriptions extracted from the Apple and Google documentations.

## Node.js IAP library

This is the core library wrapping the Apple and Google IAP APIs to get and verify in-app purchases.

→ [README.md](./packages/node-iap/README.md) for more information.

### Installation

```bash
yarn add @jeremybarbet/node-iap
```

### Usage

```ts
import { verifyAppleReceipt, verifyGoogleReceipt } from '@jeremybarbet/node-iap';

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

## NestJS IAP wrapper

This is a NestJS wrapper for the Node.js library.

→ [README.md](./packages/nest-iap/README.md) for more information.

### Installation

```bash
yarn add @jeremybarbet/nest-iap
```

### Usage

```ts
import { IAPModule } from '@jeremybarbet/nest-iap';

@Module({
  controllers: [...],
  providers: [...],
  imports: [
    IAPModule.forRoot({
      apple: {
        password: '',
      },
      google: {
        clientEmail: '',
        privateKey: '',
      },
    }),
  ],
})
```

```ts
import { IAPService } from '@jeremybarbet/nest-iap';

class MyService {
  constructor(private readonly iapService: IAPService) {}

  async someMethod() {
    const { response } = await this.iapService.verifyAppleReceipt({
      transactionReceipt: 'BASE_64_RECEIPT',
    });
  }

  async someOtherMethod() {
    const { response } = await this.iapService.verifyGoogleReceipt({
      packageName: 'PACKAGE_NAME',
      token: 'TOKEN',
      productId: 'PRODUCT_ID',
    });
  }
}
```

## Apple API types

Typescript definitions for Apple API services.

→ [README.md](./packages/apple-api-types/README.md) for more information.

### Installation

```bash
yarn add @jeremybarbet/apple-api-types
```

## Google API types

Typescript definitions for Google API services.

→ [README.md](./packages/google-api-types/README.md) for more information.

### Installation

```bash
yarn add @jeremybarbet/google-api-types
```

## Acknowledgments

I build this library for my side-project [hello aurora](https://github.com/hello-aurora). If you find this library useful, please consider donating.

## License

This library is licensed under the MIT License.
