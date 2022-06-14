import { DynamicModule, Module } from '@nestjs/common';

import { IAP_CONFIG, IAPConfig, IAPService } from './iap.service';

@Module({})
export class IAPModule {
  static forRoot(config: IAPConfig): DynamicModule {
    return {
      global: true,
      module: IAPModule,
      providers: [
        {
          provide: IAP_CONFIG,
          useValue: config,
        },
        IAPService,
      ],
      exports: [IAPService],
    };
  }
}
