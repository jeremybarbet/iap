import { DynamicModule, Module } from '@nestjs/common';

import { IAP_CONFIG, IAPConfig, IAPService } from './iap.service';

@Module({})
export class IAPModule {
  static register(config: IAPConfig): DynamicModule {
    return {
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
