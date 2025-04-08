import { Request } from "./request";
import { Response } from "./response";

export interface RateLimiterOptions {
  windowMs?: number; // Time window in milliseconds (default: 1 minute)
  max?: number; // Maximum number of requests per window (default: 100)
  message?: string; // Error message when limit is exceeded
  statusCode?: number; // HTTP status code when limit is exceeded (default: 429)
  skip?: (req: Request) => boolean; // Function to skip rate limiting for certain requests
  keyGenerator?: (req: Request) => string; // Function to generate a unique key for each request (default: IP address)
  handler?: (req: Request, res: Response) => void; // Custom handler when limit is exceeded
}

export interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}
