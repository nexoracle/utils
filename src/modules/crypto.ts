import crypto from "crypto"

export const sha256 = (data: string): string => 
    crypto.createHash("sha256").update(data).digest("hex");

export const randomBytes = (length: number = 16): string => 
    crypto.randomBytes(length).toString("hex");

export const generateUUID = (): string => crypto.randomUUID();

export const encryptAES = (text: string, key: string): string => {
    const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(key, "hex"), Buffer.alloc(16, 0));
    return cipher.update(text, "utf8", "hex") + cipher.final("hex");
};

export const decryptAES = (encrypted: string, key: string): string => {
    const decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(key, "hex"), Buffer.alloc(16, 0));
    return decipher.update(encrypted, "hex", "utf8") + decipher.final("utf8");
};