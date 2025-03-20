export const urlValidator = {
  isURL(url: string): boolean {
    const regex = /^(https?:\/\/)?(www\.)?([\da-z.-]+)(?::(\d{1,5}))?([\/\w .-]*)*\/?(\?[&\w=.+-]*)?(#[\w-]*)?$/i;
    const ipv4Regex = /^(https?:\/\/)?(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(?::(\d{1,5}))?([\/\w .-]*)*\/?(\?[&\w=.+-]*)?(#[\w-]*)?$/i;
    const ipv6Regex = /^(https?:\/\/)?\[([a-f0-9:]+)\](?::(\d{1,5}))?([\/\w .-]*)*\/?(\?[&\w=.+-]*)?(#[\w-]*)?$/i;
    const localhostRegex = /^(https?:\/\/)?localhost(?::(\d{1,5}))?([\/\w .-]*)*\/?(\?[&\w=.+-]*)?(#[\w-]*)?$/i;
    const fileRegex = /^file:\/\/\/?([\/\w .-]*)*\/?$/i;

    return regex.test(url) || ipv4Regex.test(url) || ipv6Regex.test(url) || localhostRegex.test(url) || fileRegex.test(url);
  },

  mediafire(url: string): boolean {
    const regex = /https?:\/\/(www\.)?mediafire\.com\/(file\/[a-zA-Z0-9]+\/[a-zA-Z0-9_\-\.]+|\?[a-zA-Z0-9]+)/;
    return regex.test(url);
  },

  gdrive(url: string): boolean {
    const regex = /https:\/\/(?:drive\.google\.com\/(?:file\/d\/|open\?id=)|docs\.google\.com\/(?:uc\?export=download&id=|file\/d\/))([\w-]{28,})/;
    return regex.test(url);
  },

  spotify(url: string): boolean {
    const regex = /(https?:\/\/)?(open\.spotify\.com\/(track|album|playlist|artist)\/[a-zA-Z0-9]+|spotify:(track|album|playlist|artist):[a-zA-Z0-9]+)/;
    return regex.test(url);
  },

  tiktok(url: string): boolean {
    const regex = /\bhttps?:\/\/(?:m|www|vm|vt)\.tiktok\.com\/(?:@[\w.-]+\/(?:video|photo)\/\d+|v\/\w+|embed\/\w+|\?shareId=\d+|\?item_id=\d+|[\w.-]+)\b/;
    return regex.test(url);
  },

  threads(url: string): boolean {
    const regex = /\bhttps?:\/\/(?:www\.)?threads\.net\/[^\s]+\b/;
    return regex.test(url);
  },

  twitter(url: string): boolean {
    const regex = /\bhttps?:\/\/(?:www\.)?twitter\.com\/(?:\w+\/status\/\d+|[A-Za-z0-9_]{1,15}(?:\?[^#\s]*)?|search\?[^#\s]*|hashtag\/[^#\s]*|i\/web\/status\/\d+)\b/;
    return regex.test(url);
  },

  youtube(url: string): boolean {
    const regex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|shorts\/|.*[?&]v=)|youtu\.be\/)([-_0-9A-Za-z]{11})(?:\S+)?$/;
    return regex.test(url);
  },

  snapchat(url: string): boolean {
    const regex = /https?:\/\/(www\.)?(snapchat\.com\/(add\/[A-Za-z0-9_\-]+|discover\/[A-Za-z0-9_\-]+\/[A-Za-z0-9_\-]+|spotlight\/[A-Za-z0-9_\-]+|t\/[A-Za-z0-9_\-]+)|story\.snapchat\.com\/s\/[A-Za-z0-9_\-]+)/;
    return regex.test(url);
  },

  terabox(url: string): boolean {
    const regex = /^(?:https?:\/\/)?(?:www\.)?(mirrobox\.com|nephobox\.com|freeterabox\.com|1024tera\.com|4funbox\.co|4funbox\.com|terabox\.app|terabox\.com|1024tera\.co|1024terabox\.com|momerybox\.com|teraboxapp\.com|tibibox\.com|teraboxlink\.com)/;
    return regex.test(url);
  },

  instagram(url: string): boolean {
    const igRegex = /^((https|http)?:\/\/(?:www\.)?instagram\.com\/(p|tv|reel|stories)\/([^/?#&]+)).*/;
    return igRegex.test(url);
  },

  facebook(url: string): boolean {
    const fbRegex = /(?:https?:\/\/)?(?:www\.)?(m\.facebook|facebook|fb)\.(com|me|watch)\/(?:(?:\w\.)*#!\/)?(?:groups\/)?(?:[\w\-\.]*\/)*([\w\-\.]*)/;
    return fbRegex.test(url);
  },

  extractUrlFromString(str: string): string | null {
    const regex = /(https?:\/\/[^\s"'<>()]+)/i;
    const match = str.match(regex);
    return match ? match[0] : null;
  },

  extractAllUrlFromString(str: string): string[] | null {
    const urlRegex = /https?:\/\/[^\s"'<>()]+|www\.[^\s"'<>()]+/gi;
    const matches = str.match(urlRegex);
    return matches ? matches : null;
  },
};

export function toBool(input: string, returnBool: boolean = true): string | boolean {
  return /true|yes|ok|act|sure|enable/gi.test(input) ? (returnBool ? true : "true") : returnBool ? false : "false";
}

export const isEmail = (email: string): boolean => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

export const isObject = (value: unknown): boolean => typeof value === "object" && value !== null && !Array.isArray(value);

export function isArray(input: unknown): input is unknown[] {
  return Array.isArray(input);
}
