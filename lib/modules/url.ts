import { URL } from "url";
import querystring from "querystring";

export const pasrseURL = (urlString: string) => {
    const urlObj = new URL(urlString);
    return {
        protocol: urlObj.protocol,
        hostname: urlObj.hostname,
        pathname: urlObj.pathname,
        query: querystring.parse(urlObj.search.substring(1)), // Convert query params to object
    };
};

export const buildUrl = (baseUrl: string, params: Record<string, string | number>) => {
    return `${baseUrl}?${querystring.stringify(params)}`;
};
