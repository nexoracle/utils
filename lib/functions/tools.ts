import fs from "fs";
import { Readable } from "stream";
import { isArray } from "./validation";
import { axium } from "../modules/axium";
import { execSync } from "child_process";

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
  return JSON.parse(buffer.toString("utf-8"));
};

export const jsontoBuffer = (json: object): Buffer => {
  return Buffer.from(JSON.stringify(json));
};

export const transformBuffer = (buffer: Buffer, transformFn: (data: Buffer) => Buffer): Buffer => {
  return transformFn(buffer);
};

export const bufferToFile = (buffer: Buffer, filePath: string): void => {
  fs.writeFileSync(filePath, buffer);
};

export function toBuffer(data: any): Buffer {
  if (data instanceof Buffer) return data;
  if (typeof data === "string") return Buffer.from(data);
  return Buffer.from(JSON.stringify(data));
}

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

export const sleep = (ms: number = 3000): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

export const randomInt = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;

export const truncate = (text: string, maxLength: number): string => (text.length > maxLength ? text.slice(0, maxLength) + "..." : text);

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

export const flattenArray = <T>(arr: T[]): T[] => {
  return arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flattenArray(val) : val), [] as T[]);
};

export const randomElement = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export const toQueryString = (params: Record<string, any>): string => new URLSearchParams(params).toString();

export const randomHexColor = (): string =>
  `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0")}`;

export const formatNumber = (num: number): string => num.toLocaleString();

export const formatBytes = (bytes: number, decimals = 2): string => {
  if (bytes === 0) return "0 Bytes";
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${sizes[i]}`;
};

export const getTime = (date?: Date | string | number | { utc?: boolean; timezone?: string; format12Hour?: boolean }, options?: { utc?: boolean; timezone?: string; format12Hour?: boolean }): string | null => {
  if (typeof date === "object" && !("getTime" in date)) {
    options = date;
    date = undefined;
  }

  const { utc = false, timezone, format12Hour = true } = options || {};

  let dateObj: Date = date ? new Date(date) : new Date();
  if (isNaN(dateObj.getTime())) return null;

  const formatOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: format12Hour,
    timeZone: timezone || (utc ? "UTC" : undefined),
  };

  return new Intl.DateTimeFormat("en-US", formatOptions).format(dateObj);
};

export const getDate = (date?: Date | string | number | { format?: string; utc?: boolean; timezone?: string }, options?: { format?: string; utc?: boolean; timezone?: string }): string => {
  if (typeof date === "object" && !("getTime" in date)) {
    options = date;
    date = undefined;
  }

  const { format = "DD-MM-YYYY", utc = false, timezone } = options || {};

  let dateObj: Date = date ? new Date(date) : new Date();
  if (isNaN(dateObj.getTime())) throw new Error("Invalid date");

  const formatOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: timezone || (utc ? "UTC" : undefined),
  };

  const formattedDate = new Intl.DateTimeFormat("en-US", formatOptions).format(dateObj);
  const [month, day, year] = formattedDate.split("/");

  switch (format) {
    case "DD-MM-YYYY":
      return `${day}-${month}-${year}`;

    case "MM-DD-YYYY":
      return `${month}-${day}-${year}`;

    case "YYYY-MM-DD":
      return `${year}-${month}-${day}`;

    case "DD/MM/YYYY":
      return `${day}/${month}/${year}`;

    case "MM/DD/YYYY":
      return `${month}/${day}/${year}`;

    case "YYYY/MM/DD":
      return `${year}/${month}/${day}`;

    default:
      return `${year}-${month}-${day}`;
  }
};

export function getTimeZone(): string | null {
  try {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return timeZone || null;
  } catch (error) {
    console.error("Error detecting timezone:", error);
    return null;
  }
}

export const formatJSON = (data: unknown, spaces: number = 2): string | null => {
  try {
    return JSON.stringify(data, null, spaces);
  } catch (error) {
    console.error("Failed to format JSON:", error);
    return null;
  }
};

export function runtime(seconds: number, capitalize: boolean = false, day: string = "day", hour: string = "hour", minute: string = "minute", second: string = "second"): string {
  seconds = Number(seconds);

  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  const dDisplay = d > 0 ? `${d} ${d === 1 ? day : day + "s"}` : "";
  const hDisplay = h > 0 ? `${h} ${h === 1 ? hour : hour + "s"}` : "";
  const mDisplay = m > 0 ? `${m} ${m === 1 ? minute : minute + "s"}` : "";
  const sDisplay = s > 0 ? `${s} ${s === 1 ? second : second + "s"}` : "";

  let result = [dDisplay, hDisplay, mDisplay, sDisplay].filter((part) => part !== "").join(", ");

  if (capitalize && result.length > 0) {
    result = result
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  return result;
}

export async function getFileSize(path: string | Buffer): Promise<string> {
  try {
    if (!path) {
      console.error("Path is not provided.");
      return "0";
    }

    if (typeof path === "string" && (path.startsWith("http") || path.startsWith("Http"))) {
      try {
        const response = await axium.head(path);
        if (!response.ok) {
          throw new Error(`Failed to fetch headers: ${response.status} ${response.statusText}`);
        }

        const contentLength = response.headers.get("content-length");
        if (!contentLength) {
          throw new Error("Content-Length header is missing.");
        }

        const length = parseInt(contentLength, 10);
        if (isNaN(length)) {
          throw new Error("Invalid Content-Length header.");
        }

        return formatBytes(length, 3);
      } catch (error) {
        console.error(`Error fetching size from URL (${path}):`, error);
        return "0";
      }
    }

    if (typeof path === "string") {
      try {
        const stats = fs.statSync(path);
        return formatBytes(stats.size, 3);
      } catch (error) {
        console.error(`Error reading local file (${path}):`, error);
        return "0";
      }
    }

    if (Buffer.isBuffer(path)) {
      const length = Buffer.byteLength(path);
      return formatBytes(length, 3);
    }

    throw new Error("Error: Couldn't fetch size of file. Invalid path type.");
  } catch (error) {
    console.error("Failed to get file size:", error);
    return "0";
  }
}

export function ensurePackage(packageName: string, packageManager: "npm" | "yarn" | "pnpm" = "npm", shouldInstall: boolean = true): any {
  try {
    return require(packageName);
  } catch (e) {
    console.log(`Package "${packageName}" is not installed.`);

    if (!shouldInstall) {
      return null;
    }

    console.log(`Installing "${packageName}" using ${packageManager}...`);

    try {
      const installCommand = packageManager === "yarn" ? `yarn add ${packageName}` : packageManager === "pnpm" ? `pnpm install ${packageName}` : `npm install ${packageName}`;

      execSync(installCommand, { stdio: "inherit" });
      console.log(`Successfully installed "${packageName}".`);

      return require(packageName);
    } catch (err) {
      console.error(`Failed to install "${packageName}"`, err);
      return null;
    }
  }
}
