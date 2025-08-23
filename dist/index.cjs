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

// lib/index.ts
var lib_exports = {};
__export(lib_exports, {
  Axium: () => Axium,
  ReadMore: () => ReadMore,
  apex: () => apex,
  appendToFile: () => appendToFile,
  axium: () => axium_default,
  bufferToFile: () => bufferToFile,
  buffertoJson: () => buffertoJson,
  buildUrl: () => buildUrl,
  checkCommandExists: () => checkCommandExists,
  checkTLSHandshake: () => checkTLSHandshake,
  clockString: () => clockString,
  console: () => Console,
  copyFile: () => copyFile,
  createDirectory: () => createDirectory,
  cron: () => cron,
  crypto: () => crypto,
  deleteFile: () => deleteFile,
  downloadFile: () => downloadFile,
  emojiApi: () => emoji_default,
  ensurePackage: () => ensurePackage,
  env: () => env,
  escapeHTML: () => escapeHTML,
  fileExists: () => fileExists,
  flattenArray: () => flattenArray,
  formatBytes: () => formatBytes,
  formatISODate: () => formatISODate,
  formatJSON: () => formatJSON,
  formatNumber: () => formatNumber,
  generateApiKey: () => generateApiKey,
  getAbsolutePath: () => getAbsolutePath,
  getAllIPs: () => getAllIPs,
  getBufferFromStream: () => getBufferFromStream,
  getCpuLoad: () => getCpuLoad,
  getDate: () => getDate,
  getFileSize: () => getFileSize,
  getFileStats: () => getFileStats,
  getIPAddress: () => getIPAddress,
  getNetworkInterfaces: () => getNetworkInterfaces,
  getProcessPriority: () => getProcessPriority,
  getRandom: () => getRandom,
  getSSLCertificate: () => getSSLCertificate,
  getStreamFromBuffer: () => getStreamFromBuffer,
  getSystemInfo: () => getSystemInfo,
  getTempDirectory: () => getTempDirectory,
  getTime: () => getTime,
  getTimeZone: () => getTimeZone,
  getUptime: () => getUptime,
  getUserInfo: () => getUserInfo,
  hasEmoji: () => hasEmoji,
  hasMXRecords: () => hasMXRecords,
  isArray: () => isArray,
  isBigInt: () => isBigInt,
  isBool: () => isBool,
  isDomainReachable: () => isDomainReachable,
  isEmail: () => isEmail,
  isEmptyObject: () => isEmptyObject,
  isEqualObj: () => isEqualObj,
  isFunction: () => isFunction,
  isGmail: () => isGmail,
  isImageURL: () => isImageURL,
  isNull: () => isNull,
  isNumber: () => isNumber,
  isObject: () => isObject,
  isString: () => isString,
  isSymbol: () => isSymbol,
  isTLSValid: () => isTLSValid,
  isURLAccessible: () => isURLAccessible,
  isUndefined: () => isUndefined,
  isValidIP: () => isValidIP,
  jsontoBuffer: () => jsontoBuffer,
  killProcess: () => killProcess,
  listFiles: () => listFiles,
  mime: () => mime,
  parseURL: () => parseURL,
  passwordGenerator: () => passwordGenerator,
  passwordValidator: () => passwordValidator_default,
  perf_hooks: () => perf_hooks,
  randomElement: () => randomElement,
  randomHexColor: () => randomHexColor,
  randomInt: () => randomInt,
  randomizeArray: () => randomizeArray,
  readFile: () => readFile,
  removeDirectory: () => removeDirectory,
  renameFile: () => renameFile,
  resolveDNS: () => resolveDNS,
  reverseLookup: () => reverseLookup,
  runCommand: () => runCommand,
  runCommandDetached: () => runCommandDetached,
  runCommandInteractive: () => runCommandInteractive,
  runCommandSync: () => runCommandSync,
  runSpawn: () => runSpawn,
  runtime: () => runtime,
  setProcessPriority: () => setProcessPriority,
  sleep: () => sleep,
  timeAgo: () => timeAgo,
  toBool: () => toBool,
  toBuffer: () => toBuffer,
  toQueryString: () => toQueryString,
  transformBuffer: () => transformBuffer,
  truncate: () => truncate,
  uniqueArray: () => uniqueArray,
  unwatchFile: () => unwatchFile,
  urlValidator: () => urlValidator,
  watchFile: () => watchFile,
  writeFile: () => writeFile
});
module.exports = __toCommonJS(lib_exports);

// lib/functions/tools.ts
var import_fs = __toESM(require("fs"), 1);
var import_stream = require("stream");

// lib/functions/validation.ts
var import_http = require("http");
var import_https = require("https");
var import_net = require("net");
var import_url = require("url");
var urlValidator = {
  isURL(url2) {
    const regex = /^(https?:\/\/)(www\.)?([\da-z.-]+)(?::(\d{1,5}))?([\/\w .-]*)*\/?(\?[&\w=.+-]*)?(#[\w-]*)?$/i;
    const ipv4Regex = /^(https?:\/\/)?(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(?::(\d{1,5}))?([\/\w .-]*)*\/?(\?[&\w=.+-]*)?(#[\w-]*)?$/i;
    const ipv6Regex = /^(https?:\/\/)?\[([a-f0-9:]+)\](?::(\d{1,5}))?([\/\w .-]*)*\/?(\?[&\w=.+-]*)?(#[\w-]*)?$/i;
    const localhostRegex = /^(https?:\/\/)?localhost(?::(\d{1,5}))?([\/\w .-]*)*\/?(\?[&\w=.+-]*)?(#[\w-]*)?$/i;
    const fileRegex = /^file:\/\/\/?([\/\w .-]*)*\/?$/i;
    return regex.test(url2) || ipv4Regex.test(url2) || ipv6Regex.test(url2) || localhostRegex.test(url2) || fileRegex.test(url2);
  },
  mediafire(url2) {
    const regex = /https?:\/\/(www\.)?mediafire\.com\/(file\/[a-zA-Z0-9]+\/[a-zA-Z0-9_\-\.]+|view\/[a-zA-Z0-9]+\/[a-zA-Z0-9_\-\.]+(\/file)?|\?[a-zA-Z0-9]+|folder\/[a-zA-Z0-9]+)/;
    return regex.test(url2);
  },
  gdrive(url2) {
    const regex = /https:\/\/(?:drive\.google\.com\/(?:file\/d\/|open\?id=|drive\/folders\/)|docs\.google\.com\/(?:uc\?export=download&id=|file\/d\/|document\/d\/)([\w-]{28,})(?:\/edit)?)/;
    return regex.test(url2);
  },
  spotify(url2) {
    const regex = /(https?:\/\/)?(open\.spotify\.com\/(track|album|artist|playlist|show|episode|user|collection|browse|search|genre|featured|creator|pod|station|embed)\/[a-zA-Z0-9]+(?:\?[a-zA-Z0-9_=&-]+)?|spotify:(track|album|artist|playlist|show|episode|user|collection|search|station):[a-zA-Z0-9]+(?:\?[a-zA-Z0-9_=&-]+)?)|spotify:user:[a-zA-Z0-9]+:playlist:[a-zA-Z0-9]+/;
    return regex.test(url2);
  },
  tiktok(url2) {
    const regex = /\bhttps?:\/\/(?:m|www|vm|vt)?\.?tiktok\.com\/(?:@[\w.-]+\/(?:video|photo)\/\d+|v\/\w+|t\/\w+|embed\/\w+|\?shareId=\d+|\?item_id=\d+|[\w.-]+|music\/[\w.-]+|tag\/[\w.-]+|amp\/[\w.-]+|effects\/[\w.-]+|trending\/[\w.-]+|discover\/[\w.-]+|hashtag\/[\w.-]+)\b/;
    return regex.test(url2);
  },
  threads(url2) {
    const regex = /\bhttps?:\/\/(?:www\.)?threads\.net\/(?:@?[\w.-]+(?:\/post\/[\w.-]+)?|post\/[\w.-]+|t\/[\w.-]+|explore|search|profile|direct|settings|activity)\b(?:\?.*)?$/;
    return regex.test(url2);
  },
  twitter(url2) {
    const regex = /\bhttps?:\/\/(?:www\.)?(?:twitter\.com|x\.com)\/(?:@?[\w.-]+\/status\/\d+(?:\/(?:photo|video)\/\d+)?|@?[A-Za-z0-9_]{1,15}(?:\?[^#\s]*)?|search\?[^#\s]*|hashtag\/[^#\s]*|i\/web\/status\/\d+|explore|(?:i\/)?(?:moments|lists|topics|bookmarks)(?:\/[\w.-]+)?|(?:home|notifications|messages|explore|settings))\b(?:\?.*)?$/;
    return regex.test(url2);
  },
  youtube(url2) {
    const regex = /^(https?:\/\/)?(www\.|m\.|music\.)?(youtube\.com\/(?:watch\?v=|playlist\?list=|channel\/|c\/|user\/|embed\/|shorts\/|live\/|clip\/|hashtag\/|results\?search_query=|feed(?:\/[\w-]+)?|subscription_manager|account|reporthistory|view_all_playlists|premium|studio|movies|gaming)|youtu\.be\/)[a-zA-Z0-9\-_]*((?:\?|&)[^\s]*)?$/;
    return regex.test(url2);
  },
  snapchat(url2) {
    const regex = /https?:\/\/(?:www\.)?(?:snapchat\.com\/(?:add\/[A-Za-z0-9_.-]+|discover\/[A-Za-z0-9_.-]+|spotlight\/[A-Za-z0-9_.-]+|stories\/[A-Za-z0-9_.-]+|lens\/[A-Za-z0-9_.-]+|t\/[A-Za-z0-9_.-]+|snap\/[A-Za-z0-9_.-]+)|story\.snapchat\.com\/s\/[A-Za-z0-9_.-]+)/;
    return regex.test(url2);
  },
  terabox(url2) {
    const regex = /^(?:https?:\/\/)?(?:www\.)?(?:mirrobox\.com|nephobox\.com|freeterabox\.com|1024tera\.com|4funbox\.co|4funbox\.com|terabox\.app|terabox\.com|1024tera\.co|1024terabox\.com|momerybox\.com|teraboxapp\.com|tibibox\.com|teraboxlink\.com)(?:\/s\/[A-Za-z0-9_-]+)?(?:\?.*)?$/;
    return regex.test(url2);
  },
  instagram(url2) {
    const regex = /^(?:https?:\/\/)?(?:www\.)?instagram\.com\/(?:p|reel|tv|stories)\/([A-Za-z0-9_-]+)(?:\/)?(?:\?.*)?$/;
    return regex.test(url2);
  },
  facebook(url2) {
    const regex = /(?:https?:\/\/)?(?:www\.|m\.)?(?:facebook|fb)\.(?:com|me|watch)\/(?:(?:[\w.]+\/)?(?:videos|photos|posts|events)\/(?:[\w-]+\/)?(?:[\d]+)|(?:profile\.php\?id=\d+)|(?:[\w.]+)|(?:groups\/[\w-]+))\/?(?:\?.*)?$/;
    return regex.test(url2);
  },
  linkedin(url2) {
    const regex = /^(https?:\/\/)?(www\.)?linkedin\.com\/(in|company|posts|pulse|jobs|feed|school|groups|events|showcase|learning)\/[a-zA-Z0-9\-_%.]+\/?(?:\?.*)?$/;
    return regex.test(url2);
  },
  reddit(url2) {
    const regex = /^(https?:\/\/)?(www\.|old\.)?reddit\.com\/(r|user|comments)\/[a-zA-Z0-9_-]+(?:\/[a-zA-Z0-9_-]+){0,2}\/?(?:\?.*)?$/;
    return regex.test(url2);
  },
  pinterest(url2) {
    const regex = /^(https?:\/\/)?(www\.)?(?:pinterest\.(?:com|ca|co\.uk|fr|de|jp|au)\/(?:pin\/[a-zA-Z0-9_-]+\/?|[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+\/?|[a-zA-Z0-9_-]+\/?)?(?:\?.*)?|i\.pinimg\.com\/(?:\d+x\/)?[a-zA-Z0-9_\/-]+\.[a-zA-Z0-9]+)$/;
    return regex.test(url2);
  },
  whatsapp(url2) {
    const regex = /^(https?:\/\/)?(www\.)?(whatsapp\.com\/(channel\/[a-zA-Z0-9_-]+|business|send|download|android|iphone|api|about|contact|security)|wa\.me\/[0-9]+|chat\.whatsapp\.com\/[a-zA-Z0-9_-]+)\/?(?:\?.*)?$/;
    return regex.test(url2);
  },
  discord(url2) {
    const regex = /^(https?:\/\/)?((?:www\.)?(?:discord\.(?:gg|com|me)|discordapp\.com)(?:\/(?:invite\/[a-zA-Z0-9-]+|channels\/(?:\d+\/\d+\/?\d*)|users\/\d+|servers\/\d+|communities\/\d+))?|(?:www\.)?discord\.me\/[a-zA-Z0-9-_]+)\/?(?:\?.*)?$/;
    return regex.test(url2);
  },
  twitch(url2) {
    const regex = /^(https?:\/\/)?(?:(?:www\.|m\.)?twitch\.tv\/(?:[a-zA-Z0-9\-_]+\/?(?:[a-zA-Z0-9\-_]+\/?)?)(?:video\/\d+|clip\/[a-zA-Z0-9\-_]+)?|clips\.twitch\.tv\/[a-zA-Z0-9\-_]+|(?:www\.)?twitch\.tv\/directory\/(?:game|category)\/[a-zA-Z0-9\-_%]+|(?:www\.)?twitch\.tv\/[a-zA-Z0-9\-_]+\/(?:videos|clips|collections|about|schedule))\/?(?:\?.*)?$/;
    return regex.test(url2);
  },
  stackoverflow(url2) {
    const regex = /^(https?:\/\/)?((?:www\.)?stackoverflow\.com\/(?:questions\/\d+(?:\/[\w-]+)?|users\/\d+(?:\/[\w-]+)?|tags\/[\w-]+|a\/\d+|q\/\d+|search\?[^\/]+)|(?:[\w-]+\.)?stackexchange\.com\/(?:questions\/\d+(?:\/[\w-]+)?|users\/\d+(?:\/[\w-]+)?|tags\/[\w-]+))\/?(?:\?.*)?$/;
    return regex.test(url2);
  },
  medium(url2) {
    const regex = /^(https?:\/\/)?(?:(?:www\.)?medium\.com\/(?:@[\w-]+(?:\/[\w-]+)?|[\w-]+\/[\w-]+|tag\/[\w-]+|topics\/[\w-]+|lists\/[\w-]+)|[\w-]+\.medium\.com\/[\w-]+)\/?(?:\?.*)?$/;
    return regex.test(url2);
  },
  extractUrlFromString(str) {
    const regex = /(https?:\/\/[^\s"'<>()]+)/i;
    const match = str.match(regex);
    return match ? match[0] : null;
  },
  extractAllUrlFromString(str) {
    const regex = /https?:\/\/[^\s"'<>()]+|www\.[^\s"'<>()]+/gi;
    const match = str.match(regex);
    return match ? match : null;
  },
  hasProtocol(url2, protocol) {
    const regex = new RegExp(`^${protocol}:\\/\\/`, "i");
    return regex.test(url2);
  },
  hasDomain(url2, domain) {
    const regex = new RegExp(`^https?:\\/\\/(www\\.)?${domain}(\\/|$)`, "i");
    return regex.test(url2);
  },
  hasPath(url2, path5) {
    const regex = new RegExp(`^https?:\\/\\/[^\\/]+\\/${path5}`, "i");
    return regex.test(url2);
  },
  hasQueryParam(url2, param) {
    const regex = new RegExp(`[?&]${param}(=|&|$)`, "i");
    return regex.test(url2);
  },
  hasFragment(url2, fragment) {
    const regex = new RegExp(`#${fragment}$`, "i");
    return regex.test(url2);
  },
  extractComponents(url2) {
    const regex = /^(https?):\/\/([^\/?#]+)([^?#]*)(?:\?([^#]*))?(?:#(.*))?/i;
    const match = url2.match(regex);
    if (!match)
      return null;
    return {
      protocol: match[1],
      domain: match[2],
      path: match[3],
      query: match[4] || "",
      fragment: match[5] || ""
    };
  },
  isWithinLength(url2, maxLength) {
    return url2.length <= maxLength;
  },
  hasValidCharacters(url2) {
    const regex = /^[a-zA-Z0-9\-._~:\/?#[\]@!$&'()*+,;=]+$/;
    return regex.test(url2);
  }
};
function toBool(input, returnBool = true) {
  return /true|yes|ok|act|sure|enable/gi.test(input) ? returnBool ? true : "true" : returnBool ? false : "false";
}
var isEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
var isGmail = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@(gmail|google|googlemail)\.com$/i;
  return regex.test(email);
};
var isNumber = (input) => {
  if (typeof input === "number") {
    return input - input === 0;
  }
  if (typeof input === "string" && input.trim() !== "") {
    return Number.isFinite ? Number.isFinite(+input) : isFinite(+input);
  }
  return false;
};
var isObject = (value) => typeof value === "object" && value !== null && !Array.isArray(value);
var isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0;
};
var isEqualObj = (obj1, obj2) => {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
};
function isArray(input) {
  return Array.isArray(input);
}
var isString = (input) => {
  return typeof input === "string";
};
var isBool = (input) => {
  return typeof input === "boolean";
};
var isFunction = (input) => {
  return typeof input === "function";
};
var isBigInt = (input) => {
  return typeof input === "bigint";
};
var isUndefined = (input) => {
  return typeof input === "undefined";
};
var isSymbol = (input) => {
  return typeof input === "symbol";
};
var isNull = (input) => {
  return input === null;
};
var isValidIP = (ip) => (0, import_net.isIP)(ip) !== 0;
var isImageURL = async (url2) => {
  try {
    const parsedUrl = new import_url.URL(url2);
    const isHttps = parsedUrl.protocol === "https:";
    const requestModule = isHttps ? import_https.request : import_http.request;
    const options = {
      hostname: parsedUrl.hostname,
      path: parsedUrl.pathname + parsedUrl.search,
      protocol: parsedUrl.protocol
    };
    const makeRequest = async (method) => {
      return new Promise((resolve2) => {
        const req = requestModule({ ...options, method }, (res) => {
          res.on("data", () => {
          });
          res.on("end", () => {
            const contentType = res.headers["content-type"];
            if (contentType && contentType.startsWith("image/")) {
              resolve2(true);
            } else {
              resolve2(false);
            }
          });
        });
        req.on("error", () => {
          resolve2(false);
        });
        req.end();
      });
    };
    const isImageHead = await makeRequest("HEAD");
    if (isImageHead)
      return true;
    const isImageGet = await makeRequest("GET");
    return isImageGet;
  } catch (error) {
    console.error(error);
    return false;
  }
};
var hasEmoji = (str) => {
  const regex = /[#*0-9]\uFE0F?\u20E3|[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23ED-\u23EF\u23F1\u23F2\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692\u2694-\u2697\u2699\u269B\u269C\u26A0\u26A7\u26AA\u26B0\u26B1\u26BD\u26BE\u26C4\u26C8\u26CF\u26D1\u26E9\u26F0-\u26F5\u26F7\u26F8\u26FA\u2702\u2708\u2709\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2757\u2763\u27A1\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B55\u3030\u303D\u3297\u3299]\uFE0F?|[\u261D\u270C\u270D](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?|[\u270A\u270B](?:\uD83C[\uDFFB-\uDFFF])?|[\u23E9-\u23EC\u23F0\u23F3\u25FD\u2693\u26A1\u26AB\u26C5\u26CE\u26D4\u26EA\u26FD\u2705\u2728\u274C\u274E\u2753-\u2755\u2795-\u2797\u27B0\u27BF\u2B50]|\u26D3\uFE0F?(?:\u200D\uD83D\uDCA5)?|\u26F9(?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|\u2764\uFE0F?(?:\u200D(?:\uD83D\uDD25|\uD83E\uDE79))?|\uD83C(?:[\uDC04\uDD70\uDD71\uDD7E\uDD7F\uDE02\uDE37\uDF21\uDF24-\uDF2C\uDF36\uDF7D\uDF96\uDF97\uDF99-\uDF9B\uDF9E\uDF9F\uDFCD\uDFCE\uDFD4-\uDFDF\uDFF5\uDFF7]\uFE0F?|[\uDF85\uDFC2\uDFC7](?:\uD83C[\uDFFB-\uDFFF])?|[\uDFC4\uDFCA](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDFCB\uDFCC](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDCCF\uDD8E\uDD91-\uDD9A\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF43\uDF45-\uDF4A\uDF4C-\uDF7C\uDF7E-\uDF84\uDF86-\uDF93\uDFA0-\uDFC1\uDFC5\uDFC6\uDFC8\uDFC9\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF8-\uDFFF]|\uDDE6\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF]|\uDDE7\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF]|\uDDE8\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF7\uDDFA-\uDDFF]|\uDDE9\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF]|\uDDEA\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA]|\uDDEB\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7]|\uDDEC\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE]|\uDDED\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA]|\uDDEE\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9]|\uDDEF\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5]|\uDDF0\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF]|\uDDF1\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE]|\uDDF2\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF]|\uDDF3\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF]|\uDDF4\uD83C\uDDF2|\uDDF5\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE]|\uDDF6\uD83C\uDDE6|\uDDF7\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC]|\uDDF8\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF]|\uDDF9\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF]|\uDDFA\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF]|\uDDFB\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA]|\uDDFC\uD83C[\uDDEB\uDDF8]|\uDDFD\uD83C\uDDF0|\uDDFE\uD83C[\uDDEA\uDDF9]|\uDDFF\uD83C[\uDDE6\uDDF2\uDDFC]|\uDF44(?:\u200D\uD83D\uDFEB)?|\uDF4B(?:\u200D\uD83D\uDFE9)?|\uDFC3(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?|\uDFF3\uFE0F?(?:\u200D(?:\u26A7\uFE0F?|\uD83C\uDF08))?|\uDFF4(?:\u200D\u2620\uFE0F?|\uDB40\uDC67\uDB40\uDC62\uDB40(?:\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDC73\uDB40\uDC63\uDB40\uDC74|\uDC77\uDB40\uDC6C\uDB40\uDC73)\uDB40\uDC7F)?)|\uD83D(?:[\uDC3F\uDCFD\uDD49\uDD4A\uDD6F\uDD70\uDD73\uDD76-\uDD79\uDD87\uDD8A-\uDD8D\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA\uDECB\uDECD-\uDECF\uDEE0-\uDEE5\uDEE9\uDEF0\uDEF3]\uFE0F?|[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC](?:\uD83C[\uDFFB-\uDFFF])?|[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4\uDEB5](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD74\uDD90](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?|[\uDC00-\uDC07\uDC09-\uDC14\uDC16-\uDC25\uDC27-\uDC3A\uDC3C-\uDC3E\uDC40\uDC44\uDC45\uDC51-\uDC65\uDC6A\uDC79-\uDC7B\uDC7D-\uDC80\uDC84\uDC88-\uDC8E\uDC90\uDC92-\uDCA9\uDCAB-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDDA4\uDDFB-\uDE2D\uDE2F-\uDE34\uDE37-\uDE41\uDE43\uDE44\uDE48-\uDE4A\uDE80-\uDEA2\uDEA4-\uDEB3\uDEB7-\uDEBF\uDEC1-\uDEC5\uDED0-\uDED2\uDED5-\uDED7\uDEDC-\uDEDF\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB\uDFF0]|\uDC08(?:\u200D\u2B1B)?|\uDC15(?:\u200D\uD83E\uDDBA)?|\uDC26(?:\u200D(?:\u2B1B|\uD83D\uDD25))?|\uDC3B(?:\u200D\u2744\uFE0F?)?|\uDC41\uFE0F?(?:\u200D\uD83D\uDDE8\uFE0F?)?|\uDC68(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDC68\uDC69]\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFE])))?))?|\uDC69(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?[\uDC68\uDC69]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?|\uDC69\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?))|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFE])))?))?|\uDC6F(?:\u200D[\u2640\u2642]\uFE0F?)?|\uDD75(?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|\uDE2E(?:\u200D\uD83D\uDCA8)?|\uDE35(?:\u200D\uD83D\uDCAB)?|\uDE36(?:\u200D\uD83C\uDF2B\uFE0F?)?|\uDE42(?:\u200D[\u2194\u2195]\uFE0F?)?|\uDEB6(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?)|\uD83E(?:[\uDD0C\uDD0F\uDD18-\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5\uDEC3-\uDEC5\uDEF0\uDEF2-\uDEF8](?:\uD83C[\uDFFB-\uDFFF])?|[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD\uDDCF\uDDD4\uDDD6-\uDDDD](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDDDE\uDDDF](?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD0D\uDD0E\uDD10-\uDD17\uDD20-\uDD25\uDD27-\uDD2F\uDD3A\uDD3F-\uDD45\uDD47-\uDD76\uDD78-\uDDB4\uDDB7\uDDBA\uDDBC-\uDDCC\uDDD0\uDDE0-\uDDFF\uDE70-\uDE7C\uDE80-\uDE89\uDE8F-\uDEC2\uDEC6\uDECE-\uDEDC\uDEDF-\uDEE9]|\uDD3C(?:\u200D[\u2640\u2642]\uFE0F?|\uD83C[\uDFFB-\uDFFF])?|\uDDCE(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?|\uDDD1(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1|\uDDD1\u200D\uD83E\uDDD2(?:\u200D\uD83E\uDDD2)?|\uDDD2(?:\u200D\uD83E\uDDD2)?))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFC-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFD-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFD\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFE]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?))?|\uDEF1(?:\uD83C(?:\uDFFB(?:\u200D\uD83E\uDEF2\uD83C[\uDFFC-\uDFFF])?|\uDFFC(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFD-\uDFFF])?|\uDFFD(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])?|\uDFFE(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFD\uDFFF])?|\uDFFF(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFE])?))?)/g;
  return regex.test(str);
};

// lib/modules/axium/types.ts
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

// lib/modules/axium/interceptor.ts
var InterceptorManager = class {
  constructor() {
    this.interceptors = [];
  }
  add(interceptor) {
    this.interceptors.push(interceptor);
  }
  async apply(value) {
    let result = value;
    for (const interceptor of this.interceptors) {
      result = await interceptor(result);
    }
    return result;
  }
};

// lib/modules/axium/request.ts
var RequestHandler = class {
  constructor(globalDefaults) {
    this.globalDefaults = globalDefaults;
    this.requestInterceptors = new InterceptorManager();
    this.responseInterceptors = new InterceptorManager();
  }
  // Add request interceptor
  addRequestInterceptor(interceptor) {
    this.requestInterceptors.add(interceptor);
  }
  // Add response interceptor
  addResponseInterceptor(interceptor) {
    this.responseInterceptors.add(interceptor);
  }
  // Set global defaults
  setGlobalDefaults(defaults) {
    this.globalDefaults = { ...this.globalDefaults, ...defaults };
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
    const { retries = 0, retryDelay = 0, timeout, params, onDownloadProgress, onUploadProgress, signal: externalSignal, ...fetchOptions } = await this.requestInterceptors.apply({ ...this.globalDefaults, ...options });
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
        if (fetchOptions.method === "HEAD") {
          return {
            data: null,
            status: response.status,
            statusText: response.statusText,
            headers: response.headers,
            config: options
          };
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
          const interceptedResponse = await this.responseInterceptors.apply(newResponse);
          const contentType = interceptedResponse.headers.get("content-type");
          let data;
          if (options.responseType) {
            switch (options.responseType) {
              case "arraybuffer":
                data = await interceptedResponse.arrayBuffer();
                data = Buffer.from(data);
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
              case "buffer":
                data = await interceptedResponse.arrayBuffer();
                data = Buffer.from(data);
                break;
              case "stream":
                data = interceptedResponse.body;
                break;
              default:
                data = await interceptedResponse.arrayBuffer();
                data = Buffer.from(data);
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
              data = Buffer.from(data);
            } else if (contentType?.includes("application/octet-stream")) {
              data = await interceptedResponse.arrayBuffer();
              data = Buffer.from(data);
            } else if (contentType?.includes("audio/")) {
              data = await interceptedResponse.arrayBuffer();
              data = Buffer.from(data);
            } else if (contentType?.includes("video/")) {
              data = await interceptedResponse.arrayBuffer();
              data = Buffer.from(data);
            } else if (contentType?.includes("application/zip")) {
              data = await interceptedResponse.arrayBuffer();
              data = Buffer.from(data);
            } else {
              data = await interceptedResponse.arrayBuffer();
              data = Buffer.from(data);
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
          const interceptedResponse = await this.responseInterceptors.apply(response);
          const contentType = interceptedResponse.headers.get("content-type");
          let data;
          if (options.responseType) {
            switch (options.responseType) {
              case "arraybuffer":
                data = await interceptedResponse.arrayBuffer();
                data = Buffer.from(data);
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
              case "buffer":
                data = await interceptedResponse.arrayBuffer();
                data = Buffer.from(data);
                break;
              case "stream":
                data = interceptedResponse.body;
                break;
              default:
                data = await interceptedResponse.arrayBuffer();
                data = Buffer.from(data);
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
              data = Buffer.from(data);
            } else if (contentType?.includes("application/octet-stream")) {
              data = await interceptedResponse.arrayBuffer();
              data = Buffer.from(data);
            } else if (contentType?.includes("audio/")) {
              data = await interceptedResponse.arrayBuffer();
              data = Buffer.from(data);
            } else if (contentType?.includes("video/")) {
              data = await interceptedResponse.arrayBuffer();
              data = Buffer.from(data);
            } else if (contentType?.includes("application/zip")) {
              data = await interceptedResponse.arrayBuffer();
              data = Buffer.from(data);
            } else {
              data = await interceptedResponse.arrayBuffer();
              data = Buffer.from(data);
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
      } catch (error) {
        if (timeoutId)
          clearTimeout(timeoutId);
        if (attempt >= retries) {
          if (retries > 0) {
            console.error(`Fetch failed after ${retries} attempts`);
            throw new FetchError(error.message || "Request failed");
          }
        }
        if (retryDelay > 0 && attempt < retries) {
          console.warn(`Retrying... (${attempt + 1}/${retries})`);
          await new Promise((resolve2) => setTimeout(resolve2, retryDelay));
        }
      }
    }
  }
};

// lib/modules/axium/axium.ts
var Axium = class extends RequestHandler {
  constructor(defaults) {
    super({
      headers: {
        "Content-Type": "application/json"
      },
      ...defaults
    });
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
  // getBuffer method
  async getBuffer(url2, options = {}, method = "GET") {
    try {
      if (Buffer.isBuffer(url2)) {
        return url2;
      }
      if (urlValidator.isURL(url2)) {
        const response = await fetch(url2, {
          method,
          headers: {
            DNT: "1",
            "Upgrade-Insecure-Request": "1",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36",
            ...options.headers
          },
          ...options
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const arrayBuffer = await response.arrayBuffer();
        return Buffer.from(arrayBuffer);
      }
    } catch (e) {
      console.error("Error while getting buffer:\n", e);
      return false;
    }
  }
  // fetchJson method
  async fetchJson(url2, options = {}, method = "GET") {
    try {
      const response = await fetch(url2, {
        method,
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36",
          ...options.headers
        },
        ...options
      });
      if (!response.ok) {
        throw new Error(`Fetch error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (e) {
      console.error("Error while fetching json:\n ", e);
    }
  }
  // Head request
  head(url2, options = {}) {
    return this.request(url2, { ...options, method: "HEAD" });
  }
};
var axium = new Axium();
var axium_default = axium;

// lib/functions/tools.ts
var import_child_process = require("child_process");
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
var bufferToFile = (buffer, filePath) => {
  import_fs.default.writeFileSync(filePath, buffer);
};
function toBuffer(data) {
  if (data instanceof Buffer)
    return data;
  if (typeof data === "string")
    return Buffer.from(data);
  return Buffer.from(JSON.stringify(data));
}
var getBufferFromStream = async (stream) => {
  if (!stream.readable) {
    throw new Error("Stream is not readable");
  }
  return new Promise((resolve2, reject) => {
    const chunks = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("end", () => resolve2(Buffer.concat(chunks)));
    stream.on("error", reject);
  });
};
var getStreamFromBuffer = (buffer) => {
  const readable = new import_stream.Readable();
  readable.push(buffer);
  readable.push(null);
  return readable;
};
var sleep = (ms = 3e3) => new Promise((resolve2) => setTimeout(resolve2, ms));
var randomInt = (min2, max2) => Math.floor(Math.random() * (max2 - min2 + 1)) + min2;
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
var flattenArray = (arr) => {
  return arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flattenArray(val) : val), []);
};
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
var getDate = (date, options) => {
  if (typeof date === "object" && !("getTime" in date)) {
    options = date;
    date = void 0;
  }
  const { format = "DD-MM-YYYY", utc = false, timezone } = options || {};
  let dateObj = date ? new Date(date) : /* @__PURE__ */ new Date();
  if (isNaN(dateObj.getTime()))
    throw new Error("Invalid date");
  const formatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: timezone || (utc ? "UTC" : void 0)
  };
  const formattedDate = new Intl.DateTimeFormat("en-US", formatOptions).format(dateObj);
  const [month, day, year] = formattedDate.split("/");
  switch (format) {
    case "DD-MM-YYYY":
      return `${day}-${month}-${year}`;
    case "MM-DD-YYYY":
      return `${month}-${day}-${year}`;
    case "YYYY-MM-DD":
      return `${year}-${month}-${day}`;
    case "DD/MM/YYYY":
      return `${day}/${month}/${year}`;
    case "MM/DD/YYYY":
      return `${month}/${day}/${year}`;
    case "YYYY/MM/DD":
      return `${year}/${month}/${day}`;
    default:
      return `${day}-${month}-${year}`;
  }
};
function getTimeZone() {
  try {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return timeZone || null;
  } catch (error) {
    console.error("Error detecting timezone:", error);
    return null;
  }
}
function clockString(seconds, showHours = true) {
  if (isNaN(seconds))
    return "--:--:--";
  const h = showHours ? Math.floor(seconds / 3600) : 0;
  const remaining = seconds % 3600;
  const m = Math.floor(remaining / 60);
  const s = Math.floor(remaining % 60);
  const parts = showHours ? [h, m, s] : [m, s];
  return parts.map((v) => v.toString().padStart(2, "0")).join(":");
}
function formatISODate(n, locale = "en", timezone) {
  if (typeof n === "string") {
    n = n.replace(/−/g, "-");
  }
  const d = new Date(n);
  if (isNaN(d.getTime()))
    return "Invalid Date";
  const dateOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: timezone
  };
  const timeOptions = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZone: timezone
  };
  return d.toLocaleString(locale, dateOptions) + ", " + d.toLocaleString(locale, timeOptions);
}
var formatJSON = (data, spaces2 = 2) => {
  try {
    return JSON.stringify(data, null, spaces2);
  } catch (error) {
    console.error("Failed to format JSON:", error);
    return null;
  }
};
function runtime(seconds, capitalize = false, day = "day", hour = "hour", minute = "minute", second = "second") {
  seconds = Number(seconds);
  const d = Math.floor(seconds / 86400);
  const h = Math.floor(seconds % 86400 / 3600);
  const m = Math.floor(seconds % 3600 / 60);
  const s = Math.floor(seconds % 60);
  const dDisplay = d > 0 ? `${d} ${d === 1 ? day : day + "s"}` : "";
  const hDisplay = h > 0 ? `${h} ${h === 1 ? hour : hour + "s"}` : "";
  const mDisplay = m > 0 ? `${m} ${m === 1 ? minute : minute + "s"}` : "";
  const sDisplay = s > 0 ? `${s} ${s === 1 ? second : second + "s"}` : "";
  let result = [dDisplay, hDisplay, mDisplay, sDisplay].filter((part) => part !== "").join(", ");
  if (capitalize && result.length > 0) {
    result = result.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  }
  return result;
}
async function getFileSize(path5) {
  try {
    if (!path5) {
      console.error("Path is not provided.");
      return "0";
    }
    if (typeof path5 === "string" && (path5.startsWith("http") || path5.startsWith("Http"))) {
      try {
        const response = await axium_default.head(path5);
        if (!response.ok) {
          throw new Error(`Failed to fetch headers: ${response.status} ${response.statusText}`);
        }
        const contentLength = response.headers.get("content-length");
        if (!contentLength) {
          throw new Error("Content-Length header is missing.");
        }
        const length = parseInt(contentLength, 10);
        if (isNaN(length)) {
          throw new Error("Invalid Content-Length header.");
        }
        return formatBytes(length, 3);
      } catch (error) {
        console.error(`Error fetching size from URL (${path5}):`, error);
        return "0";
      }
    }
    if (typeof path5 === "string") {
      try {
        const stats = import_fs.default.statSync(path5);
        return formatBytes(stats.size, 3);
      } catch (error) {
        console.error(`Error reading local file (${path5}):`, error);
        return "0";
      }
    }
    if (Buffer.isBuffer(path5)) {
      const length = Buffer.byteLength(path5);
      return formatBytes(length, 3);
    }
    throw new Error("Error: Couldn't fetch size of file. Invalid path type.");
  } catch (error) {
    console.error("Failed to get file size:", error);
    return "0";
  }
}
function ensurePackage(packageName, packageManager = "npm", shouldInstall = true) {
  try {
    return require(packageName);
  } catch (e) {
    console.warn(`Package "${packageName}" is not installed.`);
    console.error(e);
    if (!shouldInstall) {
      return null;
    }
    console.log(`Installing "${packageName}" using ${packageManager}...`);
    try {
      const installCommand = packageManager === "yarn" ? `yarn add ${packageName}` : packageManager === "pnpm" ? `pnpm add ${packageName}` : packageManager === "bun" ? `bun add ${packageName}` : `npm install ${packageName}`;
      (0, import_child_process.execSync)(installCommand, { stdio: "inherit" });
      console.log(`Successfully installed "${packageName}".`);
      return require(packageName);
    } catch (err) {
      console.error(`Failed to install "${packageName}"`, err);
      return null;
    }
  }
}
var escapeHTML = (str) => {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/\//g, "&#x2F;");
};

// lib/modules/crypto.ts
var Crypto = __toESM(require("crypto"), 1);
var import_fs2 = __toESM(require("fs"), 1);
var crypto = {
  sha256: (data) => Crypto.createHash("sha256").update(data).digest("hex"),
  sha512: (data) => Crypto.createHash("sha512").update(data).digest("hex"),
  md5: (data) => Crypto.createHash("md5").update(data).digest("hex"),
  randomBytes: (length = 16) => Crypto.randomBytes(length).toString("hex"),
  generateUUID: () => Crypto.randomUUID(),
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
  hmacSHA256: (data, secret) => Crypto.createHmac("sha256", secret).update(data).digest("hex"),
  hmacSHA512: (data, secret) => Crypto.createHmac("sha512", secret).update(data).digest("hex"),
  pbkdf2: (password, salt, iterations = 1e4, keylen = 64, digest = "sha512") => Crypto.pbkdf2Sync(password, salt, iterations, keylen, digest).toString("hex"),
  generateKeyPair: (type = "rsa", options, saveToFile = false) => {
    let defaultOptions;
    switch (type) {
      case "rsa":
        defaultOptions = {
          modulusLength: 2048,
          publicKeyEncoding: { type: "spki", format: "pem" },
          privateKeyEncoding: { type: "pkcs8", format: "pem" }
        };
        break;
      case "ec":
        defaultOptions = {
          namedCurve: "secp256k1",
          publicKeyEncoding: { type: "spki", format: "pem" },
          privateKeyEncoding: { type: "pkcs8", format: "pem" }
        };
        break;
      case "ed25519":
      case "ed448":
      case "x25519":
      case "x448":
        defaultOptions = {
          publicKeyEncoding: { type: "spki", format: "pem" },
          privateKeyEncoding: { type: "pkcs8", format: "pem" }
        };
        break;
    }
    const keyPair = Crypto.generateKeyPairSync(type, options || defaultOptions);
    if (saveToFile) {
      import_fs2.default.writeFileSync("public.pem", keyPair.publicKey);
      import_fs2.default.writeFileSync("private.pem", keyPair.privateKey);
    }
    return keyPair;
  },
  encryptRSA: (text, publicKey) => Crypto.publicEncrypt(publicKey, Buffer.from(text, "utf8")).toString("base64"),
  decryptRSA: (encrypted, privateKey) => Crypto.privateDecrypt(privateKey, Buffer.from(encrypted, "base64")).toString("utf8"),
  sign: (data, privateKey, algorithm = "RSA-SHA256") => Crypto.createSign(algorithm).update(data).sign(privateKey, "hex"),
  verify: (data, signature, publicKey, algorithm = "RSA-SHA256") => Crypto.createVerify(algorithm).update(data).verify(publicKey, signature, "hex")
};
var passwordGenerator = {
  defaultOptions: {
    length: 16,
    numbers: true,
    symbols: true,
    uppercase: true,
    lowercase: true,
    excludeSimilar: true,
    include: "",
    exclude: ""
  },
  generate: function(customOptions = {}) {
    const options = { ...this.defaultOptions, ...customOptions };
    const { length, numbers, symbols: symbols2, uppercase: uppercase2, lowercase: lowercase2, excludeSimilar, include, exclude } = options;
    const numbersChars = "0123456789";
    const symbolsChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let chars = "";
    if (lowercase2)
      chars += excludeSimilar ? lowercaseChars.replace(/[ilo]/g, "") : lowercaseChars;
    if (uppercase2)
      chars += excludeSimilar ? uppercaseChars.replace(/[ILO]/g, "") : uppercaseChars;
    if (numbers)
      chars += excludeSimilar ? numbersChars.replace(/[01]/g, "") : numbersChars;
    if (symbols2)
      chars += symbolsChars;
    const includeChars = include ? include.split("").filter((c) => !exclude || !exclude.includes(c)) : [];
    if (exclude) {
      const excludeSet = new Set(exclude.split(""));
      chars = chars.split("").filter((c) => !excludeSet.has(c)).join("");
    }
    for (const char of includeChars) {
      if (!chars.includes(char)) {
        chars += char;
      }
    }
    if (!chars.length)
      throw new Error("No characters available for password");
    let password = "";
    const randomBytes3 = Crypto.randomBytes(length);
    for (let i = 0; i < length; i++) {
      password += chars[randomBytes3[i] % chars.length];
    }
    if (includeChars.length > 0) {
      const passwordChars = new Set(password.split(""));
      const missingIncludeChars = includeChars.filter((c) => !passwordChars.has(c));
      if (missingIncludeChars.length === includeChars.length) {
        const charToInclude = includeChars[Crypto.randomBytes(1)[0] % includeChars.length];
        const replacePos = Crypto.randomBytes(1)[0] % length;
        password = password.substring(0, replacePos) + charToInclude + password.substring(replacePos + 1);
      }
    }
    return password;
  },
  generateMultiple: function(count = 5, customOptions = {}) {
    return Array.from({ length: count }, () => this.generate(customOptions));
  }
};

// lib/modules/fs.ts
var import_fs3 = __toESM(require("fs"), 1);
var import_path = __toESM(require("path"), 1);
var readFile = (filePath) => {
  try {
    return import_fs3.default.readFileSync(filePath, "utf-8");
  } catch (error) {
    console.error("File Read Error:", error instanceof Error ? error.message : error);
    return null;
  }
};
var writeFile = (filePath, data) => {
  try {
    import_fs3.default.writeFileSync(filePath, data, "utf-8");
  } catch (error) {
    console.error("File Write Error:", error instanceof Error ? error.message : error);
  }
};
var appendToFile = (filePath, data) => {
  try {
    import_fs3.default.appendFileSync(filePath, data + "\n", "utf-8");
  } catch (error) {
    console.error("File Append Error:", error instanceof Error ? error.message : error);
  }
};
var deleteFile = (filePath) => {
  try {
    import_fs3.default.unlinkSync(filePath);
  } catch (error) {
    console.error("File Delete Error:", error instanceof Error ? error.message : error);
  }
};
var fileExists = (filePath) => {
  return import_fs3.default.existsSync(filePath);
};
var createDirectory = (dirPath) => {
  try {
    import_fs3.default.mkdirSync(dirPath, { recursive: true });
  } catch (error) {
    console.error("Directory Create Error:", error instanceof Error ? error.message : error);
  }
};
var removeDirectory = (dirPath) => {
  try {
    import_fs3.default.rmdirSync(dirPath);
  } catch (error) {
    console.error("Directory Remove Error:", error instanceof Error ? error.message : error);
  }
};
var listFiles = (dirPath) => {
  try {
    return import_fs3.default.readdirSync(dirPath);
  } catch (error) {
    console.error("Read Directory Error:", error instanceof Error ? error.message : error);
    return null;
  }
};
var getFileStats = (filePath) => {
  try {
    return import_fs3.default.statSync(filePath);
  } catch (error) {
    console.error("File Stats Error:", error instanceof Error ? error.message : error);
    return null;
  }
};
var renameFile = (oldPath, newPath) => {
  try {
    import_fs3.default.renameSync(oldPath, newPath);
  } catch (error) {
    console.error("File Rename Error:", error instanceof Error ? error.message : error);
  }
};
var copyFile = (source, destination) => {
  try {
    import_fs3.default.copyFileSync(source, destination);
  } catch (error) {
    console.error("File Copy Error:", error instanceof Error ? error.message : error);
  }
};
var watchFile = (filePath, callback) => {
  try {
    import_fs3.default.watchFile(filePath, callback);
  } catch (error) {
    console.error("File Watch Error:", error instanceof Error ? error.message : error);
  }
};
var unwatchFile = (filePath) => {
  try {
    import_fs3.default.unwatchFile(filePath);
  } catch (error) {
    console.error("File Unwatch Error:", error instanceof Error ? error.message : error);
  }
};
var getAbsolutePath = (relativePath) => {
  return import_path.default.resolve(relativePath);
};

// lib/modules/os.ts
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
  hostname: import_os.default.hostname(),
  tempDir: import_os.default.tmpdir(),
  endianness: import_os.default.endianness(),
  priority: import_os.default.getPriority(),
  constants: import_os.default.constants
});
var getCpuLoad = () => import_os.default.loadavg();
var getNetworkInterfaces = () => import_os.default.networkInterfaces();
var getUserInfo = () => import_os.default.userInfo();
var getUptime = () => import_os.default.uptime();
var getTempDirectory = () => import_os.default.tmpdir();
var getProcessPriority = (pid = 0) => import_os.default.getPriority(pid);
var setProcessPriority = (pid = 0, priority) => {
  try {
    import_os.default.setPriority(pid, priority);
    return `Priority of process ${pid} set to ${priority}`;
  } catch (error) {
    return `Failed to set priority: ${error}`;
  }
};

// lib/modules/url.ts
var import_url2 = require("url");
var import_querystring = __toESM(require("querystring"), 1);
var parseURL = (urlString) => {
  try {
    if (!/^[a-z]+:\/\//i.test(urlString)) {
      urlString = "https://" + urlString;
    }
    const urlObj = new import_url2.URL(urlString);
    const rawQuery = import_querystring.default.parse(urlObj.search.substring(1));
    const query = {};
    for (const [key, value] of Object.entries(rawQuery)) {
      if (value !== void 0) {
        query[key] = value;
      }
    }
    return {
      href: urlObj.href,
      origin: urlObj.origin,
      protocol: urlObj.protocol.replace(/:$/, ""),
      username: urlObj.username,
      password: urlObj.password,
      host: urlObj.host,
      hostname: urlObj.hostname,
      port: urlObj.port || getDefaultPort(urlObj.protocol),
      pathname: urlObj.pathname,
      search: urlObj.search,
      hash: urlObj.hash,
      query,
      searchParams: urlObj.searchParams,
      fragment: urlObj.hash.substring(1),
      isSecure: urlObj.protocol === "https:",
      isLocal: ["localhost", "127.0.0.1", "::1"].includes(urlObj.hostname),
      isAbsolute: urlObj.pathname.startsWith("/"),
      hasAuth: !!urlObj.username || !!urlObj.password
    };
  } catch (error) {
    console.error(`URL parsing failed: ${urlString}`, error);
    return null;
  }
};
function getDefaultPort(protocol) {
  const portMap = {
    "http:": "80",
    "https:": "443",
    "ftp:": "21",
    "ws:": "80",
    "wss:": "443"
  };
  return portMap[protocol] || "";
}
var buildUrl = (baseUrl, options = {}) => {
  if (!baseUrl)
    return "";
  try {
    const urlObj = new import_url2.URL(baseUrl);
    if (options.path) {
      urlObj.pathname = options.path.startsWith("/") ? options.path : `/${options.path}`;
    }
    if (options.query) {
      const filteredParams = Object.fromEntries(
        Object.entries(options.query).filter(([_, value]) => value !== void 0 && value !== null).map(([key, value]) => [key, String(value)])
      );
      urlObj.search = import_querystring.default.stringify(filteredParams);
    }
    if (options.fragment) {
      urlObj.hash = options.fragment.startsWith("#") ? options.fragment : `#${options.fragment}`;
    }
    return urlObj.toString();
  } catch (error) {
    console.error("Error building URL:", error);
    return baseUrl;
  }
};

// lib/modules/child_process.ts
var import_child_process2 = require("child_process");
var runCommand = (command, cwd, timeout = 5e3) => {
  return new Promise((resolve2, reject) => {
    const process2 = (0, import_child_process2.exec)(command, { cwd, timeout }, (error, stdout, stderr) => {
      if (error)
        return reject(`Error: ${error.message}`);
      if (stderr)
        return reject(`Stderr: ${stderr}`);
      resolve2(stdout.trim());
    });
    process2.stdout?.on("data", (data) => console.log(data.toString()));
    process2.stderr?.on("data", (data) => console.error(data.toString()));
  });
};
var runCommandSync = (command, cwd) => {
  try {
    return (0, import_child_process2.execSync)(command, { cwd, encoding: "utf-8" }).trim();
  } catch (error) {
    console.error(`Command Failed: ${error instanceof Error ? error.message : error}`);
    return null;
  }
};
var runSpawn = (command, args, cwd, timeout = 5e3) => {
  return new Promise((resolve2, reject) => {
    const process2 = (0, import_child_process2.spawn)(command, args, { cwd, shell: true });
    let output = "";
    const timer = setTimeout(() => {
      process2.kill();
      reject("Process timeout");
    }, timeout);
    process2.stdout.on("data", (data) => output += data.toString());
    process2.stderr.on("data", (data) => console.error(`Stderr: ${data.toString()}`));
    process2.on("close", (code) => {
      clearTimeout(timer);
      code === 0 ? resolve2(output.trim()) : reject(`Exited with code ${code}`);
    });
  });
};
var runCommandDetached = (command, args, cwd) => {
  const process2 = (0, import_child_process2.spawn)(command, args, {
    cwd,
    shell: true,
    detached: true,
    stdio: "ignore"
  });
  process2.unref();
};
var runCommandInteractive = (command, args, cwd) => {
  (0, import_child_process2.spawn)(command, args, {
    cwd,
    shell: true,
    stdio: "inherit"
  });
};
var checkCommandExists = (command) => {
  try {
    (0, import_child_process2.execSync)(`command -v ${command} || where ${command}`, { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
};
var killProcess = (pid, signal = "SIGTERM") => {
  try {
    process.kill(pid, signal);
    return true;
  } catch (error) {
    console.error(`Failed to kill process ${pid}: ${error instanceof Error ? error.message : error}`);
    return false;
  }
};

// lib/modules/apex/middlewares/bodyParser.ts
function bodyParser() {
  return (req, res, next) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      if (!body) {
        req.body = {};
        return next();
      }
      if (req.headers["content-type"] === "application/json") {
        try {
          req.body = JSON.parse(body);
        } catch (err) {
          console.error("Error parsing JSON body:", err);
          req.body = {};
        }
      } else if (req.headers["content-type"] === "application/x-www-form-urlencoded") {
        req.body = Object.fromEntries(new URLSearchParams(body));
      } else if (req.headers["content-type"] === "text/plain") {
        req.body = body;
      } else {
        req.body = {};
      }
      next();
    });
  };
}

// lib/modules/apex/middlewares/cors.ts
function cors(options = {}) {
  const defaults = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
  };
  const opts = { ...defaults, ...options };
  return (req, res, next) => {
    const origin = req.headers.origin;
    if (req.method === "OPTIONS" && req.headers["access-control-request-method"]) {
      if (opts.methods) {
        res.setHeader("Access-Control-Allow-Methods", Array.isArray(opts.methods) ? opts.methods.join(",") : opts.methods);
      }
      if (opts.allowedHeaders) {
        res.setHeader("Access-Control-Allow-Headers", Array.isArray(opts.allowedHeaders) ? opts.allowedHeaders.join(",") : opts.allowedHeaders);
      } else if (req.headers["access-control-request-headers"]) {
        res.setHeader("Access-Control-Allow-Headers", req.headers["access-control-request-headers"]);
      }
      if (opts.maxAge) {
        res.setHeader("Access-Control-Max-Age", String(opts.maxAge));
      }
      if (opts.credentials) {
        res.setHeader("Access-Control-Allow-Credentials", "true");
      }
      if (opts.preflightContinue) {
        next();
        return;
      }
      res.statusCode = opts.optionsSuccessStatus || 204;
      res.setHeader("Content-Length", "0");
      res.end();
      return;
    }
    const setOrigin = () => {
      if (opts.origin === true) {
        res.setHeader("Access-Control-Allow-Origin", origin || "*");
        if (opts.credentials) {
          res.setHeader("Vary", "Origin");
        }
      } else if (typeof opts.origin === "string") {
        res.setHeader("Access-Control-Allow-Origin", opts.origin);
      } else if (opts.origin instanceof RegExp && origin && opts.origin.test(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
      } else if (Array.isArray(opts.origin)) {
        const allowed = opts.origin.some((o) => o instanceof RegExp ? origin && o.test(origin) : o === origin);
        if (allowed && origin) {
          res.setHeader("Access-Control-Allow-Origin", origin);
        }
      } else if (typeof opts.origin === "function") {
        opts.origin(req, (err, allowOrigin) => {
          if (err || !allowOrigin) {
            next();
            return;
          }
          const finalOrigin = allowOrigin === true ? origin || "*" : allowOrigin;
          if (finalOrigin) {
            res.setHeader("Access-Control-Allow-Origin", finalOrigin);
          }
          if (opts.credentials) {
            res.setHeader("Access-Control-Allow-Credentials", "true");
          }
          next();
        });
        return;
      }
      if (opts.credentials) {
        res.setHeader("Access-Control-Allow-Credentials", "true");
      }
      next();
    };
    if (opts.exposedHeaders) {
      res.setHeader("Access-Control-Expose-Headers", Array.isArray(opts.exposedHeaders) ? opts.exposedHeaders.join(",") : opts.exposedHeaders);
    }
    setOrigin();
  };
}

// lib/modules/apex/middlewares/createServer.ts
var import_http2 = __toESM(require("http"), 1);
function createServer(router) {
  return import_http2.default.createServer((req, res) => {
    router.handleRequest(req, res);
  });
}

// lib/modules/apex/middlewares/favicon.ts
var import_fs4 = __toESM(require("fs"), 1);
function favicon(iconPath) {
  return (req, res, next) => {
    if (req.url === "/favicon.ico" && iconPath) {
      import_fs4.default.stat(iconPath, (err, stats) => {
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
}

// lib/modules/apex/middlewares/rateLimit.ts
function rateLimit(options = {}) {
  const {
    windowMs = 60 * 1e3,
    // 1 minute
    max: max2 = 100,
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
      res.setHeader("RateLimit-Limit", max2);
      res.setHeader("RateLimit-Remaining", 0);
      res.setHeader("RateLimit-Reset", remainingTime);
      res.setHeader("RateLimit-Policy", `${max2};w=${windowMs / 1e3}`);
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
    res.setHeader("RateLimit-Limit", max2);
    res.setHeader("RateLimit-Remaining", Math.max(0, max2 - store[key].count));
    res.setHeader("RateLimit-Reset", remainingTime);
    res.setHeader("RateLimit-Policy", `${max2};w=${windowMs / 1e3}`);
    if (store[key].count > max2) {
      return handler(req, res);
    }
    next();
  };
}

// lib/modules/apex/middlewares/static.ts
var import_fs5 = __toESM(require("fs"), 1);
var import_path2 = __toESM(require("path"), 1);

// lib/modules/apex/utils.ts
var import_url3 = __toESM(require("url"), 1);
function parseUrl(req) {
  const parsedUrl = import_url3.default.parse(req.url || "", true);
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
function convertRouteToRegex(route) {
  const pattern = route.replace(/:\w+/g, "([^/]+)");
  return new RegExp(`^${pattern}$`);
}
function extractParamNames(route) {
  const paramNames = [];
  route.replace(/:\w+/g, (match) => {
    paramNames.push(match.slice(1));
    return match;
  });
  return paramNames;
}
function notFoundHandler(req, res) {
  res.status(404).send("404 Not Found");
}

// lib/modules/apex/middlewares/static.ts
function serveStatic(prefix, staticPath) {
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
    import_fs5.default.stat(filePath, (err, stats) => {
      if (err || !stats.isFile()) {
        next();
      } else {
        res.sendFile(filePath);
      }
    });
  };
}

// lib/modules/apex/middlewares/useFlush.ts
function useFlash() {
  return (req, res, next) => {
    const flashMessages = {};
    req.flash = (type, message) => {
      if (!flashMessages[type]) {
        flashMessages[type] = [];
      }
      if (message) {
        flashMessages[type].push(message);
      }
      return flashMessages[type];
    };
    res.locals = res.locals || {};
    res.locals.messages = flashMessages;
    next();
  };
}

// lib/modules/apex/router.ts
var import_fs6 = __toESM(require("fs"), 1);
var import_path3 = __toESM(require("path"), 1);
var import_tls = __toESM(require("tls"), 1);

// lib/modules/mime.ts
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
var mime = { all: () => mimes, get };

// lib/modules/apex/router.ts
var Router = class {
  constructor() {
    this.routes = {};
    this.middlewares = [];
    this.settings = {};
    this.viewsDir = "";
    this.viewEngine = null;
    this.trustProxy = false;
    this.jsonSpaces = 0;
  }
  // Add middleware
  use(path5, middleware) {
    if (typeof path5 === "string" && middleware) {
      this.middlewares.push((req, res, next) => {
        const { pathname } = parseUrl(req);
        if (pathname.startsWith(path5)) {
          req.url = pathname.slice(path5.length) || "/";
          middleware(req, res, next);
        } else {
          next();
        }
      });
    } else if (typeof path5 === "function") {
      this.middlewares.push(path5);
    }
  }
  // Routes Handling
  get(path5, ...handlers) {
    this.addRoute(path5, "GET", ...handlers);
  }
  post(path5, ...handlers) {
    this.addRoute(path5, "POST", ...handlers);
  }
  put(path5, ...handlers) {
    this.addRoute(path5, "PUT", ...handlers);
  }
  delete(path5, ...handlers) {
    this.addRoute(path5, "DELETE", ...handlers);
  }
  // Add a route with a handler for a specific HTTP method
  addRoute(path5, method, ...handlers) {
    if (!this.routes[path5]) {
      this.routes[path5] = {};
    }
    this.routes[path5][method.toUpperCase()] = (req, res) => {
      const executeHandler = (index) => {
        if (index < handlers.length) {
          const handler = handlers[index];
          if (handler.length === 3) {
            handler(req, res, () => executeHandler(index + 1));
          } else {
            handler(req, res);
          }
        }
      };
      executeHandler(0);
    };
  }
  // Set configuration
  set(key, value) {
    if (key === "view engine") {
      if (value === "ejs") {
        this.viewEngine = (filePath, data, callback) => {
          import_fs6.default.readFile(filePath, "utf8", (err, template) => {
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
      return req.socket?.remoteAddress || "";
    }
    const forwardedFor = req.headers["x-forwarded-for"];
    if (typeof forwardedFor === "string") {
      const ips = forwardedFor.split(",").map((ip) => ip.trim());
      if (this.trustProxy === true || this.trustProxy === "all") {
        return ips[0] || req.socket?.remoteAddress || "";
      } else if (typeof this.trustProxy === "number") {
        const index = Math.max(0, Math.min(ips.length - 1, this.trustProxy - 1));
        return ips[index] || req.socket?.remoteAddress || "";
      }
    }
    return req.socket?.remoteAddress || "";
  }
  // Get all IPS if behind reverse proxy
  getClientIps(req) {
    if (!this.trustProxy) {
      return [req.socket?.remoteAddress || ""];
    }
    const forwardedFor = req.headers["x-forwarded-for"];
    if (typeof forwardedFor === "string") {
      return forwardedFor.split(",").map((ip) => ip.trim());
    }
    return [req.socket?.remoteAddress || ""];
  }
  // Set JSON spaces
  setJsonSpaces(spaces2) {
    if (typeof spaces2 !== "number" || spaces2 < 0) {
      throw new Error("jsonSpaces must be a non-negative number");
    }
    this.jsonSpaces = spaces2;
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
    const viewPath = import_path3.default.join(this.viewsDir, `${viewName}.${viewExtension}`);
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
    reqMethod.ips = this.getClientIps(reqMethod);
    reqMethod.remoteAddress = req.socket?.remoteAddress || "";
    reqMethod.xForwardedFor = req.headers["x-forwarded-for"];
    reqMethod.cfConnectingIP = req.headers["cf-connecting-ip"];
    reqMethod.trueClientIP = req.headers["true-client-ip"];
    reqMethod.protocol = req.socket instanceof import_tls.default.TLSSocket ? "https" : "http";
    reqMethod.method = req.method;
    reqMethod.originalUrl = req.url || "";
    reqMethod.baseUrl = "";
    reqMethod.secure = req.socket instanceof import_tls.default.TLSSocket;
    resMethod.jsonSpaces = this.jsonSpaces;
    reqMethod.params = {};
    reqMethod.body = {};
    reqMethod.xhr = req.headers["x-requested-with"] === "XMLHttpRequest";
    reqMethod.hostname = req.headers.host?.split(":")[0] || "";
    reqMethod.get = (headerName) => req.headers[headerName.toLowerCase()];
    reqMethod.headers = req.headers;
    reqMethod.fresh = false;
    reqMethod.stale = true;
    const etag = req.headers["if-none-match"];
    const lastModified = req.headers["if-modified-since"];
    if (etag || lastModified) {
      const resEtag = res.getHeader("ETag");
      const resLastModified = res.getHeader("Last-Modified");
      if (etag && resEtag === etag) {
        reqMethod.fresh = true;
        reqMethod.stale = false;
      } else if (lastModified && resLastModified === lastModified) {
        reqMethod.fresh = true;
        reqMethod.stale = false;
      }
    }
    reqMethod.accepts = (type) => {
      const acceptHeader = req.headers["accept"];
      if (!acceptHeader)
        return false;
      const acceptedTypes = acceptHeader.split(",").map((t) => t.trim());
      if (typeof type === "string") {
        return acceptedTypes.some((t) => t.includes(type));
      } else if (Array.isArray(type)) {
        return type.find((t) => acceptedTypes.some((at) => at.includes(t))) || false;
      }
      return false;
    };
    reqMethod.is = (type) => {
      const contentType = req.headers["content-type"];
      if (!contentType)
        return false;
      return contentType.includes(type) ? type : false;
    };
    resMethod.status = function(code) {
      this.statusCode = code;
      return this;
    };
    resMethod.json = function(data, spaces2) {
      this.setHeader("Content-Type", "application/json");
      this.end(JSON.stringify(data, null, spaces2 ?? this.jsonSpaces ?? 0));
    };
    resMethod.send = function(data, filename = "file.bin") {
      const contentType = this.getHeader("Content-Type");
      if (typeof data === "object" && !Buffer.isBuffer(data)) {
        if (!contentType)
          this.setHeader("Content-Type", "application/json");
        this.end(JSON.stringify(data, null, this.jsonSpaces));
      } else if (Buffer.isBuffer(data)) {
        if (!contentType) {
          const detectedType = mime.get(filename) || "application/octet-stream";
          this.setHeader("Content-Type", detectedType);
        }
        this.end(data);
      } else if (typeof data.pipe === "function") {
        if (!contentType) {
          const detectedType = mime.get(filename) || "application/octet-stream";
          this.setHeader("Content-Type", detectedType);
        }
        data.pipe(this);
      } else {
        if (!contentType) {
          let detectedType = "text/plain";
          if (typeof data === "string") {
            if (data.trim().startsWith("<!DOCTYPE html>") || data.trim().startsWith("<html>") || data.trim().startsWith("<")) {
              detectedType = "text/html";
            } else if (filename.includes("css")) {
              detectedType = "text/css";
            } else if (filename.includes("js")) {
              detectedType = "application/javascript";
            }
          }
          this.setHeader("Content-Type", detectedType);
        }
        this.end(data);
      }
    };
    resMethod.sendFile = function(filePath) {
      const extname = import_path3.default.extname(filePath).toLowerCase();
      const contentType = mime.get(extname) || "application/octet-stream";
      const stream = import_fs6.default.createReadStream(filePath);
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
    resMethod.html = function(data) {
      this.setHeader("Content-Type", "text/html");
      this.end(data);
    };
    resMethod.redirect = function(url2) {
      this.writeHead(302, { Location: url2 });
      this.end();
    };
    resMethod.text = function(data) {
      this.setHeader("Content-Type", "text/plain");
      this.end(data);
    };
    resMethod.type = function(type) {
      const mimeType = mime.get(type) || type;
      this.setHeader("Content-Type", mimeType);
      return this;
    };
    resMethod.format = function(obj) {
      const acceptHeader = this.req.headers["accept"] || "*/*";
      const types = Object.keys(obj);
      for (const type of types) {
        if (acceptHeader.includes(type) || type === "*/*") {
          obj[type]();
          return;
        }
      }
      this.status(406).send("Not Acceptable");
    };
    resMethod.cookie = function(name, value, options) {
      const cookie = `${name}=${value}; ${Object.entries(options || {}).map(([k, v]) => `${k}=${v}`).join("; ")}`;
      this.setHeader("Set-Cookie", cookie);
    };
    resMethod.clearCookie = function(name, options) {
      this.setHeader("Set-Cookie", `${name}=; Expires=Thu, 01 Jan 1970 00:00:00 GMT`);
    };
    const nativeGetHeader = resMethod.getHeader.bind(resMethod);
    resMethod.getHeader = function(name) {
      return nativeGetHeader(name);
    };
    const nativeRemoveHeader = resMethod.removeHeader.bind(resMethod);
    resMethod.removeHeader = function(name) {
      nativeRemoveHeader(name);
    };
    resMethod.attachment = function(filename = "file") {
      this.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    };
    resMethod.download = function(filePath, filename = "file") {
      this.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
      this.sendFile(filePath);
    };
    resMethod.set = function(headers) {
      for (const [name, value] of Object.entries(headers)) {
        this.setHeader(name, value);
      }
      return this;
    };
    resMethod.vary = function(field) {
      const varyHeader = String(this.getHeader("Vary") || "");
      const fields = varyHeader.split(", ").filter(Boolean);
      if (!fields.includes(field)) {
        fields.push(field);
        this.setHeader("Vary", fields.join(", "));
      }
      return this;
    };
    resMethod.location = function(url2) {
      this.setHeader("Location", url2);
      return this;
    };
    resMethod.links = function(links) {
      const linkHeader = Object.entries(links).map(([rel, url2]) => `<${url2}>; rel="${rel}"`).join(", ");
      this.setHeader("Link", linkHeader);
      return this;
    };
    resMethod.charset = function(charset) {
      const contentType = this.getHeader("Content-Type");
      if (typeof contentType === "string") {
        this.setHeader("Content-Type", `${contentType}; charset=${charset}`);
      }
      return this;
    };
    resMethod.app = {};
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
          const routeRegex = convertRouteToRegex(route);
          const match = pathname.match(routeRegex);
          if (match && this.routes[route][reqMethod.method]) {
            const paramNames = extractParamNames(route);
            paramNames.forEach((name, index2) => {
              reqMethod.params[name] = decodeURIComponent(match[index2 + 1]);
            });
            return this.routes[route][reqMethod.method](reqMethod, resMethod);
          }
        }
        notFoundHandler(reqMethod, resMethod);
      }
    };
    executeMiddlewares(0);
  }
};

// lib/modules/apex/index.ts
var apex = {
  Router,
  createServer,
  bodyParser,
  useFlash,
  cors,
  static: serveStatic,
  favicon,
  rateLimit
};

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

// lib/modules/tls.ts
var import_tls2 = __toESM(require("tls"), 1);
function formatHostname(host) {
  return host.replace(/^https?:\/\//i, "");
}
function checkTLSHandshake(hostname, port = 443) {
  const host = formatHostname(hostname);
  return new Promise((resolve2) => {
    const socket = import_tls2.default.connect(port, host, { rejectUnauthorized: false }, () => {
      resolve2(true);
      socket.end();
    });
    socket.on("error", () => resolve2(false));
  });
}
function getSSLCertificate(hostname, port = 443) {
  const host = formatHostname(hostname);
  return new Promise((resolve2) => {
    const socket = import_tls2.default.connect(port, host, { rejectUnauthorized: false }, () => {
      resolve2(socket.getPeerCertificate());
      socket.end();
    });
    socket.on("error", () => resolve2(null));
  });
}
async function isTLSValid(hostname, port = 443) {
  const host = formatHostname(hostname);
  const cert = await getSSLCertificate(host, port);
  if (!cert || !cert.valid_to)
    return false;
  const expiryDate = new Date(cert.valid_to);
  return expiryDate > /* @__PURE__ */ new Date();
}

// lib/modules/dns.ts
var import_dns = __toESM(require("dns"), 1);
function resolveDNS(host, recordType) {
  return new Promise((resolve2, reject) => {
    import_dns.default.resolve(host, recordType, (err, records) => {
      if (err)
        reject(err);
      else
        resolve2(records);
    });
  });
}
function reverseLookup(ip) {
  return new Promise((resolve2, reject) => {
    import_dns.default.reverse(ip, (err, hostnames) => {
      if (err)
        reject(err);
      else
        resolve2(hostnames);
    });
  });
}
function isDomainReachable(host) {
  return new Promise((resolve2) => {
    import_dns.default.resolve(host, "A", (err) => resolve2(!err));
  });
}
function getIPAddress(host) {
  return new Promise((resolve2, reject) => {
    import_dns.default.resolve4(host, (err, addresses) => {
      if (err)
        reject(err);
      else
        resolve2(addresses[0]);
    });
  });
}
function getAllIPs(host) {
  return Promise.all([new Promise((resolve2) => import_dns.default.resolve4(host, (err, addresses) => resolve2(err ? [] : addresses))), new Promise((resolve2) => import_dns.default.resolve6(host, (err, addresses) => resolve2(err ? [] : addresses)))]).then(([ipv4, ipv6]) => ({ ipv4, ipv6 }));
}
function hasMXRecords(host) {
  return new Promise((resolve2) => {
    import_dns.default.resolveMx(host, (err, addresses) => resolve2(!err && addresses.length > 0));
  });
}

// lib/modules/https.ts
var import_https2 = __toESM(require("https"), 1);
var import_fs7 = __toESM(require("fs"), 1);
function downloadFile(url2, destination) {
  return new Promise((resolve2, reject) => {
    const file = import_fs7.default.createWriteStream(destination);
    import_https2.default.get(url2, (res) => {
      res.pipe(file);
      file.on("finish", () => {
        file.close();
        resolve2();
      });
    }).on("error", (err) => {
      console.error(err);
      import_fs7.default.unlink(destination, () => reject(err));
    });
  });
}
function isURLAccessible(url2) {
  return new Promise((resolve2) => {
    import_https2.default.get(url2, (res) => {
      const success = (res.statusCode ?? 0) >= 200 && (res.statusCode ?? 0) < 400;
      resolve2({
        success,
        status: res.statusCode,
        statusText: res.statusMessage || "None"
      });
      res.on("data", () => {
      });
    }).on("error", (err) => {
      resolve2({
        success: false,
        error: err.message || "An Error Occured"
      });
    });
  });
}

// lib/modules/perf_hooks.ts
var import_perf_hooks = require("perf_hooks");
var perf_hooks = {
  now: () => {
    try {
      return import_perf_hooks.performance.now();
    } catch (error) {
      console.error("Error getting performance timestamp", error);
      return -1;
    }
  },
  getTimeOrigin: () => {
    try {
      return import_perf_hooks.performance.timeOrigin;
    } catch (error) {
      console.error("Error getting time origin", error);
      return -1;
    }
  },
  measureExecutionTime: (fn, ...args) => {
    try {
      const start = import_perf_hooks.performance.now();
      fn(...args);
      return import_perf_hooks.performance.now() - start;
    } catch (error) {
      console.error("Error measuring execution time", error);
      return -1;
    }
  },
  monitorEventLoopDelay: () => {
    try {
      const histogram = (0, import_perf_hooks.monitorEventLoopDelay)();
      histogram.enable();
      return histogram;
    } catch (error) {
      console.error("Error monitoring event loop delay", error);
      return null;
    }
  },
  observePerformance: (entryTypes, callback) => {
    try {
      const observer = new import_perf_hooks.PerformanceObserver((list) => callback(list));
      observer.observe({ entryTypes });
      return observer;
    } catch (error) {
      console.error("Error setting up PerformanceObserver", error);
      return null;
    }
  },
  getNodePerformanceTiming: () => {
    try {
      return import_perf_hooks.performance.nodeTiming;
    } catch (error) {
      console.error("Error getting Node.js performance timing", error);
      return null;
    }
  }
};

// lib/modules/password-validator/config.ts
var errorHandler = {
  length: "Length should be a valid positive number",
  password: "Password should be a valid string",
  invalidPlugin: "Plugin should be a valid function"
};
var regexHandler = {
  digits: "(\\d.*)",
  letters: "([a-zA-Z].*)",
  symbols: "([`~\\!@#\\$%\\^\\&\\*\\(\\)\\-_\\=\\+\\[\\{\\}\\]\\\\|;:\\'\",<.>\\/\\?\u20AC\xA3\xA5\u20B9\xA7\xB1].*)",
  spaces: "([\\s].*)"
};

// lib/modules/password-validator/func.ts
function _process(regexp, repeat) {
  if (repeat && repeat > 1) {
    const parsedRepeat = parseInt(repeat.toString(), 10);
    return new RegExp(regexp + "{" + parsedRepeat + ",}").test(this.password) === this.positive;
  }
  return new RegExp(regexp).test(this.password) === this.positive;
}
var func = {
  not: function not(symbol) {
    this.positive = false;
    if (symbol) {
      return _process.call(this, symbol);
    }
    return true;
  },
  has: function has(symbol) {
    this.positive = true;
    if (symbol) {
      return _process.call(this, symbol);
    }
    return true;
  },
  is: function is() {
    this.positive = true;
    return true;
  },
  min: function min(num) {
    return this.password.length >= num;
  },
  max: function max(num) {
    return this.password.length <= num;
  },
  digits: function digits(repeat) {
    return _process.call(this, regexHandler.digits, repeat);
  },
  letters: function letters(repeat) {
    return _process.call(this, regexHandler.letters, repeat);
  },
  uppercase: function uppercase(repeat) {
    if (repeat && repeat > 1) {
      let characterIndex = 0;
      let upperCaseLetters = 0;
      while (upperCaseLetters < repeat && characterIndex < this.password.length) {
        const currentLetter = this.password.charAt(characterIndex);
        if (currentLetter !== currentLetter.toLowerCase()) {
          upperCaseLetters++;
        }
        characterIndex++;
      }
      return upperCaseLetters === repeat === this.positive;
    }
    return this.password !== this.password.toLowerCase() === this.positive;
  },
  lowercase: function lowercase(repeat) {
    if (repeat && repeat > 1) {
      let characterIndex = 0;
      let lowerCaseLetters = 0;
      while (lowerCaseLetters < repeat && characterIndex < this.password.length) {
        const currentLetter = this.password.charAt(characterIndex);
        if (currentLetter !== currentLetter.toUpperCase()) {
          lowerCaseLetters++;
        }
        characterIndex++;
      }
      return lowerCaseLetters === repeat === this.positive;
    }
    return this.password !== this.password.toUpperCase() === this.positive;
  },
  symbols: function symbols(repeat) {
    return _process.call(this, regexHandler.symbols, repeat);
  },
  spaces: function spaces(repeat) {
    return _process.call(this, regexHandler.spaces, repeat);
  },
  oneOf: function oneOf(list) {
    return list.indexOf(this.password) >= 0 === this.positive;
  },
  usingPlugin: function usingPlugin(fn) {
    try {
      const result = fn.call({}, this.password);
      return Boolean(result) === this.positive;
    } catch (err) {
      return false;
    }
  }
};
var func_default = func;

// lib/modules/password-validator/message.ts
function pluralify(num) {
  return num === 1 ? "" : "s";
}
var positiveMessages = {
  min: (num) => `The string should have a minimum length of ${num} character${pluralify(num)}`,
  max: (num) => `The string should have a maximum length of ${num} character${pluralify(num)}`,
  letters: (num = 1) => `The string should have a minimum of ${num} letter${pluralify(num)}`,
  digits: (num = 1) => `The string should have a minimum of ${num} digit${pluralify(num)}`,
  uppercase: (num = 1) => `The string should have a minimum of ${num} uppercase letter${pluralify(num)}`,
  lowercase: (num = 1) => `The string should have a minimum of ${num} lowercase letter${pluralify(num)}`,
  symbols: (num = 1) => `The string should have a minimum of ${num} symbol${pluralify(num)}`,
  spaces: (num = 1) => `The string should have a minimum of ${num} space${pluralify(num)}`,
  oneOf: (list) => `The string should be ${list.length > 1 ? `one of ${list.slice(0, -1).join(", ")} and ` : ""}${list[list.length - 1]}`,
  has: (pattern) => `The string should have pattern '${pattern}'`,
  not: (pattern) => `The string should not have pattern '${pattern}'`,
  usingPlugin: (fn) => `The string should not violate ${fn.name || "plugin"}`
};
var negativeMessages = {
  min: (num) => `The string should have a maximum length of ${num} character${pluralify(num)}`,
  max: (num) => `The string should have a minimum length of ${num} character${pluralify(num)}`,
  letters: (num = 0) => `The string should ${num === 0 ? "not have" : `have a maximum of ${num}`} letter${pluralify(num)}`,
  digits: (num = 0) => `The string should ${num === 0 ? "not have" : `have a maximum of ${num}`} digit${pluralify(num)}`,
  uppercase: (num = 0) => `The string should ${num === 0 ? "not have" : `have a maximum of ${num}`} uppercase letter${pluralify(num)}`,
  lowercase: (num = 0) => `The string should ${num === 0 ? "not have" : `have a maximum of ${num}`} lowercase letter${pluralify(num)}`,
  symbols: (num = 0) => `The string should ${num === 0 ? "not have" : `have a maximum of ${num}`} symbol${pluralify(num)}`,
  spaces: (num = 0) => `The string should ${num === 0 ? "not have" : `have a maximum of ${num}`} space${pluralify(num)}`,
  oneOf: (list) => `The string should not be ${list.length > 1 ? `one of ${list.slice(0, -1).join(", ")} and ` : ""}${list[list.length - 1]}`,
  has: (pattern) => `The string should not have pattern '${pattern}'`,
  not: (pattern) => `The string should have pattern '${pattern}'`,
  usingPlugin: (fn) => `The string should violate ${fn.name || "plugin"}`
};
function validationMessages(method, arg, inverted) {
  const msgList = inverted ? negativeMessages : positiveMessages;
  return msgList[method] && msgList[method](arg);
}

// lib/modules/password-validator/passwordValidator.ts
function _validateLength(num) {
  const len = Number(num);
  if (isNaN(len) || !Number.isInteger(len) || len < 1) {
    throw new Error(errorHandler.length);
  }
}
function _isPasswordValidFor(property) {
  return func_default[property.method].apply(this, property.arguments);
}
function _register(method, args, description) {
  this.properties.push({ method, arguments: Array.from(args), description });
  return this;
}
var passwordValidator = class {
  constructor() {
    this.password = "";
    this.positive = true;
    this.list = false;
    this.details = false;
    this.properties = [];
  }
  validate(pwd, options) {
    this.list = Boolean(options && options.list);
    this.details = Boolean(options && options.details);
    this.password = String(pwd);
    this.positive = true;
    if (this.list || this.details) {
      return this.properties.reduce((errorList, property) => {
        if (!_isPasswordValidFor.call(this, property)) {
          let detail = property.method;
          if (this.details) {
            detail = { validation: property.method };
            if (property.arguments && property.arguments[0]) {
              detail.arguments = property.arguments[0];
            }
            if (!this.positive && property.method !== "not") {
              detail.inverted = true;
            }
            const description = property.arguments && property.arguments[1];
            const validationMessage = description || validationMessages(property.method, detail.arguments, detail.inverted);
            detail.message = validationMessage;
          }
          return errorList.concat(detail);
        }
        return errorList;
      }, []);
    }
    return this.properties.every(_isPasswordValidFor.bind(this));
  }
  letters(count, description) {
    count && _validateLength(count);
    return _register.call(this, "letters", arguments);
  }
  digits(count, description) {
    count && _validateLength(count);
    return _register.call(this, "digits", arguments);
  }
  symbols(count, description) {
    count && _validateLength(count);
    return _register.call(this, "symbols", arguments);
  }
  min(num, description) {
    _validateLength(num);
    return _register.call(this, "min", arguments);
  }
  max(num, description) {
    _validateLength(num);
    return _register.call(this, "max", arguments);
  }
  lowercase(count, description) {
    count && _validateLength(count);
    return _register.call(this, "lowercase", arguments);
  }
  uppercase(count, description) {
    count && _validateLength(count);
    return _register.call(this, "uppercase", arguments);
  }
  spaces(count, description) {
    count && _validateLength(count);
    return _register.call(this, "spaces", arguments);
  }
  has(pattern, description) {
    return _register.call(this, "has", arguments);
  }
  not(pattern, description) {
    return _register.call(this, "not", arguments);
  }
  is() {
    return _register.call(this, "is", arguments);
  }
  oneOf(list, description) {
    return _register.call(this, "oneOf", arguments);
  }
  usingPlugin(fn, description) {
    if (typeof fn !== "function") {
      throw new Error(errorHandler.invalidPlugin);
    }
    return _register.call(this, "usingPlugin", arguments);
  }
};
var passwordValidator_default = passwordValidator;

// lib/modules/emoji-api/emoji.ts
var emojiList;
var emojiCache = /* @__PURE__ */ new Map();
var cachedAll;
var groupedEmojis;
var Emoji = class _Emoji {
  constructor(data) {
    this.data = data;
  }
  get emoji() {
    return this.data.emoji;
  }
  get name() {
    return this.data.name;
  }
  get formattedName() {
    return this.data.name.split(" ").map((word) => `${word[0].toUpperCase()}${word.slice(1).toLowerCase()}`).join(" ");
  }
  get group() {
    return this.data.group;
  }
  get subGroup() {
    return this.data.sub_group;
  }
  get codePoints() {
    return this.data.codepoints.split(" ");
  }
  twemoji(opts) {
    const { format = "png", size = "120x120" } = opts ?? {};
    const code = this.toUnicode().toLowerCase();
    return `https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/${format === "svg" ? "svg" : size}/${code}.${format}`;
  }
  get fancyName() {
    return `:${this.name.replace(/\W/g, "_").toLowerCase()}:`;
  }
  toUnicode() {
    return emojiApi.emojiToUnicode(this.emoji);
  }
  toString() {
    return this.emoji;
  }
  toArray() {
    return [this.toJSON()];
  }
  static from(data) {
    return new _Emoji(data);
  }
  toJSON() {
    return {
      ...this.data,
      fancyName: this.fancyName,
      twemoji: this.twemoji(),
      unicode: this.toUnicode(),
      formattedName: this.formattedName
    };
  }
};
var fetchEmojis = async () => {
  if (emojiList)
    return emojiList;
  try {
    const response = await fetch("https://cdn.jsdelivr.net/gh/maherxubair/emojiApi/emojis-data.json");
    emojiList = await response.json();
    return emojiList;
  } catch (error) {
    console.error("Failed to fetch emoji data:", error);
    throw error;
  }
};
var emojiApi = {
  async all() {
    if (cachedAll)
      return cachedAll;
    const data = await fetchEmojis();
    return cachedAll = data.map((d) => new Emoji(d));
  },
  async arrange() {
    if (groupedEmojis)
      return groupedEmojis;
    const allEmojis = await this.all();
    groupedEmojis = {};
    for (const emoji of allEmojis) {
      const group = emoji.group;
      groupedEmojis[group] ? groupedEmojis[group].push(emoji) : groupedEmojis[group] = [emoji];
    }
    return groupedEmojis;
  },
  async get(emoji) {
    if (emojiCache.has(emoji))
      return emojiCache.get(emoji) || null;
    const allEmojis = await this.all();
    const found = allEmojis.find((e) => e.emoji === emoji);
    if (!found)
      return null;
    emojiCache.set(emoji, found);
    return found;
  },
  async filter(fn) {
    const allEmojis = await this.all();
    return allEmojis.filter(fn);
  },
  async random() {
    const allEmojis = await this.all();
    return allEmojis[Math.floor(Math.random() * allEmojis.length)];
  },
  async randomFromGroup(group, subGroup) {
    const allEmojis = await this.all();
    const filtered = allEmojis.filter((e) => e.group.toLowerCase() === group.toLowerCase() && (!subGroup || e.subGroup.toLowerCase() === subGroup.toLowerCase()));
    return filtered[Math.floor(Math.random() * filtered.length)];
  },
  async findByName(name) {
    const allEmojis = await this.all();
    const found = allEmojis.find((e) => e.name.toLowerCase() === name.toLowerCase());
    return found || null;
  },
  emojiToUnicode(emoji) {
    if (emoji.length === 1)
      return emoji.charCodeAt(0).toString(16);
    const code = (emoji.charCodeAt(0) - 55296) * 1024 + (emoji.charCodeAt(1) - 56320) + 65536;
    return code < 0 ? emoji.charCodeAt(0).toString(16) : code.toString(16).toUpperCase();
  },
  unicodeToEmoji(unicode) {
    return String.fromCodePoint(parseInt(unicode, 16));
  }
};
var emoji_default = emojiApi;

// lib/modules/cron/scheduled-task.ts
var import_events3 = require("events");

// lib/modules/cron/task.ts
var import_events = require("events");
var Task = class extends import_events.EventEmitter {
  constructor(execution) {
    super();
    if (typeof execution !== "function") {
      throw "execution must be a function";
    }
    this._execution = execution;
  }
  execute(now) {
    let exec2;
    try {
      exec2 = this._execution(now);
    } catch (error) {
      return this.emit("task-failed", error);
    }
    if (exec2 instanceof Promise) {
      return exec2.then(() => this.emit("task-finished")).catch((error) => this.emit("task-failed", error));
    } else {
      this.emit("task-finished");
      return exec2;
    }
  }
};

// lib/modules/cron/scheduler.ts
var import_events2 = require("events");

// lib/modules/cron/validateExpression.ts
var months_long = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
var months_short = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
var week_days_long = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
var week_days_short = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
function convertAsterisk(expression, replacement) {
  if (expression.indexOf("*") !== -1) {
    return expression.replace("*", replacement);
  }
  return expression;
}
function convertAsterisksToRanges(expressions) {
  expressions[0] = convertAsterisk(expressions[0], "0-59");
  expressions[1] = convertAsterisk(expressions[1], "0-59");
  expressions[2] = convertAsterisk(expressions[2], "0-23");
  expressions[3] = convertAsterisk(expressions[3], "1-31");
  expressions[4] = convertAsterisk(expressions[4], "1-12");
  expressions[5] = convertAsterisk(expressions[5], "0-6");
  return expressions;
}
function convertMonthName(expression, items) {
  for (let i = 0; i < items.length; i++) {
    expression = expression.replace(new RegExp(items[i], "gi"), (i + 1).toString());
  }
  return expression;
}
function interpreteMonth(monthExpression) {
  monthExpression = convertMonthName(monthExpression, months_long);
  monthExpression = convertMonthName(monthExpression, months_short);
  return monthExpression;
}
function replaceWithRange(expression, text, init, end) {
  const numbers = [];
  let last = parseInt(end);
  let first = parseInt(init);
  if (first > last) {
    last = parseInt(init);
    first = parseInt(end);
  }
  for (let i = first; i <= last; i++) {
    numbers.push(i);
  }
  return expression.replace(new RegExp(text, "i"), numbers.join(","));
}
function convertRange(expression) {
  const rangeRegEx = /(\d+)-(\d+)/;
  let match = rangeRegEx.exec(expression);
  while (match !== null && match.length > 0) {
    expression = replaceWithRange(expression, match[0], match[1], match[2]);
    match = rangeRegEx.exec(expression);
  }
  return expression;
}
function convertAllRanges(expressions) {
  for (let i = 0; i < expressions.length; i++) {
    expressions[i] = convertRange(expressions[i]);
  }
  return expressions;
}
function convertSteps(expressions) {
  const stepValuePattern = /^(.+)\/(\w+)$/;
  for (let i = 0; i < expressions.length; i++) {
    const match = stepValuePattern.exec(expressions[i]);
    const isStepValue = match !== null && match.length > 0;
    if (isStepValue) {
      const baseDivider = match[2];
      if (isNaN(Number(baseDivider))) {
        throw new Error(baseDivider + " is not a valid step value");
      }
      const values = match[1].split(",");
      const stepValues = [];
      const divider = parseInt(baseDivider, 10);
      for (let j = 0; j < values.length; j++) {
        const value = parseInt(values[j], 10);
        if (value % divider === 0) {
          stepValues.push(value);
        }
      }
      expressions[i] = stepValues.join(",");
    }
  }
  return expressions;
}
function convertWeekDayName(expression, items) {
  for (let i = 0; i < items.length; i++) {
    expression = expression.replace(new RegExp(items[i], "gi"), i.toString());
  }
  return expression;
}
function convertWeekDays(expression) {
  expression = expression.replace("7", "0");
  expression = convertWeekDayName(expression, week_days_long);
  return convertWeekDayName(expression, week_days_short);
}
function appendSecondExpression(expressions) {
  if (expressions.length === 5) {
    return ["0"].concat(expressions);
  }
  return expressions;
}
function removeSpaces(str) {
  return str.replace(/\s{2,}/g, " ").trim();
}
function normalizeIntegers(expressions) {
  for (let i = 0; i < expressions.length; i++) {
    const numbers = expressions[i].split(",").map((num) => parseInt(num, 10));
    expressions[i] = numbers.join(",");
  }
  return expressions;
}
function validateExpression(expression) {
  let expressions = removeSpaces(expression).split(" ");
  expressions = appendSecondExpression(expressions);
  expressions[4] = interpreteMonth(expressions[4]);
  expressions[5] = convertWeekDays(expressions[5]);
  expressions = convertAsterisksToRanges(expressions);
  expressions = convertAllRanges(expressions);
  expressions = convertSteps(expressions);
  expressions = normalizeIntegers(expressions);
  return expressions.join(" ");
}

// lib/modules/cron/validatePattern.ts
var validationRegex = /^(?:\d+|\*|\*\/\d+)$/;
function isValidExpression(expression, min2, max2) {
  const options = expression.split(",");
  for (const option of options) {
    const optionAsInt = parseInt(option, 10);
    if (!Number.isNaN(optionAsInt) && (optionAsInt < min2 || optionAsInt > max2) || !validationRegex.test(option)) {
      return false;
    }
  }
  return true;
}
function isInvalidSecond(expression) {
  return !isValidExpression(expression, 0, 59);
}
function isInvalidMinute(expression) {
  return !isValidExpression(expression, 0, 59);
}
function isInvalidHour(expression) {
  return !isValidExpression(expression, 0, 23);
}
function isInvalidDayOfMonth(expression) {
  return !isValidExpression(expression, 1, 31);
}
function isInvalidMonth(expression) {
  return !isValidExpression(expression, 1, 12);
}
function isInvalidWeekDay(expression) {
  return !isValidExpression(expression, 0, 7);
}
function validateFields(patterns, executablePatterns) {
  if (isInvalidSecond(executablePatterns[0]))
    throw new Error(`${patterns[0]} is a invalid expression for second`);
  if (isInvalidMinute(executablePatterns[1]))
    throw new Error(`${patterns[1]} is a invalid expression for minute`);
  if (isInvalidHour(executablePatterns[2]))
    throw new Error(`${patterns[2]} is a invalid expression for hour`);
  if (isInvalidDayOfMonth(executablePatterns[3]))
    throw new Error(`${patterns[3]} is a invalid expression for day of month`);
  if (isInvalidMonth(executablePatterns[4]))
    throw new Error(`${patterns[4]} is a invalid expression for month`);
  if (isInvalidWeekDay(executablePatterns[5]))
    throw new Error(`${patterns[5]} is a invalid expression for week day`);
}
function validatePattern(pattern) {
  if (typeof pattern !== "string")
    throw new TypeError("pattern must be a string!");
  const patterns = pattern.split(" ");
  const executablePatterns = validateExpression(pattern).split(" ");
  if (patterns.length === 5)
    patterns.unshift("0");
  validateFields(patterns, executablePatterns);
}

// lib/modules/cron/timezone.ts
function matchPattern(pattern, value) {
  if (pattern.indexOf(",") !== -1) {
    const patterns = pattern.split(",");
    return patterns.some((p) => matchPattern(p, value));
  }
  if (pattern.indexOf("-") !== -1) {
    const [start, end] = pattern.split("-").map((x) => parseInt(x, 10));
    return value >= start && value <= end;
  }
  return pattern === value.toString();
}
var TimeZone = class {
  constructor(pattern, timezone) {
    validatePattern(pattern);
    this.pattern = validateExpression(pattern);
    this.timezone = timezone;
    this.expressions = this.pattern.split(" ");
    this.dtf = this.timezone ? new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hourCycle: "h23",
      timeZone: this.timezone
    }) : null;
  }
  match(date) {
    date = this.apply(date);
    const runOnSecond = matchPattern(this.expressions[0], date.getSeconds());
    const runOnMinute = matchPattern(this.expressions[1], date.getMinutes());
    const runOnHour = matchPattern(this.expressions[2], date.getHours());
    const runOnDay = matchPattern(this.expressions[3], date.getDate());
    const runOnMonth = matchPattern(this.expressions[4], date.getMonth() + 1);
    const runOnWeekDay = matchPattern(this.expressions[5], date.getDay());
    return runOnSecond && runOnMinute && runOnHour && runOnDay && runOnMonth && runOnWeekDay;
  }
  apply(date) {
    if (this.dtf) {
      return new Date(this.dtf.format(date));
    }
    return date;
  }
};

// lib/modules/cron/scheduler.ts
var Scheduler = class extends import_events2.EventEmitter {
  constructor(pattern, timezone, autorecover) {
    super();
    this.timeout = null;
    this.timeMatcher = new TimeZone(pattern, timezone);
    this.autorecover = autorecover;
  }
  start() {
    this.stop();
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
    let lastCheck = process.hrtime();
    let lastExecution = this.timeMatcher.apply(/* @__PURE__ */ new Date());
    const matchTime = () => {
      const delay = 1e3;
      const elapsedTime = process.hrtime(lastCheck);
      const elapsedMs = (elapsedTime[0] * 1e9 + elapsedTime[1]) / 1e6;
      const missedExecutions = Math.floor(elapsedMs / 1e3);
      for (let i = missedExecutions; i >= 0; i--) {
        const date = new Date((/* @__PURE__ */ new Date()).getTime() - i * 1e3);
        let date_tmp = this.timeMatcher.apply(date);
        if (lastExecution.getTime() < date_tmp.getTime() && (i === 0 || this.autorecover) && this.timeMatcher.match(date)) {
          this.emit("scheduled-time-matched", date_tmp);
          date_tmp.setMilliseconds(0);
          lastExecution = date_tmp;
        }
      }
      lastCheck = process.hrtime();
      this.timeout = setTimeout(matchTime, delay);
    };
    matchTime();
  }
  stop() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.timeout = null;
  }
};

// lib/modules/cron/scheduled-task.ts
var ScheduledTask = class extends import_events3.EventEmitter {
  constructor(cronExpression, func2, options) {
    super();
    if (!options) {
      options = {
        scheduled: true,
        recoverMissedExecutions: false
      };
    }
    this.options = options;
    this.options.name = this.options.name || getRandom({ Alphabets: true, Numbers: true, DateNow: true, length: 40 });
    this._task = new Task(func2);
    this._scheduler = new Scheduler(cronExpression, options.timezone, options.recoverMissedExecutions);
    this._scheduler.on("scheduled-time-matched", (now) => {
      this.now(now);
    });
    if (options.scheduled !== false) {
      this._scheduler.start();
    }
    if (options.runOnInit === true) {
      this.now("init");
    }
  }
  now(now = "manual") {
    const result = this._task.execute(now);
    this.emit("task-done", result);
  }
  start() {
    this._scheduler.start();
  }
  stop() {
    this._scheduler.stop();
  }
};

// lib/modules/cron/backgroundScheduledTask.ts
var import_events4 = require("events");
var import_path4 = __toESM(require("path"), 1);
var import_child_process3 = require("child_process");
var import_meta = {};
var scheduledTask;
function register(message) {
  const script = require(message.path);
  scheduledTask = new ScheduledTask(message.cron, script.task, message.options);
  scheduledTask.on("task-done", (result) => {
    if (process.send) {
      process.send({ type: "task-done", result });
    }
  });
  if (process.send) {
    process.send({ type: "registered" });
  }
}
if (process.send) {
  process.on("message", (message) => {
    switch (message.type) {
      case "register":
        return register(message);
    }
  });
}
var daemonPath = (() => {
  try {
    return new URL(import_meta.url).pathname;
  } catch {
    return typeof __filename !== "undefined" ? __filename : "";
  }
})();
var BackgroundScheduledTask = class extends import_events4.EventEmitter {
  constructor(cronExpression, taskPath, options) {
    super();
    this.forkProcess = null;
    if (!options) {
      options = {
        scheduled: true,
        recoverMissedExecutions: false
      };
    }
    this.cronExpression = cronExpression;
    this.taskPath = taskPath;
    this.options = options;
    this.options.name = this.options.name || getRandom({ Alphabets: true, Numbers: true, DateNow: true, length: 40 });
    if (options.scheduled) {
      this.start();
    }
  }
  start() {
    this.stop();
    this.forkProcess = (0, import_child_process3.fork)(daemonPath);
    this.forkProcess.on("message", (message) => {
      switch (message.type) {
        case "task-done":
          this.emit("task-done", message.result);
          break;
      }
    });
    const options = this.options;
    options.scheduled = true;
    this.forkProcess.send({
      type: "register",
      path: import_path4.default.resolve(this.taskPath),
      cron: this.cronExpression,
      options
    });
  }
  stop() {
    if (this.forkProcess) {
      this.forkProcess.kill();
    }
  }
  pid() {
    if (this.forkProcess) {
      return this.forkProcess.pid;
    }
  }
  isRunning() {
    return !!this.forkProcess && !this.forkProcess.killed;
  }
};
var backgroundScheduledTask_default = BackgroundScheduledTask;

// lib/modules/cron/storage.ts
var storage = (() => {
  if (!global.scheduledTasks) {
    global.scheduledTasks = /* @__PURE__ */ new Map();
  }
  return {
    save: (task) => {
      if (!task.options) {
        task.options = {};
        task.options.name = getRandom({ Alphabets: true, Numbers: true, DateNow: true, length: 40 });
      }
      global.scheduledTasks.set(task.options.name, task);
    },
    getTasks: () => {
      return global.scheduledTasks;
    }
  };
})();

// lib/modules/cron/cron.ts
function createTask(expression, func2, options) {
  if (typeof func2 === "string")
    return new backgroundScheduledTask_default(expression, func2, options);
  return new ScheduledTask(expression, func2, options);
}
function schedule(expression, func2, options) {
  const task = createTask(expression, func2, options);
  storage.save(task);
  return task;
}
function getTasks() {
  return storage.getTasks();
}
function validate(expression) {
  try {
    validatePattern(expression);
    return true;
  } catch (_) {
    return false;
  }
}

// lib/modules/cron/index.ts
var cron = {
  schedule,
  getTasks,
  validate
};

// lib/modules/generate-apikey/generator.ts
var import_crypto = require("crypto");
function generateRandomString(length, pool) {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += pool[Math.floor(Math.random() * pool.length)];
  }
  return result;
}
function generateRandomBytes(length) {
  const bytes = (0, import_crypto.randomBytes)(length);
  return bytes.toString("hex").slice(0, length);
}
function generateBase32(dashes = true) {
  const uuid = generateUuidV4(false);
  const base32Chars = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";
  let result = "";
  for (let i = 0; i < uuid.length; i++) {
    const char = uuid[i];
    if (char !== "-") {
      result += base32Chars[parseInt(char, 16) % 32];
    }
  }
  return dashes ? result.match(/.{1,4}/g).join("-") : result;
}
function generateBase64() {
  const bytes = (0, import_crypto.randomBytes)(24);
  return bytes.toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}
function generateUuidV4(dashes = true) {
  const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === "x" ? r : r & 3 | 8;
    return v.toString(16);
  });
  return dashes ? uuid : uuid.replace(/-/g, "");
}
function generateUuidV5(name, namespace, dashes = true) {
  const namespaceBytes = uuidToBytes(namespace || generateUuidV4(false));
  const nameBytes = Buffer.from(name, "utf8");
  const data = Buffer.concat([namespaceBytes, nameBytes]);
  const hash = (0, import_crypto.createHash)("sha1").update(data).digest();
  const hashBytes = hash.slice(0, 16);
  hashBytes[6] = hashBytes[6] & 15 | 80;
  hashBytes[8] = hashBytes[8] & 63 | 128;
  const hex = hashBytes.toString("hex");
  const uuid = `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20, 32)}`;
  return dashes ? uuid : uuid.replace(/-/g, "");
}
function uuidToBytes(uuid) {
  const hex = uuid.replace(/-/g, "");
  return Buffer.from(hex, "hex");
}

// lib/modules/generate-apikey/generateApiKey.ts
function generateApiKey(options = { method: "string" }) {
  const { method, prefix, batch } = options;
  const generateKey = () => {
    switch (method) {
      case "string": {
        const { min: min2 = 16, max: max2 = 32, length, pool = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._~+/" } = options;
        const len = length || Math.floor(Math.random() * (max2 - min2 + 1)) + min2;
        return generateRandomString(len, pool);
      }
      case "bytes": {
        const { min: min2 = 16, max: max2 = 32, length } = options;
        const len = length || Math.floor(Math.random() * (max2 - min2 + 1)) + min2;
        return generateRandomBytes(len);
      }
      case "base32": {
        const { dashes = true } = options;
        return generateBase32(dashes);
      }
      case "base64": {
        return generateBase64();
      }
      case "uuidv4": {
        const { dashes = true } = options;
        return generateUuidV4(dashes);
      }
      case "uuidv5": {
        const { name, namespace, dashes = true } = options;
        return generateUuidV5(name, namespace || generateUuidV4(false), dashes);
      }
      default:
        throw new Error(`Unsupported method: ${method}`);
    }
  };
  if (batch) {
    return Array.from({ length: batch }, () => {
      const key2 = generateKey();
      return prefix ? `${prefix}.${key2}` : key2;
    });
  }
  const key = generateKey();
  return prefix ? `${prefix}.${key}` : key;
}

// lib/modules/env.ts
var import_fs8 = require("fs");
var import_path5 = require("path");
function unescapeValue(value) {
  return value.replace(/\\n/g, "\n").replace(/\\r/g, "\r").replace(/\\t/g, "	").replace(/\\b/g, "\b").replace(/\\f/g, "\f").replace(/\\\\/g, "\\").replace(/\\"/g, '"').replace(/\\'/g, "'").replace(/\\\//g, "/").replace(/\\=/g, "=");
}
var env = {
  load: (customPath) => {
    const envPath = customPath ? (0, import_path5.resolve)(customPath) : (0, import_path5.resolve)(process.cwd(), ".env");
    if (!(0, import_fs8.existsSync)(envPath)) {
      return;
    }
    try {
      const content = (0, import_fs8.readFileSync)(envPath, "utf8");
      content.split(/\r?\n/).forEach((line) => {
        line = line.trim();
        if (!line || line.startsWith("#"))
          return;
        let inQuotes = false;
        let quoteChar = "";
        let commentIndex = -1;
        for (let i = 0; i < line.length; i++) {
          const char = line[i];
          if ((char === '"' || char === "'") && (i === 0 || line[i - 1] !== "\\")) {
            if (!inQuotes) {
              inQuotes = true;
              quoteChar = char;
            } else if (char === quoteChar) {
              inQuotes = false;
            }
          } else if (char === "#" && !inQuotes) {
            commentIndex = i;
            break;
          }
        }
        if (commentIndex !== -1) {
          line = line.substring(0, commentIndex).trim();
        }
        const firstEqualIndex = line.indexOf("=");
        if (firstEqualIndex === -1)
          return;
        const key = line.slice(0, firstEqualIndex).trim();
        let value = line.slice(firstEqualIndex + 1).trim();
        if (value.startsWith('"') && value.endsWith('"') || value.startsWith("'") && value.endsWith("'")) {
          value = value.slice(1, -1);
        }
        if (key) {
          process.env[key.trim()] = unescapeValue(value);
        }
      });
    } catch (err) {
      console.error(`[ENV] Failed to load:`, err);
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Axium,
  ReadMore,
  apex,
  appendToFile,
  axium,
  bufferToFile,
  buffertoJson,
  buildUrl,
  checkCommandExists,
  checkTLSHandshake,
  clockString,
  console,
  copyFile,
  createDirectory,
  cron,
  crypto,
  deleteFile,
  downloadFile,
  emojiApi,
  ensurePackage,
  env,
  escapeHTML,
  fileExists,
  flattenArray,
  formatBytes,
  formatISODate,
  formatJSON,
  formatNumber,
  generateApiKey,
  getAbsolutePath,
  getAllIPs,
  getBufferFromStream,
  getCpuLoad,
  getDate,
  getFileSize,
  getFileStats,
  getIPAddress,
  getNetworkInterfaces,
  getProcessPriority,
  getRandom,
  getSSLCertificate,
  getStreamFromBuffer,
  getSystemInfo,
  getTempDirectory,
  getTime,
  getTimeZone,
  getUptime,
  getUserInfo,
  hasEmoji,
  hasMXRecords,
  isArray,
  isBigInt,
  isBool,
  isDomainReachable,
  isEmail,
  isEmptyObject,
  isEqualObj,
  isFunction,
  isGmail,
  isImageURL,
  isNull,
  isNumber,
  isObject,
  isString,
  isSymbol,
  isTLSValid,
  isURLAccessible,
  isUndefined,
  isValidIP,
  jsontoBuffer,
  killProcess,
  listFiles,
  mime,
  parseURL,
  passwordGenerator,
  passwordValidator,
  perf_hooks,
  randomElement,
  randomHexColor,
  randomInt,
  randomizeArray,
  readFile,
  removeDirectory,
  renameFile,
  resolveDNS,
  reverseLookup,
  runCommand,
  runCommandDetached,
  runCommandInteractive,
  runCommandSync,
  runSpawn,
  runtime,
  setProcessPriority,
  sleep,
  timeAgo,
  toBool,
  toBuffer,
  toQueryString,
  transformBuffer,
  truncate,
  uniqueArray,
  unwatchFile,
  urlValidator,
  watchFile,
  writeFile
});
