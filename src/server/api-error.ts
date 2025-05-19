export class APIError extends Error {
  statusCode?: number;

  constructor(message: string, statusCode?: number) {
    super(message);
    this.name = 'APIError';
    this.statusCode = statusCode;
  }

  static invalidURL() {
    return new APIError('Invalid URL');
  }

  static invalidResponse() {
    return new APIError('Invalid response from server');
  }

  static decodingError(message: string) {
    return new APIError(`Could not decode data: ${message}`);
  }

  static httpError(statusCode: number) {
    return new APIError(`HTTP error: Status code ${statusCode}`, statusCode);
  }

  static networkError(message: string) {
    return new APIError(`Network error: ${message}`);
  }

  static unknown(message: string) {
    return new APIError(`Unknown error: ${message}`);
  }
}
