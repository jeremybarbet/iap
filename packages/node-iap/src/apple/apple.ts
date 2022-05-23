import axios from 'axios';

import { ErrorResponse, VerifyResponse } from '../types/common';

import { Config, Environnement, RequestBody, VerifyReceiptResponse } from './apple.interface';
import { errors, ErrorStatus, handleResponse } from './apple.utils';

const endpoints = {
  verifyReceipt: {
    sandbox: 'https://sandbox.itunes.apple.com/verifyReceipt',
    production: 'https://buy.itunes.apple.com/verifyReceipt',
  },
};

export const verify = async ({ transactionReceipt }: RequestBody, config: Config): Promise<VerifyResponse> => {
  const { environnement = Environnement.PRODUCTION, password, excludeOldTransactions = true } = config;

  try {
    const { data } = await axios.post<VerifyReceiptResponse>(
      environnement === Environnement.PRODUCTION ? endpoints.verifyReceipt.production : endpoints.verifyReceipt.sandbox,
      {
        'receipt-data': transactionReceipt,
        password,
        'exclude-old-transactions': excludeOldTransactions,
      },
    );

    return handleResponse(data);
  } catch (error) {
    const status = (error as ErrorResponse)?.response?.status ?? 500;

    return {
      valid: false,
      data: undefined,
      message: errors?.[status as ErrorStatus],
      status,
    };
  }
};
