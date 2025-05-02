export interface FetchOptions extends RequestInit {
  retries?: number;
  retryDelay?: number;
  timeout?: number;
  params?: Record<string, string | number | boolean>;
  onDownloadProgress?: (progress: ProgressEvent) => void;
  onUploadProgress?: (progress: ProgressEvent) => void;
  signal?: AbortSignal;
  responseType?: "arraybuffer" | "blob" | "json" | "text" | "buffer" | "stream";
}

// Define Interceptor type
export type Interceptor<T> = (value: T) => T | Promise<T>;

// Custom error class
export class FetchError extends Error {
  constructor(public message: string, public status?: number, public response?: any) {
    super(message);
    this.name = "FetchError";
  }
}

// ProgressEvent class for tracking progress
export class ProgressEvent {
  constructor(public loaded: number, public total: number) {}

  get percent(): number {
    return this.total > 0 ? (this.loaded / this.total) * 100 : 0;
  }
}
