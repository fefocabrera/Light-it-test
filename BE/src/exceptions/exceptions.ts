import { Response } from 'express';
export class ValidationError extends Error {
    public details?: any;
  
    constructor(message: string, details?: any) {
      super(message);
      this.details = details;
    }
}

export class AuthorizationError extends Error {
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

export const manageExceptions = (err: any, res: Response) => {
  if (err instanceof ValidationError) {
    res.status(400).send(err.message)
  } else if (err instanceof AuthorizationError){
    res.status(401).send(err.message)
  } else if(err instanceof GeneralError) {
    res.status(500).send(err.message)
  }
}