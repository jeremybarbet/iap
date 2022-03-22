# @jeremy.barbet/nest-iap

Wrapper around iap library to embed in NestJS applications.

## Installation

```bash
yarn add @jeremy.barbet/nest-iap -E
```

## Usage

```ts
import { IAPModule } from '@jeremy.barbet/nest-iap';

@Module({
  controllers: [...],
  providers: [...],
  imports: [
    IAPModule.forRoot({
      apple: {
        password: ''
      },
      google: {
        privateKey: ''
      },
    }),
  ],
})
```

```ts
import { IAPService } from '@jeremy.barbet/nest-iap';

class MyService {
  constructor(private readonly iapService: IAPService) {}

  async someMethod() {
    const { response } = await this.iapService.verifyReceipt({
      receipt: 'RECEIPT_ID',
    });
  }
}
```
