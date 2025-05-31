import {
  type AppleRequestBody,
  type AppleVerifyResponse,
  type GoogleRequestBody,
  type GoogleVerifyResponse,
  verifyAppleReceipt,
  verifyGoogleReceipt,
} from '@jeremybarbet/node-iap';
import { Inject, Injectable } from '@nestjs/common';

import type { IAPConfig } from './interfaces/iap-module-config.interface';
import { MODULE_OPTIONS_TOKEN } from './iap.module-definition';

@Injectable()
export class IAPService {
  constructor(@Inject(MODULE_OPTIONS_TOKEN) private readonly config: IAPConfig) {
    this.config = config;
  }

  async verifyAppleReceipt(requestBody: AppleRequestBody): Promise<AppleVerifyResponse> {
    if (!this.config?.apple) {
      throw new Error('Missing Apple configuration.');
    }

    return await verifyAppleReceipt(requestBody, this.config.apple);
  }

  async verifyGoogleReceipt(requestBody: GoogleRequestBody): Promise<GoogleVerifyResponse> {
    if (!this.config?.google) {
      throw new Error('Missing Google configuration.');
    }

    return await verifyGoogleReceipt(requestBody, this.config.google);
  }
}
