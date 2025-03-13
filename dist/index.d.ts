import { Readable } from 'stream';
import os from 'os';
import querystring from 'querystring';
import http from 'http';

declare function getRandom(options?: {
    Alphabets?: boolean;
    Numbers?: boolean;
    Symbols?: boolean;
    DateNow?: boolean;
    length?: number;
    fileExtension?: string;
    attachFileExtension?: boolean;
}): string;
declare function randomizeArray<T>(arr: T[]): T[];
declare function ReadMore(length?: number): string;
declare const buffertoJson: (buffer: Buffer) => any;
declare const jsontoBuffer: (json: object) => Buffer;
declare const transformBuffer: (buffer: Buffer, transformFn: (data: Buffer) => Buffer) => Buffer;
declare const bufferToFile: (buffer: Buffer, filePath: string) => Promise<void>;
declare function toBuffer(data: any): Buffer;
declare const extractUrlFromString: (str: string) => string | null;
declare const getBufferFromStream: (stream: Readable) => Promise<Buffer>;
declare const getStreamFromBuffer: (buffer: Buffer) => Readable;
declare const sleep: (ms?: number) => Promise<void>;
declare const randomInt: (min: number, max: number) => number;
declare const truncate: (text: string, maxLength: number) => string;
declare const timeAgo: (date: Date) => string;
declare const uniqueArray: <T>(arr: T[]) => T[];
declare const randomElement: <T>(arr: T[]) => T;
declare const toQueryString: (params: Record<string, any>) => string;
declare const randomHexColor: () => string;
declare const formatNumber: (num: number) => string;
declare const formatBytes: (bytes: number, decimals?: number) => string;
declare const getTime: (date?: Date | string | number | {
    utc?: boolean;
    timezone?: string;
    format12Hour?: boolean;
}, options?: {
    utc?: boolean;
    timezone?: string;
    format12Hour?: boolean;
}) => string | null;
declare const getDate: (date?: Date, options?: {
    format?: string;
    utc?: boolean;
    timezone?: string;
}) => string;

declare function isURL(url: string): boolean;
declare function toBool(input: string, returnBool?: boolean): string | boolean;
declare const isEmail: (email: string) => boolean;
declare const isObject: (value: unknown) => boolean;
declare function isArray(input: unknown): input is unknown[];

interface FetchOptions extends RequestInit {
    retries?: number;
    retryDelay?: number;
    timeout?: number;
}
declare function fetchRequest(url: string, options?: FetchOptions): Promise<any>;
declare const getJson: (url: string, options?: FetchOptions) => Promise<any>;
declare const postJson: (url: string, data: any, options?: FetchOptions) => Promise<any>;
declare const putJson: (url: string, data: any, options?: FetchOptions) => Promise<any>;
declare const patchJson: (url: string, data: any, options?: FetchOptions) => Promise<any>;
declare const deleteRequest: (url: string, options?: FetchOptions) => Promise<any>;
declare const deleteJson: (url: string, data: any, options?: FetchOptions) => Promise<any>;
declare const headRequest: (url: string, options?: FetchOptions) => Promise<any>;
declare const getBuffer: (url: string, options?: FetchOptions) => Promise<any>;

declare const sha256: (data: string) => string;
declare const randomBytes: (length?: number) => string;
declare const generateUUID: () => string;
declare const encryptAES: (text: string, key: string) => string;
declare const decryptAES: (encrypted: string, key: string) => string;

declare const readFile: (path: string) => string | null;
declare const writeFile: (path: string, data: string) => void;
declare const appendToFile: (path: string, data: string) => void;
declare const deleteFile: (path: string) => void;
declare const fileExists: (path: string) => boolean;

/**
 * Get detailed system information
 */
declare const getSystemInfo: () => {
    platform: NodeJS.Platform;
    osType: string;
    release: string;
    architecture: string;
    cpuModel: string;
    cpuCores: number;
    totalMemory: string;
    freeMemory: string;
    uptime: string;
    homeDir: string;
    hostname: string;
};
/**
 * Get CPU Load Average
 */
declare const getCpuLoad: () => number[];
/**
 * Get Network Interfaces
 */
declare const getNetworkInterfaces: () => NodeJS.Dict<os.NetworkInterfaceInfo[]>;
/**
 * Get User Info
 */
declare const getUserInfo: () => os.UserInfo<string>;

/**
 * Get file name with or without extension
 */
declare const getFileName: (filePath: string, withExt?: boolean) => string;
/**
 * Get absolute path from relative path
 */
declare const getAbsolutePath: (relativePath: string) => string;
/**
 * Normalize a file path (removes extra slashes and dots)
 */
declare const normalizePath: (filePath: string) => string;
/**
 * Get file extension with or without dot
 */
declare const getFileExtension: (filePath: string, withDot?: boolean) => string;
/**
 * Join multiple paths dynamically
 */
declare const joinPaths: (...paths: string[]) => string;
/**
 * Get relative path from one location to another
 */
declare const getRelativePath: (from: string, to: string) => string;

declare const pasrseURL: (urlString: string) => {
    protocol: string;
    hostname: string;
    pathname: string;
    query: querystring.ParsedUrlQuery;
};
declare const buildUrl: (baseUrl: string, params: Record<string, string | number>) => string;

/**
 * Run a command asynchronously and return the output
 */
declare const runCommand: (command: string, cwd?: string, timeout?: number) => Promise<string>;
/**
 * Run a command synchronously and return output
 */
declare const runCommandSync: (command: string, cwd?: string) => string | null;
/**
 * Run a command with arguments using spawn
 */
declare const runSpawn: (command: string, args: string[], cwd?: string) => Promise<string>;

declare function sendText(res: http.ServerResponse, statusCode: number, message: string): void;
declare function sendJson(res: http.ServerResponse, statusCode: number, data: object): void;
declare function sendBuffer(res: http.ServerResponse, statusCode: number, buffer: Buffer, contentType?: string): void;
declare function parseUrl(req: http.IncomingMessage): {
    pathname: string;
    query: {
        [key: string]: string | string[];
    };
};
declare function getMethod(req: http.IncomingMessage): string;
declare function getRequestBody(req: http.IncomingMessage, options?: {
    timeout?: number;
    maxSize?: number;
}): Promise<string>;
declare function serveStatic(res: http.ServerResponse, filePath: string): void;
declare class Router {
    private routes;
    addRoute(path: string, method: string, handler: (req: http.IncomingMessage, res: http.ServerResponse) => void): void;
    handleRequest(req: http.IncomingMessage, res: http.ServerResponse): void;
    private notFoundHandler;
}
declare function createServer(router: Router): http.Server;

declare function log(...args: any[]): void;
declare function error(...args: any[]): void;
declare function warn(...args: any[]): void;
declare function info(...args: any[]): void;
declare function debug(...args: any[]): void;
declare function table(data: any, columns?: string[]): void;
declare function clear(): void;

export { FetchOptions, ReadMore, Router, appendToFile, bufferToFile, buffertoJson, buildUrl, clear, createServer, debug, decryptAES, deleteFile, deleteJson, deleteRequest, encryptAES, error, extractUrlFromString, fetchRequest, fileExists, formatBytes, formatNumber, generateUUID, getAbsolutePath, getBuffer, getBufferFromStream, getCpuLoad, getDate, getFileExtension, getFileName, getJson, getMethod, getNetworkInterfaces, getRandom, getRelativePath, getRequestBody, getStreamFromBuffer, getSystemInfo, getTime, getUserInfo, headRequest, info, isArray, isEmail, isObject, isURL, joinPaths, jsontoBuffer, log, normalizePath, parseUrl, pasrseURL, patchJson, postJson, putJson, randomBytes, randomElement, randomHexColor, randomInt, randomizeArray, readFile, runCommand, runCommandSync, runSpawn, sendBuffer, sendJson, sendText, serveStatic, sha256, sleep, table, timeAgo, toBool, toBuffer, toQueryString, transformBuffer, truncate, uniqueArray, warn, writeFile };
