import * as Crypto from "crypto";
import fs from "fs";

export const crypto = {
  sha256: (data: string): string => Crypto.createHash("sha256").update(data).digest("hex"),
  sha512: (data: string): string => Crypto.createHash("sha512").update(data).digest("hex"),
  md5: (data: string): string => Crypto.createHash("md5").update(data).digest("hex"),

  randomBytes: (length: number = 16): string => Crypto.randomBytes(length).toString("hex"),

  generateUUID: (): string => Crypto.randomUUID(),

  encryptAES: (text: string, key: string, iv?: string): string => {
    const ivBuffer = iv ? Buffer.from(iv, "hex") : Buffer.alloc(16, 0);
    const cipher = Crypto.createCipheriv("aes-256-cbc", Buffer.from(key, "hex"), ivBuffer);
    return cipher.update(text, "utf8", "hex") + cipher.final("hex");
  },

  decryptAES: (encrypted: string, key: string, iv?: string): string => {
    const ivBuffer = iv ? Buffer.from(iv, "hex") : Buffer.alloc(16, 0);
    const decipher = Crypto.createDecipheriv("aes-256-cbc", Buffer.from(key, "hex"), ivBuffer);
    return decipher.update(encrypted, "hex", "utf8") + decipher.final("utf8");
  },

  hmacSHA256: (data: string, secret: string): string => Crypto.createHmac("sha256", secret).update(data).digest("hex"),
  hmacSHA512: (data: string, secret: string): string => Crypto.createHmac("sha512", secret).update(data).digest("hex"),

  pbkdf2: (password: string, salt: string, iterations: number = 10000, keylen: number = 64, digest: string = "sha512"): string => Crypto.pbkdf2Sync(password, salt, iterations, keylen, digest).toString("hex"),

  generateKeyPair: (type: "rsa" | "ec" | "ed25519" | "ed448" | "x25519" | "x448" = "rsa", options?: Crypto.RSAKeyPairOptions<"pem", "pem"> | Crypto.ECKeyPairOptions<"pem", "pem">, saveToFile: boolean = false): Crypto.KeyPairSyncResult<string, string> => {
    let defaultOptions: any;

    switch (type) {
      case "rsa":
        defaultOptions = {
          modulusLength: 2048,
          publicKeyEncoding: { type: "spki", format: "pem" },
          privateKeyEncoding: { type: "pkcs8", format: "pem" },
        };
        break;
      case "ec":
        defaultOptions = {
          namedCurve: "secp256k1",
          publicKeyEncoding: { type: "spki", format: "pem" },
          privateKeyEncoding: { type: "pkcs8", format: "pem" },
        };
        break;
      case "ed25519":
      case "ed448":
      case "x25519":
      case "x448":
        defaultOptions = {
          publicKeyEncoding: { type: "spki", format: "pem" },
          privateKeyEncoding: { type: "pkcs8", format: "pem" },
        };
        break;
    }

    const keyPair = Crypto.generateKeyPairSync(type as any, options || defaultOptions);

    if (saveToFile) {
      fs.writeFileSync("public.pem", keyPair.publicKey);
      fs.writeFileSync("private.pem", keyPair.privateKey);
    }

    return keyPair;
  },

  encryptRSA: (text: string, publicKey: string): string => Crypto.publicEncrypt(publicKey, Buffer.from(text, "utf8")).toString("base64"),
  decryptRSA: (encrypted: string, privateKey: string): string => Crypto.privateDecrypt(privateKey, Buffer.from(encrypted, "base64")).toString("utf8"),

  sign: (data: string, privateKey: string, algorithm: string = "RSA-SHA256"): string => Crypto.createSign(algorithm).update(data).sign(privateKey, "hex"),
  verify: (data: string, signature: string, publicKey: string, algorithm: string = "RSA-SHA256"): boolean => Crypto.createVerify(algorithm).update(data).verify(publicKey, signature, "hex"),
};
