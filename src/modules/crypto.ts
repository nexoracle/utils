import * as Crypto from "crypto";

export const crypto = {
  sha256: (data: string): string => 
    Crypto.createHash("sha256").update(data).digest("hex"),

  sha512: (data: string): string => 
    Crypto.createHash("sha512").update(data).digest("hex"),

  md5: (data: string): string => 
    Crypto.createHash("md5").update(data).digest("hex"),

  // Random generation
  randomBytes: (length: number = 16): string => 
    Crypto.randomBytes(length).toString("hex"),

  generateUUID: (): string => Crypto.randomUUID(),

  // AES encryption/decryption
  encryptAES: (text: string, key: string, iv?: string): string => {
    const ivBuffer = iv ? Buffer.from(iv, "hex") : Buffer.alloc(16, 0); // Allow custom IV
    const cipher = Crypto.createCipheriv("aes-256-cbc", Buffer.from(key, "hex"), ivBuffer);
    return cipher.update(text, "utf8", "hex") + cipher.final("hex");
  },

  decryptAES: (encrypted: string, key: string, iv?: string): string => {
    const ivBuffer = iv ? Buffer.from(iv, "hex") : Buffer.alloc(16, 0); // Allow custom IV
    const decipher = Crypto.createDecipheriv("aes-256-cbc", Buffer.from(key, "hex"), ivBuffer);
    return decipher.update(encrypted, "hex", "utf8") + decipher.final("utf8");
  },

  // HMAC (Hash-based Message Authentication Code)
  hmacSHA256: (data: string, secret: string): string => 
    Crypto.createHmac("sha256", secret).update(data).digest("hex"),

  hmacSHA512: (data: string, secret: string): string => 
    Crypto.createHmac("sha512", secret).update(data).digest("hex"),

  // PBKDF2 (Password-Based Key Derivation Function)
  pbkdf2: (password: string, salt: string, iterations: number = 10000, keylen: number = 64, digest: string = "sha512"): string => 
    Crypto.pbkdf2Sync(password, salt, iterations, keylen, digest).toString("hex"),

  // RSA/EC/ED25519/ED448/X25519/X448 key generation
  generateKeyPair: (
    type: "rsa" = "rsa",
    options: Crypto.RSAKeyPairOptions<'pem', 'pem'> = {
      modulusLength: 2048,
      publicKeyEncoding: { type: "spki", format: "pem" },
      privateKeyEncoding: { type: "pkcs8", format: "pem" }
    }
  ): Crypto.KeyPairSyncResult<string, string> => {
    return Crypto.generateKeyPairSync(type, options);
  },

  // RSA encryption/decryption
  encryptRSA: (text: string, publicKey: string): string => 
    Crypto.publicEncrypt(publicKey, Buffer.from(text, "utf8")).toString("base64"),

  decryptRSA: (encrypted: string, privateKey: string): string => 
    Crypto.privateDecrypt(privateKey, Buffer.from(encrypted, "base64")).toString("utf8"),

  // Sign and verify (RSA/ECDSA)
  sign: (data: string, privateKey: string, algorithm: string = "RSA-SHA256"): string => 
    Crypto.createSign(algorithm).update(data).sign(privateKey, "hex"),

  verify: (data: string, signature: string, publicKey: string, algorithm: string = "RSA-SHA256"): boolean => 
    Crypto.createVerify(algorithm).update(data).verify(publicKey, signature, "hex"),
};
