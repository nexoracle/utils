import { Request } from "../interfaces/request";
import { Response } from "../interfaces/response";

export type Middleware = (req: Request, res: Response, next: () => void) => void;
