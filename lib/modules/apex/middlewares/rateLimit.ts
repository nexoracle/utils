import { Middleware } from "../types/Middleware";
import { RateLimitStore, RateLimiterOptions } from "../interfaces/rateLimit";
import { Request } from "../interfaces/request";
import { Response } from "../interfaces/response";


export function rateLimit(options: RateLimiterOptions = {}): Middleware  {
    const {
      windowMs = 60 * 1000, // 1 minute
      max = 100, // 100 requests per window
      message = "Too many requests, please try again later.",
      statusCode = 429, // 429 Too Many Requests
      skip = () => false, // Skip rate limiting for certain requests
      keyGenerator = (req) => req.ip || "global", // Default key generator (IP-based)
      handler = (req, res) => {
        const key = keyGenerator(req);
        const remainingTime = store[key] ? Math.ceil((store[key].resetTime - Date.now()) / 1000) : 0;

        // Set rate limit headers even when the limit is exceeded
        res.setHeader("RateLimit-Limit", max);
        res.setHeader("RateLimit-Remaining", 0); // No remaining requests
        res.setHeader("RateLimit-Reset", remainingTime); // Remaining time in seconds
        res.setHeader("RateLimit-Policy", `${max};w=${windowMs / 1000}`);
        res.status(statusCode).json({ message });
      },
    } = options;

    const store: RateLimitStore = {};

    // Clear old entries from the store periodically
    setInterval(() => {
      const now = Date.now();
      for (const key in store) {
        if (store[key].resetTime <= now) {
          delete store[key];
        }
      }
    }, windowMs);

    return (req: Request, res: Response, next: () => void) => {
      if (skip(req)) {
        return next(); // Skip rate limiting for this request
      }

      const key = keyGenerator(req);
      const now = Date.now();

      if (!store[key]) {
        store[key] = {
          count: 1,
          resetTime: now + windowMs,
        };
      } else {
        store[key].count++;
      }

      // Calculate remaining time in seconds
      const remainingTime = Math.ceil((store[key].resetTime - now) / 1000);

      // Set rate limit headers for every request
      res.setHeader("RateLimit-Limit", max);
      res.setHeader("RateLimit-Remaining", Math.max(0, max - store[key].count));
      res.setHeader("RateLimit-Reset", remainingTime); // Remaining time in seconds
      res.setHeader("RateLimit-Policy", `${max};w=${windowMs / 1000}`);

      if (store[key].count > max) {
        return handler(req, res); // Limit exceeded
      }

      next(); // Proceed to the next middleware/route
    };
  }