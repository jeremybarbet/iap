# In App Purchase

This library allow you to server-side verify an in-app purchase from an iOS or an Android app. Additionally, with Google Play Billing Library version 3, you have to acknowledge a subscription to be successfully process by the Google Play Store.

## Node.js IAP library

This is the core library wrapping the Apple and Google IAP APIs to get and verify in-app purchases.

View the [README.md](./packages/node-iap/README.md) to get started.

### Installation

```bash
yarn add @jeremybarbet/node-iap -E
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

View the [README.md](./packages/nest-iap/README.md) to get started.

### Installation

```bash
yarn add @jeremybarbet/nest-iap -E
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

## Acknowledgments

I build this library for my side-project [hello aurora](https://github.com/hello-aurora). If you find this library useful, please consider donating.

## License

This library is licensed under the MIT License.
