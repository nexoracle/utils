import { Buffer } from 'buffer';

// Define FetchOptions interface
export interface FetchOptions extends RequestInit {
  retries?: number;
  retryDelay?: number;
  timeout?: number;
  params?: Record<string, string | number | boolean>;
  onDownloadProgress?: (progress: ProgressEvent) => void;
  onUploadProgress?: (progress: ProgressEvent) => void;
  signal?: AbortSignal;
  responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
}

// Define Interceptor type
type Interceptor<T> = (value: T) => T | Promise<T>;

// Custom error class
class FetchError extends Error {
  constructor(public message: string, public status?: number, public response?: any) {
    super(message);
    this.name = "FetchError";
  }
}

// ProgressEvent class for tracking progress
class ProgressEvent {
  constructor(public loaded: number, public total: number) {}

  get percent(): number {
    return this.total > 0 ? (this.loaded / this.total) * 100 : 0;
  }
}

// Axium class
class Axium {
  private requestInterceptors: Interceptor<FetchOptions>[] = [];
  private responseInterceptors: Interceptor<Response>[] = [];
  private globalDefaults: FetchOptions = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  constructor(defaults?: FetchOptions) {
    if (defaults) {
      this.globalDefaults = { ...this.globalDefaults, ...defaults };
    }
  }

  // Add request interceptor
  addRequestInterceptor(interceptor: Interceptor<FetchOptions>) {
    this.requestInterceptors.push(interceptor);
  }

  // Add response interceptor
  addResponseInterceptor(interceptor: Interceptor<Response>) {
    this.responseInterceptors.push(interceptor);
  }

  // Set global defaults
  setGlobalDefaults(defaults: FetchOptions) {
    this.globalDefaults = { ...this.globalDefaults, ...defaults };
  }

  // Apply interceptors
  private async applyInterceptors<T>(interceptors: Interceptor<T>[], value: T): Promise<T> {
    let result = value;
    for (const interceptor of interceptors) {
      result = await interceptor(result);
    }
    return result;
  }

  // Build URL with query parameters
  private buildUrl(url: string, params?: Record<string, string | number | boolean>): string {
    if (!params) return url;

    const urlObj = new URL(url);
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        urlObj.searchParams.append(key, String(value));
      }
    });

    return urlObj.toString();
  }

  // Core fetch request
  async request(url: string, options: FetchOptions = {}): Promise<any> {
    const { retries = 0, retryDelay = 0, timeout, params, onDownloadProgress, onUploadProgress, signal: externalSignal, ...fetchOptions } = await this.applyInterceptors(this.requestInterceptors, { ...this.globalDefaults, ...options });

    const finalUrl = this.buildUrl(url, params);

    for (let attempt = 0; attempt <= retries; attempt++) {
      const controller = new AbortController();
      const timeoutId = timeout ? setTimeout(() => controller.abort(), timeout) : null;

      // Use external signal if provided, otherwise use the controller's signal
      const signal = externalSignal || controller.signal;

      try {
        const response = await fetch(finalUrl, {
          ...fetchOptions,
          signal,
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36",
            ...fetchOptions.headers,
          },
        });

        if (timeoutId) clearTimeout(timeoutId);

        if (!response.ok) {
          throw new FetchError(`HTTP error! Status: ${response.status}`, response.status, response);
        }

        // Track download progress if onDownloadProgress is provided
        if (onDownloadProgress && response.body) {
          const reader = response.body.getReader();
          const contentLength = Number(response.headers.get("content-length")) || 0;
          let loaded = 0;

          const stream = new ReadableStream({
            async start(controller) {
              while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                loaded += value.length;
                onDownloadProgress(new ProgressEvent(loaded, contentLength));
                controller.enqueue(value);
              }
              controller.close();
            },
          });

          const newResponse = new Response(stream, {
            headers: response.headers,
            status: response.status,
            statusText: response.statusText,
          });

          const interceptedResponse = await this.applyInterceptors(this.responseInterceptors, newResponse);

          // Handle different response types
          const contentType = interceptedResponse.headers.get("content-type");
          let data;

          if (options.responseType) {
            // Use responseType if explicitly set
            switch (options.responseType) {
              case 'arraybuffer':
                data = await interceptedResponse.arrayBuffer();
                data = Buffer.from(data);
                break;
              case 'blob':
                data = await interceptedResponse.blob();
                break;
              case 'json':
                data = await interceptedResponse.json();
                break;
              case 'text':
                data = await interceptedResponse.text();
                break;
              default:
                data = await interceptedResponse.arrayBuffer();
                data = Buffer.from(data);
            }
          } else {
            // Fall back to Content-Type if responseType is not set
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
            config: options,
          };
        } else {
          const interceptedResponse = await this.applyInterceptors(this.responseInterceptors, response);

          // Handle different response types
          const contentType = interceptedResponse.headers.get("content-type");
          let data;

          if (options.responseType) {
            // Use responseType if explicitly set
            switch (options.responseType) {
              case 'arraybuffer':
                data = await interceptedResponse.arrayBuffer();
                data = Buffer.from(data);
                break;
              case 'blob':
                data = await interceptedResponse.blob();
                break;
              case 'json':
                data = await interceptedResponse.json();
                break;
              case 'text':
                data = await interceptedResponse.text();
                break;
              default:
                data = await interceptedResponse.arrayBuffer();
                data = Buffer.from(data);
            }
          } else {
            // Fall back to Content-Type if responseType is not set
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
            config: options,
          };
        }
      } catch (error) {
        if (timeoutId) clearTimeout(timeoutId);

        if (attempt === retries) {
          console.error(`Fetch failed after ${retries + 1} attempts:`, (error as Error).message);
          throw new FetchError((error as Error).message || "Request failed");
        }

        if (retryDelay > 0) {
          console.warn(`Retrying... (${attempt + 1}/${retries + 1})`);
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
        }
      }
    }
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

// Export Axium instance
export const axium = new Axium();