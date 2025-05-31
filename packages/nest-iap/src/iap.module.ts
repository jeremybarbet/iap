import { Module } from '@nestjs/common';

import { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } from './iap.module-definition';
import { IAPService } from './iap.service';

@Module({
  providers: [
    {
      provide: MODULE_OPTIONS_TOKEN,
      useValue: MODULE_OPTIONS_TOKEN,
    },
    IAPService,
  ],
  exports: [IAPService],
})
export class IAPModule extends ConfigurableModuleClass {}
