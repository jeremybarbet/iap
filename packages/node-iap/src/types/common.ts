import { AppleDataResponse, AppleStatusResponse, GoogleDataResponse, GoogleStatusResponse } from '../../index';

export interface ErrorResponse {
  response?: {
    status: number;
  };
}

export interface VerifyResponse {
  valid: boolean;
  data?: AppleDataResponse | GoogleDataResponse;
  message?: string;
  status?: AppleStatusResponse | GoogleStatusResponse;
}
