import { FetchOptions } from "./types";
import { RequestHandler } from "./request";

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

  // Get buffer
  getBuffer(url: string, options: FetchOptions = {}) {
    return this.request(url, { ...options, method: "GET" });
  }

  // Head request
  head(url: string, options: FetchOptions = {}) {
    return this.request(url, { ...options, method: "HEAD" });
  }
}

export const axium = new Axium();
export default axium;
