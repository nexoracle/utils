import { FetchOptions } from "./types";
import { RequestHandler } from "./request";
import fs from "fs";
import { urlValidator } from "../../functions/validation";

export class Axium extends RequestHandler {
  constructor(defaults?: FetchOptions) {
    super({
      headers: {
        "Content-Type": "application/json",
      },
      ...defaults,
    });
  }

  // Helper methods
  get(url: string, options: FetchOptions = {}) {
    return this.request(url, { ...options, method: "GET" });
  }

  post(url: string, data: any, options: FetchOptions = {}) {
    return this.request(url, { ...options, method: "POST", body: JSON.stringify(data) });
  }

  put(url: string, data: any, options: FetchOptions = {}) {
    return this.request(url, { ...options, method: "PUT", body: JSON.stringify(data) });
  }

  patch(url: string, data: any, options: FetchOptions = {}) {
    return this.request(url, { ...options, method: "PATCH", body: JSON.stringify(data) });
  }

  delete(url: string, options: FetchOptions = {}) {
    return this.request(url, { ...options, method: "DELETE" });
  }

  // Multipart form data
  postFormData(url: string, data: FormData, options: FetchOptions = {}) {
    return this.request(url, {
      ...options,
      method: "POST",
      body: data,
      headers: {
        ...options.headers,
      },
    });
  }

  // URL-encoded form
  postUrlEncoded(url: string, data: Record<string, string>, options: FetchOptions = {}) {
    const encodedData = new URLSearchParams(data).toString();
    return this.request(url, {
      ...options,
      method: "POST",
      body: encodedData,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        ...options.headers,
      },
    });
  }

  // Multiple concurrent requests
  all(requests: Promise<any>[]) {
    return Promise.all(requests);
  }

  // getBuffer method
  async getBuffer(url: string, options: FetchOptions = {}, method: string = "GET") {
    try {
      if (Buffer.isBuffer(url)) {
        return url;
      }

      if (urlValidator.isURL(url)) {
        const response = await fetch(url, {
          method: method,
          headers: {
            DNT: "1",
            "Upgrade-Insecure-Request": "1",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36",
            ...options.headers,
          },
          ...options,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const arrayBuffer = await response.arrayBuffer();
        return Buffer.from(arrayBuffer);
      } else {
        if (fs.existsSync(url)) {
          return fs.readFileSync(url);
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
  async fetchJson(url: string, options: FetchOptions = {}, method = "GET") {
    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36",
          ...options.headers,
        },
        ...options,
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
  head(url: string, options: FetchOptions = {}) {
    return this.request(url, { ...options, method: "HEAD" });
  }
}

export const axium = new Axium();
export default axium;
