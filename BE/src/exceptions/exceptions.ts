export class ValidationError extends Error {
    public details?: any;
  
    constructor(message: string, details?: any) {
      super(message);
      this.details = details;
    }
}

export class ExternalApiError extends Error {
  public details?: any;

  constructor(message: string, details?: any) {
    super(message);
    this.details = details;
  }
}

export class GeneralError extends Error {
  public details?: any;

  constructor(message: string, details?: any) {
    super(message);
    this.details = details;
  }
}