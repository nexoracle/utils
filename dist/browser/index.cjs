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

// lib/browser/index.ts
var browser_exports = {};
__export(browser_exports, {
  ReadMore: () => ReadMore,
  axium: () => axium_default,
  clockString: () => clockString,
  console: () => Console,
  emojiApi: () => emoji_default,
  flattenArray: () => flattenArray,
  formatBytes: () => formatBytes,
  formatISODate: () => formatISODate,
  formatJSON: () => formatJSON,
  formatNumber: () => formatNumber,
  getDate: () => getDate,
  getRandom: () => getRandom,
  getTime: () => getTime,
  getTimeZone: () => getTimeZone,
  hasEmoji: () => hasEmoji,
  isArray: () => isArray,
  isBigInt: () => isBigInt,
  isBool: () => isBool,
  isEmail: () => isEmail,
  isEmptyObject: () => isEmptyObject,
  isEqualObj: () => isEqualObj,
  isFunction: () => isFunction,
  isGmail: () => isGmail,
  isNull: () => isNull,
  isNumber: () => isNumber,
  isObject: () => isObject,
  isString: () => isString,
  isSymbol: () => isSymbol,
  isUndefined: () => isUndefined,
  mime: () => mime,
  passwordValidator: () => passwordValidator_default,
  randomElement: () => randomElement,
  randomHexColor: () => randomHexColor,
  randomInt: () => randomInt,
  randomizeArray: () => randomizeArray,
  runtime: () => runtime,
  sleep: () => sleep,
  timeAgo: () => timeAgo,
  toBool: () => toBool,
  toQueryString: () => toQueryString,
  truncate: () => truncate,
  uniqueArray: () => uniqueArray,
  urlValidator: () => urlValidator
});
module.exports = __toCommonJS(browser_exports);

// lib/functions/validation.ts
var urlValidator = {
  isURL(url) {
    const regex = /^(https?:\/\/)(www\.)?([\da-z.-]+)(?::(\d{1,5}))?([\/\w .-]*)*\/?(\?[&\w=.+-]*)?(#[\w-]*)?$/i;
    const ipv4Regex = /^(https?:\/\/)?(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(?::(\d{1,5}))?([\/\w .-]*)*\/?(\?[&\w=.+-]*)?(#[\w-]*)?$/i;
    const ipv6Regex = /^(https?:\/\/)?\[([a-f0-9:]+)\](?::(\d{1,5}))?([\/\w .-]*)*\/?(\?[&\w=.+-]*)?(#[\w-]*)?$/i;
    const localhostRegex = /^(https?:\/\/)?localhost(?::(\d{1,5}))?([\/\w .-]*)*\/?(\?[&\w=.+-]*)?(#[\w-]*)?$/i;
    const fileRegex = /^file:\/\/\/?([\/\w .-]*)*\/?$/i;
    return regex.test(url) || ipv4Regex.test(url) || ipv6Regex.test(url) || localhostRegex.test(url) || fileRegex.test(url);
  },
  mediafire(url) {
    const regex = /https?:\/\/(www\.)?mediafire\.com\/(file\/[a-zA-Z0-9]+\/[a-zA-Z0-9_\-\.]+|view\/[a-zA-Z0-9]+\/[a-zA-Z0-9_\-\.]+(\/file)?|\?[a-zA-Z0-9]+|folder\/[a-zA-Z0-9]+)/;
    return regex.test(url);
  },
  gdrive(url) {
    const regex = /https:\/\/(?:drive\.google\.com\/(?:file\/d\/|open\?id=|drive\/folders\/)|docs\.google\.com\/(?:uc\?export=download&id=|file\/d\/|document\/d\/)([\w-]{28,})(?:\/edit)?)/;
    return regex.test(url);
  },
  spotify(url) {
    const regex = /(https?:\/\/)?(open\.spotify\.com\/(track|album|artist|playlist|show|episode|user|collection|browse|search|genre|featured|creator|pod|station|embed)\/[a-zA-Z0-9]+(?:\?[a-zA-Z0-9_=&-]+)?|spotify:(track|album|artist|playlist|show|episode|user|collection|search|station):[a-zA-Z0-9]+(?:\?[a-zA-Z0-9_=&-]+)?)|spotify:user:[a-zA-Z0-9]+:playlist:[a-zA-Z0-9]+/;
    return regex.test(url);
  },
  tiktok(url) {
    const regex = /\bhttps?:\/\/(?:m|www|vm|vt)?\.?tiktok\.com\/(?:@[\w.-]+\/(?:video|photo)\/\d+|v\/\w+|t\/\w+|embed\/\w+|\?shareId=\d+|\?item_id=\d+|[\w.-]+|music\/[\w.-]+|tag\/[\w.-]+|amp\/[\w.-]+|effects\/[\w.-]+|trending\/[\w.-]+|discover\/[\w.-]+|hashtag\/[\w.-]+)\b/;
    return regex.test(url);
  },
  threads(url) {
    const regex = /\bhttps?:\/\/(?:www\.)?threads\.net\/(?:@?[\w.-]+(?:\/post\/[\w.-]+)?|post\/[\w.-]+|t\/[\w.-]+|explore|search|profile|direct|settings|activity)\b(?:\?.*)?$/;
    return regex.test(url);
  },
  twitter(url) {
    const regex = /\bhttps?:\/\/(?:www\.)?(?:twitter\.com|x\.com)\/(?:@?[\w.-]+\/status\/\d+(?:\/(?:photo|video)\/\d+)?|@?[A-Za-z0-9_]{1,15}(?:\?[^#\s]*)?|search\?[^#\s]*|hashtag\/[^#\s]*|i\/web\/status\/\d+|explore|(?:i\/)?(?:moments|lists|topics|bookmarks)(?:\/[\w.-]+)?|(?:home|notifications|messages|explore|settings))\b(?:\?.*)?$/;
    return regex.test(url);
  },
  youtube(url) {
    const regex = /^(https?:\/\/)?(www\.|m\.|music\.)?(youtube\.com\/(?:watch\?v=|playlist\?list=|channel\/|c\/|user\/|embed\/|shorts\/|live\/|clip\/|hashtag\/|results\?search_query=|feed(?:\/[\w-]+)?|subscription_manager|account|reporthistory|view_all_playlists|premium|studio|movies|gaming)|youtu\.be\/)[a-zA-Z0-9\-_]*((?:\?|&)[^\s]*)?$/;
    return regex.test(url);
  },
  snapchat(url) {
    const regex = /https?:\/\/(?:www\.)?(?:snapchat\.com\/(?:add\/[A-Za-z0-9_.-]+|discover\/[A-Za-z0-9_.-]+|spotlight\/[A-Za-z0-9_.-]+|stories\/[A-Za-z0-9_.-]+|lens\/[A-Za-z0-9_.-]+|t\/[A-Za-z0-9_.-]+|snap\/[A-Za-z0-9_.-]+)|story\.snapchat\.com\/s\/[A-Za-z0-9_.-]+)/;
    return regex.test(url);
  },
  terabox(url) {
    const regex = /^(?:https?:\/\/)?(?:www\.)?(?:mirrobox\.com|nephobox\.com|freeterabox\.com|1024tera\.com|4funbox\.co|4funbox\.com|terabox\.app|terabox\.com|1024tera\.co|1024terabox\.com|momerybox\.com|teraboxapp\.com|tibibox\.com|teraboxlink\.com)(?:\/s\/[A-Za-z0-9_-]+)?(?:\?.*)?$/;
    return regex.test(url);
  },
  instagram(url) {
    const regex = /^(?:https?:\/\/)?(?:www\.)?instagram\.com\/(?:p|reel|tv|stories)\/([A-Za-z0-9_-]+)(?:\/)?(?:\?.*)?$/;
    return regex.test(url);
  },
  facebook(url) {
    const regex = /(?:https?:\/\/)?(?:www\.|m\.)?(?:facebook|fb)\.(?:com|me|watch)\/(?:(?:[\w.]+\/)?(?:videos|photos|posts|events)\/(?:[\w-]+\/)?(?:[\d]+)|(?:profile\.php\?id=\d+)|(?:[\w.]+)|(?:groups\/[\w-]+))\/?(?:\?.*)?$/;
    return regex.test(url);
  },
  linkedin(url) {
    const regex = /^(https?:\/\/)?(www\.)?linkedin\.com\/(in|company|posts|pulse|jobs|feed|school|groups|events|showcase|learning)\/[a-zA-Z0-9\-_%.]+\/?(?:\?.*)?$/;
    return regex.test(url);
  },
  reddit(url) {
    const regex = /^(https?:\/\/)?(www\.|old\.)?reddit\.com\/(r|user|comments)\/[a-zA-Z0-9_-]+(?:\/[a-zA-Z0-9_-]+){0,2}\/?(?:\?.*)?$/;
    return regex.test(url);
  },
  pinterest(url) {
    const regex = /^(https?:\/\/)?(www\.)?(?:pinterest\.(?:com|ca|co\.uk|fr|de|jp|au)\/(?:pin\/[a-zA-Z0-9_-]+\/?|[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+\/?|[a-zA-Z0-9_-]+\/?)?(?:\?.*)?|i\.pinimg\.com\/(?:\d+x\/)?[a-zA-Z0-9_\/-]+\.[a-zA-Z0-9]+)$/;
    return regex.test(url);
  },
  whatsapp(url) {
    const regex = /^(https?:\/\/)?(www\.)?(whatsapp\.com\/(channel\/[a-zA-Z0-9_-]+|business|send|download|android|iphone|api|about|contact|security)|wa\.me\/[0-9]+|chat\.whatsapp\.com\/[a-zA-Z0-9_-]+)\/?(?:\?.*)?$/;
    return regex.test(url);
  },
  discord(url) {
    const regex = /^(https?:\/\/)?((?:www\.)?(?:discord\.(?:gg|com|me)|discordapp\.com)(?:\/(?:invite\/[a-zA-Z0-9-]+|channels\/(?:\d+\/\d+\/?\d*)|users\/\d+|servers\/\d+|communities\/\d+))?|(?:www\.)?discord\.me\/[a-zA-Z0-9-_]+)\/?(?:\?.*)?$/;
    return regex.test(url);
  },
  twitch(url) {
    const regex = /^(https?:\/\/)?(?:(?:www\.|m\.)?twitch\.tv\/(?:[a-zA-Z0-9\-_]+\/?(?:[a-zA-Z0-9\-_]+\/?)?)(?:video\/\d+|clip\/[a-zA-Z0-9\-_]+)?|clips\.twitch\.tv\/[a-zA-Z0-9\-_]+|(?:www\.)?twitch\.tv\/directory\/(?:game|category)\/[a-zA-Z0-9\-_%]+|(?:www\.)?twitch\.tv\/[a-zA-Z0-9\-_]+\/(?:videos|clips|collections|about|schedule))\/?(?:\?.*)?$/;
    return regex.test(url);
  },
  stackoverflow(url) {
    const regex = /^(https?:\/\/)?((?:www\.)?stackoverflow\.com\/(?:questions\/\d+(?:\/[\w-]+)?|users\/\d+(?:\/[\w-]+)?|tags\/[\w-]+|a\/\d+|q\/\d+|search\?[^\/]+)|(?:[\w-]+\.)?stackexchange\.com\/(?:questions\/\d+(?:\/[\w-]+)?|users\/\d+(?:\/[\w-]+)?|tags\/[\w-]+))\/?(?:\?.*)?$/;
    return regex.test(url);
  },
  medium(url) {
    const regex = /^(https?:\/\/)?(?:(?:www\.)?medium\.com\/(?:@[\w-]+(?:\/[\w-]+)?|[\w-]+\/[\w-]+|tag\/[\w-]+|topics\/[\w-]+|lists\/[\w-]+)|[\w-]+\.medium\.com\/[\w-]+)\/?(?:\?.*)?$/;
    return regex.test(url);
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
  hasProtocol(url, protocol) {
    const regex = new RegExp(`^${protocol}:\\/\\/`, "i");
    return regex.test(url);
  },
  hasDomain(url, domain) {
    const regex = new RegExp(`^https?:\\/\\/(www\\.)?${domain}(\\/|$)`, "i");
    return regex.test(url);
  },
  hasPath(url, path) {
    const regex = new RegExp(`^https?:\\/\\/[^\\/]+\\/${path}`, "i");
    return regex.test(url);
  },
  hasQueryParam(url, param) {
    const regex = new RegExp(`[?&]${param}(=|&|$)`, "i");
    return regex.test(url);
  },
  hasFragment(url, fragment) {
    const regex = new RegExp(`#${fragment}$`, "i");
    return regex.test(url);
  },
  extractComponents(url) {
    const regex = /^(https?):\/\/([^\/?#]+)([^?#]*)(?:\?([^#]*))?(?:#(.*))?/i;
    const match = url.match(regex);
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
  isWithinLength(url, maxLength) {
    return url.length <= maxLength;
  },
  hasValidCharacters(url) {
    const regex = /^[a-zA-Z0-9\-._~:\/?#[\]@!$&'()*+,;=]+$/;
    return regex.test(url);
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
  buildUrl(url, params) {
    if (!params)
      return url;
    const urlObj = new URL(url);
    Object.entries(params).forEach(([key, value]) => {
      if (value !== void 0 && value !== null) {
        urlObj.searchParams.append(key, String(value));
      }
    });
    return urlObj.toString();
  }
  // Core fetch request
  async request(url, options = {}) {
    const { retries = 0, retryDelay = 0, timeout, params, onDownloadProgress, onUploadProgress, signal: externalSignal, ...fetchOptions } = await this.requestInterceptors.apply({ ...this.globalDefaults, ...options });
    const finalUrl = this.buildUrl(url, params);
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
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
        }
      }
    }
  }
};

// lib/modules/axium/axium.ts
var import_fs = __toESM(require("fs"), 1);
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
  get(url, options = {}) {
    return this.request(url, { ...options, method: "GET" });
  }
  post(url, data, options = {}) {
    return this.request(url, { ...options, method: "POST", body: JSON.stringify(data) });
  }
  put(url, data, options = {}) {
    return this.request(url, { ...options, method: "PUT", body: JSON.stringify(data) });
  }
  patch(url, data, options = {}) {
    return this.request(url, { ...options, method: "PATCH", body: JSON.stringify(data) });
  }
  delete(url, options = {}) {
    return this.request(url, { ...options, method: "DELETE" });
  }
  // Multipart form data
  postFormData(url, data, options = {}) {
    return this.request(url, {
      ...options,
      method: "POST",
      body: data,
      headers: {
        ...options.headers
      }
    });
  }
  // URL-encoded form
  postUrlEncoded(url, data, options = {}) {
    const encodedData = new URLSearchParams(data).toString();
    return this.request(url, {
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
  async getBuffer(url, options = {}, method = "GET") {
    try {
      if (Buffer.isBuffer(url)) {
        return url;
      }
      if (urlValidator.isURL(url)) {
        const response = await fetch(url, {
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
      } else {
        if (import_fs.default.existsSync(url)) {
          return import_fs.default.readFileSync(url);
        } else {
          return url;
        }
      }
    } catch (e) {
      console.error("Error while getting buffer:\n", e);
      return false;
    }
  }
  // fetchJson method
  async fetchJson(url, options = {}, method = "GET") {
    try {
      const response = await fetch(url, {
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
  head(url, options = {}) {
    return this.request(url, { ...options, method: "HEAD" });
  }
};
var axium = new Axium();
var axium_default = axium;

// lib/functions/tools.ts
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
var sleep = (ms = 3e3) => new Promise((resolve) => setTimeout(resolve, ms));
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
      return `${year}-${month}-${day}`;
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
    const response = await fetch("https://cdn.jsdelivr.net/gh/maher-xubair/emojiApi/emojis-data.json");
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ReadMore,
  axium,
  clockString,
  console,
  emojiApi,
  flattenArray,
  formatBytes,
  formatISODate,
  formatJSON,
  formatNumber,
  getDate,
  getRandom,
  getTime,
  getTimeZone,
  hasEmoji,
  isArray,
  isBigInt,
  isBool,
  isEmail,
  isEmptyObject,
  isEqualObj,
  isFunction,
  isGmail,
  isNull,
  isNumber,
  isObject,
  isString,
  isSymbol,
  isUndefined,
  mime,
  passwordValidator,
  randomElement,
  randomHexColor,
  randomInt,
  randomizeArray,
  runtime,
  sleep,
  timeAgo,
  toBool,
  toQueryString,
  truncate,
  uniqueArray,
  urlValidator
});
