import { Middleware } from "../types/Middleware";
import { Response } from "../interfaces/response";
import { Request } from "../interfaces/request";

export function useFlash(): Middleware {
  return (req: Request, res: Response, next: () => void) => {
    const flashMessages: { [key: string]: string[] } = {};

    req.flash = (type: string, message?: string): string[] | void => {
      if (!flashMessages[type]) {
        flashMessages[type] = [];
      }
      if (message) {
        flashMessages[type].push(message);
      }
      return flashMessages[type];
    };

    res.locals = res.locals || {};
    res.locals.messages = flashMessages;

    next();
  };
}
