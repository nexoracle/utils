import { URL } from "url";
import querystring from "querystring";

interface ParsedURL {
  href: string;
  origin: string;
  protocol: string;
  username: string;
  password: string;
  host: string;
  hostname: string;
  port: string;
  pathname: string;
  search: string;
  hash: string;

  query: Record<string, string | string[]>;
  searchParams: URLSearchParams;
  fragment: string;

  isSecure: boolean;
  isLocal: boolean;
  isAbsolute: boolean;
  hasAuth: boolean;
}

export const parseURL = (urlString: string): ParsedURL | null => {
  try {
    if (!/^[a-z]+:\/\//i.test(urlString)) {
      urlString = "https://" + urlString;
    }

    const urlObj = new URL(urlString);
    const rawQuery = querystring.parse(urlObj.search.substring(1));

    const query: Record<string, string | string[]> = {};
    for (const [key, value] of Object.entries(rawQuery)) {
      if (value !== undefined) {
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
      hasAuth: !!urlObj.username || !!urlObj.password,
    };
  } catch (error) {
    console.error(`URL parsing failed: ${urlString}`, error);
    return null;
  }
};

function getDefaultPort(protocol: string): string {
  const portMap: Record<string, string> = {
    "http:": "80",
    "https:": "443",
    "ftp:": "21",
    "ws:": "80",
    "wss:": "443",
  };
  return portMap[protocol] || "";
}

interface BuildUrlOptions {
  path?: string;
  query?: Record<string, string | number | boolean | undefined>;
  fragment?: string;
}

export const buildUrl = (baseUrl: string, options: BuildUrlOptions = {}): string => {
  if (!baseUrl) return "";

  try {
    const urlObj = new URL(baseUrl);

    if (options.path) {
      urlObj.pathname = options.path.startsWith("/") ? options.path : `/${options.path}`;
    }

    if (options.query) {
      const filteredParams = Object.fromEntries(
        Object.entries(options.query)
          .filter(([_, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)])
      );
      urlObj.search = querystring.stringify(filteredParams);
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
