import { Request } from "../interfaces/request";

export type CorsOriginCallback = (err: Error | null, origin?: boolean | string) => void;
export type CorsOrigin = boolean | string | RegExp | (string | RegExp)[] | ((req: Request, callback: CorsOriginCallback) => void);
