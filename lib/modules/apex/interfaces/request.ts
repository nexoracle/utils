import { IncomingMessage, IncomingHttpHeaders } from "http";

export interface Request extends IncomingMessage {
  body?: any;
  query?: { [key: string]: string | string[] };
  params: { [key: string]: string };
  ip?: string;
  ips?: string[];
  remoteAddress: string;
  xForwardedFor: string | string[] | undefined;
  cfConnectingIP: string | undefined;
  trueClientIP: string | undefined;
  flash?: (type: string, message?: string) => string[] | void;
  path?: string;
  protocol?: string;
  method?: string;
  files?: any;
  file?: any;
  originalUrl: string;
  baseUrl: string;
  secure: boolean;

  cookies?: { [key: string]: string };
  session?: any;
  hostname?: string;
  headers: IncomingHttpHeaders;
  get?: (headerName: string) => string | undefined;
  accepts: (type: string | string[]) => string | boolean | string[];
  is: (type: string) => string | boolean;
  fresh: boolean;
  stale: boolean;
  xhr: boolean;
}
