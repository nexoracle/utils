import { Readable } from 'stream';
import * as Crypto from 'crypto';
import fs from 'fs';
import os from 'os';
import http, { IncomingMessage, IncomingHttpHeaders, ServerResponse } from 'http';
import tls from 'tls';
import { EntryType, PerformanceObserver, PerformanceNodeTiming } from 'perf_hooks';
import { EventEmitter } from 'events';

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
declare const bufferToFile: (buffer: Buffer, filePath: string) => void;
declare function toBuffer(data: any): Buffer;
declare const getBufferFromStream: (stream: Readable) => Promise<Buffer>;
declare const getStreamFromBuffer: (buffer: Buffer) => Readable;
declare const sleep: (ms?: number) => Promise<void>;
declare const randomInt: (min: number, max: number) => number;
declare const truncate: (text: string, maxLength: number) => string;
declare const timeAgo: (date: Date) => string;
declare const uniqueArray: <T>(arr: T[]) => T[];
declare const flattenArray: <T>(arr: T[]) => T[];
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
declare const getDate: (date?: Date | string | number | {
    format?: string;
    utc?: boolean;
    timezone?: string;
}, options?: {
    format?: string;
    utc?: boolean;
    timezone?: string;
}) => string;
declare function getTimeZone(): string | null;
declare function clockString(seconds: number, showHours?: boolean): string;
declare function formatISODate(n: string | number | Date, locale?: string, timezone?: string): string;
declare const formatJSON: (data: unknown, spaces?: number) => string | null;
declare function runtime(seconds: number, capitalize?: boolean, day?: string, hour?: string, minute?: string, second?: string): string;
declare function getFileSize(path: string | Buffer): Promise<string>;
declare function ensurePackage(packageName: string, packageManager?: "npm" | "yarn" | "pnpm" | "bun", shouldInstall?: boolean): any;
declare const escapeHTML: (str: string) => string;

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
declare const isEmptyObject: (obj: object) => boolean;
declare const isEqualObj: (obj1: any, obj2: any) => boolean;
declare function isArray(input: unknown): input is unknown[];
declare const isString: (input: unknown) => input is string;
declare const isBool: (input: unknown) => input is boolean;
declare const isFunction: (input: unknown) => input is Function;
declare const isBigInt: (input: unknown) => input is bigint;
declare const isUndefined: (input: unknown) => input is undefined;
declare const isSymbol: (input: unknown) => input is symbol;
declare const isNull: (input: unknown) => input is null;
declare const isValidIP: (ip: string) => boolean;
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
    responseType?: "arraybuffer" | "blob" | "json" | "text" | "buffer" | "stream";
}
type Interceptor<T> = (value: T) => T | Promise<T>;
declare class ProgressEvent {
    loaded: number;
    total: number;
    constructor(loaded: number, total: number);
    get percent(): number;
}

declare class RequestHandler {
    private globalDefaults;
    private requestInterceptors;
    private responseInterceptors;
    constructor(globalDefaults: FetchOptions);
    addRequestInterceptor(interceptor: Interceptor<FetchOptions>): void;
    addResponseInterceptor(interceptor: Interceptor<Response>): void;
    setGlobalDefaults(defaults: FetchOptions): void;
    buildUrl(url: string, params?: Record<string, string | number | boolean>): string;
    request(url: string, options?: FetchOptions): Promise<any>;
}

declare class Axium extends RequestHandler {
    constructor(defaults?: FetchOptions);
    get(url: string, options?: FetchOptions): Promise<any>;
    post(url: string, data: any, options?: FetchOptions): Promise<any>;
    put(url: string, data: any, options?: FetchOptions): Promise<any>;
    patch(url: string, data: any, options?: FetchOptions): Promise<any>;
    delete(url: string, options?: FetchOptions): Promise<any>;
    postFormData(url: string, data: FormData, options?: FetchOptions): Promise<any>;
    postUrlEncoded(url: string, data: Record<string, string>, options?: FetchOptions): Promise<any>;
    all(requests: Promise<any>[]): Promise<any[]>;
    getBuffer(url: string, options?: FetchOptions, method?: string): Promise<false | Buffer<ArrayBuffer> | undefined>;
    fetchJson(url: string, options?: FetchOptions, method?: string): Promise<any>;
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
    generateKeyPair: (type?: "rsa" | "ec" | "ed25519" | "ed448" | "x25519" | "x448", options?: Crypto.RSAKeyPairOptions<"pem", "pem"> | Crypto.ECKeyPairOptions<"pem", "pem">, saveToFile?: boolean) => Crypto.KeyPairSyncResult<string, string>;
    encryptRSA: (text: string, publicKey: string) => string;
    decryptRSA: (encrypted: string, privateKey: string) => string;
    sign: (data: string, privateKey: string, algorithm?: string) => string;
    verify: (data: string, signature: string, publicKey: string, algorithm?: string) => boolean;
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
declare const passwordGenerator: {
    defaultOptions: PasswordOptions;
    generate: (customOptions?: PasswordOptions) => string;
    generateMultiple: (count?: number, customOptions?: PasswordOptions) => string[];
};

declare const readFile: (filePath: string) => string | null;
declare const writeFile: (filePath: string, data: string) => void;
declare const appendToFile: (filePath: string, data: string) => void;
declare const deleteFile: (filePath: string) => void;
declare const fileExists: (filePath: string) => boolean;
declare const createDirectory: (dirPath: string) => void;
declare const removeDirectory: (dirPath: string) => void;
declare const listFiles: (dirPath: string) => string[] | null;
declare const getFileStats: (filePath: string) => fs.Stats | null;
declare const renameFile: (oldPath: string, newPath: string) => void;
declare const copyFile: (source: string, destination: string) => void;
declare const watchFile: (filePath: string, callback: (curr: fs.Stats, prev: fs.Stats) => void) => void;
declare const unwatchFile: (filePath: string) => void;
declare const getAbsolutePath: (relativePath: string) => string;

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
    tempDir: string;
    endianness: "BE" | "LE";
    priority: number;
    constants: typeof os.constants;
};
declare const getCpuLoad: () => number[];
declare const getNetworkInterfaces: () => NodeJS.Dict<os.NetworkInterfaceInfo[]>;
declare const getUserInfo: () => os.UserInfo<string>;
declare const getUptime: () => number;
declare const getTempDirectory: () => string;
declare const getProcessPriority: (pid?: number) => number;
declare const setProcessPriority: (pid: number | undefined, priority: number) => string;

interface ParsedURL {
    href: string;
    origin: string;
    protocol: string;
    username: string;
    password: string;
    host: string;
    hostname: string;
    port: string;
    pathname: string;
    search: string;
    hash: string;
    query: Record<string, string | string[]>;
    searchParams: URLSearchParams;
    fragment: string;
    isSecure: boolean;
    isLocal: boolean;
    isAbsolute: boolean;
    hasAuth: boolean;
}
declare const parseURL: (urlString: string) => ParsedURL | null;
interface BuildUrlOptions {
    path?: string;
    query?: Record<string, string | number | boolean | undefined>;
    fragment?: string;
}
declare const buildUrl: (baseUrl: string, options?: BuildUrlOptions) => string;

declare const runCommand: (command: string, cwd?: string, timeout?: number) => Promise<string>;
declare const runCommandSync: (command: string, cwd?: string) => string | null;
declare const runSpawn: (command: string, args: string[], cwd?: string, timeout?: number) => Promise<string>;
declare const runCommandDetached: (command: string, args: string[], cwd?: string) => void;
declare const runCommandInteractive: (command: string, args: string[], cwd?: string) => void;
declare const checkCommandExists: (command: string) => boolean;
declare const killProcess: (pid: number, signal?: string) => boolean;

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
    headers: IncomingHttpHeaders;
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

type Middleware = (req: Request, res: Response$1, next: () => void) => void;

declare function bodyParser(): Middleware;

type CorsOriginCallback = (err: Error | null, origin?: boolean | string) => void;
type CorsOrigin = boolean | string | RegExp | (string | RegExp)[] | ((req: Request, callback: CorsOriginCallback) => void);

interface CorsOptions {
    origin?: CorsOrigin;
    methods?: string | string[];
    allowedHeaders?: string | string[];
    exposedHeaders?: string | string[];
    credentials?: boolean;
    maxAge?: number;
    preflightContinue?: boolean;
    optionsSuccessStatus?: number;
}

declare function cors(options?: CorsOptions): Middleware;

declare class Router {
    private routes;
    private middlewares;
    private settings;
    private viewsDir;
    private viewEngine;
    private trustProxy;
    private jsonSpaces;
    use(path: string | Middleware, middleware?: Middleware): void;
    get(path: string, ...handlers: ((req: Request, res: Response$1, next?: () => void) => void)[]): void;
    post(path: string, ...handlers: ((req: Request, res: Response$1, next?: () => void) => void)[]): void;
    put(path: string, ...handlers: ((req: Request, res: Response$1, next?: () => void) => void)[]): void;
    delete(path: string, ...handlers: ((req: Request, res: Response$1, next?: () => void) => void)[]): void;
    private addRoute;
    set(key: string, value: any): void;
    getSetting(key: string): any;
    setTrustProxy(value: boolean | string | string[] | number): void;
    private getClientIp;
    private getClientIps;
    setJsonSpaces(spaces: number): void;
    render(res: ServerResponse, viewName: string, data?: {
        [key: string]: any;
    }): void;
    handleRequest(req: IncomingMessage, res: ServerResponse): void;
}

declare function createServer(router: Router): http.Server;

declare function favicon(iconPath?: string): Middleware;

interface RateLimiterOptions {
    windowMs?: number;
    max?: number;
    message?: string;
    statusCode?: number;
    skip?: (req: Request) => boolean;
    keyGenerator?: (req: Request) => string;
    handler?: (req: Request, res: Response$1) => void;
}

declare function rateLimit(options?: RateLimiterOptions): Middleware;

declare function serveStatic(prefix: string, staticPath?: string): Middleware;

declare function useFlash(): Middleware;

declare const apex: {
    Router: typeof Router;
    createServer: typeof createServer;
    bodyParser: typeof bodyParser;
    useFlash: typeof useFlash;
    cors: typeof cors;
    static: typeof serveStatic;
    favicon: typeof favicon;
    rateLimit: typeof rateLimit;
};

type Color = "black" | "red" | "green" | "yellow" | "blue" | "magenta" | "cyan" | "white" | "gray" | "brightBlack" | "brightRed" | "brightGreen" | "brightYellow" | "brightBlue" | "brightMagenta" | "brightCyan" | "brightWhite" | "orange" | "purple" | "pink" | "brown" | {
    rgb: [number, number, number];
} | {
    hex: string;
};
type Style = "bold" | "dim" | "italic" | "underline" | "inverse" | "strikethrough" | "hidden";
type LogLevel = "log" | "error" | "warn" | "info" | "debug";
interface LoggerOptions {
    color?: Color;
    bgColor?: Color;
    styles?: Style[];
    level?: LogLevel;
    prefix?: string;
    suffix?: string;
    preserveWhitespace?: boolean;
}
declare class CustomConsole {
    private static colorCodes;
    private static bgColorCodes;
    private static styleCodes;
    private static hexToRgb;
    private static getColorCode;
    private static getBgColorCode;
    private static applyStyles;
    private static processArgs;
    private static isOptionsObject;
    private static logWithOptions;
    static log(...args: any[]): void;
    static error(...args: any[]): void;
    static warn(...args: any[]): void;
    static info(...args: any[]): void;
    static debug(...args: any[]): void;
    static table(data: any, columns?: string[]): void;
    static clear(): void;
    static time(label: string): void;
    static timeEnd(label: string): void;
    static group(...args: any[]): void;
    static groupEnd(): void;
    static count(label?: string): void;
    static countReset(label?: string): void;
    static trace(...args: any[]): void;
    static dir(item?: any, options?: any): void;
    static dirxml(...data: any[]): void;
    static assert(condition?: boolean, ...data: any[]): void;
    static style(text: string, options?: LoggerOptions): {
        color: (color: Color) => any;
        bg: (color: Color) => any;
        bold: () => any;
        dim: () => any;
        italic: () => any;
        underline: () => any;
        inverse: () => any;
        strikethrough: () => any;
        hidden: () => any;
        log: () => void;
        error: () => void;
        warn: () => void;
        info: () => void;
        debug: () => void;
        toString: () => string;
        preserveWhitespace: () => any;
        rgb: (r: number, g: number, b: number) => any;
        hex: (hex: string) => any;
        bgRgb: (r: number, g: number, b: number) => any;
        bgHex: (hex: string) => any;
    };
}
declare const Console: {
    log: typeof CustomConsole.log;
    error: typeof CustomConsole.error;
    warn: typeof CustomConsole.warn;
    info: typeof CustomConsole.info;
    debug: typeof CustomConsole.debug;
    table: typeof CustomConsole.table;
    clear: typeof CustomConsole.clear;
    time: typeof CustomConsole.time;
    timeEnd: typeof CustomConsole.timeEnd;
    group: typeof CustomConsole.group;
    groupEnd: typeof CustomConsole.groupEnd;
    count: typeof CustomConsole.count;
    countReset: typeof CustomConsole.countReset;
    trace: typeof CustomConsole.trace;
    dir: typeof CustomConsole.dir;
    dirxml: typeof CustomConsole.dirxml;
    assert: typeof CustomConsole.assert;
    style: typeof CustomConsole.style;
};

declare function get(extn: string): string | undefined;
declare const mime: {
    all: () => Record<string, string>;
    get: typeof get;
};

declare function checkTLSHandshake(hostname: string, port?: number): Promise<boolean>;
declare function getSSLCertificate(hostname: string, port?: number): Promise<tls.PeerCertificate | null>;
declare function isTLSValid(hostname: string, port?: number): Promise<boolean>;

declare function resolveDNS(host: string, recordType: "A" | "AAAA" | "CNAME" | "MX" | "TXT" | "NS"): Promise<string[]>;
declare function reverseLookup(ip: string): Promise<string[]>;
declare function isDomainReachable(host: string): Promise<boolean>;
declare function getIPAddress(host: string): Promise<string>;
declare function getAllIPs(host: string): Promise<{
    ipv4: string[];
    ipv6: string[];
}>;
declare function hasMXRecords(host: string): Promise<boolean>;

declare function downloadFile(url: string, destination: string): Promise<void>;
declare function isURLAccessible(url: string): Promise<{
    success: boolean;
    status?: number;
    statusText?: string;
    error?: string;
}>;

declare const perf_hooks: {
    now: () => number;
    getTimeOrigin: () => number;
    measureExecutionTime: (fn: Function, ...args: any[]) => number;
    monitorEventLoopDelay: () => any;
    observePerformance: (entryTypes: EntryType[], callback: (list: PerformanceObserverEntryList) => void) => PerformanceObserver | null;
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
    constructor();
    validate(pwd: string, options?: ValidationOptions): ValidationResult;
    letters(count?: number, description?: string): passwordValidator;
    digits(count?: number, description?: string): passwordValidator;
    symbols(count?: number, description?: string): passwordValidator;
    min(num: number, description?: string): passwordValidator;
    max(num: number, description?: string): passwordValidator;
    lowercase(count?: number, description?: string): passwordValidator;
    uppercase(count?: number, description?: string): passwordValidator;
    spaces(count?: number, description?: string): passwordValidator;
    has(pattern?: string | RegExp, description?: string): passwordValidator;
    not(pattern?: string | RegExp, description?: string): passwordValidator;
    is(): passwordValidator;
    oneOf(list: string[], description?: string): passwordValidator;
    usingPlugin(fn: PluginFunction, description?: string): passwordValidator;
}

interface EmojiInfo {
    emoji: string;
    name: string;
    group: EmojiGroup;
    sub_group: EmojiSubGroup;
    codepoints: string;
}
type EmojiGroup = "Smileys & Emotion" | "People & Body" | "Animals & Nature" | "Food & Drink" | "Travel & Places" | "Activities" | "Objects" | "Symbols" | "Flags";
type EmojiSubGroup = "face-smiling" | "face-affection" | "face-tongue" | "face-hand" | "face-neutral-skeptical" | "face-sleepy" | "face-unwell" | "face-hat" | "face-glasses" | "face-concerned" | "face-negative" | "face-costume" | "cat-face" | "monkey-face" | "emotion" | "hand-fingers-open" | "hand-fingers-partial" | "hand-single-finger" | "hand-fingers-closed" | "hands" | "hand-prop" | "body-parts" | "person" | "person-gesture" | "person-role" | "person-fantasy" | "person-activity" | "person-sport" | "person-resting" | "family" | "person-symbol" | "animal-mammal" | "animal-bird" | "animal-amphibian" | "animal-reptile" | "animal-marine" | "animal-bug" | "plant-flower" | "plant-other" | "food-fruit" | "food-vegetable" | "food-prepared" | "food-asian" | "food-marine" | "food-sweet" | "drink" | "dishware" | "place-map" | "place-geographic" | "place-building" | "place-religious" | "place-other" | "transport-ground" | "transport-water" | "transport-air" | "hotel" | "time" | "sky & weather" | "event" | "award-medal" | "sport" | "game" | "arts & crafts" | "clothing" | "sound" | "music" | "musical-instrument" | "phone" | "computer" | "light & video" | "book-paper" | "money" | "mail" | "writing" | "office" | "lock" | "tool" | "science" | "medical" | "household" | "other-object" | "transport-sign" | "warning" | "arrow" | "religion" | "zodiac" | "av-symbol" | "gender" | "math" | "punctuation" | "currency" | "other-symbol" | "keycap" | "alphanum" | "geometric" | "flag" | "country-flag" | "subdivision-flag";
declare class Emoji {
    private readonly data;
    constructor(data: EmojiInfo);
    get emoji(): string;
    get name(): string;
    get formattedName(): string;
    get group(): EmojiGroup;
    get subGroup(): EmojiSubGroup;
    get codePoints(): string[];
    twemoji(opts?: {
        size?: string;
        format?: "png" | "svg";
    }): string;
    get fancyName(): string;
    toUnicode(): string;
    toString(): string;
    toArray(): {
        fancyName: string;
        twemoji: string;
        unicode: string;
        formattedName: string;
        emoji: string;
        name: string;
        group: EmojiGroup;
        sub_group: EmojiSubGroup;
        codepoints: string;
    }[];
    static from(data: EmojiInfo): Emoji;
    toJSON(): {
        fancyName: string;
        twemoji: string;
        unicode: string;
        formattedName: string;
        emoji: string;
        name: string;
        group: EmojiGroup;
        sub_group: EmojiSubGroup;
        codepoints: string;
    };
}
declare const emojiApi: {
    all(): Promise<Emoji[]>;
    arrange(): Promise<Record<EmojiGroup, Emoji[]>>;
    get(emoji: string): Promise<Emoji | null>;
    filter(fn: (emoji: Emoji) => boolean): Promise<Emoji[]>;
    random(): Promise<Emoji>;
    randomFromGroup(group: EmojiGroup, subGroup?: EmojiSubGroup): Promise<Emoji>;
    findByName(name: string): Promise<Emoji | null>;
    emojiToUnicode(emoji: string): string;
    unicodeToEmoji(unicode: string): string;
};

declare class ScheduledTask extends EventEmitter {
    private _task;
    private _scheduler;
    options: any;
    constructor(cronExpression: string, func: Function, options?: any);
    now(now?: any): void;
    start(): void;
    stop(): void;
}

declare class BackgroundScheduledTask extends EventEmitter {
    private cronExpression;
    private taskPath;
    private options;
    private forkProcess;
    constructor(cronExpression: string, taskPath: string, options?: any);
    start(): void;
    stop(): void;
    pid(): number | undefined;
    isRunning(): boolean;
}

declare function schedule(expression: string, func: Function | string, options?: any): ScheduledTask | BackgroundScheduledTask;
declare function getTasks(): Map<string, ScheduledTask | BackgroundScheduledTask>;
declare function validate(expression: string): boolean;

declare const cron: {
    schedule: typeof schedule;
    getTasks: typeof getTasks;
    validate: typeof validate;
};

interface StringOptions {
    method: "string";
    min?: number;
    max?: number;
    length?: number;
    pool?: string;
    prefix?: string;
    batch?: number;
}
interface BytesOptions {
    method: "bytes";
    min?: number;
    max?: number;
    length?: number;
    prefix?: string;
    batch?: number;
}
interface Base32Options {
    method: "base32";
    dashes?: boolean;
    prefix?: string;
    batch?: number;
}
interface Base64Options {
    method: "base64";
    prefix?: string;
    batch?: number;
}
interface UuidV4Options {
    method: "uuidv4";
    dashes?: boolean;
    prefix?: string;
    batch?: number;
}
interface UuidV5Options {
    method: "uuidv5";
    name: string;
    namespace?: string;
    dashes?: boolean;
    prefix?: string;
    batch?: number;
}
type Options = StringOptions | BytesOptions | Base32Options | Base64Options | UuidV4Options | UuidV5Options;

declare function generateApiKey(options?: Options): string | string[];

interface EnvLoader {
    load: (customPath?: string) => void;
}
declare const env: EnvLoader;

export { Axium, ReadMore, apex, appendToFile, axium, bufferToFile, buffertoJson, buildUrl, checkCommandExists, checkTLSHandshake, clockString, Console as console, copyFile, createDirectory, cron, crypto, deleteFile, downloadFile, emojiApi, ensurePackage, env, escapeHTML, fileExists, flattenArray, formatBytes, formatISODate, formatJSON, formatNumber, generateApiKey, getAbsolutePath, getAllIPs, getBufferFromStream, getCpuLoad, getDate, getFileSize, getFileStats, getIPAddress, getNetworkInterfaces, getProcessPriority, getRandom, getSSLCertificate, getStreamFromBuffer, getSystemInfo, getTempDirectory, getTime, getTimeZone, getUptime, getUserInfo, hasEmoji, hasMXRecords, isArray, isBigInt, isBool, isDomainReachable, isEmail, isEmptyObject, isEqualObj, isFunction, isGmail, isImageURL, isNull, isNumber, isObject, isString, isSymbol, isTLSValid, isURLAccessible, isUndefined, isValidIP, jsontoBuffer, killProcess, listFiles, mime, parseURL, passwordGenerator, passwordValidator, perf_hooks, randomElement, randomHexColor, randomInt, randomizeArray, readFile, removeDirectory, renameFile, resolveDNS, reverseLookup, runCommand, runCommandDetached, runCommandInteractive, runCommandSync, runSpawn, runtime, setProcessPriority, sleep, timeAgo, toBool, toBuffer, toQueryString, transformBuffer, truncate, uniqueArray, unwatchFile, urlValidator, watchFile, writeFile };
