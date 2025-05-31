import type { AppleConfig, GoogleConfig } from '@jeremybarbet/node-iap';

export interface IAPConfig {
  apple?: AppleConfig;
  google?: GoogleConfig;
}
