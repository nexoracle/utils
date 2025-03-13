import { promises as fs } from "fs";
import { Readable } from "stream";
import { isArray } from "./validation";

export function getRandom(
  options: {
    Alphabets?: boolean;
    Numbers?: boolean;
    Symbols?: boolean;
    DateNow?: boolean;
    length?: number;
    fileExtension?: string;
    attachFileExtension?: boolean;
  } = {}
): string {
  const { Alphabets = true, Numbers = true, Symbols = false, DateNow = false, length = 20, fileExtension = ".png", attachFileExtension = false } = options;

  let characters = "";

  if (Alphabets) characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  if (Numbers) characters += "0123456789";
  if (Symbols) characters += "!@#$%^&*()_+-=[]{}|;:,<>?/~";
  if (DateNow) characters += String(Date.now());

  if (characters === "") {
    throw new Error("At least one type of character must be included.");
  }

  let randomString = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters[randomIndex];
  }

  return attachFileExtension ? randomString + fileExtension : randomString;
}

export function randomizeArray<T>(arr: T[]): T[] {
  if (!isArray(arr)) {
    throw new Error("Input must be an array");
  }

  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}


export function ReadMore(length: number = 4001): string {
  return "\u200E".repeat(length);
}

export const buffertoJson = (buffer: Buffer): any => {
	return JSON.parse(buffer.toString('utf-8'));
};

export const jsontoBuffer = (json: object): Buffer => {
	return Buffer.from(JSON.stringify(json));
};

export const transformBuffer = (buffer: Buffer, transformFn: (data: Buffer) => Buffer): Buffer => {
  return transformFn(buffer);
};

export const bufferToFile = async (buffer: Buffer, filePath: string): Promise<void> => {
  await fs.writeFile(filePath, buffer);
};

export function toBuffer(data: any): Buffer {
  if (data instanceof Buffer) return data;
  if (typeof data === "string") return Buffer.from(data);
  return Buffer.from(JSON.stringify(data));
}

export const extractUrlFromString = (str: string): string | null => {
  const urlRegex = /(https?:\/\/[^\s"'<>()]+)/i;
  const match = str.match(urlRegex);
  return match ? match[0] : null;
};

export const getBufferFromStream = async (stream: Readable): Promise<Buffer> => {
  if (!stream.readable) {
    throw new Error("Stream is not readable");
  }

  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("end", () => resolve(Buffer.concat(chunks)));
    stream.on("error", reject);
  });
};

export const getStreamFromBuffer = (buffer: Buffer): Readable => {
  const readable = new Readable();
  readable.push(buffer);
  readable.push(null);
  return readable;
};

export const sleep = (ms: number = 3000): Promise<void> => 
  new Promise((resolve) => setTimeout(resolve, ms));

export const randomInt = (min: number, max: number): number => 
  Math.floor(Math.random() * (max - min + 1)) + min;

export const truncate = (text: string, maxLength: number): string => 
  text.length > maxLength ? text.slice(0, maxLength) + "..." : text;


export const timeAgo = (date: Date): string => {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  const intervals = [
      { label: "year", seconds: 31536000 },
      { label: "month", seconds: 2592000 },
      { label: "day", seconds: 86400 },
      { label: "hour", seconds: 3600 },
      { label: "minute", seconds: 60 },
  ];

  for (const { label, seconds: s } of intervals) {
      const interval = Math.floor(seconds / s);
      if (interval >= 1) return `${interval} ${label}${interval > 1 ? "s" : ""} ago`;
  }
  return "Just now";
};

export const uniqueArray = <T>(arr: T[]): T[] => [...new Set(arr)];

export const randomElement = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export const toQueryString = (params: Record<string, any>): string => 
  new URLSearchParams(params).toString();

export const randomHexColor = (): string => 
  `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`;

export const formatNumber = (num: number): string => num.toLocaleString();

export const formatBytes = (bytes: number, decimals = 2): string => {
  if (bytes === 0) return "0 Bytes";
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${sizes[i]}`;
};

export const getTime = (
  date: Date = new Date(),
  options?: { utc?: boolean; timezone?: string; format12Hour?: boolean }
): string => {
  const { utc = false, timezone, format12Hour = true } = options || {};
  const formatOptions: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: format12Hour,
      timeZone: timezone || (utc ? "UTC" : undefined),
  };
  return new Intl.DateTimeFormat("en-US", formatOptions).format(date);
};

export const getDate = (date: Date = new Date(), options?: { format?: string; utc?: boolean; timezone?: string }): string => {
  const { format = "YYYY-MM-DD", utc = false, timezone } = options || {};

  const formatOptions: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      timeZone: timezone || (utc ? "UTC" : undefined),
  };

  const formattedDate = new Intl.DateTimeFormat("en-US", formatOptions).format(date);
  const [month, day, year] = formattedDate.split("/");
  
  switch (format) {
      case "YYYY-MM-DD": return `${year}-${month}-${day}`;
      case "DD-MM-YYYY": return `${day}-${month}-${year}`;
      case "MM/DD/YYYY": return `${month}/${day}/${year}`;
      case "YYYY/MM/DD": return `${year}/${month}/${day}`;
      default: return `${year}-${month}-${day}`; // Default fallback
  }
};
