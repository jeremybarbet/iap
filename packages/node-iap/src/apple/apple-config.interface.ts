import { Environment, ResponseBody } from './apple.interface';
import { ErrorStatus, SuccessStatus } from './apple.utils';

export interface Config {
  /**
   * Define the Environment to use to connect to Apple endpoint.
   * @default Environment.PRODUCTION
   */
  environment?: Environment;

  /**
   * Your app’s shared secret, which is a hexadecimal string. For more information about the shared secret, see [Generate a Receipt Validation Code](@link https://help.apple.com/app-store-connect/#/devf341c0f01).
   */
  password: string;

  /**
   * Set this value to true for the response to include only the latest renewal transaction for any subscriptions. Use this field only for app receipts that contain auto-renewable subscriptions.
   * @default true
   */
  excludeOldTransactions?: boolean;
}

export interface RequestBody {
  transactionReceipt: string;
}

export type DataResponse = ResponseBody;

export type StatusResponse = SuccessStatus | ErrorStatus | number;

export interface VerifyResponse {
  valid: boolean;
  data?: DataResponse;
  message?: string;
  status?: StatusResponse;
}
