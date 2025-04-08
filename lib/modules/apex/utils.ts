import { IncomingMessage } from "http";
import url from "url";
import { Request } from "./interfaces/request";
import { Response } from "./interfaces/response";

export function parseUrl(req: IncomingMessage): { pathname: string; query: { [key: string]: string | string[] } } {
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

// Convert route path to regex for parameter matching
export function convertRouteToRegex(route: string): RegExp {
  const pattern = route.replace(/:\w+/g, "([^/]+)");
  return new RegExp(`^${pattern}$`);
}

// Extract parameter names from route path
export function extractParamNames(route: string): string[] {
  const paramNames: string[] = [];
  route.replace(/:\w+/g, (match) => {
    paramNames.push(match.slice(1));
    return match;
  });
  return paramNames;
}

// Default 404 handler
export function notFoundHandler(req: Request, res: Response): void {
  res.status(404).send("404 Not Found");
}
