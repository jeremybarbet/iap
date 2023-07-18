export interface ErrorResponse<T = number> {
  response?: {
    status: T;
  };
}
