// lib/modules/console.ts
var _CustomConsole = class _CustomConsole {
  static hexToRgb(hex) {
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
  static getColorCode(color) {
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
  static getBgColorCode(color) {
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
  static applyStyles(text, options) {
    if (!text.trim() && options.preserveWhitespace) {
      return text;
    }
    if (options.styles?.includes("hidden")) {
      return "";
    }
    const styles = [];
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
    return `\x1B[${styleStr}m${text}\x1B[0m`;
  }
  static processArgs(args, options) {
    return args.map((arg) => {
      if (typeof arg === "string") {
        if (arg.includes("\n")) {
          return arg.split("\n").map((line) => {
            let processed3 = line;
            if (options.prefix)
              processed3 = options.prefix + processed3;
            if (options.suffix)
              processed3 = processed3 + options.suffix;
            return this.applyStyles(processed3, options);
          }).join("\n");
        }
        let processed2 = arg;
        if (options.prefix)
          processed2 = options.prefix + processed2;
        if (options.suffix)
          processed2 = processed2 + options.suffix;
        return this.applyStyles(processed2, options);
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
        let processed2 = objString;
        if (options.prefix)
          processed2 = options.prefix + processed2;
        if (options.suffix)
          processed2 = processed2 + options.suffix;
        return this.applyStyles(processed2, options);
      }
      let processed = String(arg);
      if (options.prefix)
        processed = options.prefix + processed;
      if (options.suffix)
        processed = processed + options.suffix;
      return this.applyStyles(processed, options);
    });
  }
  static isOptionsObject(obj) {
    return obj && typeof obj === "object" && !Array.isArray(obj) && (obj.color !== void 0 || obj.bgColor !== void 0 || obj.styles !== void 0 || obj.prefix !== void 0 || obj.suffix !== void 0 || obj.preserveWhitespace !== void 0);
  }
  static logWithOptions(level, args, options = {}) {
    const consoleMethod = globalThis.console[level] || globalThis.console.log;
    const processedArgs = this.processArgs(args, options);
    consoleMethod(...processedArgs);
  }
  static log(...args) {
    if (args.length > 1 && this.isOptionsObject(args[args.length - 1])) {
      const options = args.pop();
      this.logWithOptions("log", args, options);
    } else {
      this.logWithOptions("log", args);
    }
  }
  static error(...args) {
    if (args.length > 1 && this.isOptionsObject(args[args.length - 1])) {
      const options = args.pop();
      this.logWithOptions("error", args, { color: "red", ...options });
    } else {
      this.logWithOptions("error", args, { color: "red" });
    }
  }
  static warn(...args) {
    if (args.length > 1 && this.isOptionsObject(args[args.length - 1])) {
      const options = args.pop();
      this.logWithOptions("warn", args, { color: "yellow", ...options });
    } else {
      this.logWithOptions("warn", args, { color: "yellow" });
    }
  }
  static info(...args) {
    if (args.length > 1 && this.isOptionsObject(args[args.length - 1])) {
      const options = args.pop();
      this.logWithOptions("info", args, { color: "cyan", ...options });
    } else {
      this.logWithOptions("info", args, { color: "cyan" });
    }
  }
  static debug(...args) {
    if (args.length > 1 && this.isOptionsObject(args[args.length - 1])) {
      const options = args.pop();
      this.logWithOptions("debug", args, { color: "gray", ...options });
    } else {
      this.logWithOptions("debug", args, { color: "gray" });
    }
  }
  static table(data, columns) {
    globalThis.console.table(data, columns);
  }
  static clear() {
    globalThis.console.clear();
  }
  static time(label) {
    globalThis.console.time(label);
  }
  static timeEnd(label) {
    globalThis.console.timeEnd(label);
  }
  static group(...args) {
    globalThis.console.group(...args);
  }
  static groupEnd() {
    globalThis.console.groupEnd();
  }
  static count(label) {
    globalThis.console.count(label);
  }
  static countReset(label) {
    globalThis.console.countReset(label);
  }
  static trace(...args) {
    globalThis.console.trace(...args);
  }
  static dir(item, options) {
    globalThis.console.dir(item, options);
  }
  static dirxml(...data) {
    globalThis.console.dirxml(...data);
  }
  static assert(condition, ...data) {
    globalThis.console.assert(condition, ...data);
  }
  static style(text, options = {}) {
    const styledText = this.applyStyles(text, options);
    const chainable = {
      color: (color) => _CustomConsole.style(text, { ...options, color }),
      bg: (color) => _CustomConsole.style(text, { ...options, bgColor: color }),
      bold: () => _CustomConsole.style(text, { ...options, styles: [...options.styles || [], "bold"] }),
      dim: () => _CustomConsole.style(text, { ...options, styles: [...options.styles || [], "dim"] }),
      italic: () => _CustomConsole.style(text, { ...options, styles: [...options.styles || [], "italic"] }),
      underline: () => _CustomConsole.style(text, { ...options, styles: [...options.styles || [], "underline"] }),
      inverse: () => _CustomConsole.style(text, { ...options, styles: [...options.styles || [], "inverse"] }),
      strikethrough: () => _CustomConsole.style(text, { ...options, styles: [...options.styles || [], "strikethrough"] }),
      hidden: () => _CustomConsole.style(text, { ...options, styles: [...options.styles || [], "hidden"] }),
      log: () => _CustomConsole.log(styledText),
      error: () => _CustomConsole.error(styledText),
      warn: () => _CustomConsole.warn(styledText),
      info: () => _CustomConsole.info(styledText),
      debug: () => _CustomConsole.debug(styledText),
      toString: () => styledText,
      preserveWhitespace: () => _CustomConsole.style(text, { ...options, preserveWhitespace: true }),
      rgb: (r, g, b) => _CustomConsole.style(text, { ...options, color: { rgb: [r, g, b] } }),
      hex: (hex) => _CustomConsole.style(text, { ...options, color: { hex } }),
      bgRgb: (r, g, b) => _CustomConsole.style(text, { ...options, bgColor: { rgb: [r, g, b] } }),
      bgHex: (hex) => _CustomConsole.style(text, { ...options, bgColor: { hex } })
    };
    return chainable;
  }
};
_CustomConsole.colorCodes = {
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
  brown: "38;5;130"
};
_CustomConsole.bgColorCodes = {
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
  brown: "48;5;130"
};
_CustomConsole.styleCodes = {
  bold: "1",
  dim: "2",
  italic: "3",
  underline: "4",
  inverse: "7",
  strikethrough: "9",
  hidden: "8"
};
var CustomConsole = _CustomConsole;
var Console = {
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
  style: CustomConsole.style.bind(CustomConsole)
};

// lib/functions/validation.ts
var isEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
export {
  Console as console,
  isEmail
};
