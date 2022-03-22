import axios from 'axios';

import { Validation } from '../../index';

import { Config, DeepRecord, Environnement, RequestBody, VerifyReceiptResponse } from './apple.interface';
import { getError } from './apple.utils';

const endpoints = {
  verifyReceipt: {
    sandbox: 'https://sandbox.itunes.apple.com/verifyReceipt',
    production: 'https://buy.itunes.apple.com/verifyReceipt',
  },
};

const REC_KEYS = {
  IN_APP: 'in_app',
  LRI: 'latest_receipt_info',
  BUNDLE_ID: 'bundle_id',
  BID: 'bid',
  TRANSACTION_ID: 'transaction_id',
  ORIGINAL_TRANSACTION_ID: 'original_transaction_id',
  PRODUCT_ID: 'product_id',
  ITEM_ID: 'item_id',
  ORIGINAL_PURCHASE_DATE_MS: 'original_purchase_date_ms',
  EXPIRES_DATE_MS: 'expires_date_ms',
  EXPIRES_DATE: 'expires_date',
  EXPIRATION_DATE: 'expiration_date',
  EXPIRATION_INTENT: 'expiration_intent',
  CANCELLATION_DATE: 'cancellation_date',
  PURCHASE_DATE_MS: 'purchase_date_ms',
  IS_TRIAL: 'is_trial_period',
};

const isExpired = (data: DeepRecord<DeepRecord<string>>) => {
  if (data[REC_KEYS.LRI] && data[REC_KEYS.LRI][REC_KEYS.EXPIRES_DATE]) {
    const exp = parseInt(data[REC_KEYS.LRI][REC_KEYS.EXPIRES_DATE]);

    if (exp > Date.now()) {
      return true;
    }

    return false;
  }

  return undefined;
};

export const verify = async (requestBody: RequestBody, config: Config) => {
  const { environnement = Environnement.PRODUCTION, password, excludeOldTransactions = true } = config;

  try {
    const { data, status } = await axios.post<VerifyReceiptResponse>(
      environnement === Environnement.PRODUCTION ? endpoints.verifyReceipt.production : endpoints.verifyReceipt.sandbox,
      {
        'receipt-data': requestBody,
        password,
        'exclude-old-transactions': excludeOldTransactions,
      },
    );

    console.log('-data', data);

    if (status === Validation.SUCCESS) {
      if (
        (requestBody as unknown as DeepRecord<string>)[REC_KEYS.IN_APP] &&
        !(requestBody as unknown as DeepRecord<string>)[REC_KEYS.IN_APP].length
      ) {
        /**
         * Receipt is valid, but the receipt bought nothing probably hacked: https://forums.developer.apple.com/thread/8954
         * https://developer.apple.com/library/mac/technotes/tn2413/_index.html#//apple_ref/doc/uid/DTS40016228-CH1-RECEIPT-HOW_DO_I_USE_THE_CANCELLATION_DATE_FIELD_
         */
        throw {
          status: Validation.POSSIBLE_HACK,
          message: getError(status) ?? 'Failed to validate for empty purchased list',
        };
      }

      return {
        status: Validation.SUCCESS,
        data,
      };
    }

    throw {
      status: Validation.FAILURE,
      message: getError(status) ?? 'Failed to validate purchase',
    };
  } catch (error) {
    const response = (error as DeepRecord<{ status: number }>)?.response;
    const status = response?.status;

    if (error && status) {
      throw {
        status: Validation.FAILURE,
        message: getError(status) ?? 'Unknown',
      };
    }

    if (status > 0 && status !== 21007 && status !== 21002) {
      /**
       * Valid subscription receipt, but cancelled. It has not been expired
       * status code is 21006 for both expired receipt and cancelled receipt...
       */
      if (status === 21006 && !isExpired(response as unknown as DeepRecord<DeepRecord<string>>)) {
        throw {
          status: Validation.FAILURE,
          message: getError(status),
        };
      }

      throw {
        status: Validation.FAILURE,
        message: getError(status) ?? 'Unknown',
      };
    }
  }
};
