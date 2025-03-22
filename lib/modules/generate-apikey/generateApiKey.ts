import { Options, StringOptions, BytesOptions, Base32Options, UuidV4Options, UuidV5Options } from "./interfaces";
import { generateRandomString, generateRandomBytes, generateBase32, generateBase64, generateUuidV4, generateUuidV5 } from "./generator";

export default function generateApiKey(options: Options = { method: "string" }): string | string[] {
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
