import { Middleware } from "../types/Middleware";
import { CorsOptions } from "../interfaces/cors";
import { Request } from "../interfaces/request";
import { Response } from "../interfaces/response";

export function cors(options: CorsOptions = {}): Middleware {
  const defaults = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  };

  const opts = { ...defaults, ...options };

  return (req: Request, res: Response, next: () => void) => {
    const origin = req.headers.origin as string;

    // Handle preflight requests
    if (req.method === "OPTIONS" && req.headers["access-control-request-method"]) {
      // Set methods
      if (opts.methods) {
        res.setHeader("Access-Control-Allow-Methods", Array.isArray(opts.methods) ? opts.methods.join(",") : opts.methods);
      }

      // Set allowed headers
      if (opts.allowedHeaders) {
        res.setHeader("Access-Control-Allow-Headers", Array.isArray(opts.allowedHeaders) ? opts.allowedHeaders.join(",") : opts.allowedHeaders);
      } else if (req.headers["access-control-request-headers"]) {
        res.setHeader("Access-Control-Allow-Headers", req.headers["access-control-request-headers"]);
      }

      // Set max age if specified
      if (opts.maxAge) {
        res.setHeader("Access-Control-Max-Age", String(opts.maxAge));
      }

      // Set credentials if enabled
      if (opts.credentials) {
        res.setHeader("Access-Control-Allow-Credentials", "true");
      }

      // Either continue or end the response
      if (opts.preflightContinue) {
        next();
        return;
      }

      res.statusCode = opts.optionsSuccessStatus || 204;
      res.setHeader("Content-Length", "0");
      res.end();
      return;
    }

    // Handle actual requests
    const setOrigin = () => {
      if (opts.origin === true) {
        res.setHeader("Access-Control-Allow-Origin", origin || "*");
        if (opts.credentials) {
          res.setHeader("Vary", "Origin");
        }
      } else if (typeof opts.origin === "string") {
        res.setHeader("Access-Control-Allow-Origin", opts.origin);
      } else if (opts.origin instanceof RegExp && origin && opts.origin.test(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
      } else if (Array.isArray(opts.origin)) {
        const allowed = opts.origin.some((o) => (o instanceof RegExp ? origin && o.test(origin) : o === origin));
        if (allowed && origin) {
          res.setHeader("Access-Control-Allow-Origin", origin);
        }
      } else if (typeof opts.origin === "function") {
        opts.origin(req, (err: Error | null, allowOrigin?: boolean | string) => {
          if (err || !allowOrigin) {
            next();
            return;
          }
          const finalOrigin = allowOrigin === true ? origin || "*" : allowOrigin;
          if (finalOrigin) {
            res.setHeader("Access-Control-Allow-Origin", finalOrigin);
          }
          if (opts.credentials) {
            res.setHeader("Access-Control-Allow-Credentials", "true");
          }
          next();
        });
        return;
      }

      if (opts.credentials) {
        res.setHeader("Access-Control-Allow-Credentials", "true");
      }
      next();
    };

    // Set exposed headers if specified
    if (opts.exposedHeaders) {
      res.setHeader("Access-Control-Expose-Headers", Array.isArray(opts.exposedHeaders) ? opts.exposedHeaders.join(",") : opts.exposedHeaders);
    }

    setOrigin();
  };
}
