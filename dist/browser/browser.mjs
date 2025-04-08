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
  // Get buffer
  getBuffer(url, options = {}) {
    return this.request(url, { ...options, method: "GET" });
  }
  // Head request
  head(url, options = {}) {
    return this.request(url, { ...options, method: "HEAD" });
  }
};
var axium = new Axium();
var axium_default = axium;

// lib/functions/validation.ts
var isEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
export {
  axium_default as axium,
  isEmail
};
