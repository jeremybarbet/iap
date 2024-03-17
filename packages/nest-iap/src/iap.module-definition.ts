import { type DynamicModule, ConfigurableModuleBuilder } from '@nestjs/common';

import { type IAPConfig } from './interfaces/iap-module-config.interface';

/**
 * @see {@link https://docs.nestjs.com/fundamentals/dynamic-modules#configurable-module-builder}
 */
export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN, OPTIONS_TYPE, ASYNC_OPTIONS_TYPE } =
  new ConfigurableModuleBuilder<IAPConfig>()
    .setExtras(
      {
        isGlobal: true,
      },
      (definition: DynamicModule, extras: { isGlobal: boolean }) => ({
        ...definition,
        global: extras.isGlobal,
      }),
    )
    .setClassMethodName('forRoot')
    .build();
