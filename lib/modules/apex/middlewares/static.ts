import { Middleware } from "../types/Middleware";
import fs from "fs";
import path from "path";
import { parseUrl } from "../utils";

export function serveStatic(prefix: string, staticPath?: string): Middleware {
  if (!staticPath) {
    staticPath = prefix;
    prefix = "/";
  }

  return (req, res, next) => {
    const { pathname } = parseUrl(req);

    if (!pathname.startsWith(prefix)) {
      return next();
    }

    const relativePath = pathname.slice(prefix.length);
    const filePath = path.join(staticPath!, relativePath);

    fs.stat(filePath, (err, stats) => {
      if (err || !stats.isFile()) {
        next();
      } else {
        res.sendFile(filePath);
      }
    });
  };
}
