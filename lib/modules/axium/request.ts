import { FetchOptions, FetchError, ProgressEvent, Interceptor } from "./types";
import { InterceptorManager } from "./interceptors";

export class RequestHandler {
  private requestInterceptors = new InterceptorManager<FetchOptions>();
  private responseInterceptors = new InterceptorManager<Response>();

  constructor(private globalDefaults: FetchOptions) {}

  // Add request interceptor
  addRequestInterceptor(interceptor: Interceptor<FetchOptions>) {
    this.requestInterceptors.add(interceptor);
  }

  // Add response interceptor
  addResponseInterceptor(interceptor: Interceptor<Response>) {
    this.responseInterceptors.add(interceptor);
  }

  // Set global defaults
  setGlobalDefaults(defaults: FetchOptions) {
    this.globalDefaults = { ...this.globalDefaults, ...defaults };
  }

  // Build URL with query parameters
  buildUrl(url: string, params?: Record<string, string | number | boolean>): string {
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
    const { retries = 0, retryDelay = 0, timeout, params, onDownloadProgress, onUploadProgress, signal: externalSignal, ...fetchOptions } = await this.requestInterceptors.apply({ ...this.globalDefaults, ...options });

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

        if (fetchOptions.method === "HEAD") {
          return {
            data: null,
            status: response.status,
            statusText: response.statusText,
            headers: response.headers,
            config: options,
          };
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

          const interceptedResponse = await this.responseInterceptors.apply(newResponse);

          // Handle different response types
          const contentType = interceptedResponse.headers.get("content-type");
          let data;

          if (options.responseType) {
            // Use responseType if explicitly set
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
          const interceptedResponse = await this.responseInterceptors.apply(response);

          // Handle different response types
          const contentType = interceptedResponse.headers.get("content-type");
          let data;

          if (options.responseType) {
            // Use responseType if explicitly set
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

        if (attempt >= retries) {
          if (retries > 0) {
            console.error(`Fetch failed after ${retries} attempts`);
            throw new FetchError((error as Error).message || "Request failed");
          }
        }

        if (retryDelay > 0 && attempt < retries) {
          console.warn(`Retrying... (${attempt + 1}/${retries})`);
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
        }
      }
    }
  }
}
