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

export { ReadMore, axium, clockString, Console as console, emojiApi, flattenArray, formatBytes, formatISODate, formatJSON, formatNumber, getDate, getRandom, getTime, getTimeZone, hasEmoji, isArray, isBigInt, isBool, isEmail, isEmptyObject, isEqualObj, isFunction, isGmail, isNull, isNumber, isObject, isString, isSymbol, isUndefined, mime, passwordValidator, randomElement, randomHexColor, randomInt, randomizeArray, runtime, sleep, timeAgo, toBool, toQueryString, truncate, uniqueArray, urlValidator };
