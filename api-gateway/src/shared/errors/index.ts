export class AppError extends Error{
  constructor(public readonly statusCode:number,public readonly code
    :string,message:string,public readonly details?:Record<string,unknown>){
      super(message);
      this.name="AppError"
       Object.setPrototypeOf(this, AppError.prototype);
    }
}






export class NotFoundError extends AppError {
  constructor(resource = 'Resource') {
    super(404, 'NOT_FOUND', `${resource} not found`);
    this.name = 'NotFoundError';
  }
}



export class RateLimitError extends AppError {
  constructor(message = 'Too many requests, please try again later') {
    super(429, 'RATE_LIMIT_EXCEEDED', message);
    this.name = 'RateLimitError';
  }
}

