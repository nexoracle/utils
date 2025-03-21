import { Readable } from 'stream';
import * as Crypto from 'crypto';
import os from 'os';
import querystring from 'querystring';
import http, { ServerResponse, IncomingMessage } from 'http';
import tls from 'tls';
import { EntryType, PerformanceObserver, PerformanceNodeTiming } from 'perf_hooks';

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

declare const urlValidator: {
    isURL(url: string): boolean;
    mediafire(url: string): boolean;
    gdrive(url: string): boolean;
    spotify(url: string): boolean;
    tiktok(url: string): boolean;
    threads(url: string): boolean;
    twitter(url: string): boolean;
    youtube(url: string): boolean;
    snapchat(url: string): boolean;
    terabox(url: string): boolean;
    instagram(url: string): boolean;
    facebook(url: string): boolean;
    linkedin(url: string): boolean;
    reddit(url: string): boolean;
    pinterest(url: string): boolean;
    whatsapp(url: string): boolean;
    discord(url: string): boolean;
    twitch(url: string): boolean;
    stackoverflow(url: string): boolean;
    medium(url: string): boolean;
    extractUrlFromString(str: string): string | null;
    extractAllUrlFromString(str: string): string[] | null;
    hasProtocol(url: string, protocol: string): boolean;
    hasDomain(url: string, domain: string): boolean;
    hasPath(url: string, path: string): boolean;
    hasQueryParam(url: string, param: string): boolean;
    hasFragment(url: string, fragment: string): boolean;
    extractComponents(url: string): {
        protocol: string;
        domain: string;
        path: string;
        query: string;
        fragment: string;
    } | null;
    isWithinLength(url: string, maxLength: number): boolean;
    hasValidCharacters(url: string): boolean;
};
declare function toBool(input: string, returnBool?: boolean): string | boolean;
declare const isEmail: (email: string) => boolean;
declare const isGmail: (email: string) => boolean;
declare const isNumber: (input: unknown) => boolean;
declare const isObject: (value: unknown) => boolean;
declare function isArray(input: unknown): input is unknown[];
/**
 * Checks if a URL points to a valid image by first trying a HEAD request and falling back to a GET request.
 * @param url - The URL to validate.
 * @returns A promise that resolves to `true` if the URL points to a valid image, otherwise `false`.
 */
declare const isImageURL: (url: string) => Promise<boolean>;
declare const hasEmoji: (str: string) => boolean;

interface FetchOptions extends RequestInit {
    retries?: number;
    retryDelay?: number;
    timeout?: number;
    params?: Record<string, string | number | boolean>;
    onDownloadProgress?: (progress: ProgressEvent) => void;
    onUploadProgress?: (progress: ProgressEvent) => void;
    signal?: AbortSignal;
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
}
type Interceptor<T> = (value: T) => T | Promise<T>;
declare class ProgressEvent {
    loaded: number;
    total: number;
    constructor(loaded: number, total: number);
    get percent(): number;
}
declare class Axium {
    private requestInterceptors;
    private responseInterceptors;
    private globalDefaults;
    constructor(defaults?: FetchOptions);
    addRequestInterceptor(interceptor: Interceptor<FetchOptions>): void;
    addResponseInterceptor(interceptor: Interceptor<Response>): void;
    setGlobalDefaults(defaults: FetchOptions): void;
    private applyInterceptors;
    private buildUrl;
    request(url: string, options?: FetchOptions): Promise<any>;
    get(url: string, options?: FetchOptions): Promise<any>;
    post(url: string, data: any, options?: FetchOptions): Promise<any>;
    put(url: string, data: any, options?: FetchOptions): Promise<any>;
    patch(url: string, data: any, options?: FetchOptions): Promise<any>;
    delete(url: string, options?: FetchOptions): Promise<any>;
    postFormData(url: string, data: FormData, options?: FetchOptions): Promise<any>;
    postUrlEncoded(url: string, data: Record<string, string>, options?: FetchOptions): Promise<any>;
    all(requests: Promise<any>[]): Promise<any[]>;
    getBuffer(url: string, options?: FetchOptions): Promise<any>;
    head(url: string, options?: FetchOptions): Promise<any>;
}
declare const axium: Axium;

declare const crypto: {
    sha256: (data: string) => string;
    sha512: (data: string) => string;
    md5: (data: string) => string;
    randomBytes: (length?: number) => string;
    generateUUID: () => string;
    encryptAES: (text: string, key: string, iv?: string) => string;
    decryptAES: (encrypted: string, key: string, iv?: string) => string;
    hmacSHA256: (data: string, secret: string) => string;
    hmacSHA512: (data: string, secret: string) => string;
    pbkdf2: (password: string, salt: string, iterations?: number, keylen?: number, digest?: string) => string;
    generateKeyPair: (type?: "rsa", options?: Crypto.RSAKeyPairOptions<"pem", "pem">) => Crypto.KeyPairSyncResult<string, string>;
    encryptRSA: (text: string, publicKey: string) => string;
    decryptRSA: (encrypted: string, privateKey: string) => string;
    sign: (data: string, privateKey: string, algorithm?: string) => string;
    verify: (data: string, signature: string, publicKey: string, algorithm?: string) => boolean;
};

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
declare const joinPath: (...paths: string[]) => string;
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

interface Request extends IncomingMessage {
    body?: any;
    query?: {
        [key: string]: string | string[];
    };
    params: {
        [key: string]: string;
    };
    ip?: string;
    ips?: string[];
    remoteAddress: string;
    xForwardedFor: string | string[] | undefined;
    cfConnectingIP: string | undefined;
    trueClientIP: string | undefined;
    flash?: (type: string, message?: string) => string[] | void;
    path?: string;
    protocol?: string;
    method?: string;
    files?: any;
    file?: any;
    originalUrl: string;
    baseUrl: string;
    secure: boolean;
    cookies?: {
        [key: string]: string;
    };
    session?: any;
    hostname?: string;
    headers: http.IncomingHttpHeaders;
    get?: (headerName: string) => string | undefined;
    accepts: (type: string | string[]) => string | boolean | string[];
    is: (type: string) => string | boolean;
    fresh: boolean;
    stale: boolean;
    xhr: boolean;
}
interface Response$1 extends ServerResponse {
    text: (data: any) => void;
    html: (data: any) => void;
    status: (code: number) => Response$1;
    type: (type: string) => Response$1;
    json: (data: any, spaces?: number) => void;
    send: (data: any) => void;
    sendFile: (filePath: string) => void;
    redirect: (url: string) => void;
    charset: (charset: string) => Response$1;
    links: (links: Record<string, string>) => Response$1;
    download: (filePath: string, filename?: string) => void;
    attachment: (filename?: string) => void;
    cookie: (name: string, value: string, options?: any) => void;
    clearCookie: (name: string, options?: any) => void;
    format: (obj: Record<string, () => void>) => void;
    getHeader: (name: string) => string | number | string[] | undefined;
    removeHeader: (name: string) => void;
    set: (headers: Record<string, string | number | string[]>) => Response$1;
    vary: (field: string) => Response$1;
    location: (url: string) => Response$1;
    locals?: {
        [key: string]: any;
    };
    jsonSpaces: number;
    app: any;
}
interface RateLimiterOptions {
    windowMs?: number;
    max?: number;
    message?: string;
    statusCode?: number;
    skip?: (req: Request) => boolean;
    keyGenerator?: (req: Request) => string;
    handler?: (req: Request, res: Response$1) => void;
}
type Middleware = (req: Request, res: Response$1, next: () => void) => void;
declare class Router {
    private routes;
    private middlewares;
    private settings;
    private viewsDir;
    private viewEngine;
    private trustProxy;
    private jsonSpaces;
    private flashMessages;
    use(path: string | Middleware, middleware?: Middleware): void;
    get(path: string, handler: (req: Request, res: Response$1) => void): void;
    post(path: string, handler: (req: Request, res: Response$1) => void): void;
    put(path: string, handler: (req: Request, res: Response$1) => void): void;
    delete(path: string, handler: (req: Request, res: Response$1) => void): void;
    private addRoute;
    set(key: string, value: any): void;
    getSetting(key: string): any;
    setTrustProxy(value: boolean | string | string[] | number): void;
    private getClientIp;
    private getClientIps;
    setJsonSpaces(spaces: number): void;
    useFlash(): Middleware;
    render(res: ServerResponse, viewName: string, data?: {
        [key: string]: any;
    }): void;
    handleRequest(req: IncomingMessage, res: ServerResponse): void;
    private convertRouteToRegex;
    private extractParamNames;
    private notFoundHandler;
}
declare function createServer(router: Router): http.Server;
declare const apex: {
    Router: typeof Router;
    createServer: typeof createServer;
    bodyParser: () => Middleware;
    static(prefix: string, staticPath?: string): Middleware;
    favicon(iconPath?: string): Middleware;
    rateLimit: (options?: RateLimiterOptions) => Middleware;
};

declare function log(...args: any[]): void;
declare function error(...args: any[]): void;
declare function warn(...args: any[]): void;
declare function info(...args: any[]): void;
declare function debug(...args: any[]): void;
declare function table(data: any, columns?: string[]): void;
declare function clear(): void;

declare function get(extn: string): string | undefined;
declare const mime: {
    mimes: Record<string, string>;
    get: typeof get;
};

/** Checks if a server supports TLS by performing a handshake */
declare function checkTLSHandshake(host: string, port?: number): Promise<boolean>;
/** Fetches SSL certificate details of a domain */
declare function getSSLCertificate(host: string, port?: number): Promise<tls.PeerCertificate | null>;
/** Checks if a domain's TLS certificate is valid */
declare function isTLSValid(host: string, port?: number): Promise<boolean>;

/** Resolves a domain to its DNS records */
declare function resolveDNS(host: string, recordType: "A" | "AAAA" | "CNAME" | "MX" | "TXT" | "NS"): Promise<string[]>;
/** Performs a reverse DNS lookup on an IP address */
declare function reverseLookup(ip: string): Promise<string[]>;
/** Checks if a domain is reachable via DNS */
declare function isDomainReachable(host: string): Promise<boolean>;

/**
 * Download a file from an HTTPS URL.
 * @param url The file URL.
 * @param destination The local file path to save.
 * @returns Promise resolving when download is complete.
 */
declare function downloadFile(url: string, destination: string): Promise<void>;
/**
 * Validate if an HTTPS URL is accessible.
 * @param url The URL to check.
 * @returns True if accessible, false otherwise.
 */
declare function isURLAccessible(url: string): Promise<boolean>;

declare const perf_hooks: {
    /**
     * Get the current high-resolution timestamp in milliseconds
     */
    now: () => number;
    /**
     * Get the time origin (when the performance API started tracking)
     */
    getTimeOrigin: () => number;
    /**
     * Measures the execution time of a function in milliseconds
     */
    measureExecutionTime: (fn: Function, ...args: any[]) => number;
    /**
     * Tracks event loop delays (helps identify performance issues)
     */
    monitorEventLoopDelay: () => any;
    /**
     * Sets up a PerformanceObserver to watch for performance entries
     */
    observePerformance: (entryTypes: EntryType[], callback: (list: PerformanceObserverEntryList) => void) => PerformanceObserver | null;
    /**
     * Returns Node.js performance timings (including startup time)
     */
    getNodePerformanceTiming: () => PerformanceNodeTiming | null;
};

interface ValidationProperty {
    method: string;
    arguments: any[];
    description?: string;
}
interface ValidationOptions {
    list?: boolean;
    details?: boolean;
}
interface ValidationDetail {
    validation: string;
    arguments?: any;
    inverted?: boolean;
    message?: string;
}
type ValidationResult = boolean | string[] | ValidationDetail[];
type PluginFunction = (password: string) => boolean;
declare class passwordValidator {
    properties: ValidationProperty[];
    password: string;
    positive: boolean;
    list: boolean;
    details: boolean;
    /**
     * Creates a password-validator schema
     *
     * @constructor
     */
    constructor();
    /**
     * Method to validate the password against schema
     *
     * @param {string} pwd - password to validate
     * @param {object} [options] - optional options to configure validation
     * @param {boolean} [options.list] - asks for a list of validation
     *           failures instead of just true/false
     * @param {boolean} [options.details] - asks for more details about
     *           failed validations including arguments, and error messages
     * @returns {boolean|array} Boolean value indicting the validity
     *           of the password as per schema, if 'options.list' or
     *           'options.details' is not set. Otherwise, it returns an
     *           array of property names which failed validations
     */
    validate(pwd: string, options?: ValidationOptions): ValidationResult;
    /**
     * Rule to mandate the presence of letters in the password
     *
     * @param {number} [count] - minimum number of letters required
     * @param {string} [description] - description of the validation
     * @returns {passwordValidator} instance of passwordValidator schema
     */
    letters(count?: number, description?: string): passwordValidator;
    /**
     * Rule to mandate the presence of digits in the password
     *
     * @param {number} [count] - minimum number of digits required
     * @param {string} [description] - description of the validation
     * @returns {passwordValidator} instance of passwordValidator schema
     */
    digits(count?: number, description?: string): passwordValidator;
    /**
     * Rule to mandate the presence of symbols in the password
     *
     * @param {number} [count] - minimum number of symbols required
     * @param {string} [description] - description of the validation
     * @returns {passwordValidator} instance of passwordValidator schema
     */
    symbols(count?: number, description?: string): passwordValidator;
    /**
     * Rule to specify a minimum length of the password
     *
     * @param {number} num - minimum length
     * @param {string} [description] - description of the validation
     * @returns {passwordValidator} instance of passwordValidator schema
     */
    min(num: number, description?: string): passwordValidator;
    /**
     * Rule to specify a maximum length of the password
     *
     * @param {number} num - maximum length
     * @param {string} [description] - description of the validation
     * @returns {passwordValidator} instance of passwordValidator schema
     */
    max(num: number, description?: string): passwordValidator;
    /**
     * Rule to mandate the presence of lowercase letters in the password
     *
     * @param {number} [count] - minimum number of lowercase letters required
     * @param {string} [description] - description of the validation
     * @returns {passwordValidator} instance of passwordValidator schema
     */
    lowercase(count?: number, description?: string): passwordValidator;
    /**
     * Rule to mandate the presence of uppercase letters in the password
     *
     * @param {number} [count] - minimum number of uppercase letters required
     * @param {string} [description] - description of the validation
     * @returns {passwordValidator} instance of passwordValidator schema
     */
    uppercase(count?: number, description?: string): passwordValidator;
    /**
     * Rule to mandate the presence of space in the password
     * It can be used along with 'not' to not allow spaces
     * in the password
     *
     * @param {number} [count] - minimum number of spaces required
     * @param {string} [description] - description of the validation
     * @returns {passwordValidator} instance of passwordValidator schema
     */
    spaces(count?: number, description?: string): passwordValidator;
    /**
     * Rule to invert the effects of 'not'
     * Apart from that, 'has' is also used
     * to make the api readable and chainable
     *
     * @param {string|RegExp} [pattern] - pattern to match
     * @param {string} [description] - description of the validation
     * @returns {passwordValidator} instance of passwordValidator schema
     */
    has(pattern?: string | RegExp, description?: string): passwordValidator;
    /**
     * Rule to invert the next applied rules.
     * All the rules applied after 'not' will have opposite effect,
     * until 'has' rule is applied
     *
     * @param {string|RegExp} [pattern] - pattern to not match
     * @param {string} [description] - description of the validation
     * @returns {passwordValidator} instance of passwordValidator schema
     */
    not(pattern?: string | RegExp, description?: string): passwordValidator;
    /**
     * Rule to invert the effects of 'not'
     * Apart from that, 'is' is also used
     * to make the api readable and chainable
     *
     * @returns {passwordValidator} instance of passwordValidator schema
     */
    is(): passwordValidator;
    /**
     * Rule to whitelist words to be used as password
     *
     * @param {array} list - list of values allowed
     * @param {string} [description] - description of the validation
     * @returns {passwordValidator} instance of passwordValidator schema
     */
    oneOf(list: string[], description?: string): passwordValidator;
    /**
     * Insert a plugin function into the validation chain
     *
     * @param {PluginFunction} fn  - A plugin function
     * @param {string} [description] - description of the validation
     * @returns {passwordValidator} instance of passwordValidator schema
     */
    usingPlugin(fn: PluginFunction, description?: string): passwordValidator;
}

declare const errorHandler: {
    length: string;
    password: string;
    invalidPlugin: string;
};
declare const regexHandler: {
    digits: string;
    letters: string;
    symbols: string;
    spaces: string;
};

declare function validationMessages(method: string, arg: any, inverted?: boolean): string | undefined;

interface SchemaContext {
    password: string;
    positive: boolean;
}
declare const func: {
    /**
     * Method to invert the next validations
     *
     * @param {RegExp} [symbol] - custom Regex which should not be present
     */
    not: (this: SchemaContext, symbol?: RegExp | string) => boolean;
    /**
     * Method to invert the effects of not()
     *
     * @param {RegExp} [symbol] - custom Regex which should be present
     */
    has: (this: SchemaContext, symbol?: RegExp | string) => boolean;
    /**
     * Method to invert the effects of not() and
     * to make the api readable and chainable
     *
     */
    is: (this: SchemaContext) => boolean;
    /**
     * Method to specify a minimum length
     *
     * @param {number} num - minimum length
     */
    min: (this: SchemaContext, num: number) => boolean;
    /**
     * Method to specify a maximum length
     *
     * @param {number} num - maximum length
     */
    max: (this: SchemaContext, num: number) => boolean;
    /**
     * Method to validate the presence of digits
     *
     * @param {number} repeat - count of required digits
     */
    digits: (this: SchemaContext, repeat?: number) => boolean;
    /**
     * Method to validate the presence of letters
     *
     * @param {number} repeat - count of required letters
     */
    letters: (this: SchemaContext, repeat?: number) => boolean;
    /**
     * Method to validate the presence of uppercase letters
     *
     * @param {number} repeat - count of required uppercase letters
     */
    uppercase: (this: SchemaContext, repeat?: number) => boolean;
    /**
     * Method to validate the presence of lowercase letters
     *
     * @param {number} repeat - count of required lowercase letters
     */
    lowercase: (this: SchemaContext, repeat?: number) => boolean;
    /**
     * Method to validate the presence of symbols
     *
     * @param {number} repeat - count of required symbols
     */
    symbols: (this: SchemaContext, repeat?: number) => boolean;
    /**
     * Method to validate the presence of space
     *
     * @param {number} repeat - count of required spaces
     */
    spaces: (this: SchemaContext, repeat?: number) => boolean;
    /**
     * Method to provide pre-defined values for password
     *
     * @param {array} list - list of values allowed
     */
    oneOf: (this: SchemaContext, list: string[]) => boolean;
    /**
     * Method to run a plugin function for password
     *
     * @param {function} plugin - A plugin function
     */
    usingPlugin: (this: SchemaContext, fn: (password: string) => any) => boolean;
};

interface StringOptions {
    method: 'string';
    min?: number;
    max?: number;
    length?: number;
    pool?: string;
    prefix?: string;
    batch?: number;
}
interface BytesOptions {
    method: 'bytes';
    min?: number;
    max?: number;
    length?: number;
    prefix?: string;
    batch?: number;
}
interface Base32Options {
    method: 'base32';
    dashes?: boolean;
    prefix?: string;
    batch?: number;
}
interface Base64Options {
    method: 'base64';
    prefix?: string;
    batch?: number;
}
interface UuidV4Options {
    method: 'uuidv4';
    dashes?: boolean;
    prefix?: string;
    batch?: number;
}
interface UuidV5Options {
    method: 'uuidv5';
    name: string;
    namespace?: string;
    dashes?: boolean;
    prefix?: string;
    batch?: number;
}
type Options = StringOptions | BytesOptions | Base32Options | Base64Options | UuidV4Options | UuidV5Options;
declare function generateApiKey(options?: Options): string | string[];

export { FetchOptions, ReadMore, apex, appendToFile, axium, bufferToFile, buffertoJson, buildUrl, checkTLSHandshake, clear, crypto, debug, deleteFile, downloadFile, error, errorHandler, fileExists, formatBytes, formatNumber, func, generateApiKey, getAbsolutePath, getBufferFromStream, getCpuLoad, getDate, getFileExtension, getFileName, getNetworkInterfaces, getRandom, getRelativePath, getSSLCertificate, getStreamFromBuffer, getSystemInfo, getTime, getUserInfo, hasEmoji, info, isArray, isDomainReachable, isEmail, isGmail, isImageURL, isNumber, isObject, isTLSValid, isURLAccessible, joinPath, jsontoBuffer, log, mime, normalizePath, pasrseURL, passwordValidator, perf_hooks, randomElement, randomHexColor, randomInt, randomizeArray, readFile, regexHandler, resolveDNS, reverseLookup, runCommand, runCommandSync, runSpawn, sleep, table, timeAgo, toBool, toBuffer, toQueryString, transformBuffer, truncate, uniqueArray, urlValidator, validationMessages as validationMessage, warn, writeFile };
