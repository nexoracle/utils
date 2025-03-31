type Color = "black" | "red" | "green" | "yellow" | "blue" | "magenta" | "cyan" | "white" | "gray" | "brightBlack" | "brightRed" | "brightGreen" | "brightYellow" | "brightBlue" | "brightMagenta" | "brightCyan" | "brightWhite" | "orange" | "purple" | "pink" | "brown" | { rgb: [number, number, number] } | { hex: string };

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

class CustomConsole {
  private static colorCodes: Record<string, string> = {
    black: "30",
    red: "31",
    green: "32",
    yellow: "33",
    blue: "34",
    magenta: "35",
    cyan: "36",
    white: "37",
    gray: "90",
    brightBlack: "90",
    brightRed: "91",
    brightGreen: "92",
    brightYellow: "93",
    brightBlue: "94",
    brightMagenta: "95",
    brightCyan: "96",
    brightWhite: "97",
    orange: "38;5;208",
    purple: "38;5;129",
    pink: "38;5;205",
    brown: "38;5;130",
  };

  private static bgColorCodes: Record<string, string> = {
    black: "40",
    red: "41",
    green: "42",
    yellow: "43",
    blue: "44",
    magenta: "45",
    cyan: "46",
    white: "47",
    gray: "100",
    brightBlack: "100",
    brightRed: "101",
    brightGreen: "102",
    brightYellow: "103",
    brightBlue: "104",
    brightMagenta: "105",
    brightCyan: "106",
    brightWhite: "107",
    orange: "48;5;208",
    purple: "48;5;129",
    pink: "48;5;205",
    brown: "48;5;130",
  };

  private static styleCodes: Record<Style, string> = {
    bold: "1",
    dim: "2",
    italic: "3",
    underline: "4",
    inverse: "7",
    strikethrough: "9",
    hidden: "8",
  };

  private static hexToRgb(hex: string): [number, number, number] {
    hex = hex.replace("#", "");

    let r, g, b;
    if (hex.length === 3) {
      r = parseInt(hex[0] + hex[0], 16);
      g = parseInt(hex[1] + hex[1], 16);
      b = parseInt(hex[2] + hex[2], 16);
    } else if (hex.length === 6) {
      r = parseInt(hex.substring(0, 2), 16);
      g = parseInt(hex.substring(2, 4), 16);
      b = parseInt(hex.substring(4, 6), 16);
    } else {
      throw new Error("Invalid HEX color format");
    }

    return [r, g, b];
  }

  private static getColorCode(color: Color): string {
    if (typeof color === "string") {
      return this.colorCodes[color] || "";
    } else if ("rgb" in color) {
      const [r, g, b] = color.rgb;
      return `38;2;${r};${g};${b}`;
    } else if ("hex" in color) {
      const [r, g, b] = this.hexToRgb(color.hex);
      return `38;2;${r};${g};${b}`;
    }
    return "";
  }

  private static getBgColorCode(color: Color): string {
    if (typeof color === "string") {
      return this.bgColorCodes[color] || "";
    } else if ("rgb" in color) {
      const [r, g, b] = color.rgb;
      return `48;2;${r};${g};${b}`;
    } else if ("hex" in color) {
      const [r, g, b] = this.hexToRgb(color.hex);
      return `48;2;${r};${g};${b}`;
    }
    return "";
  }

  private static applyStyles(text: string, options: LoggerOptions): string {
    if (!text.trim() && options.preserveWhitespace) {
      return text;
    }

    if (options.styles?.includes("hidden")) {
      return "";
    }

    const styles: string[] = [];

    if (options.color) {
      styles.push(this.getColorCode(options.color));
    }

    if (options.bgColor) {
      styles.push(this.getBgColorCode(options.bgColor));
    }

    if (options.styles) {
      options.styles.forEach((style) => {
        if (style !== "hidden") {
          styles.push(this.styleCodes[style]);
        }
      });
    }

    if (styles.length === 0) {
      return text;
    }

    const styleStr = styles.join(";");
    return `\x1b[${styleStr}m${text}\x1b[0m`;
  }

  private static processArgs(args: any[], options: LoggerOptions): any[] {
    return args.map((arg) => {
      if (typeof arg === "string") {
        if (arg.includes("\n")) {
          return arg
            .split("\n")
            .map((line) => {
              let processed = line;
              if (options.prefix) processed = options.prefix + processed;
              if (options.suffix) processed = processed + options.suffix;
              return this.applyStyles(processed, options);
            })
            .join("\n");
        }

        let processed = arg;
        if (options.prefix) processed = options.prefix + processed;
        if (options.suffix) processed = processed + options.suffix;
        return this.applyStyles(processed, options);
      }

      if (arg && typeof arg === "object") {
        let objString;
        try {
          objString = JSON.stringify(arg, null, 2);
        } catch {
          try {
            objString = arg.toString();
          } catch {
            objString = "[Object]";
          }
        }

        let processed = objString;
        if (options.prefix) processed = options.prefix + processed;
        if (options.suffix) processed = processed + options.suffix;
        return this.applyStyles(processed, options);
      }

      let processed = String(arg);
      if (options.prefix) processed = options.prefix + processed;
      if (options.suffix) processed = processed + options.suffix;
      return this.applyStyles(processed, options);
    });
  }

  private static isOptionsObject(obj: any): obj is LoggerOptions {
    return obj && typeof obj === "object" && !Array.isArray(obj) && (obj.color !== undefined || obj.bgColor !== undefined || obj.styles !== undefined || obj.prefix !== undefined || obj.suffix !== undefined || obj.preserveWhitespace !== undefined);
  }

  private static logWithOptions(level: LogLevel, args: any[], options: LoggerOptions = {}) {
    const consoleMethod = globalThis.console[level] || globalThis.console.log;
    const processedArgs = this.processArgs(args, options);
    consoleMethod(...processedArgs);
  }

  static log(...args: any[]): void {
    if (args.length > 1 && this.isOptionsObject(args[args.length - 1])) {
      const options = args.pop() as LoggerOptions;
      this.logWithOptions("log", args, options);
    } else {
      this.logWithOptions("log", args);
    }
  }

  static error(...args: any[]): void {
    if (args.length > 1 && this.isOptionsObject(args[args.length - 1])) {
      const options = args.pop() as LoggerOptions;
      this.logWithOptions("error", args, { color: "red", ...options });
    } else {
      this.logWithOptions("error", args, { color: "red" });
    }
  }

  static warn(...args: any[]): void {
    if (args.length > 1 && this.isOptionsObject(args[args.length - 1])) {
      const options = args.pop() as LoggerOptions;
      this.logWithOptions("warn", args, { color: "yellow", ...options });
    } else {
      this.logWithOptions("warn", args, { color: "yellow" });
    }
  }

  static info(...args: any[]): void {
    if (args.length > 1 && this.isOptionsObject(args[args.length - 1])) {
      const options = args.pop() as LoggerOptions;
      this.logWithOptions("info", args, { color: "cyan", ...options });
    } else {
      this.logWithOptions("info", args, { color: "cyan" });
    }
  }

  static debug(...args: any[]): void {
    if (args.length > 1 && this.isOptionsObject(args[args.length - 1])) {
      const options = args.pop() as LoggerOptions;
      this.logWithOptions("debug", args, { color: "gray", ...options });
    } else {
      this.logWithOptions("debug", args, { color: "gray" });
    }
  }

  static table(data: any, columns?: string[]): void {
    globalThis.console.table(data, columns);
  }

  static clear(): void {
    globalThis.console.clear();
  }

  static time(label: string): void {
    globalThis.console.time(label);
  }

  static timeEnd(label: string): void {
    globalThis.console.timeEnd(label);
  }

  static group(...args: any[]): void {
    globalThis.console.group(...args);
  }

  static groupEnd(): void {
    globalThis.console.groupEnd();
  }

  static count(label?: string): void {
    globalThis.console.count(label);
  }

  static countReset(label?: string): void {
    globalThis.console.countReset(label);
  }

  static trace(...args: any[]): void {
    globalThis.console.trace(...args);
  }

  static dir(item?: any, options?: any): void {
    globalThis.console.dir(item, options);
  }

  static dirxml(...data: any[]): void {
    globalThis.console.dirxml(...data);
  }

  static assert(condition?: boolean, ...data: any[]): void {
    globalThis.console.assert(condition, ...data);
  }

  static style(
    text: string,
    options: LoggerOptions = {}
  ): {
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
  } {
    const styledText = this.applyStyles(text, options);

    const chainable = {
      color: (color: Color) => CustomConsole.style(text, { ...options, color }),
      bg: (color: Color) => CustomConsole.style(text, { ...options, bgColor: color }),
      bold: () => CustomConsole.style(text, { ...options, styles: [...(options.styles || []), "bold"] }),
      dim: () => CustomConsole.style(text, { ...options, styles: [...(options.styles || []), "dim"] }),
      italic: () => CustomConsole.style(text, { ...options, styles: [...(options.styles || []), "italic"] }),
      underline: () => CustomConsole.style(text, { ...options, styles: [...(options.styles || []), "underline"] }),
      inverse: () => CustomConsole.style(text, { ...options, styles: [...(options.styles || []), "inverse"] }),
      strikethrough: () => CustomConsole.style(text, { ...options, styles: [...(options.styles || []), "strikethrough"] }),
      hidden: () => CustomConsole.style(text, { ...options, styles: [...(options.styles || []), "hidden"] }),
      log: () => CustomConsole.log(styledText),
      error: () => CustomConsole.error(styledText),
      warn: () => CustomConsole.warn(styledText),
      info: () => CustomConsole.info(styledText),
      debug: () => CustomConsole.debug(styledText),
      toString: () => styledText,
      preserveWhitespace: () => CustomConsole.style(text, { ...options, preserveWhitespace: true }),
      rgb: (r: number, g: number, b: number) => CustomConsole.style(text, { ...options, color: { rgb: [r, g, b] } }),
      hex: (hex: string) => CustomConsole.style(text, { ...options, color: { hex } }),
      bgRgb: (r: number, g: number, b: number) => CustomConsole.style(text, { ...options, bgColor: { rgb: [r, g, b] } }),
      bgHex: (hex: string) => CustomConsole.style(text, { ...options, bgColor: { hex } }),
    };

    return chainable;
  }
}

const Console = {
  log: CustomConsole.log.bind(CustomConsole),
  error: CustomConsole.error.bind(CustomConsole),
  warn: CustomConsole.warn.bind(CustomConsole),
  info: CustomConsole.info.bind(CustomConsole),
  debug: CustomConsole.debug.bind(CustomConsole),
  table: CustomConsole.table.bind(CustomConsole),
  clear: CustomConsole.clear.bind(CustomConsole),
  time: CustomConsole.time.bind(CustomConsole),
  timeEnd: CustomConsole.timeEnd.bind(CustomConsole),
  group: CustomConsole.group.bind(CustomConsole),
  groupEnd: CustomConsole.groupEnd.bind(CustomConsole),
  count: CustomConsole.count.bind(CustomConsole),
  countReset: CustomConsole.countReset.bind(CustomConsole),
  trace: CustomConsole.trace.bind(CustomConsole),
  dir: CustomConsole.dir.bind(CustomConsole),
  dirxml: CustomConsole.dirxml.bind(CustomConsole),
  assert: CustomConsole.assert.bind(CustomConsole),
  style: CustomConsole.style.bind(CustomConsole),
};

export { Console as console };
export default Console;
