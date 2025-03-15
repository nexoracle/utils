import http from "http";
import url from "url";
import fs from "fs";
import path from "path";
import { IncomingMessage, ServerResponse } from "http";

interface Request extends IncomingMessage {
  body?: any;
  cookies?: { [key: string]: string };
  session?: any;
  query?: { [key: string]: string | string[] };
  params?: { [key: string]: string };
  ip?: string;
  flash?: (type: string, message?: string) => string[] | void;
}

interface Response extends ServerResponse {
  status: (code: number) => Response;
  json: (data: any, spaces?: number) => void;
  send: (data: any) => void;
  cookie: (name: string, value: string, options?: any) => void;
  clearCookie: (name: string, options?: any) => void;
  redirect: (url: string) => void;
  locals?: { [key: string]: any };
  jsonSpaces: number;
}

interface RateLimiterOptions {
  windowMs?: number; // Time window in milliseconds (default: 1 minute)
  max?: number; // Maximum number of requests per window (default: 100)
  message?: string; // Error message when limit is exceeded
  statusCode?: number; // HTTP status code when limit is exceeded (default: 429)
  skip?: (req: Request) => boolean; // Function to skip rate limiting for certain requests
  keyGenerator?: (req: Request) => string; // Function to generate a unique key for each request (default: IP address)
  handler?: (req: Request, res: Response) => void; // Custom handler when limit is exceeded
}

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

type Middleware = (req: Request, res: Response, next: () => void) => void;

class Router {
  private routes: { [path: string]: { [method: string]: (req: Request, res: Response) => void } } = {};
  private middlewares: Middleware[] = [];
  private settings: { [key: string]: any } = {};
  private viewsDir: string = "";
  private viewEngine: ((filePath: string, data: { [key: string]: any }, callback: (err: Error | null, html?: string) => void) => void) | null = null;
  private trustProxy: boolean | string | string[] | number = false;
  private jsonSpaces: number = 0;
  private flashMessages: { [key: string]: string[] } = {};

  // Add middleware
  use(path: string | Middleware, middleware?: Middleware): void {
    if (typeof path === "string" && middleware) {
      this.middlewares.push((req, res, next) => {
        if (req.url?.startsWith(path)) {
          middleware(req, res, next);
        } else {
          next();
        }
      });
    } else if (typeof path === "function") {
      this.middlewares.push(path);
    }
  }

  // Add GET route
  get(path: string, handler: (req: Request, res: Response) => void): void {
    this.addRoute(path, "GET", handler);
  }

  // Add POST route
  post(path: string, handler: (req: Request, res: Response) => void): void {
    this.addRoute(path, "POST", handler);
  }

  // Add PUT route
  put(path: string, handler: (req: Request, res: Response) => void): void {
    this.addRoute(path, "PUT", handler);
  }

  // Add DELETE route
  delete(path: string, handler: (req: Request, res: Response) => void): void {
    this.addRoute(path, "DELETE", handler);
  }

  // Add a route with a handler for a specific HTTP method
  private addRoute(path: string, method: string, handler: (req: Request, res: Response) => void): void {
    if (!this.routes[path]) {
      this.routes[path] = {};
    }
    this.routes[path][method.toUpperCase()] = handler;
  }

  // Set configuration
  set(key: string, value: any): void {
    if (key === "view engine") {
      if (value === "ejs") {
        this.viewEngine = (filePath: string, data: { [key: string]: any }, callback: (err: Error | null, html?: string) => void) => {
          fs.readFile(filePath, "utf8", (err, template) => {
            if (err) return callback(err);
            const rendered = template.replace(/<%=\s*(.*?)\s*%>/g, (_, key) => data[key] || "");
            callback(null, rendered);
          });
        };
      } else {
        throw new Error(`Unsupported view engine: ${value}`);
      }
    } else if (key === "views") {
      this.viewsDir = value;
    } else if (key === "trust proxy") {
      this.setTrustProxy(value);
    } else if (key === "json spaces") {
      this.setJsonSpaces(value);
    }
    this.settings[key] = value;
  }

  // Get configuration
  getSetting(key: string): any {
    return this.settings[key];
  }

  // Set trust proxy
  setTrustProxy(value: boolean | string | string[] | number): void {
    this.trustProxy = value;
  }

  // Get client IP address considering trust proxy
  getClientIp(req: Request): string {
    if (!this.trustProxy) {
      return req.socket.remoteAddress || "";
    }

    const forwardedFor = req.headers["x-forwarded-for"];
    if (typeof forwardedFor === "string") {
      const ips = forwardedFor.split(",");
      if (this.trustProxy === true || this.trustProxy === "all") {
        return ips[0].trim();
      } else if (typeof this.trustProxy === "number") {
        return ips[this.trustProxy - 1]?.trim() || req.socket.remoteAddress || "";
      }
    }

    return req.socket.remoteAddress || "";
  }

  // Set JSON spaces
  setJsonSpaces(spaces: number): void {
    if (typeof spaces !== "number" || spaces < 0) {
      throw new Error("jsonSpaces must be a non-negative number");
    }
    this.jsonSpaces = spaces;
  }

  // Flash middleware
  useFlash(): Middleware {
    return (req: Request, res: Response, next: () => void) => {
      req.flash = (type: string, message?: string): string[] | void => {
        if (!this.flashMessages[type]) {
          this.flashMessages[type] = [];
        }
        if (message) {
          this.flashMessages[type].push(message);
        }
        return this.flashMessages[type];
      };

      res.locals = res.locals || {};
      res.locals.messages = this.flashMessages;

      next();
    };
  }

  // Render a view
  render(res: ServerResponse, viewName: string, data: { [key: string]: any } = {}): void {
    if (!this.viewEngine) {
      throw new Error('View engine not set. Use router.set("view engine", "ejs") to configure a view engine.');
    }

    const viewExtension = this.getSetting("view engine"); // Get the view engine extension
    if (!viewExtension) {
      throw new Error('View engine not set. Use router.set("view engine", "ejs") to configure a view engine.');
    }

    const viewPath = path.join(this.viewsDir, `${viewName}.${viewExtension}`);

    this.viewEngine(viewPath, data, (err, html) => {
      if (err) {
        console.error(`Error rendering view: ${err.message}`); // Debugging
        apex.text(res, 500, `Error rendering view: ${err.message}`);
      } else {
        apex.html(res, 200, html || "");
      }
    });
  }

  // Handle incoming requests
  handleRequest(req: IncomingMessage, res: ServerResponse): void {
    const reqMethod = req as Request;
    const resMethod = res as Response;

    // Enhance req object
    reqMethod.ip = this.getClientIp(reqMethod);
    reqMethod.query = parseUrl(req).query;

    // Enhance res object
    resMethod.jsonSpaces = this.jsonSpaces;
    resMethod.status = function (code: number) {
      this.statusCode = code;
      return this;
    };
    resMethod.json = function (data: any, spaces?: number) {
      this.setHeader("Content-Type", "application/json");
      this.end(JSON.stringify(data, null, spaces ?? this.jsonSpaces ?? 0));
    };
    resMethod.send = function (data: any) {
      if (typeof data === "object") {
        this.json(data);
      } else {
        this.setHeader("Content-Type", "text/plain");
        this.end(data);
      }
    };
    resMethod.cookie = function (name: string, value: string, options?: any) {
      const cookie = `${name}=${value}; ${Object.entries(options || {})
        .map(([k, v]) => `${k}=${v}`)
        .join("; ")}`;
      this.setHeader("Set-Cookie", cookie);
    };
    resMethod.clearCookie = function (name: string, options?: any) {
      this.setHeader("Set-Cookie", `${name}=; Expires=Thu, 01 Jan 1970 00:00:00 GMT`);
    };
    resMethod.redirect = function (url: string) {
      this.writeHead(302, { Location: url });
      this.end();
    };

    // Execute middlewares
    const executeMiddlewares = (index: number) => {
      if (index < this.middlewares.length) {
        try {
          this.middlewares[index](reqMethod, resMethod, () => executeMiddlewares(index + 1));
        } catch (err) {
          console.error("Middleware error:", err);
          apex.text(resMethod, 500, "Internal Server Error");
        }
      } else {
        // Check for exact match
        if (this.routes[reqMethod.url!] && this.routes[reqMethod.url!][reqMethod.method!]) {
          return this.routes[reqMethod.url!][reqMethod.method!](reqMethod, resMethod);
        }

        // Check for wildcard matches (e.g., "/static/*" should match "/static/style.css")
        for (const route in this.routes) {
          if (route.endsWith("/*") && reqMethod.url!.startsWith(route.slice(0, -2))) {
            if (this.routes[route][reqMethod.method!]) {
              return this.routes[route][reqMethod.method!](reqMethod, resMethod);
            }
          }
        }

        // If no match found, send 404
        this.notFoundHandler(reqMethod, resMethod);
      }
    };

    executeMiddlewares(0);
  }

  // Default 404 handler
  private notFoundHandler(req: Request, res: Response): void {
    apex.text(res, 404, "Not Found");
  }
}

// Create an HTTP server with a router
function createServer(router: Router): http.Server {
  return http.createServer((req, res) => {
    router.handleRequest(req, res);
  });
}

// Utility functions
const apex = {
  Router,
  createServer,
  text(res: ServerResponse, statusCode: number, message: string): void {
    res.writeHead(statusCode, { "Content-Type": "text/plain" });
    res.end(message);
  },
  json(res: ServerResponse, statusCode: number, data: object, spaces?: number): void {
    res.writeHead(statusCode, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data, null, spaces || 0));
  },
  html(res: ServerResponse, statusCode: number, html: string): void {
    res.writeHead(statusCode, { "Content-Type": "text/html" });
    res.end(html);
  },
  sendFile(res: ServerResponse, filePath: string): void {
    const extname = path.extname(filePath).toLowerCase();
    const contentType =
      {
        ".html": "text/html",
        ".css": "text/css",
        ".js": "application/javascript",
        ".json": "application/json",
        ".png": "image/png",
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".gif": "image/gif",
        ".svg": "image/svg+xml",
        ".ico": "image/x-icon",
        ".txt": "text/plain",
        ".pdf": "application/pdf",
        ".zip": "application/zip",
        ".mp4": "video/mp4",
        ".mp3": "audio/mpeg",
        ".wav": "audio/wav",
        ".ogg": "audio/ogg",
        ".webp": "image/webp",
        ".avif": "image/avif",
        ".flac": "audio/flac",
        ".aac": "audio/aac",
        ".woff": "font/woff",
        ".woff2": "font/woff2",
        ".ttf": "font/ttf",
        ".eot": "application/vnd.ms-fontobject",
        ".xml": "application/xml",
        ".csv": "text/csv",
      }[extname] || "application/octet-stream";

    fs.readFile(filePath, (err, data) => {
      if (err) {
        apex.text(res, 404, "File Not Found");
      } else {
        res.writeHead(200, { "Content-Type": contentType });
        res.end(data);
      }
    });
  },
  static(staticPath: string): Middleware {
    return (req, res, next) => {
      const { pathname } = parseUrl(req);
      const filePath = path.join(staticPath, pathname);

      fs.stat(filePath, (err, stats) => {
        if (err || !stats.isFile()) {
          next();
        } else {
          apex.sendFile(res, filePath);
        }
      });
    };
  },
  favicon(iconPath: string): Middleware {
    return (req, res, next) => {
      if (req.url === "/favicon.ico") {
        apex.sendFile(res, iconPath);
      } else {
        next();
      }
    };
  },
  rateLimit: (options: RateLimiterOptions = {}): Middleware => {
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
  },
};

function parseUrl(req: IncomingMessage): { pathname: string; query: { [key: string]: string | string[] } } {
  const parsedUrl = url.parse(req.url || "", true);
  const query: { [key: string]: string | string[] } = {};

  for (const key in parsedUrl.query) {
    const value = parsedUrl.query[key];
    if (value !== undefined) {
      query[key] = Array.isArray(value) ? value : value.toString();
    }
  }

  return {
    pathname: parsedUrl.pathname || "",
    query,
  };
}

export { apex };
