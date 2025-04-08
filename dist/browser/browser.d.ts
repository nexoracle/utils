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

declare const isEmail: (email: string) => boolean;

export { Console as console, isEmail };
