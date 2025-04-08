import { Middleware } from "../types/Middleware";
import { Request } from "../interfaces/request";
import { Response } from "../interfaces/response";

export function bodyParser(): Middleware {
  return (req: Request, res: Response, next: () => void) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      if (!body) {
        req.body = {};
        return next();
      }

      if (req.headers["content-type"] === "application/json") {
        try {
          req.body = JSON.parse(body);
        } catch (err) {
          console.error("Error parsing JSON body:", err);
          req.body = {};
        }
      } else if (req.headers["content-type"] === "application/x-www-form-urlencoded") {
        req.body = Object.fromEntries(new URLSearchParams(body));
      } else if (req.headers["content-type"] === "text/plain") {
        req.body = body;
      } else {
        req.body = {};
      }
      next();
    });
  };
}
