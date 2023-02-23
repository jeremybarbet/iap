import { type ResponseBody, errors, internalDataAccessErrors, successes } from '@jeremybarbet/apple-api-types';

export type SuccessStatus = keyof typeof successes;
export type ErrorStatus = keyof typeof errors;

const inRange = (x: number, min: number, max: number) => (x - min) * (x - max) <= 0;

export const handleResponse = (data: ResponseBody) => {
  if (successes?.[data.status as SuccessStatus]) {
    return {
      valid: true,
      data,
      message: undefined,
      status: data.status,
    };
  }

  if (inRange(data.status, internalDataAccessErrors[0], internalDataAccessErrors[1])) {
    return {
      valid: false,
      data: undefined,
      message: 'Internal data access error. Try again later.',
      status: data.status,
    };
  }

  return {
    valid: false,
    data: undefined,
    message: errors?.[data.status as ErrorStatus],
    status: data.status,
  };
};
