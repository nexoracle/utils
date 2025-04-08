import { Middleware } from "../types/Middleware";
import fs from "fs";

export function favicon(iconPath?: string): Middleware {
  return (req, res, next) => {
    if (req.url === "/favicon.ico" && iconPath) {
      fs.stat(iconPath, (err, stats) => {
        if (err || !stats.isFile()) {
          res.status(404).send("Favicon not found");
        } else {
          res.sendFile(iconPath);
        }
      });
    } else {
      next();
    }
  };
}
