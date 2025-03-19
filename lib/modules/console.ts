export function log(...args: any[]): void {
    console.log(...args);
}

export function error(...args: any[]): void {
    console.error(...args);
}

export function warn(...args: any[]): void {
    console.warn(...args);
}

export function info(...args: any[]): void {
    console.info(...args);
}

export function debug(...args: any[]): void {
    console.debug(...args);
}

export function table(data: any, columns?: string[]): void {
    console.table(data, columns);
}

export function clear(): void {
    console.clear();
}