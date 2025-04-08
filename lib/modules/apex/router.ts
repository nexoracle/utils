import { Middleware } from "./types/Middleware";
import { IncomingMessage, ServerResponse } from "http";
import fs from "fs";
import path from "path";
import tls from "tls";
import { mime } from "../mime";
import { Request } from "./interfaces/request";
import { Response } from "./interfaces/response";
import { parseUrl, convertRouteToRegex, extractParamNames, notFoundHandler } from "./utils";

/*
 * TODO:
 * fix baseUrl: to return correct base url
 * add createError: error handling middleware
 * add nested mounted routes support
 */

export class Router {
  private routes: { [path: string]: { [method: string]: (req: Request, res: Response) => void } } = {};
  private middlewares: Middleware[] = [];
  private settings: { [key: string]: any } = {};
  private viewsDir: string = "";
  private viewEngine: ((filePath: string, data: { [key: string]: any }, callback: (err: Error | null, html?: string) => void) => void) | null = null;
  private trustProxy: boolean | string | string[] | number = false;
  private jsonSpaces: number = 0;

  // Add middleware
  use(path: string | Middleware, middleware?: Middleware): void {
    if (typeof path === "string" && middleware) {
      this.middlewares.push((req, res, next) => {
        const { pathname } = parseUrl(req);

        if (pathname.startsWith(path)) {
          req.url = pathname.slice(path.length) || "/";
          middleware(req, res, next);
        } else {
          next();
        }
      });
    } else if (typeof path === "function") {
      this.middlewares.push(path);
    }
  }

  // Routes Handling
  get(path: string, ...handlers: ((req: Request, res: Response, next?: () => void) => void)[]): void {
    this.addRoute(path, "GET", ...handlers);
  }

  post(path: string, ...handlers: ((req: Request, res: Response, next?: () => void) => void)[]): void {
    this.addRoute(path, "POST", ...handlers);
  }

  put(path: string, ...handlers: ((req: Request, res: Response, next?: () => void) => void)[]): void {
    this.addRoute(path, "PUT", ...handlers);
  }

  delete(path: string, ...handlers: ((req: Request, res: Response, next?: () => void) => void)[]): void {
    this.addRoute(path, "DELETE", ...handlers);
  }

  // Add a route with a handler for a specific HTTP method
  private addRoute(path: string, method: string, ...handlers: ((req: Request, res: Response, next?: () => void) => void)[]): void {
    if (!this.routes[path]) {
      this.routes[path] = {};
    }
    this.routes[path][method.toUpperCase()] = (req, res) => {
      const executeHandler = (index: number) => {
        if (index < handlers.length) {
          const handler = handlers[index];
          if (handler.length === 3) {
            // Middleware with next
            handler(req, res, () => executeHandler(index + 1));
          } else {
            // Final handler
            handler(req, res);
          }
        }
      };
      executeHandler(0);
    };
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
  private getClientIp(req: Request): string {
    if (!this.trustProxy) {
      return req.socket?.remoteAddress || "";
    }

    const forwardedFor = req.headers["x-forwarded-for"];
    if (typeof forwardedFor === "string") {
      const ips = forwardedFor.split(",").map((ip) => ip.trim());

      if (this.trustProxy === true || this.trustProxy === "all") {
        return ips[0] || req.socket?.remoteAddress || "";
      } else if (typeof this.trustProxy === "number") {
        const index = Math.max(0, Math.min(ips.length - 1, this.trustProxy - 1));
        return ips[index] || req.socket?.remoteAddress || "";
      }
    }

    return req.socket?.remoteAddress || "";
  }

  // Get all IPS if behind reverse proxy
  private getClientIps(req: Request): string[] {
    if (!this.trustProxy) {
      return [req.socket?.remoteAddress || ""];
    }

    const forwardedFor = req.headers["x-forwarded-for"];
    if (typeof forwardedFor === "string") {
      return forwardedFor.split(",").map((ip) => ip.trim());
    }

    return [req.socket?.remoteAddress || ""];
  }

  // Set JSON spaces
  setJsonSpaces(spaces: number): void {
    if (typeof spaces !== "number" || spaces < 0) {
      throw new Error("jsonSpaces must be a non-negative number");
    }
    this.jsonSpaces = spaces;
  }

  // Render a view
  render(res: ServerResponse, viewName: string, data: { [key: string]: any } = {}): void {
    if (!this.viewEngine) {
      throw new Error('View engine not set. Use router.set("view engine", "ejs") to configure a view engine.');
    }

    const viewExtension = this.getSetting("view engine");
    if (!viewExtension) {
      throw new Error('View engine not set. Use router.set("view engine", "ejs") to configure a view engine.');
    }

    const viewPath = path.join(this.viewsDir, `${viewName}.${viewExtension}`);
    const resMethod = res as Response;

    this.viewEngine(viewPath, data, (err, html) => {
      if (err) {
        console.error(`Error rendering view: ${err.message}`);
        resMethod.status(500).send(`Error rendering view: ${err.message}`);
      } else {
        resMethod.status(200).send(html || "");
      }
    });
  }

  // Handle incoming requests
  handleRequest(req: IncomingMessage, res: ServerResponse): void {
    const reqMethod = req as Request;
    const resMethod = res as Response;
    const parsedUrl = parseUrl(req);

    // Request Methods
    reqMethod.query = parsedUrl.query;
    reqMethod.path = parsedUrl.pathname;
    reqMethod.ip = this.getClientIp(reqMethod);
    reqMethod.ips = this.getClientIps(reqMethod);
    reqMethod.remoteAddress = req.socket?.remoteAddress || "";
    reqMethod.xForwardedFor = req.headers["x-forwarded-for"];
    reqMethod.cfConnectingIP = req.headers["cf-connecting-ip"] as string | undefined;
    reqMethod.trueClientIP = req.headers["true-client-ip"] as string | undefined;
    reqMethod.protocol = req.socket instanceof tls.TLSSocket ? "https" : "http";
    reqMethod.method = req.method;
    reqMethod.originalUrl = req.url || "";
    reqMethod.baseUrl = "";
    reqMethod.secure = req.socket instanceof tls.TLSSocket;
    resMethod.jsonSpaces = this.jsonSpaces;
    reqMethod.params = {};
    reqMethod.body = {};

    // Request Heades
    reqMethod.xhr = req.headers["x-requested-with"] === "XMLHttpRequest";
    reqMethod.hostname = req.headers.host?.split(":")[0] || "";
    reqMethod.get = (headerName: string) => req.headers[headerName.toLowerCase()] as string | undefined;
    reqMethod.headers = req.headers;
    reqMethod.fresh = false;
    reqMethod.stale = true;

    const etag = req.headers["if-none-match"];
    const lastModified = req.headers["if-modified-since"];

    if (etag || lastModified) {
      const resEtag = res.getHeader("ETag");
      const resLastModified = res.getHeader("Last-Modified");

      if (etag && resEtag === etag) {
        reqMethod.fresh = true;
        reqMethod.stale = false;
      } else if (lastModified && resLastModified === lastModified) {
        reqMethod.fresh = true;
        reqMethod.stale = false;
      }
    }

    reqMethod.accepts = (type: string | string[]): string | boolean | string[] => {
      const acceptHeader = req.headers["accept"];
      if (!acceptHeader) return false;
      const acceptedTypes = acceptHeader.split(",").map((t) => t.trim());

      if (typeof type === "string") {
        return acceptedTypes.some((t) => t.includes(type));
      } else if (Array.isArray(type)) {
        return type.find((t) => acceptedTypes.some((at) => at.includes(t))) || false;
      }
      return false;
    };

    reqMethod.is = (type: string): string | boolean => {
      const contentType = req.headers["content-type"];
      if (!contentType) return false;

      return contentType.includes(type) ? type : false;
    };

    // Response Methods
    resMethod.status = function (code: number) {
      this.statusCode = code;
      return this;
    };

    resMethod.json = function (data: any, spaces?: number) {
      this.setHeader("Content-Type", "application/json");
      this.end(JSON.stringify(data, null, spaces ?? this.jsonSpaces ?? 0));
    };

    resMethod.send = function (data: any, filename = "file.bin") {
      const contentType = this.getHeader("Content-Type");

      if (typeof data === "object" && !Buffer.isBuffer(data)) {
        if (!contentType) this.setHeader("Content-Type", "application/json");
        this.end(JSON.stringify(data, null, this.jsonSpaces));
      } else if (Buffer.isBuffer(data)) {
        if (!contentType) {
          const detectedType = mime.get(filename) || "application/octet-stream";
          this.setHeader("Content-Type", detectedType);
        }
        this.end(data);
      } else if (typeof data.pipe === "function") {
        if (!contentType) {
          const detectedType = mime.get(filename) || "application/octet-stream";
          this.setHeader("Content-Type", detectedType);
        }
        data.pipe(this);
      } else {
        if (!contentType) {
          let detectedType = "text/plain";

          if (typeof data === "string") {
            if (data.trim().startsWith("<!DOCTYPE html>") || data.trim().startsWith("<html>") || data.trim().startsWith("<")) {
              detectedType = "text/html";
            } else if (filename.includes("css")) {
              detectedType = "text/css";
            } else if (filename.includes("js")) {
              detectedType = "application/javascript";
            }
          }

          this.setHeader("Content-Type", detectedType);
        }
        this.end(data);
      }
    };

    resMethod.sendFile = function (filePath: string): void {
      const extname = path.extname(filePath).toLowerCase();
      const contentType = mime.get(extname) || "application/octet-stream";
      const stream = fs.createReadStream(filePath);

      stream.on("error", (err: NodeJS.ErrnoException) => {
        if (err.code === "ENOENT") {
          this.status(404).send("File Not Found");
        } else {
          this.status(500).send("Internal Server Error");
        }
      });

      this.setHeader("Content-Type", contentType);
      stream.pipe(this);
    };

    resMethod.html = function (data: any) {
      this.setHeader("Content-Type", "text/html");
      this.end(data);
    };

    resMethod.redirect = function (url: string) {
      this.writeHead(302, { Location: url });
      this.end();
    };

    resMethod.text = function (data: any) {
      this.setHeader("Content-Type", "text/plain");
      this.end(data);
    };

    resMethod.type = function (type: string) {
      const mimeType = mime.get(type) || type;
      this.setHeader("Content-Type", mimeType);
      return this;
    };

    resMethod.format = function (obj: Record<string, () => void>) {
      const acceptHeader = this.req.headers["accept"] || "*/*";
      const types = Object.keys(obj);

      for (const type of types) {
        if (acceptHeader.includes(type) || type === "*/*") {
          obj[type]();
          return;
        }
      }
      this.status(406).send("Not Acceptable");
    };

    // Response Headers
    resMethod.cookie = function (name: string, value: string, options?: any) {
      const cookie = `${name}=${value}; ${Object.entries(options || {})
        .map(([k, v]) => `${k}=${v}`)
        .join("; ")}`;
      this.setHeader("Set-Cookie", cookie);
    };

    resMethod.clearCookie = function (name: string, options?: any) {
      this.setHeader("Set-Cookie", `${name}=; Expires=Thu, 01 Jan 1970 00:00:00 GMT`);
    };

    const nativeGetHeader = resMethod.getHeader.bind(resMethod);
    resMethod.getHeader = function (name: string) {
      return nativeGetHeader(name);
    };

    const nativeRemoveHeader = resMethod.removeHeader.bind(resMethod);
    resMethod.removeHeader = function (name: string) {
      nativeRemoveHeader(name);
    };

    resMethod.attachment = function (filename = "file") {
      this.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    };

    resMethod.download = function (filePath: string, filename = "file") {
      this.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
      this.sendFile(filePath);
    };

    resMethod.set = function (headers: Record<string, string | number | string[]>) {
      for (const [name, value] of Object.entries(headers)) {
        this.setHeader(name, value);
      }
      return this;
    };

    resMethod.vary = function (field: string) {
      const varyHeader = String(this.getHeader("Vary") || "");
      const fields = varyHeader.split(", ").filter(Boolean);

      if (!fields.includes(field)) {
        fields.push(field);
        this.setHeader("Vary", fields.join(", "));
      }
      return this;
    };

    resMethod.location = function (url: string) {
      this.setHeader("Location", url);
      return this;
    };

    resMethod.links = function (links: Record<string, string>) {
      const linkHeader = Object.entries(links)
        .map(([rel, url]) => `<${url}>; rel="${rel}"`)
        .join(", ");
      this.setHeader("Link", linkHeader);
      return this;
    };

    resMethod.charset = function (charset: string) {
      const contentType = this.getHeader("Content-Type");
      if (typeof contentType === "string") {
        this.setHeader("Content-Type", `${contentType}; charset=${charset}`);
      }
      return this;
    };

    resMethod.app = {};

    // Execute middlewares
    const executeMiddlewares = (index: number) => {
      if (index < this.middlewares.length) {
        try {
          this.middlewares[index](reqMethod, resMethod, () => executeMiddlewares(index + 1));
        } catch (err) {
          console.error("Middleware error:", err);
          resMethod.status(500).send("Internal Server Error");
        }
      } else {
        // Use the pathname (without query string) for route matching
        const pathname = parsedUrl.pathname || "";

        // Check for exact match
        if (this.routes[pathname] && this.routes[pathname][reqMethod.method!]) {
          return this.routes[pathname][reqMethod.method!](reqMethod, resMethod);
        }

        // Check for parameterized routes
        for (const route in this.routes) {
          const routeRegex = convertRouteToRegex(route);
          const match = pathname.match(routeRegex);

          if (match && this.routes[route][reqMethod.method!]) {
            const paramNames = extractParamNames(route);
            paramNames.forEach((name, index) => {
              reqMethod.params[name] = decodeURIComponent(match[index + 1]);
            });

            return this.routes[route][reqMethod.method!](reqMethod, resMethod);
          }
        }

        // If no match found, send 404
        notFoundHandler(reqMethod, resMethod);
      }
    };

    executeMiddlewares(0);
  }
}
