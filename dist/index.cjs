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
  axium: () => axium,
  bufferToFile: () => bufferToFile,
  buffertoJson: () => buffertoJson,
  buildUrl: () => buildUrl,
  clear: () => clear,
  crypto: () => crypto,
  debug: () => debug,
  deleteFile: () => deleteFile,
  error: () => error,
  extractUrlFromString: () => extractUrlFromString,
  fileExists: () => fileExists,
  formatBytes: () => formatBytes,
  formatNumber: () => formatNumber,
  getAbsolutePath: () => getAbsolutePath,
  getBufferFromStream: () => getBufferFromStream,
  getCpuLoad: () => getCpuLoad,
  getDate: () => getDate,
  getFileExtension: () => getFileExtension,
  getFileName: () => getFileName,
  getNetworkInterfaces: () => getNetworkInterfaces,
  getRandom: () => getRandom,
  getRelativePath: () => getRelativePath,
  getStreamFromBuffer: () => getStreamFromBuffer,
  getSystemInfo: () => getSystemInfo,
  getTime: () => getTime,
  getUserInfo: () => getUserInfo,
  info: () => info,
  isArray: () => isArray,
  isEmail: () => isEmail,
  isObject: () => isObject,
  isURL: () => isURL,
  joinPath: () => joinPath,
  jsontoBuffer: () => jsontoBuffer,
  log: () => log,
  mime: () => mime,
  normalizePath: () => normalizePath,
  pasrseURL: () => pasrseURL,
  randomElement: () => randomElement,
  randomHexColor: () => randomHexColor,
  randomInt: () => randomInt,
  randomizeArray: () => randomizeArray,
  readFile: () => readFile,
  runCommand: () => runCommand,
  runCommandSync: () => runCommandSync,
  runSpawn: () => runSpawn,
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

// src/functions/tools.ts
var import_fs = require("fs");
var import_stream = require("stream");

// src/functions/validation.ts
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

// src/functions/tools.ts
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

// src/modules/axium.ts
var import_buffer = require("buffer");
var FetchError = class extends Error {
  constructor(message, status, response) {
    super(message);
    this.message = message;
    this.status = status;
    this.response = response;
    this.name = "FetchError";
  }
};
var ProgressEvent = class {
  constructor(loaded, total) {
    this.loaded = loaded;
    this.total = total;
  }
  get percent() {
    return this.total > 0 ? this.loaded / this.total * 100 : 0;
  }
};
var Axium = class {
  constructor(defaults) {
    this.requestInterceptors = [];
    this.responseInterceptors = [];
    this.globalDefaults = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    if (defaults) {
      this.globalDefaults = { ...this.globalDefaults, ...defaults };
    }
  }
  // Add request interceptor
  addRequestInterceptor(interceptor) {
    this.requestInterceptors.push(interceptor);
  }
  // Add response interceptor
  addResponseInterceptor(interceptor) {
    this.responseInterceptors.push(interceptor);
  }
  // Set global defaults
  setGlobalDefaults(defaults) {
    this.globalDefaults = { ...this.globalDefaults, ...defaults };
  }
  // Apply interceptors
  async applyInterceptors(interceptors, value) {
    let result = value;
    for (const interceptor of interceptors) {
      result = await interceptor(result);
    }
    return result;
  }
  // Build URL with query parameters
  buildUrl(url2, params) {
    if (!params)
      return url2;
    const urlObj = new URL(url2);
    Object.entries(params).forEach(([key, value]) => {
      if (value !== void 0 && value !== null) {
        urlObj.searchParams.append(key, String(value));
      }
    });
    return urlObj.toString();
  }
  // Core fetch request
  async request(url2, options = {}) {
    const { retries = 0, retryDelay = 0, timeout, params, onDownloadProgress, onUploadProgress, signal: externalSignal, ...fetchOptions } = await this.applyInterceptors(this.requestInterceptors, { ...this.globalDefaults, ...options });
    const finalUrl = this.buildUrl(url2, params);
    for (let attempt = 0; attempt <= retries; attempt++) {
      const controller = new AbortController();
      const timeoutId = timeout ? setTimeout(() => controller.abort(), timeout) : null;
      const signal = externalSignal || controller.signal;
      try {
        const response = await fetch(finalUrl, {
          ...fetchOptions,
          signal,
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36",
            ...fetchOptions.headers
          }
        });
        if (timeoutId)
          clearTimeout(timeoutId);
        if (!response.ok) {
          throw new FetchError(`HTTP error! Status: ${response.status}`, response.status, response);
        }
        if (onDownloadProgress && response.body) {
          const reader = response.body.getReader();
          const contentLength = Number(response.headers.get("content-length")) || 0;
          let loaded = 0;
          const stream = new ReadableStream({
            async start(controller2) {
              while (true) {
                const { done, value } = await reader.read();
                if (done)
                  break;
                loaded += value.length;
                onDownloadProgress(new ProgressEvent(loaded, contentLength));
                controller2.enqueue(value);
              }
              controller2.close();
            }
          });
          const newResponse = new Response(stream, {
            headers: response.headers,
            status: response.status,
            statusText: response.statusText
          });
          const interceptedResponse = await this.applyInterceptors(this.responseInterceptors, newResponse);
          const contentType = interceptedResponse.headers.get("content-type");
          let data;
          if (options.responseType) {
            switch (options.responseType) {
              case "arraybuffer":
                data = await interceptedResponse.arrayBuffer();
                data = import_buffer.Buffer.from(data);
                break;
              case "blob":
                data = await interceptedResponse.blob();
                break;
              case "json":
                data = await interceptedResponse.json();
                break;
              case "text":
                data = await interceptedResponse.text();
                break;
              default:
                data = await interceptedResponse.arrayBuffer();
                data = import_buffer.Buffer.from(data);
            }
          } else {
            if (contentType?.includes("application/json")) {
              data = await interceptedResponse.json();
            } else if (contentType?.includes("text")) {
              data = await interceptedResponse.text();
            } else if (contentType?.includes("application/xml") || contentType?.includes("text/xml")) {
              data = await interceptedResponse.text();
            } else if (contentType?.includes("application/pdf")) {
              data = await interceptedResponse.blob();
            } else if (contentType?.includes("image/")) {
              data = await interceptedResponse.arrayBuffer();
              data = import_buffer.Buffer.from(data);
            } else if (contentType?.includes("application/octet-stream")) {
              data = await interceptedResponse.arrayBuffer();
              data = import_buffer.Buffer.from(data);
            } else {
              data = await interceptedResponse.arrayBuffer();
              data = import_buffer.Buffer.from(data);
            }
          }
          return {
            data,
            status: interceptedResponse.status,
            statusText: interceptedResponse.statusText,
            headers: interceptedResponse.headers,
            config: options
          };
        } else {
          const interceptedResponse = await this.applyInterceptors(this.responseInterceptors, response);
          const contentType = interceptedResponse.headers.get("content-type");
          let data;
          if (options.responseType) {
            switch (options.responseType) {
              case "arraybuffer":
                data = await interceptedResponse.arrayBuffer();
                data = import_buffer.Buffer.from(data);
                break;
              case "blob":
                data = await interceptedResponse.blob();
                break;
              case "json":
                data = await interceptedResponse.json();
                break;
              case "text":
                data = await interceptedResponse.text();
                break;
              default:
                data = await interceptedResponse.arrayBuffer();
                data = import_buffer.Buffer.from(data);
            }
          } else {
            if (contentType?.includes("application/json")) {
              data = await interceptedResponse.json();
            } else if (contentType?.includes("text")) {
              data = await interceptedResponse.text();
            } else if (contentType?.includes("application/xml") || contentType?.includes("text/xml")) {
              data = await interceptedResponse.text();
            } else if (contentType?.includes("application/pdf")) {
              data = await interceptedResponse.blob();
            } else if (contentType?.includes("image/")) {
              data = await interceptedResponse.arrayBuffer();
              data = import_buffer.Buffer.from(data);
            } else if (contentType?.includes("application/octet-stream")) {
              data = await interceptedResponse.arrayBuffer();
              data = import_buffer.Buffer.from(data);
            } else {
              data = await interceptedResponse.arrayBuffer();
              data = import_buffer.Buffer.from(data);
            }
          }
          return {
            data,
            status: interceptedResponse.status,
            statusText: interceptedResponse.statusText,
            headers: interceptedResponse.headers,
            config: options
          };
        }
      } catch (error2) {
        if (timeoutId)
          clearTimeout(timeoutId);
        if (attempt === retries) {
          console.error(`Fetch failed after ${retries + 1} attempts:`, error2.message);
          throw new FetchError(error2.message || "Request failed");
        }
        if (retryDelay > 0) {
          console.warn(`Retrying... (${attempt + 1}/${retries + 1})`);
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
        }
      }
    }
  }
  // Helper methods
  get(url2, options = {}) {
    return this.request(url2, { ...options, method: "GET" });
  }
  post(url2, data, options = {}) {
    return this.request(url2, { ...options, method: "POST", body: JSON.stringify(data) });
  }
  put(url2, data, options = {}) {
    return this.request(url2, { ...options, method: "PUT", body: JSON.stringify(data) });
  }
  patch(url2, data, options = {}) {
    return this.request(url2, { ...options, method: "PATCH", body: JSON.stringify(data) });
  }
  delete(url2, options = {}) {
    return this.request(url2, { ...options, method: "DELETE" });
  }
  // Multipart form data
  postFormData(url2, data, options = {}) {
    return this.request(url2, {
      ...options,
      method: "POST",
      body: data,
      headers: {
        ...options.headers
      }
    });
  }
  // URL-encoded form
  postUrlEncoded(url2, data, options = {}) {
    const encodedData = new URLSearchParams(data).toString();
    return this.request(url2, {
      ...options,
      method: "POST",
      body: encodedData,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        ...options.headers
      }
    });
  }
  // Multiple concurrent requests
  all(requests) {
    return Promise.all(requests);
  }
  // Get buffer
  getBuffer(url2, options = {}) {
    return this.request(url2, { ...options, method: "GET" });
  }
  // Head request
  head(url2, options = {}) {
    return this.request(url2, { ...options, method: "HEAD" });
  }
};
var axium = new Axium();

// src/modules/crypto.ts
var Crypto = __toESM(require("crypto"), 1);
var crypto = {
  // Hashing functions
  sha256: (data) => Crypto.createHash("sha256").update(data).digest("hex"),
  sha512: (data) => Crypto.createHash("sha512").update(data).digest("hex"),
  md5: (data) => Crypto.createHash("md5").update(data).digest("hex"),
  // Random generation
  randomBytes: (length = 16) => Crypto.randomBytes(length).toString("hex"),
  generateUUID: () => Crypto.randomUUID(),
  // AES encryption/decryption
  encryptAES: (text, key, iv) => {
    const ivBuffer = iv ? Buffer.from(iv, "hex") : Buffer.alloc(16, 0);
    const cipher = Crypto.createCipheriv("aes-256-cbc", Buffer.from(key, "hex"), ivBuffer);
    return cipher.update(text, "utf8", "hex") + cipher.final("hex");
  },
  decryptAES: (encrypted, key, iv) => {
    const ivBuffer = iv ? Buffer.from(iv, "hex") : Buffer.alloc(16, 0);
    const decipher = Crypto.createDecipheriv("aes-256-cbc", Buffer.from(key, "hex"), ivBuffer);
    return decipher.update(encrypted, "hex", "utf8") + decipher.final("utf8");
  },
  // HMAC (Hash-based Message Authentication Code)
  hmacSHA256: (data, secret) => Crypto.createHmac("sha256", secret).update(data).digest("hex"),
  hmacSHA512: (data, secret) => Crypto.createHmac("sha512", secret).update(data).digest("hex"),
  // PBKDF2 (Password-Based Key Derivation Function)
  pbkdf2: (password, salt, iterations = 1e4, keylen = 64, digest = "sha512") => Crypto.pbkdf2Sync(password, salt, iterations, keylen, digest).toString("hex"),
  // RSA/EC/ED25519/ED448/X25519/X448 key generation
  generateKeyPair: (type = "rsa", options = {
    modulusLength: 2048,
    publicKeyEncoding: { type: "spki", format: "pem" },
    privateKeyEncoding: { type: "pkcs8", format: "pem" }
  }) => {
    return Crypto.generateKeyPairSync(type, options);
  },
  // RSA encryption/decryption
  encryptRSA: (text, publicKey) => Crypto.publicEncrypt(publicKey, Buffer.from(text, "utf8")).toString("base64"),
  decryptRSA: (encrypted, privateKey) => Crypto.privateDecrypt(privateKey, Buffer.from(encrypted, "base64")).toString("utf8"),
  // Sign and verify (RSA/ECDSA)
  sign: (data, privateKey, algorithm = "RSA-SHA256") => Crypto.createSign(algorithm).update(data).sign(privateKey, "hex"),
  verify: (data, signature, publicKey, algorithm = "RSA-SHA256") => Crypto.createVerify(algorithm).update(data).verify(publicKey, signature, "hex")
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
var import_tls = __toESM(require("tls"), 1);

// src/modules/mime.ts
var mimes = {
  "3g2": "video/3gpp2",
  "3gp": "video/3gpp",
  "3gpp": "video/3gpp",
  "3mf": "model/3mf",
  "aac": "audio/aac",
  "ac": "application/pkix-attr-cert",
  "adp": "audio/adpcm",
  "adts": "audio/aac",
  "ai": "application/postscript",
  "aml": "application/automationml-aml+xml",
  "amlx": "application/automationml-amlx+zip",
  "amr": "audio/amr",
  "apng": "image/apng",
  "appcache": "text/cache-manifest",
  "appinstaller": "application/appinstaller",
  "appx": "application/appx",
  "appxbundle": "application/appxbundle",
  "asc": "application/pgp-keys",
  "atom": "application/atom+xml",
  "atomcat": "application/atomcat+xml",
  "atomdeleted": "application/atomdeleted+xml",
  "atomsvc": "application/atomsvc+xml",
  "au": "audio/basic",
  "avci": "image/avci",
  "avcs": "image/avcs",
  "avif": "image/avif",
  "aw": "application/applixware",
  "bdoc": "application/bdoc",
  "bin": "application/octet-stream",
  "bmp": "image/bmp",
  "bpk": "application/octet-stream",
  "btf": "image/prs.btif",
  "btif": "image/prs.btif",
  "buffer": "application/octet-stream",
  "ccxml": "application/ccxml+xml",
  "cdfx": "application/cdfx+xml",
  "cdmia": "application/cdmi-capability",
  "cdmic": "application/cdmi-container",
  "cdmid": "application/cdmi-domain",
  "cdmio": "application/cdmi-object",
  "cdmiq": "application/cdmi-queue",
  "cer": "application/pkix-cert",
  "cgm": "image/cgm",
  "cjs": "application/node",
  "class": "application/java-vm",
  "coffee": "text/coffeescript",
  "conf": "text/plain",
  "cpl": "application/cpl+xml",
  "cpt": "application/mac-compactpro",
  "crl": "application/pkix-crl",
  "css": "text/css",
  "csv": "text/csv",
  "cu": "application/cu-seeme",
  "cwl": "application/cwl",
  "cww": "application/prs.cww",
  "davmount": "application/davmount+xml",
  "dbk": "application/docbook+xml",
  "deb": "application/octet-stream",
  "def": "text/plain",
  "deploy": "application/octet-stream",
  "dib": "image/bmp",
  "disposition-notification": "message/disposition-notification",
  "dist": "application/octet-stream",
  "distz": "application/octet-stream",
  "dll": "application/octet-stream",
  "dmg": "application/octet-stream",
  "dms": "application/octet-stream",
  "doc": "application/msword",
  "dot": "application/msword",
  "dpx": "image/dpx",
  "drle": "image/dicom-rle",
  "dsc": "text/prs.lines.tag",
  "dssc": "application/dssc+der",
  "dtd": "application/xml-dtd",
  "dump": "application/octet-stream",
  "dwd": "application/atsc-dwd+xml",
  "ear": "application/java-archive",
  "ecma": "application/ecmascript",
  "elc": "application/octet-stream",
  "emf": "image/emf",
  "eml": "message/rfc822",
  "emma": "application/emma+xml",
  "emotionml": "application/emotionml+xml",
  "eps": "application/postscript",
  "epub": "application/epub+zip",
  "exe": "application/octet-stream",
  "exi": "application/exi",
  "exp": "application/express",
  "exr": "image/aces",
  "ez": "application/andrew-inset",
  "fdf": "application/fdf",
  "fdt": "application/fdt+xml",
  "fits": "image/fits",
  "g3": "image/g3fax",
  "gbr": "application/rpki-ghostbusters",
  "geojson": "application/geo+json",
  "gif": "image/gif",
  "glb": "model/gltf-binary",
  "gltf": "model/gltf+json",
  "gml": "application/gml+xml",
  "gpx": "application/gpx+xml",
  "gram": "application/srgs",
  "grxml": "application/srgs+xml",
  "gxf": "application/gxf",
  "gz": "application/gzip",
  "h261": "video/h261",
  "h263": "video/h263",
  "h264": "video/h264",
  "heic": "image/heic",
  "heics": "image/heic-sequence",
  "heif": "image/heif",
  "heifs": "image/heif-sequence",
  "hej2": "image/hej2k",
  "held": "application/atsc-held+xml",
  "hjson": "application/hjson",
  "hlp": "application/winhlp",
  "hqx": "application/mac-binhex40",
  "hsj2": "image/hsj2",
  "htm": "text/html",
  "html": "text/html",
  "ics": "text/calendar",
  "ief": "image/ief",
  "ifb": "text/calendar",
  "iges": "model/iges",
  "igs": "model/iges",
  "img": "application/octet-stream",
  "in": "text/plain",
  "ini": "text/plain",
  "ink": "application/inkml+xml",
  "inkml": "application/inkml+xml",
  "ipfix": "application/ipfix",
  "iso": "application/octet-stream",
  "its": "application/its+xml",
  "jade": "text/jade",
  "jar": "application/java-archive",
  "jhc": "image/jphc",
  "jls": "image/jls",
  "jp2": "image/jp2",
  "jpe": "image/jpeg",
  "jpeg": "image/jpeg",
  "jpf": "image/jpx",
  "jpg": "image/jpeg",
  "jpg2": "image/jp2",
  "jpgm": "image/jpm",
  "jpgv": "video/jpeg",
  "jph": "image/jph",
  "jpm": "image/jpm",
  "jpx": "image/jpx",
  "js": "text/javascript",
  "json": "application/json",
  "json5": "application/json5",
  "jsonld": "application/ld+json",
  "jsonml": "application/jsonml+json",
  "jsx": "text/jsx",
  "jt": "model/jt",
  "jxl": "image/jxl",
  "jxr": "image/jxr",
  "jxra": "image/jxra",
  "jxrs": "image/jxrs",
  "jxs": "image/jxs",
  "jxsc": "image/jxsc",
  "jxsi": "image/jxsi",
  "jxss": "image/jxss",
  "kar": "audio/midi",
  "ktx": "image/ktx",
  "ktx2": "image/ktx2",
  "less": "text/less",
  "lgr": "application/lgr+xml",
  "list": "text/plain",
  "litcoffee": "text/coffeescript",
  "log": "text/plain",
  "lostxml": "application/lost+xml",
  "lrf": "application/octet-stream",
  "m1v": "video/mpeg",
  "m21": "application/mp21",
  "m2a": "audio/mpeg",
  "m2t": "video/mp2t",
  "m2ts": "video/mp2t",
  "m2v": "video/mpeg",
  "m3a": "audio/mpeg",
  "m4a": "audio/mp4",
  "m4p": "application/mp4",
  "m4s": "video/iso.segment",
  "ma": "application/mathematica",
  "mads": "application/mads+xml",
  "maei": "application/mmt-aei+xml",
  "man": "text/troff",
  "manifest": "text/cache-manifest",
  "map": "application/json",
  "mar": "application/octet-stream",
  "markdown": "text/markdown",
  "mathml": "application/mathml+xml",
  "mb": "application/mathematica",
  "mbox": "application/mbox",
  "md": "text/markdown",
  "mdx": "text/mdx",
  "me": "text/troff",
  "mesh": "model/mesh",
  "meta4": "application/metalink4+xml",
  "metalink": "application/metalink+xml",
  "mets": "application/mets+xml",
  "mft": "application/rpki-manifest",
  "mid": "audio/midi",
  "midi": "audio/midi",
  "mime": "message/rfc822",
  "mj2": "video/mj2",
  "mjp2": "video/mj2",
  "mjs": "text/javascript",
  "mml": "text/mathml",
  "mods": "application/mods+xml",
  "mov": "video/quicktime",
  "mp2": "audio/mpeg",
  "mp21": "application/mp21",
  "mp2a": "audio/mpeg",
  "mp3": "audio/mpeg",
  "mp4": "video/mp4",
  "mp4a": "audio/mp4",
  "mp4s": "application/mp4",
  "mp4v": "video/mp4",
  "mpd": "application/dash+xml",
  "mpe": "video/mpeg",
  "mpeg": "video/mpeg",
  "mpf": "application/media-policy-dataset+xml",
  "mpg": "video/mpeg",
  "mpg4": "video/mp4",
  "mpga": "audio/mpeg",
  "mpp": "application/dash-patch+xml",
  "mrc": "application/marc",
  "mrcx": "application/marcxml+xml",
  "ms": "text/troff",
  "mscml": "application/mediaservercontrol+xml",
  "msh": "model/mesh",
  "msi": "application/octet-stream",
  "msix": "application/msix",
  "msixbundle": "application/msixbundle",
  "msm": "application/octet-stream",
  "msp": "application/octet-stream",
  "mtl": "model/mtl",
  "mts": "video/mp2t",
  "musd": "application/mmt-usd+xml",
  "mxf": "application/mxf",
  "mxmf": "audio/mobile-xmf",
  "mxml": "application/xv+xml",
  "n3": "text/n3",
  "nb": "application/mathematica",
  "nq": "application/n-quads",
  "nt": "application/n-triples",
  "obj": "model/obj",
  "oda": "application/oda",
  "oga": "audio/ogg",
  "ogg": "audio/ogg",
  "ogv": "video/ogg",
  "ogx": "application/ogg",
  "omdoc": "application/omdoc+xml",
  "onepkg": "application/onenote",
  "onetmp": "application/onenote",
  "onetoc": "application/onenote",
  "onetoc2": "application/onenote",
  "opf": "application/oebps-package+xml",
  "opus": "audio/ogg",
  "otf": "font/otf",
  "owl": "application/rdf+xml",
  "oxps": "application/oxps",
  "p10": "application/pkcs10",
  "p7c": "application/pkcs7-mime",
  "p7m": "application/pkcs7-mime",
  "p7s": "application/pkcs7-signature",
  "p8": "application/pkcs8",
  "pdf": "application/pdf",
  "pfr": "application/font-tdpfr",
  "pgp": "application/pgp-encrypted",
  "pkg": "application/octet-stream",
  "pki": "application/pkixcmp",
  "pkipath": "application/pkix-pkipath",
  "pls": "application/pls+xml",
  "png": "image/png",
  "prc": "model/prc",
  "prf": "application/pics-rules",
  "provx": "application/provenance+xml",
  "ps": "application/postscript",
  "pskcxml": "application/pskc+xml",
  "pti": "image/prs.pti",
  "qt": "video/quicktime",
  "raml": "application/raml+yaml",
  "rapd": "application/route-apd+xml",
  "rdf": "application/rdf+xml",
  "relo": "application/p2p-overlay+xml",
  "rif": "application/reginfo+xml",
  "rl": "application/resource-lists+xml",
  "rld": "application/resource-lists-diff+xml",
  "rmi": "audio/midi",
  "rnc": "application/relax-ng-compact-syntax",
  "rng": "application/xml",
  "roa": "application/rpki-roa",
  "roff": "text/troff",
  "rq": "application/sparql-query",
  "rs": "application/rls-services+xml",
  "rsat": "application/atsc-rsat+xml",
  "rsd": "application/rsd+xml",
  "rsheet": "application/urc-ressheet+xml",
  "rss": "application/rss+xml",
  "rtf": "text/rtf",
  "rtx": "text/richtext",
  "rusd": "application/route-usd+xml",
  "s3m": "audio/s3m",
  "sbml": "application/sbml+xml",
  "scq": "application/scvp-cv-request",
  "scs": "application/scvp-cv-response",
  "sdp": "application/sdp",
  "senmlx": "application/senml+xml",
  "sensmlx": "application/sensml+xml",
  "ser": "application/java-serialized-object",
  "setpay": "application/set-payment-initiation",
  "setreg": "application/set-registration-initiation",
  "sgi": "image/sgi",
  "sgm": "text/sgml",
  "sgml": "text/sgml",
  "shex": "text/shex",
  "shf": "application/shf+xml",
  "shtml": "text/html",
  "sieve": "application/sieve",
  "sig": "application/pgp-signature",
  "sil": "audio/silk",
  "silo": "model/mesh",
  "siv": "application/sieve",
  "slim": "text/slim",
  "slm": "text/slim",
  "sls": "application/route-s-tsid+xml",
  "smi": "application/smil+xml",
  "smil": "application/smil+xml",
  "snd": "audio/basic",
  "so": "application/octet-stream",
  "spdx": "text/spdx",
  "spp": "application/scvp-vp-response",
  "spq": "application/scvp-vp-request",
  "spx": "audio/ogg",
  "sql": "application/sql",
  "sru": "application/sru+xml",
  "srx": "application/sparql-results+xml",
  "ssdl": "application/ssdl+xml",
  "ssml": "application/ssml+xml",
  "stk": "application/hyperstudio",
  "stl": "model/stl",
  "stpx": "model/step+xml",
  "stpxz": "model/step-xml+zip",
  "stpz": "model/step+zip",
  "styl": "text/stylus",
  "stylus": "text/stylus",
  "svg": "image/svg+xml",
  "svgz": "image/svg+xml",
  "swidtag": "application/swid+xml",
  "t": "text/troff",
  "t38": "image/t38",
  "td": "application/urc-targetdesc+xml",
  "tei": "application/tei+xml",
  "teicorpus": "application/tei+xml",
  "text": "text/plain",
  "tfi": "application/thraud+xml",
  "tfx": "image/tiff-fx",
  "tif": "image/tiff",
  "tiff": "image/tiff",
  "toml": "application/toml",
  "tr": "text/troff",
  "trig": "application/trig",
  "ts": "video/mp2t",
  "tsd": "application/timestamped-data",
  "tsv": "text/tab-separated-values",
  "ttc": "font/collection",
  "ttf": "font/ttf",
  "ttl": "text/turtle",
  "ttml": "application/ttml+xml",
  "txt": "text/plain",
  "u3d": "model/u3d",
  "u8dsn": "message/global-delivery-status",
  "u8hdr": "message/global-headers",
  "u8mdn": "message/global-disposition-notification",
  "u8msg": "message/global",
  "ubj": "application/ubjson",
  "uri": "text/uri-list",
  "uris": "text/uri-list",
  "urls": "text/uri-list",
  "vcard": "text/vcard",
  "vrml": "model/vrml",
  "vtt": "text/vtt",
  "vxml": "application/voicexml+xml",
  "war": "application/java-archive",
  "wasm": "application/wasm",
  "wav": "audio/wav",
  "weba": "audio/webm",
  "webm": "video/webm",
  "webmanifest": "application/manifest+json",
  "webp": "image/webp",
  "wgsl": "text/wgsl",
  "wgt": "application/widget",
  "wif": "application/watcherinfo+xml",
  "wmf": "image/wmf",
  "woff": "font/woff",
  "woff2": "font/woff2",
  "wrl": "model/vrml",
  "wsdl": "application/wsdl+xml",
  "wspolicy": "application/wspolicy+xml",
  "x3d": "model/x3d+xml",
  "x3db": "model/x3d+fastinfoset",
  "x3dbz": "model/x3d+binary",
  "x3dv": "model/x3d-vrml",
  "x3dvz": "model/x3d+vrml",
  "x3dz": "model/x3d+xml",
  "xaml": "application/xaml+xml",
  "xav": "application/xcap-att+xml",
  "xca": "application/xcap-caps+xml",
  "xcs": "application/calendar+xml",
  "xdf": "application/xcap-diff+xml",
  "xdssc": "application/dssc+xml",
  "xel": "application/xcap-el+xml",
  "xenc": "application/xenc+xml",
  "xer": "application/patch-ops-error+xml",
  "xfdf": "application/xfdf",
  "xht": "application/xhtml+xml",
  "xhtml": "application/xhtml+xml",
  "xhvml": "application/xv+xml",
  "xlf": "application/xliff+xml",
  "xm": "audio/xm",
  "xml": "text/xml",
  "xns": "application/xcap-ns+xml",
  "xop": "application/xop+xml",
  "xpl": "application/xproc+xml",
  "xsd": "application/xml",
  "xsf": "application/prs.xsf+xml",
  "xsl": "application/xml",
  "xslt": "application/xml",
  "xspf": "application/xspf+xml",
  "xvm": "application/xv+xml",
  "xvml": "application/xv+xml",
  "yaml": "text/yaml",
  "yang": "application/yang",
  "yin": "application/yin+xml",
  "yml": "text/yaml",
  "zip": "application/zip",
  "ico": "image/x-icon"
};
function get(extn) {
  let tmp = ("" + extn).trim().toLowerCase();
  let idx = tmp.lastIndexOf(".");
  return mimes[!~idx ? tmp : tmp.substring(++idx)];
}
var mime = { mimes, get };

// src/modules/apex.ts
var Router = class {
  constructor() {
    this.routes = {};
    this.middlewares = [];
    this.settings = {};
    this.viewsDir = "";
    this.viewEngine = null;
    this.trustProxy = false;
    this.jsonSpaces = 0;
    this.flashMessages = {};
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
  // Routes Handling
  get(path3, handler) {
    this.addRoute(path3, "GET", handler);
  }
  post(path3, handler) {
    this.addRoute(path3, "POST", handler);
  }
  put(path3, handler) {
    this.addRoute(path3, "PUT", handler);
  }
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
    } else if (key === "trust proxy") {
      this.setTrustProxy(value);
    } else if (key === "json spaces") {
      this.setJsonSpaces(value);
    }
    this.settings[key] = value;
  }
  // Get configuration
  getSetting(key) {
    return this.settings[key];
  }
  // Set trust proxy
  setTrustProxy(value) {
    this.trustProxy = value;
  }
  // Get client IP address considering trust proxy
  getClientIp(req) {
    if (!this.trustProxy) {
      return req.socket.remoteAddress || "";
    }
    const forwardedFor = req.headers["x-forwarded-for"];
    if (typeof forwardedFor === "string") {
      const ips = forwardedFor.split(",");
      if (this.trustProxy === true || this.trustProxy === "all") {
        return ips[0].trim();
      } else if (typeof this.trustProxy === "number") {
        return ips[this.trustProxy - 1]?.trim() || req.socket.remoteAddress || "";
      }
    }
    return req.socket.remoteAddress || "";
  }
  // Set JSON spaces
  setJsonSpaces(spaces) {
    if (typeof spaces !== "number" || spaces < 0) {
      throw new Error("jsonSpaces must be a non-negative number");
    }
    this.jsonSpaces = spaces;
  }
  // Flash middleware
  useFlash() {
    return (req, res, next) => {
      req.flash = (type, message) => {
        if (!this.flashMessages[type]) {
          this.flashMessages[type] = [];
        }
        if (message) {
          this.flashMessages[type].push(message);
        }
        return this.flashMessages[type];
      };
      res.locals = res.locals || {};
      res.locals.messages = this.flashMessages;
      next();
    };
  }
  // Render a view
  render(res, viewName, data = {}) {
    if (!this.viewEngine) {
      throw new Error('View engine not set. Use router.set("view engine", "ejs") to configure a view engine.');
    }
    const viewExtension = this.getSetting("view engine");
    if (!viewExtension) {
      throw new Error('View engine not set. Use router.set("view engine", "ejs") to configure a view engine.');
    }
    const viewPath = import_path2.default.join(this.viewsDir, `${viewName}.${viewExtension}`);
    const resMethod = res;
    this.viewEngine(viewPath, data, (err, html) => {
      if (err) {
        console.error(`Error rendering view: ${err.message}`);
        resMethod.status(500).send(`Error rendering view: ${err.message}`);
      } else {
        resMethod.status(200).send(html || "");
      }
    });
  }
  // Handle incoming requests
  handleRequest(req, res) {
    const reqMethod = req;
    const resMethod = res;
    const parsedUrl = parseUrl(req);
    reqMethod.query = parsedUrl.query;
    reqMethod.path = parsedUrl.pathname;
    reqMethod.ip = this.getClientIp(reqMethod);
    reqMethod.protocol = req.socket instanceof import_tls.default.TLSSocket ? "https" : "http";
    reqMethod.hostname = req.headers.host?.split(":")[0] || "";
    reqMethod.method = req.method;
    reqMethod.get = (headerName) => req.headers[headerName.toLowerCase()];
    resMethod.jsonSpaces = this.jsonSpaces;
    resMethod.status = function(code) {
      this.statusCode = code;
      return this;
    };
    resMethod.json = function(data, spaces) {
      this.setHeader("Content-Type", "application/json");
      this.end(JSON.stringify(data, null, spaces ?? this.jsonSpaces ?? 0));
    };
    resMethod.send = function(data, filename = "file.bin") {
      if (typeof data === "object" && !Buffer.isBuffer(data)) {
        this.setHeader("Content-Type", "application/json");
        this.end(JSON.stringify(data, null, this.jsonSpaces));
      } else if (Buffer.isBuffer(data)) {
        const contentType = mime.get(filename) || "application/octet-stream";
        this.setHeader("Content-Type", contentType);
        this.end(data);
      } else if (typeof data.pipe === "function") {
        const contentType = mime.get(filename) || "application/octet-stream";
        this.setHeader("Content-Type", contentType);
        data.pipe(this);
      } else {
        this.setHeader("Content-Type", "text/plain");
        this.end(data);
      }
    };
    resMethod.sendFile = function(filePath) {
      const extname = import_path2.default.extname(filePath).toLowerCase();
      const contentType = mime.get(extname) || "application/octet-stream";
      const stream = import_fs3.default.createReadStream(filePath);
      stream.on("error", (err) => {
        if (err.code === "ENOENT") {
          this.status(404).send("File Not Found");
        } else {
          this.status(500).send("Internal Server Error");
        }
      });
      this.setHeader("Content-Type", contentType);
      stream.pipe(this);
    };
    resMethod.cookie = function(name, value, options) {
      const cookie = `${name}=${value}; ${Object.entries(options || {}).map(([k, v]) => `${k}=${v}`).join("; ")}`;
      this.setHeader("Set-Cookie", cookie);
    };
    resMethod.clearCookie = function(name, options) {
      this.setHeader("Set-Cookie", `${name}=; Expires=Thu, 01 Jan 1970 00:00:00 GMT`);
    };
    resMethod.redirect = function(url2) {
      this.writeHead(302, { Location: url2 });
      this.end();
    };
    const executeMiddlewares = (index) => {
      if (index < this.middlewares.length) {
        try {
          this.middlewares[index](reqMethod, resMethod, () => executeMiddlewares(index + 1));
        } catch (err) {
          console.error("Middleware error:", err);
          resMethod.status(500).send("Internal Server Error");
        }
      } else {
        const pathname = parsedUrl.pathname || "";
        if (this.routes[pathname] && this.routes[pathname][reqMethod.method]) {
          return this.routes[pathname][reqMethod.method](reqMethod, resMethod);
        }
        for (const route in this.routes) {
          if (route.endsWith("/*") && pathname.startsWith(route.slice(0, -2))) {
            if (this.routes[route][reqMethod.method]) {
              return this.routes[route][reqMethod.method](reqMethod, resMethod);
            }
          }
        }
        this.notFoundHandler(reqMethod, resMethod);
      }
    };
    executeMiddlewares(0);
  }
  // Default 404 handler
  notFoundHandler(req, res) {
    res.status(404).send("404 Not Found");
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
  static(prefix, staticPath) {
    if (!staticPath) {
      staticPath = prefix;
      prefix = "/";
    }
    return (req, res, next) => {
      const { pathname } = parseUrl(req);
      if (!pathname.startsWith(prefix)) {
        return next();
      }
      const relativePath = pathname.slice(prefix.length);
      const filePath = import_path2.default.join(staticPath, relativePath);
      import_fs3.default.stat(filePath, (err, stats) => {
        if (err || !stats.isFile()) {
          next();
        } else {
          res.sendFile(filePath);
        }
      });
    };
  },
  favicon(iconPath) {
    return (req, res, next) => {
      if (req.url === "/favicon.ico" && iconPath) {
        import_fs3.default.stat(iconPath, (err, stats) => {
          if (err || !stats.isFile()) {
            res.status(404).send("Favicon not found");
          } else {
            res.sendFile(iconPath);
          }
        });
      } else {
        next();
      }
    };
  },
  rateLimit: (options = {}) => {
    const {
      windowMs = 60 * 1e3,
      // 1 minute
      max = 100,
      // 100 requests per window
      message = "Too many requests, please try again later.",
      statusCode = 429,
      // 429 Too Many Requests
      skip = () => false,
      // Skip rate limiting for certain requests
      keyGenerator = (req) => req.ip || "global",
      // Default key generator (IP-based)
      handler = (req, res) => {
        const key = keyGenerator(req);
        const remainingTime = store[key] ? Math.ceil((store[key].resetTime - Date.now()) / 1e3) : 0;
        res.setHeader("RateLimit-Limit", max);
        res.setHeader("RateLimit-Remaining", 0);
        res.setHeader("RateLimit-Reset", remainingTime);
        res.setHeader("RateLimit-Policy", `${max};w=${windowMs / 1e3}`);
        res.status(statusCode).json({ message });
      }
    } = options;
    const store = {};
    setInterval(() => {
      const now = Date.now();
      for (const key in store) {
        if (store[key].resetTime <= now) {
          delete store[key];
        }
      }
    }, windowMs);
    return (req, res, next) => {
      if (skip(req)) {
        return next();
      }
      const key = keyGenerator(req);
      const now = Date.now();
      if (!store[key]) {
        store[key] = {
          count: 1,
          resetTime: now + windowMs
        };
      } else {
        store[key].count++;
      }
      const remainingTime = Math.ceil((store[key].resetTime - now) / 1e3);
      res.setHeader("RateLimit-Limit", max);
      res.setHeader("RateLimit-Remaining", Math.max(0, max - store[key].count));
      res.setHeader("RateLimit-Reset", remainingTime);
      res.setHeader("RateLimit-Policy", `${max};w=${windowMs / 1e3}`);
      if (store[key].count > max) {
        return handler(req, res);
      }
      next();
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
  axium,
  bufferToFile,
  buffertoJson,
  buildUrl,
  clear,
  crypto,
  debug,
  deleteFile,
  error,
  extractUrlFromString,
  fileExists,
  formatBytes,
  formatNumber,
  getAbsolutePath,
  getBufferFromStream,
  getCpuLoad,
  getDate,
  getFileExtension,
  getFileName,
  getNetworkInterfaces,
  getRandom,
  getRelativePath,
  getStreamFromBuffer,
  getSystemInfo,
  getTime,
  getUserInfo,
  info,
  isArray,
  isEmail,
  isObject,
  isURL,
  joinPath,
  jsontoBuffer,
  log,
  mime,
  normalizePath,
  pasrseURL,
  randomElement,
  randomHexColor,
  randomInt,
  randomizeArray,
  readFile,
  runCommand,
  runCommandSync,
  runSpawn,
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
