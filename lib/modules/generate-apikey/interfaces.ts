export interface StringOptions {
  method: "string";
  min?: number;
  max?: number;
  length?: number;
  pool?: string;
  prefix?: string;
  batch?: number;
}

export interface BytesOptions {
  method: "bytes";
  min?: number;
  max?: number;
  length?: number;
  prefix?: string;
  batch?: number;
}

export interface Base32Options {
  method: "base32";
  dashes?: boolean;
  prefix?: string;
  batch?: number;
}

export interface Base64Options {
  method: "base64";
  prefix?: string;
  batch?: number;
}

export interface UuidV4Options {
  method: "uuidv4";
  dashes?: boolean;
  prefix?: string;
  batch?: number;
}

export interface UuidV5Options {
  method: "uuidv5";
  name: string;
  namespace?: string;
  dashes?: boolean;
  prefix?: string;
  batch?: number;
}

export type Options = StringOptions | BytesOptions | Base32Options | Base64Options | UuidV4Options | UuidV5Options;
