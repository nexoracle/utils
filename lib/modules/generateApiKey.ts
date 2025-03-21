import { createHash, randomBytes } from "crypto";

interface StringOptions {
  method: "string";
  min?: number;
  max?: number;
  length?: number;
  pool?: string;
  prefix?: string;
  batch?: number;
}

interface BytesOptions {
  method: "bytes";
  min?: number;
  max?: number;
  length?: number;
  prefix?: string;
  batch?: number;
}

interface Base32Options {
  method: "base32";
  dashes?: boolean;
  prefix?: string;
  batch?: number;
}

interface Base64Options {
  method: "base64";
  prefix?: string;
  batch?: number;
}

interface UuidV4Options {
  method: "uuidv4";
  dashes?: boolean;
  prefix?: string;
  batch?: number;
}

interface UuidV5Options {
  method: "uuidv5";
  name: string;
  namespace?: string;
  dashes?: boolean;
  prefix?: string;
  batch?: number;
}

type Options = StringOptions | BytesOptions | Base32Options | Base64Options | UuidV4Options | UuidV5Options;

function generateRandomString(length: number, pool: string): string {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += pool[Math.floor(Math.random() * pool.length)];
  }
  return result;
}

function generateRandomBytes(length: number): string {
  const bytes = randomBytes(length);
  return bytes.toString("hex").slice(0, length);
}

function generateBase32(dashes: boolean = true): string {
  const uuid = generateUuidV4(false);
  const base32Chars = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";
  let result = "";
  for (let i = 0; i < uuid.length; i++) {
    const char = uuid[i];
    if (char !== "-") {
      result += base32Chars[parseInt(char, 16) % 32];
    }
  }
  return dashes ? result.match(/.{1,4}/g)!.join("-") : result;
}

function generateBase64(): string {
  const bytes = randomBytes(24);
  return bytes.toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

function generateUuidV4(dashes: boolean = true): string {
  const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
  return dashes ? uuid : uuid.replace(/-/g, "");
}

function generateUuidV5(name: string, namespace: string, dashes: boolean = true): string {
  const namespaceBytes = uuidToBytes(namespace || generateUuidV4(false));
  const nameBytes = Buffer.from(name, "utf8");
  const data = Buffer.concat([namespaceBytes, nameBytes]);
  const hash = createHash("sha1").update(data).digest();
  const hashBytes = hash.slice(0, 16);

  hashBytes[6] = (hashBytes[6] & 0x0f) | 0x50;
  hashBytes[8] = (hashBytes[8] & 0x3f) | 0x80;

  const hex = hashBytes.toString("hex");
  const uuid = `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20, 32)}`;
  return dashes ? uuid : uuid.replace(/-/g, "");
}

function uuidToBytes(uuid: string): Buffer {
  const hex = uuid.replace(/-/g, "");
  return Buffer.from(hex, "hex");
}

export function generateApiKey(options: Options = { method: "string" }): string | string[] {
  const { method, prefix, batch } = options;

  const generateKey = () => {
    switch (method) {
      case "string": {
        const { min = 16, max = 32, length, pool = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._~+/" } = options as StringOptions;
        const len = length || Math.floor(Math.random() * (max - min + 1)) + min;
        return generateRandomString(len, pool);
      }
      case "bytes": {
        const { min = 16, max = 32, length } = options as BytesOptions;
        const len = length || Math.floor(Math.random() * (max - min + 1)) + min;
        return generateRandomBytes(len);
      }
      case "base32": {
        const { dashes = true } = options as Base32Options;
        return generateBase32(dashes);
      }
      case "base64": {
        return generateBase64();
      }
      case "uuidv4": {
        const { dashes = true } = options as UuidV4Options;
        return generateUuidV4(dashes);
      }
      case "uuidv5": {
        const { name, namespace, dashes = true } = options as UuidV5Options;
        return generateUuidV5(name, namespace || generateUuidV4(false), dashes);
      }
      default:
        throw new Error(`Unsupported method: ${method}`);
    }
  };

  if (batch) {
    return Array.from({ length: batch }, () => {
      const key = generateKey();
      return prefix ? `${prefix}.${key}` : key;
    });
  }

  const key = generateKey();
  return prefix ? `${prefix}.${key}` : key;
}

// Inspired By: https://github.com/pauldenver/generate-api-key
