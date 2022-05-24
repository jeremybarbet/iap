import axios from 'axios';

import { ErrorResponse, } from '../types/common';

import { endpoints } from './apple.constants';
import { Environnement, ResponseBody } from './apple.interface';
import { errors, ErrorStatus, handleResponse } from './apple.utils';
import { Config, RequestBody, VerifyResponse } from './apple-config.interface';

export const verify = async ({ transactionReceipt }: RequestBody, config: Config): Promise<VerifyResponse> => {
  const { environnement = Environnement.PRODUCTION, password, excludeOldTransactions = true } = config;

  try {
    const { data } = await axios.post<ResponseBody>(
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
