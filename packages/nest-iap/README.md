# @jeremybarbet/nest-iap

Wrapper around iap library to embed in NestJS applications.

## Installation

```bash
yarn add @jeremybarbet/nest-iap -E
```

## Usage

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

## License

This library is licensed under the MIT License.
