export interface ValidationError {
  [key: string]: string;
}

export interface ApiErrorResponse {
  message: string | string[];
  error: string;
  statusCode: number;
  errors?: ValidationError;
}
