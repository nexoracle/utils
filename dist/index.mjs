// src/utils/tools.ts
import { promises as fs } from "fs";
import { Readable } from "stream";

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
  await fs.writeFile(filePath, buffer);
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
  const readable = new Readable();
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
import crypto from "crypto";
var sha256 = (data) => crypto.createHash("sha256").update(data).digest("hex");
var randomBytes = (length = 16) => crypto.randomBytes(length).toString("hex");
var generateUUID = () => crypto.randomUUID();
var encryptAES = (text, key) => {
  const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(key, "hex"), Buffer.alloc(16, 0));
  return cipher.update(text, "utf8", "hex") + cipher.final("hex");
};
var decryptAES = (encrypted, key) => {
  const decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(key, "hex"), Buffer.alloc(16, 0));
  return decipher.update(encrypted, "hex", "utf8") + decipher.final("utf8");
};

// src/modules/fs.ts
import fs2 from "fs";
var readFile = (path3) => {
  try {
    return fs2.readFileSync(path3, "utf-8");
  } catch (error2) {
    console.error("File Read Error:", error2 instanceof Error ? error2.message : error2);
    return null;
  }
};
var writeFile = (path3, data) => {
  try {
    fs2.writeFileSync(path3, data, "utf-8");
  } catch (error2) {
    console.error("File Write Error:", error2 instanceof Error ? error2.message : error2);
  }
};
var appendToFile = (path3, data) => {
  try {
    fs2.appendFileSync(path3, data + "\n", "utf-8");
  } catch (error2) {
    console.error("File Append Error:", error2 instanceof Error ? error2.message : error2);
  }
};
var deleteFile = (path3) => {
  try {
    fs2.unlinkSync(path3);
  } catch (error2) {
    console.error("File Delete Error:", error2 instanceof Error ? error2.message : error2);
  }
};
var fileExists = (path3) => {
  return fs2.existsSync(path3);
};

// src/modules/os.ts
import os from "os";
var getSystemInfo = () => ({
  platform: os.platform(),
  osType: os.type(),
  release: os.release(),
  architecture: os.arch(),
  cpuModel: os.cpus()[0]?.model || "Unknown",
  cpuCores: os.cpus().length,
  totalMemory: `${(os.totalmem() / 1e9).toFixed(2)} GB`,
  freeMemory: `${(os.freemem() / 1e9).toFixed(2)} GB`,
  uptime: `${(os.uptime() / 3600).toFixed(2)} hours`,
  homeDir: os.homedir(),
  hostname: os.hostname()
});
var getCpuLoad = () => os.loadavg();
var getNetworkInterfaces = () => os.networkInterfaces();
var getUserInfo = () => os.userInfo();

// src/modules/path.ts
import path from "path";
var getFileName = (filePath, withExt = true) => {
  return withExt ? path.basename(filePath) : path.basename(filePath, path.extname(filePath));
};
var getAbsolutePath = (relativePath) => path.resolve(relativePath);
var normalizePath = (filePath) => path.normalize(filePath);
var getFileExtension = (filePath, withDot = true) => {
  const ext = path.extname(filePath);
  return withDot ? ext : ext.replace(".", "");
};
var joinPath = (...paths) => path.join(...paths);
var getRelativePath = (from, to) => path.relative(from, to);

// src/modules/url.ts
import { URL } from "url";
import querystring from "querystring";
var pasrseURL = (urlString) => {
  const urlObj = new URL(urlString);
  return {
    protocol: urlObj.protocol,
    hostname: urlObj.hostname,
    pathname: urlObj.pathname,
    query: querystring.parse(urlObj.search.substring(1))
    // Convert query params to object
  };
};
var buildUrl = (baseUrl, params) => {
  return `${baseUrl}?${querystring.stringify(params)}`;
};

// src/modules/child_process.ts
import { exec, execSync, spawn } from "child_process";
var runCommand = (command, cwd, timeout = 5e3) => {
  return new Promise((resolve, reject) => {
    const process = exec(command, { cwd, timeout }, (error2, stdout, stderr) => {
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
    return execSync(command, { cwd, encoding: "utf-8" }).trim();
  } catch (error2) {
    console.error(`Command Failed: ${error2 instanceof Error ? error2.message : error2}`);
    return null;
  }
};
var runSpawn = (command, args, cwd) => {
  return new Promise((resolve, reject) => {
    const process = spawn(command, args, { cwd, shell: true });
    let output = "";
    process.stdout.on("data", (data) => output += data.toString());
    process.stderr.on("data", (data) => console.error(`Stderr: ${data.toString()}`));
    process.on("close", (code) => code === 0 ? resolve(output.trim()) : reject(`Exited with code ${code}`));
  });
};

// src/modules/http.ts
import http from "http";
import url from "url";
import fs3 from "fs";
import path2 from "path";
function sendText(res, statusCode, message) {
  res.writeHead(statusCode, { "Content-Type": "text/plain" });
  res.end(message);
}
function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
}
function sendBuffer(res, statusCode, buffer, contentType = "application/octet-stream") {
  res.writeHead(statusCode, { "Content-Type": contentType });
  res.end(buffer);
}
function parseUrl(req) {
  const parsedUrl = url.parse(req.url || "", true);
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
function getRequestBody(req, options = {}) {
  const { timeout = 1e4, maxSize = 1024 * 1024 } = options;
  return new Promise((resolve, reject) => {
    let body = "";
    let size = 0;
    const timeoutId = setTimeout(() => {
      req.destroy();
      reject(new Error("Request timeout"));
    }, timeout);
    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > maxSize) {
        req.destroy();
        clearTimeout(timeoutId);
        reject(new Error("Request body too large"));
      }
      body += chunk.toString();
    });
    req.on("end", () => {
      clearTimeout(timeoutId);
      resolve(body);
    });
    req.on("error", (err) => {
      clearTimeout(timeoutId);
      reject(err);
    });
  });
}
function serveStatic(res, filePath) {
  fs3.stat(filePath, (err, stats) => {
    if (err) {
      sendText(res, 404, "File Not Found");
      console.error("Error:", err);
      return;
    }
    if (stats.isDirectory()) {
      const defaultFile = path2.join(filePath, "index.html");
      fs3.readFile(defaultFile, (err2, data) => {
        if (err2) {
          sendText(res, 404, "Directory index not found");
          console.error("Error:", err2);
        } else {
          sendBuffer(res, 200, data, "text/html");
        }
      });
    } else if (stats.isFile()) {
      const extname = path2.extname(filePath).toLowerCase();
      const contentType = {
        ".html": "text/html",
        ".js": "text/javascript",
        ".css": "text/css",
        ".json": "application/json",
        ".png": "image/png",
        ".jpg": "image/jpg",
        ".jpeg": "image/jpeg",
        ".gif": "image/gif",
        ".svg": "image/svg+xml",
        ".txt": "text/plain"
      }[extname] || "application/octet-stream";
      fs3.readFile(filePath, (err2, data) => {
        if (err2) {
          sendText(res, 404, "File Not Found");
          console.error("Error:", err2);
        } else {
          sendBuffer(res, 200, data, contentType);
        }
      });
    } else {
      sendText(res, 404, "Not a file or directory");
    }
  });
}
var Router = class {
  constructor() {
    this.routes = {};
  }
  // Add a route with a handler for a specific HTTP method
  addRoute(path3, method, handler) {
    if (!this.routes[path3]) {
      this.routes[path3] = {};
    }
    this.routes[path3][method.toUpperCase()] = handler;
  }
  // Handle incoming requests
  handleRequest(req, res) {
    const { pathname } = parseUrl(req);
    const method = getMethod(req);
    const route = this.routes[pathname];
    if (route && route[method]) {
      route[method](req, res);
    } else {
      this.notFoundHandler(req, res);
    }
  }
  // Default 404 handler
  notFoundHandler(req, res) {
    sendText(res, 404, "Not Found");
  }
};
function createServer(router) {
  return http.createServer((req, res) => {
    router.handleRequest(req, res);
  });
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
export {
  ReadMore,
  Router,
  appendToFile,
  bufferToFile,
  buffertoJson,
  buildUrl,
  clear,
  createServer,
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
  getMethod,
  getNetworkInterfaces,
  getRandom,
  getRelativePath,
  getRequestBody,
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
  parseUrl,
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
  sendBuffer,
  sendJson,
  sendText,
  serveStatic,
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
};
