import {
  type AppleConfig,
  type AppleRequestBody,
  type GoogleConfig,
  type GoogleRequestBody,
  verifyAppleReceipt,
  verifyGoogleReceipt,
} from '@jeremybarbet/node-iap';
import { Inject, Injectable } from '@nestjs/common';

export interface IAPConfig {
  apple?: AppleConfig;
  google?: GoogleConfig;
}

export const IAP_CONFIG = 'IAP_CONFIG';

@Injectable()
export class IAPService {
  constructor(@Inject(IAP_CONFIG) private readonly config: IAPConfig) {
    this.config = config;
  }

  async verifyAppleReceipt(requestBody: AppleRequestBody) {
    if (!this.config?.apple) {
      throw new Error('Missing Apple configuration.');
    }

    return await verifyAppleReceipt(requestBody, this.config.apple);
  }

  async verifyGoogleReceipt(requestBody: GoogleRequestBody) {
    if (!this.config?.google) {
      throw new Error('Missing Google configuration.');
    }

    return await verifyGoogleReceipt(requestBody, this.config.google);
  }
}
