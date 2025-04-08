import { ServerResponse } from "http";

export interface Response extends ServerResponse {
  text: (data: any) => void;
  html: (data: any) => void;
  status: (code: number) => Response;
  type: (type: string) => Response;
  json: (data: any, spaces?: number) => void;
  send: (data: any) => void;
  sendFile: (filePath: string) => void;
  redirect: (url: string) => void;

  charset: (charset: string) => Response;
  links: (links: Record<string, string>) => Response;
  download: (filePath: string, filename?: string) => void;
  attachment: (filename?: string) => void;
  cookie: (name: string, value: string, options?: any) => void;
  clearCookie: (name: string, options?: any) => void;
  format: (obj: Record<string, () => void>) => void;
  getHeader: (name: string) => string | number | string[] | undefined;
  removeHeader: (name: string) => void;
  set: (headers: Record<string, string | number | string[]>) => Response;
  vary: (field: string) => Response;
  location: (url: string) => Response;

  locals?: { [key: string]: any };
  jsonSpaces: number;
  app: any;
}
