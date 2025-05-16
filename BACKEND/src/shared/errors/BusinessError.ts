export class BusinessError extends Error {
  public  details?: string[];
  public  errorCode: string;

  constructor(
    message: string,
    options?: {
      details?: string[];
      errorCode?: string;
    }
  ) {
    super(message);
    this.name = 'BusinessError';
    this.details = options?.details;
    this.errorCode = options?.errorCode || 'VALIDATION_ERROR';
    
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, BusinessError);
    }
  }

  toJSON() {
    return {
      error: this.name,
      message: this.message,
      details: this.details,
      errorCode: this.errorCode
    };
  }
}