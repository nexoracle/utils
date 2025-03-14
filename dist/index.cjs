"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  ReadMore: () => ReadMore,
  apex: () => apex,
  appendToFile: () => appendToFile,
  bufferToFile: () => bufferToFile,
  buffertoJson: () => buffertoJson,
  buildUrl: () => buildUrl,
  clear: () => clear,
  debug: () => debug,
  decryptAES: () => decryptAES,
  deleteFile: () => deleteFile,
  deleteJson: () => deleteJson,
  deleteRequest: () => deleteRequest,
  encryptAES: () => encryptAES,
  error: () => error,
  extractUrlFromString: () => extractUrlFromString,
  fetchRequest: () => fetchRequest,
  fileExists: () => fileExists,
  formatBytes: () => formatBytes,
  formatNumber: () => formatNumber,
  generateUUID: () => generateUUID,
  getAbsolutePath: () => getAbsolutePath,
  getBuffer: () => getBuffer,
  getBufferFromStream: () => getBufferFromStream,
  getCpuLoad: () => getCpuLoad,
  getDate: () => getDate,
  getFileExtension: () => getFileExtension,
  getFileName: () => getFileName,
  getJson: () => getJson,
  getNetworkInterfaces: () => getNetworkInterfaces,
  getRandom: () => getRandom,
  getRelativePath: () => getRelativePath,
  getStreamFromBuffer: () => getStreamFromBuffer,
  getSystemInfo: () => getSystemInfo,
  getTime: () => getTime,
  getUserInfo: () => getUserInfo,
  headRequest: () => headRequest,
  info: () => info,
  isArray: () => isArray,
  isEmail: () => isEmail,
  isObject: () => isObject,
  isURL: () => isURL,
  joinPath: () => joinPath,
  jsontoBuffer: () => jsontoBuffer,
  log: () => log,
  normalizePath: () => normalizePath,
  pasrseURL: () => pasrseURL,
  patchJson: () => patchJson,
  postJson: () => postJson,
  putJson: () => putJson,
  randomBytes: () => randomBytes,
  randomElement: () => randomElement,
  randomHexColor: () => randomHexColor,
  randomInt: () => randomInt,
  randomizeArray: () => randomizeArray,
  readFile: () => readFile,
  runCommand: () => runCommand,
  runCommandSync: () => runCommandSync,
  runSpawn: () => runSpawn,
  sha256: () => sha256,
  sleep: () => sleep,
  table: () => table,
  timeAgo: () => timeAgo,
  toBool: () => toBool,
  toBuffer: () => toBuffer,
  toQueryString: () => toQueryString,
  transformBuffer: () => transformBuffer,
  truncate: () => truncate,
  uniqueArray: () => uniqueArray,
  warn: () => warn,
  writeFile: () => writeFile
});
module.exports = __toCommonJS(src_exports);

// src/utils/tools.ts
var import_fs = require("fs");
var import_stream = require("stream");

// src/utils/validation.ts
function isURL(url2) {
  const urlRegex = /^(https?:\/\/)?(www\.)?([\da-z.-]+)(?::(\d{1,5}))?([\/\w .-]*)*\/?(\?[&\w=.+-]*)?(#[\w-]*)?$/i;
  const ipv4Regex = /^(https?:\/\/)?(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(?::(\d{1,5}))?([\/\w .-]*)*\/?(\?[&\w=.+-]*)?(#[\w-]*)?$/i;
  const ipv6Regex = /^(https?:\/\/)?\[([a-f0-9:]+)\](?::(\d{1,5}))?([\/\w .-]*)*\/?(\?[&\w=.+-]*)?(#[\w-]*)?$/i;
  const localhostRegex = /^(https?:\/\/)?localhost(?::(\d{1,5}))?([\/\w .-]*)*\/?(\?[&\w=.+-]*)?(#[\w-]*)?$/i;
  const fileRegex = /^file:\/\/\/?([\/\w .-]*)*\/?$/i;
  return urlRegex.test(url2) || ipv4Regex.test(url2) || ipv6Regex.test(url2) || localhostRegex.test(url2) || fileRegex.test(url2);
}
function toBool(input, returnBool = true) {
  return /true|yes|ok|act|sure|enable/gi.test(input) ? returnBool ? true : "true" : returnBool ? false : "false";
}
var isEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
var isObject = (value) => typeof value === "object" && value !== null && !Array.isArray(value);
function isArray(input) {
  return Array.isArray(input);
}

// src/utils/tools.ts
function getRandom(options = {}) {
  const { Alphabets = true, Numbers = true, Symbols = false, DateNow = false, length = 20, fileExtension = ".png", attachFileExtension = false } = options;
  let characters = "";
  if (Alphabets)
    characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  if (Numbers)
    characters += "0123456789";
  if (Symbols)
    characters += "!@#$%^&*()_+-=[]{}|;:,<>?/~";
  if (DateNow)
    characters += String(Date.now());
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
function randomizeArray(arr) {
  if (!isArray(arr)) {
    throw new Error("Input must be an array");
  }
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
function ReadMore(length = 4001) {
  return "\u200E".repeat(length);
}
var buffertoJson = (buffer) => {
  return JSON.parse(buffer.toString("utf-8"));
};
var jsontoBuffer = (json) => {
  return Buffer.from(JSON.stringify(json));
};
var transformBuffer = (buffer, transformFn) => {
  return transformFn(buffer);
};
var bufferToFile = async (buffer, filePath) => {
  await import_fs.promises.writeFile(filePath, buffer);
};
function toBuffer(data) {
  if (data instanceof Buffer)
    return data;
  if (typeof data === "string")
    return Buffer.from(data);
  return Buffer.from(JSON.stringify(data));
}
var extractUrlFromString = (str) => {
  const urlRegex = /(https?:\/\/[^\s"'<>()]+)/i;
  const match = str.match(urlRegex);
  return match ? match[0] : null;
};
var getBufferFromStream = async (stream) => {
  if (!stream.readable) {
    throw new Error("Stream is not readable");
  }
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("end", () => resolve(Buffer.concat(chunks)));
    stream.on("error", reject);
  });
};
var getStreamFromBuffer = (buffer) => {
  const readable = new import_stream.Readable();
  readable.push(buffer);
  readable.push(null);
  return readable;
};
var sleep = (ms = 3e3) => new Promise((resolve) => setTimeout(resolve, ms));
var randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
var truncate = (text, maxLength) => text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
var timeAgo = (date) => {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1e3);
  const intervals = [
    { label: "year", seconds: 31536e3 },
    { label: "month", seconds: 2592e3 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 }
  ];
  for (const { label, seconds: s } of intervals) {
    const interval = Math.floor(seconds / s);
    if (interval >= 1)
      return `${interval} ${label}${interval > 1 ? "s" : ""} ago`;
  }
  return "Just now";
};
var uniqueArray = (arr) => [...new Set(arr)];
var randomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
var toQueryString = (params) => new URLSearchParams(params).toString();
var randomHexColor = () => `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`;
var formatNumber = (num) => num.toLocaleString();
var formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0)
    return "0 Bytes";
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${sizes[i]}`;
};
var getTime = (date, options) => {
  if (typeof date === "object" && !("getTime" in date)) {
    options = date;
    date = void 0;
  }
  const { utc = false, timezone, format12Hour = true } = options || {};
  let dateObj = date ? new Date(date) : /* @__PURE__ */ new Date();
  if (isNaN(dateObj.getTime()))
    return null;
  const formatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: format12Hour,
    timeZone: timezone || (utc ? "UTC" : void 0)
  };
  return new Intl.DateTimeFormat("en-US", formatOptions).format(dateObj);
};
var getDate = (date = /* @__PURE__ */ new Date(), options) => {
  const { format = "YYYY-MM-DD", utc = false, timezone } = options || {};
  const formatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: timezone || (utc ? "UTC" : void 0)
  };
  const formattedDate = new Intl.DateTimeFormat("en-US", formatOptions).format(date);
  const [month, day, year] = formattedDate.split("/");
  switch (format) {
    case "YYYY-MM-DD":
      return `${year}-${month}-${day}`;
    case "DD-MM-YYYY":
      return `${day}-${month}-${year}`;
    case "MM/DD/YYYY":
      return `${month}/${day}/${year}`;
    case "YYYY/MM/DD":
      return `${year}/${month}/${day}`;
    default:
      return `${year}-${month}-${day}`;
  }
};

// src/modules/fetch.ts
async function fetchRequest(url2, options = {}) {
  const {
    retries = 3,
    retryDelay = 1e3,
    timeout = 1e4,
    // 10 seconds
    ...fetchOptions
  } = options;
  for (let attempt = 0; attempt < retries; attempt++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    try {
      const response = await fetch(url2, {
        ...fetchOptions,
        signal: controller.signal,
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36",
          ...fetchOptions.headers
        }
      });
      clearTimeout(timeoutId);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const contentType = response.headers.get("content-type");
      if (contentType?.includes("application/json")) {
        return await response.json();
      } else if (contentType?.includes("text")) {
        return await response.text();
      } else {
        return await response.arrayBuffer();
      }
    } catch (error2) {
      clearTimeout(timeoutId);
      if (attempt === retries - 1) {
        console.error(`Fetch failed after ${retries} attempts:`, error2.message);
        return { error: error2.message || "Request failed" };
      }
      console.warn(`Retrying... (${attempt + 1}/${retries})`);
      await new Promise((resolve) => setTimeout(resolve, retryDelay));
    }
  }
}
var getJson = (url2, options = {}) => fetchRequest(url2, { ...options, method: "GET" });
var postJson = (url2, data, options = {}) => fetchRequest(url2, { ...options, method: "POST", body: JSON.stringify(data), headers: { "Content-Type": "application/json" } });
var putJson = (url2, data, options = {}) => fetchRequest(url2, { ...options, method: "PUT", body: JSON.stringify(data), headers: { "Content-Type": "application/json" } });
var patchJson = (url2, data, options = {}) => fetchRequest(url2, { ...options, method: "PATCH", body: JSON.stringify(data), headers: { "Content-Type": "application/json" } });
var deleteRequest = (url2, options = {}) => fetchRequest(url2, { ...options, method: "DELETE" });
var deleteJson = (url2, data, options = {}) => fetchRequest(url2, { ...options, method: "DELETE", body: JSON.stringify(data), headers: { "Content-Type": "application/json" } });
var headRequest = (url2, options = {}) => fetchRequest(url2, { ...options, method: "HEAD" });
var getBuffer = (url2, options = {}) => fetchRequest(url2, { ...options, method: "GET" });

// src/modules/crypto.ts
var import_crypto = __toESM(require("crypto"), 1);
var sha256 = (data) => import_crypto.default.createHash("sha256").update(data).digest("hex");
var randomBytes = (length = 16) => import_crypto.default.randomBytes(length).toString("hex");
var generateUUID = () => import_crypto.default.randomUUID();
var encryptAES = (text, key) => {
  const cipher = import_crypto.default.createCipheriv("aes-256-cbc", Buffer.from(key, "hex"), Buffer.alloc(16, 0));
  return cipher.update(text, "utf8", "hex") + cipher.final("hex");
};
var decryptAES = (encrypted, key) => {
  const decipher = import_crypto.default.createDecipheriv("aes-256-cbc", Buffer.from(key, "hex"), Buffer.alloc(16, 0));
  return decipher.update(encrypted, "hex", "utf8") + decipher.final("utf8");
};

// src/modules/fs.ts
var import_fs2 = __toESM(require("fs"), 1);
var readFile = (path3) => {
  try {
    return import_fs2.default.readFileSync(path3, "utf-8");
  } catch (error2) {
    console.error("File Read Error:", error2 instanceof Error ? error2.message : error2);
    return null;
  }
};
var writeFile = (path3, data) => {
  try {
    import_fs2.default.writeFileSync(path3, data, "utf-8");
  } catch (error2) {
    console.error("File Write Error:", error2 instanceof Error ? error2.message : error2);
  }
};
var appendToFile = (path3, data) => {
  try {
    import_fs2.default.appendFileSync(path3, data + "\n", "utf-8");
  } catch (error2) {
    console.error("File Append Error:", error2 instanceof Error ? error2.message : error2);
  }
};
var deleteFile = (path3) => {
  try {
    import_fs2.default.unlinkSync(path3);
  } catch (error2) {
    console.error("File Delete Error:", error2 instanceof Error ? error2.message : error2);
  }
};
var fileExists = (path3) => {
  return import_fs2.default.existsSync(path3);
};

// src/modules/os.ts
var import_os = __toESM(require("os"), 1);
var getSystemInfo = () => ({
  platform: import_os.default.platform(),
  osType: import_os.default.type(),
  release: import_os.default.release(),
  architecture: import_os.default.arch(),
  cpuModel: import_os.default.cpus()[0]?.model || "Unknown",
  cpuCores: import_os.default.cpus().length,
  totalMemory: `${(import_os.default.totalmem() / 1e9).toFixed(2)} GB`,
  freeMemory: `${(import_os.default.freemem() / 1e9).toFixed(2)} GB`,
  uptime: `${(import_os.default.uptime() / 3600).toFixed(2)} hours`,
  homeDir: import_os.default.homedir(),
  hostname: import_os.default.hostname()
});
var getCpuLoad = () => import_os.default.loadavg();
var getNetworkInterfaces = () => import_os.default.networkInterfaces();
var getUserInfo = () => import_os.default.userInfo();

// src/modules/path.ts
var import_path = __toESM(require("path"), 1);
var getFileName = (filePath, withExt = true) => {
  return withExt ? import_path.default.basename(filePath) : import_path.default.basename(filePath, import_path.default.extname(filePath));
};
var getAbsolutePath = (relativePath) => import_path.default.resolve(relativePath);
var normalizePath = (filePath) => import_path.default.normalize(filePath);
var getFileExtension = (filePath, withDot = true) => {
  const ext = import_path.default.extname(filePath);
  return withDot ? ext : ext.replace(".", "");
};
var joinPath = (...paths) => import_path.default.join(...paths);
var getRelativePath = (from, to) => import_path.default.relative(from, to);

// src/modules/url.ts
var import_url = require("url");
var import_querystring = __toESM(require("querystring"), 1);
var pasrseURL = (urlString) => {
  const urlObj = new import_url.URL(urlString);
  return {
    protocol: urlObj.protocol,
    hostname: urlObj.hostname,
    pathname: urlObj.pathname,
    query: import_querystring.default.parse(urlObj.search.substring(1))
    // Convert query params to object
  };
};
var buildUrl = (baseUrl, params) => {
  return `${baseUrl}?${import_querystring.default.stringify(params)}`;
};

// src/modules/child_process.ts
var import_child_process = require("child_process");
var runCommand = (command, cwd, timeout = 5e3) => {
  return new Promise((resolve, reject) => {
    const process = (0, import_child_process.exec)(command, { cwd, timeout }, (error2, stdout, stderr) => {
      if (error2)
        return reject(`Error: ${error2.message}`);
      if (stderr)
        return reject(`Stderr: ${stderr}`);
      resolve(stdout.trim());
    });
    process.stdout?.on("data", (data) => console.log(data.toString()));
    process.stderr?.on("data", (data) => console.error(data.toString()));
  });
};
var runCommandSync = (command, cwd) => {
  try {
    return (0, import_child_process.execSync)(command, { cwd, encoding: "utf-8" }).trim();
  } catch (error2) {
    console.error(`Command Failed: ${error2 instanceof Error ? error2.message : error2}`);
    return null;
  }
};
var runSpawn = (command, args, cwd) => {
  return new Promise((resolve, reject) => {
    const process = (0, import_child_process.spawn)(command, args, { cwd, shell: true });
    let output = "";
    process.stdout.on("data", (data) => output += data.toString());
    process.stderr.on("data", (data) => console.error(`Stderr: ${data.toString()}`));
    process.on("close", (code) => code === 0 ? resolve(output.trim()) : reject(`Exited with code ${code}`));
  });
};

// src/modules/apex.ts
var import_http = __toESM(require("http"), 1);
var import_url2 = __toESM(require("url"), 1);
var import_fs3 = __toESM(require("fs"), 1);
var import_path2 = __toESM(require("path"), 1);
var Router = class {
  constructor() {
    this.routes = {};
    this.middlewares = [];
    this.settings = {};
    this.viewsDir = "";
    this.viewEngine = null;
  }
  // Add middleware
  use(path3, middleware) {
    if (typeof path3 === "string" && middleware) {
      this.middlewares.push((req, res, next) => {
        if (req.url?.startsWith(path3)) {
          middleware(req, res, next);
        } else {
          next();
        }
      });
    } else if (typeof path3 === "function") {
      this.middlewares.push(path3);
    }
  }
  // Add GET route
  get(path3, handler) {
    this.addRoute(path3, "GET", handler);
  }
  // Add POST route
  post(path3, handler) {
    this.addRoute(path3, "POST", handler);
  }
  // Add PUT route
  put(path3, handler) {
    this.addRoute(path3, "PUT", handler);
  }
  // Add DELETE route
  delete(path3, handler) {
    this.addRoute(path3, "DELETE", handler);
  }
  // Add a route with a handler for a specific HTTP method
  addRoute(path3, method, handler) {
    if (!this.routes[path3]) {
      this.routes[path3] = {};
    }
    this.routes[path3][method.toUpperCase()] = handler;
  }
  // Set configuration
  set(key, value) {
    console.log(`Setting ${key} to ${value}`);
    if (key === "view engine") {
      if (value === "ejs") {
        this.viewEngine = (filePath, data, callback) => {
          import_fs3.default.readFile(filePath, "utf8", (err, template) => {
            if (err)
              return callback(err);
            const rendered = template.replace(/<%=\s*(.*?)\s*%>/g, (_, key2) => data[key2] || "");
            callback(null, rendered);
          });
        };
      } else {
        throw new Error(`Unsupported view engine: ${value}`);
      }
    } else if (key === "views") {
      this.viewsDir = value;
    }
    this.settings[key] = value;
  }
  // Get configuration
  getSetting(key) {
    return this.settings[key];
  }
  // Render a view
  render(res, viewName, data = {}) {
    console.log(`Rendering view: ${viewName}`);
    if (!this.viewEngine) {
      throw new Error('View engine not set. Use set("view engine", "ejs") to configure a view engine.');
    }
    const viewExtension = this.getSetting("view engine");
    if (!viewExtension) {
      throw new Error('View engine not set. Use set("view engine", "ejs") to configure a view engine.');
    }
    const viewPath = import_path2.default.join(this.viewsDir, `${viewName}.${viewExtension}`);
    console.log(`View path: ${viewPath}`);
    this.viewEngine(viewPath, data, (err, html) => {
      if (err) {
        console.error(`Error rendering view: ${err.message}`);
        apex.text(res, 500, `Error rendering view: ${err.message}`);
      } else {
        apex.html(res, 200, html || "");
      }
    });
  }
  // Handle incoming requests
  handleRequest(req, res) {
    const { pathname } = parseUrl(req);
    const method = getMethod(req);
    const executeMiddlewares = (index) => {
      if (index < this.middlewares.length) {
        this.middlewares[index](req, res, () => executeMiddlewares(index + 1));
      } else {
        if (this.routes[pathname] && this.routes[pathname][method]) {
          return this.routes[pathname][method](req, res);
        }
        for (const route in this.routes) {
          if (route.endsWith("/*") && pathname.startsWith(route.replace("/*", ""))) {
            if (this.routes[route][method]) {
              return this.routes[route][method](req, res);
            }
          }
        }
        this.notFoundHandler(req, res);
      }
    };
    executeMiddlewares(0);
  }
  // Default 404 handler
  notFoundHandler(req, res) {
    apex.text(res, 404, "Not Found");
  }
};
function createServer(router) {
  return import_http.default.createServer((req, res) => {
    router.handleRequest(req, res);
  });
}
var apex = {
  Router,
  createServer,
  text(res, statusCode, message) {
    res.writeHead(statusCode, { "Content-Type": "text/plain" });
    res.end(message);
  },
  json(res, statusCode, data) {
    res.writeHead(statusCode, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data));
  },
  html(res, statusCode, html) {
    res.writeHead(statusCode, { "Content-Type": "text/html" });
    res.end(html);
  },
  sendFile(res, filePath) {
    const extname = import_path2.default.extname(filePath).toLowerCase();
    const contentType = {
      ".html": "text/html",
      ".css": "text/css",
      ".js": "application/javascript",
      ".json": "application/json",
      ".png": "image/png",
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".gif": "image/gif",
      ".svg": "image/svg+xml",
      ".ico": "image/x-icon",
      ".txt": "text/plain",
      ".pdf": "application/pdf",
      ".zip": "application/zip",
      ".mp4": "video/mp4",
      ".mp3": "audio/mpeg",
      ".wav": "audio/wav",
      ".ogg": "audio/ogg",
      ".webp": "image/webp",
      ".avif": "image/avif",
      ".flac": "audio/flac",
      ".aac": "audio/aac",
      ".woff": "font/woff",
      ".woff2": "font/woff2",
      ".ttf": "font/ttf",
      ".eot": "application/vnd.ms-fontobject",
      ".xml": "application/xml",
      ".csv": "text/csv"
    }[extname] || "application/octet-stream";
    import_fs3.default.readFile(filePath, (err, data) => {
      if (err) {
        apex.text(res, 404, "File Not Found");
      } else {
        res.writeHead(200, { "Content-Type": contentType });
        res.end(data);
      }
    });
  },
  static(staticPath) {
    return (req, res, next) => {
      const { pathname } = parseUrl(req);
      const filePath = import_path2.default.join(staticPath, pathname);
      import_fs3.default.stat(filePath, (err, stats) => {
        if (err || !stats.isFile()) {
          next();
        } else {
          apex.sendFile(res, filePath);
        }
      });
    };
  },
  favicon(iconPath) {
    return (req, res, next) => {
      if (req.url === "/favicon.ico") {
        apex.sendFile(res, iconPath);
      } else {
        next();
      }
    };
  }
};
function parseUrl(req) {
  const parsedUrl = import_url2.default.parse(req.url || "", true);
  const query = {};
  for (const key in parsedUrl.query) {
    const value = parsedUrl.query[key];
    if (value !== void 0) {
      query[key] = Array.isArray(value) ? value : value.toString();
    }
  }
  return {
    pathname: parsedUrl.pathname || "",
    query
  };
}
function getMethod(req) {
  return req.method?.toUpperCase() || "GET";
}

// src/modules/console.ts
function log(...args) {
  console.log(...args);
}
function error(...args) {
  console.error(...args);
}
function warn(...args) {
  console.warn(...args);
}
function info(...args) {
  console.info(...args);
}
function debug(...args) {
  console.debug(...args);
}
function table(data, columns) {
  console.table(data, columns);
}
function clear() {
  console.clear();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ReadMore,
  apex,
  appendToFile,
  bufferToFile,
  buffertoJson,
  buildUrl,
  clear,
  debug,
  decryptAES,
  deleteFile,
  deleteJson,
  deleteRequest,
  encryptAES,
  error,
  extractUrlFromString,
  fetchRequest,
  fileExists,
  formatBytes,
  formatNumber,
  generateUUID,
  getAbsolutePath,
  getBuffer,
  getBufferFromStream,
  getCpuLoad,
  getDate,
  getFileExtension,
  getFileName,
  getJson,
  getNetworkInterfaces,
  getRandom,
  getRelativePath,
  getStreamFromBuffer,
  getSystemInfo,
  getTime,
  getUserInfo,
  headRequest,
  info,
  isArray,
  isEmail,
  isObject,
  isURL,
  joinPath,
  jsontoBuffer,
  log,
  normalizePath,
  pasrseURL,
  patchJson,
  postJson,
  putJson,
  randomBytes,
  randomElement,
  randomHexColor,
  randomInt,
  randomizeArray,
  readFile,
  runCommand,
  runCommandSync,
  runSpawn,
  sha256,
  sleep,
  table,
  timeAgo,
  toBool,
  toBuffer,
  toQueryString,
  transformBuffer,
  truncate,
  uniqueArray,
  warn,
  writeFile
});
