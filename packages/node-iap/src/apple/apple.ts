import { Environment, errors, ResponseBody } from '@jeremybarbet/apple-api-types';
import axios from 'axios';

import { ErrorResponse } from '../types/common';

import { endpoints } from './apple.constants';
import { ErrorStatus, handleResponse } from './apple.utils';
import { Config, RequestBody, VerifyResponse } from './config.interface';

export const verify = async ({ transactionReceipt }: RequestBody, config: Config): Promise<VerifyResponse> => {
  const { environment = Environment.PRODUCTION, password, excludeOldTransactions = true } = config;

  try {
    const { data } = await axios.post<ResponseBody>(
      environment === Environment.PRODUCTION ? endpoints.verifyReceipt.production : endpoints.verifyReceipt.sandbox,
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
