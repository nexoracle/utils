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
    const regex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|playlist\?list=|channel\/|c\/|user\/|embed\/|shorts\/|live\/|music\/)|youtu\.be\/)[a-zA-Z0-9\-_]+(\?[^\s]*)?$/;
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
    const regex = /^((https|http)?:\/\/(?:www\.)?instagram\.com\/(p|tv|reel|stories)\/([^/?#&]+)).*/;
    return regex.test(url);
  },

  facebook(url: string): boolean {
    const regex = /(?:https?:\/\/)?(?:www\.)?(m\.facebook|facebook|fb)\.(com|me|watch)\/(?:(?:\w\.)*#!\/)?(?:groups\/)?(?:[\w\-\.]*\/)*([\w\-\.]*)/;
    return regex.test(url);
  },

  linkedin(url: string): boolean {
    const regex = /^(https?:\/\/)?(www\.)?linkedin\.com\/(in|company|posts|pulse)\/[a-zA-Z0-9\-_]+\/?$/;
    return regex.test(url);
  },

  reddit(url: string): boolean {
    const regex = /^(https?:\/\/)?(www\.)?reddit\.com\/(r|user|comments)\/[a-zA-Z0-9_]+\/?/;
    return regex.test(url);
  },

  pinterest(url: string): boolean {
    const regex = /^(https?:\/\/)?(www\.)?pinterest\.com\/(pin\/[a-zA-Z0-9_]+\/?|([a-zA-Z0-9_]+\/?([a-zA-Z0-9_]+\/?)?))$/;
    return regex.test(url);
  },

  whatsapp(url: string): boolean {
    const regex = /^(https?:\/\/)?(www\.)?(whatsapp\.com\/(channel\/[a-zA-Z0-9]+|business|api)|wa\.me\/[0-9]+|chat\.whatsapp\.com\/[a-zA-Z0-9]+)\/?$/;
    return regex.test(url);
  },

  discord(url: string): boolean {
    const regex = /^(https?:\/\/)?(discord\.(gg|com)\/invite\/[a-zA-Z0-9]+)\/?$/;
    return regex.test(url);
  },

  twitch(url: string): boolean {
    const regex = /^(https?:\/\/)?(www\.)?twitch\.tv\/([a-zA-Z0-9\-_]+\/?([a-zA-Z0-9\-_]+\/?)?(video\/[a-zA-Z0-9\-_]+|clip\/[a-zA-Z0-9\-_]+)?)$/;
    return regex.test(url);
  },

  stackoverflow(url: string): boolean {
    const regex = /^(https?:\/\/)?(www\.)?stackoverflow\.com\/(questions\/[0-9]+\/?|users\/[0-9]+\/?|tags\/[a-zA-Z0-9\-_]+\/?)$/;
    return regex.test(url);
  },

  medium(url: string): boolean {
    const regex = /^(https?:\/\/)?(www\.)?medium\.com\/(@[a-zA-Z0-9\-_]+\/?([a-zA-Z0-9\-_]+\/?)?|[a-zA-Z0-9\-_]+\/[a-zA-Z0-9\-_]+\/?)$/;
    return regex.test(url);
  },

  extractUrlFromString(str: string): string | null {
    const regex = /(https?:\/\/[^\s"'<>()]+)/i;
    const match = str.match(regex);
    return match ? match[0] : null;
  },

  extractAllUrlFromString(str: string): string[] | null {
    const regex = /https?:\/\/[^\s"'<>()]+|www\.[^\s"'<>()]+/gi;
    const match = str.match(regex);
    return match ? match : null;
  },

  hasProtocol(url: string, protocol: string): boolean {
    const regex = new RegExp(`^${protocol}:\\/\\/`, "i");
    return regex.test(url);
  },

  hasDomain(url: string, domain: string): boolean {
    const regex = new RegExp(`^https?:\\/\\/(www\\.)?${domain}\\/`, "i");
    return regex.test(url);
  },

  hasPath(url: string, path: string): boolean {
    const regex = new RegExp(`^https?:\\/\\/[^\\/]+\\/${path}`, "i");
    return regex.test(url);
  },

  hasQueryParam(url: string, param: string): boolean {
    const regex = new RegExp(`[?&]${param}(=|&|$)`, "i");
    return regex.test(url);
  },

  hasFragment(url: string, fragment: string): boolean {
    const regex = new RegExp(`#${fragment}$`, "i");
    return regex.test(url);
  },

  extractComponents(url: string): { protocol: string; domain: string; path: string; query: string; fragment: string } | null {
    const regex = /^(https?):\/\/([^\/?#]+)([^?#]*)(?:\?([^#]*))?(?:#(.*))?/i;
    const match = url.match(regex);
    if (!match) return null;
    return {
      protocol: match[1],
      domain: match[2],
      path: match[3],
      query: match[4] || "",
      fragment: match[5] || "",
    };
  },

  isWithinLength(url: string, maxLength: number): boolean {
    return url.length <= maxLength;
  },

  hasValidCharacters(url: string): boolean {
    const regex = /^[a-zA-Z0-9\-._~:\/?#[\]@!$&'()*+,;=]+$/;
    return regex.test(url);
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
