declare const isEmail: (email: string) => boolean;
declare const isGmail: (email: string) => boolean;

interface FetchOptions extends RequestInit {
    retries?: number;
    retryDelay?: number;
    timeout?: number;
    params?: Record<string, string | number | boolean>;
    onDownloadProgress?: (progress: ProgressEvent) => void;
    onUploadProgress?: (progress: ProgressEvent) => void;
    signal?: AbortSignal;
    responseType?: "arraybuffer" | "blob" | "json" | "text";
}
type Interceptor<T> = (value: T) => T | Promise<T>;
declare class ProgressEvent {
    loaded: number;
    total: number;
    constructor(loaded: number, total: number);
    get percent(): number;
}

declare class RequestHandler {
    private globalDefaults;
    private requestInterceptors;
    private responseInterceptors;
    constructor(globalDefaults: FetchOptions);
    addRequestInterceptor(interceptor: Interceptor<FetchOptions>): void;
    addResponseInterceptor(interceptor: Interceptor<Response>): void;
    setGlobalDefaults(defaults: FetchOptions): void;
    buildUrl(url: string, params?: Record<string, string | number | boolean>): string;
    request(url: string, options?: FetchOptions): Promise<any>;
}

declare class Axium extends RequestHandler {
    constructor(defaults?: FetchOptions);
    get(url: string, options?: FetchOptions): Promise<any>;
    post(url: string, data: any, options?: FetchOptions): Promise<any>;
    put(url: string, data: any, options?: FetchOptions): Promise<any>;
    patch(url: string, data: any, options?: FetchOptions): Promise<any>;
    delete(url: string, options?: FetchOptions): Promise<any>;
    postFormData(url: string, data: FormData, options?: FetchOptions): Promise<any>;
    postUrlEncoded(url: string, data: Record<string, string>, options?: FetchOptions): Promise<any>;
    all(requests: Promise<any>[]): Promise<any[]>;
    getBuffer(url: string, options?: FetchOptions): Promise<any>;
    head(url: string, options?: FetchOptions): Promise<any>;
}
declare const axium: Axium;

export { axium, isEmail, isGmail };
