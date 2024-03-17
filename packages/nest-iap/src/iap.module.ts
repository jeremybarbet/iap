import { Module } from '@nestjs/common';

import { ConfigurableModuleClass } from './iap.module-definition';
import { IAPService } from './iap.service';

@Module({
  providers: [IAPService],
  exports: [IAPService],
})
export class IAPModule extends ConfigurableModuleClass {}
