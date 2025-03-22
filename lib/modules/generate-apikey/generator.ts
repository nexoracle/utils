import { createHash, randomBytes } from "crypto";

export function generateRandomString(length: number, pool: string): string {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += pool[Math.floor(Math.random() * pool.length)];
  }
  return result;
}

export function generateRandomBytes(length: number): string {
  const bytes = randomBytes(length);
  return bytes.toString("hex").slice(0, length);
}

export function generateBase32(dashes: boolean = true): string {
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

export function generateBase64(): string {
  const bytes = randomBytes(24);
  return bytes.toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

export function generateUuidV4(dashes: boolean = true): string {
  const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
  return dashes ? uuid : uuid.replace(/-/g, "");
}

export function generateUuidV5(name: string, namespace: string, dashes: boolean = true): string {
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

export function uuidToBytes(uuid: string): Buffer {
  const hex = uuid.replace(/-/g, "");
  return Buffer.from(hex, "hex");
}
