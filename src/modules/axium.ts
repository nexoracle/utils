// Define FetchOptions interface
export interface FetchOptions extends RequestInit {
  retries?: number;
  retryDelay?: number;
  timeout?: number;
  params?: Record<string, string | number | boolean>; // Add params support
}

// Define Interceptor type
type Interceptor<T> = (value: T) => T | Promise<T>;

// Custom error class
class FetchError extends Error {
  constructor(
    public message: string,
    public status?: number,
    public response?: any
  ) {
    super(message);
    this.name = 'FetchError';
  }
}

// Axium class
class Axium {
  private requestInterceptors: Interceptor<FetchOptions>[] = [];
  private responseInterceptors: Interceptor<Response>[] = [];
  private globalDefaults: FetchOptions = {
    headers: {
      'Content-Type': 'application/json',
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
    const {
      retries = 3,
      retryDelay = 1000,
      timeout = 10000,
      params,
      ...fetchOptions
    } = await this.applyInterceptors(this.requestInterceptors, { ...this.globalDefaults, ...options });

    const finalUrl = this.buildUrl(url, params);

    for (let attempt = 0; attempt < retries; attempt++) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      try {
        const response = await fetch(finalUrl, {
          ...fetchOptions,
          signal: controller.signal,
          headers: {
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36',
            ...fetchOptions.headers,
          },
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new FetchError(`HTTP error! Status: ${response.status}`, response.status, response);
        }

        const interceptedResponse = await this.applyInterceptors(this.responseInterceptors, response);

        // Handle different response types
        const contentType = interceptedResponse.headers.get('content-type');
        let data;
        if (contentType?.includes('application/json')) {
          data = await interceptedResponse.json();
        } else if (contentType?.includes('text')) {
          data = await interceptedResponse.text();
        } else {
          data = await interceptedResponse.arrayBuffer(); // Binary data (for files, images, etc.)
        }

        // Return full Axios-like response
        return {
          data, // The response body
          status: interceptedResponse.status, // HTTP status code
          statusText: interceptedResponse.statusText, // HTTP status text
          headers: interceptedResponse.headers, // Response headers
          config: options, // Request configuration
        };
      } catch (error) {
        clearTimeout(timeoutId);

        if (attempt === retries - 1) {
          console.error(`Fetch failed after ${retries} attempts:`, (error as Error).message);
          throw new FetchError((error as Error).message || 'Request failed');
        }

        console.warn(`Retrying... (${attempt + 1}/${retries})`);
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
      }
    }
  }

  // Helper methods
  get(url: string, options: FetchOptions = {}) {
    return this.request(url, { ...options, method: 'GET' });
  }

  post(url: string, data: any, options: FetchOptions = {}) {
    return this.request(url, { ...options, method: 'POST', body: JSON.stringify(data) });
  }

  put(url: string, data: any, options: FetchOptions = {}) {
    return this.request(url, { ...options, method: 'PUT', body: JSON.stringify(data) });
  }

  patch(url: string, data: any, options: FetchOptions = {}) {
    return this.request(url, { ...options, method: 'PATCH', body: JSON.stringify(data) });
  }

  delete(url: string, options: FetchOptions = {}) {
    return this.request(url, { ...options, method: 'DELETE' });
  }

  // Multipart form data
  postFormData(url: string, data: FormData, options: FetchOptions = {}) {
    return this.request(url, {
      ...options,
      method: 'POST',
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
      method: 'POST',
      body: encodedData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
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
    return this.request(url, { ...options, method: 'GET' });
  }

  // Head request
  head(url: string, options: FetchOptions = {}) {
    return this.request(url, { ...options, method: 'HEAD' });
  }
}

// Export Axium instance
export const axium = new Axium();