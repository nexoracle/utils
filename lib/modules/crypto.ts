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

interface PasswordOptions {
  length?: number;
  numbers?: boolean;
  symbols?: boolean;
  uppercase?: boolean;
  lowercase?: boolean;
  excludeSimilar?: boolean;
  include?: string;
  exclude?: string;
}

export const passwordGenerator = {
  defaultOptions: {
    length: 16,
    numbers: true,
    symbols: true,
    uppercase: true,
    lowercase: true,
    excludeSimilar: true,
    include: "",
    exclude: "",
  } as PasswordOptions,

  generate: function (customOptions: PasswordOptions = {}): string {
    const options = { ...this.defaultOptions, ...customOptions };
    const { length, numbers, symbols, uppercase, lowercase, excludeSimilar, include, exclude } = options;

    const numbersChars = "0123456789";
    const symbolsChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    let chars = "";
    if (lowercase) chars += excludeSimilar ? lowercaseChars.replace(/[ilo]/g, "") : lowercaseChars;
    if (uppercase) chars += excludeSimilar ? uppercaseChars.replace(/[ILO]/g, "") : uppercaseChars;
    if (numbers) chars += excludeSimilar ? numbersChars.replace(/[01]/g, "") : numbersChars;
    if (symbols) chars += symbolsChars;

    const includeChars = include ? include.split("").filter((c) => !exclude || !exclude.includes(c)) : [];

    if (exclude) {
      const excludeSet = new Set(exclude.split(""));
      chars = chars
        .split("")
        .filter((c) => !excludeSet.has(c))
        .join("");
    }

    for (const char of includeChars) {
      if (!chars.includes(char)) {
        chars += char;
      }
    }

    if (!chars.length) throw new Error("No characters available for password");

    let password = "";
    const randomBytes = Crypto.randomBytes(length!);

    for (let i = 0; i < length!; i++) {
      password += chars[randomBytes[i] % chars.length];
    }

    if (includeChars.length > 0) {
      const passwordChars = new Set(password.split(""));
      const missingIncludeChars = includeChars.filter((c) => !passwordChars.has(c));

      if (missingIncludeChars.length === includeChars.length) {
        const charToInclude = includeChars[Crypto.randomBytes(1)[0] % includeChars.length];
        const replacePos = Crypto.randomBytes(1)[0] % length!;
        password = password.substring(0, replacePos) + charToInclude + password.substring(replacePos + 1);
      }
    }

    return password;
  },

  generateMultiple: function (count: number = 5, customOptions: PasswordOptions = {}): string[] {
    return Array.from({ length: count }, () => this.generate(customOptions));
  },
};
