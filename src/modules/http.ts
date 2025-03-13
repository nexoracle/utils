import http from 'http';
import url from 'url';
import fs from 'fs';
import path from 'path';

// send plain text response
export function sendText(res: http.ServerResponse, statusCode: number, message: string): void {
    res.writeHead(statusCode, { 'Content-Type': 'text/plain' });
    res.end(message);
}

// send JSON response
export function sendJson(res: http.ServerResponse, statusCode: number, data: object): void {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
}

// send a buffer (e.g., for files or binary data)
export function sendBuffer(res: http.ServerResponse, statusCode: number, buffer: Buffer, contentType: string = 'application/octet-stream'): void {
    res.writeHead(statusCode, { 'Content-Type': contentType });
    res.end(buffer);
}

// parse the URL and query parameters
export function parseUrl(req: http.IncomingMessage): { pathname: string; query: { [key: string]: string | string[] } } {
    const parsedUrl = url.parse(req.url || '', true);
    const query: { [key: string]: string | string[] } = {};

    // Convert query parameters to ensure no undefined values
    for (const key in parsedUrl.query) {
        const value = parsedUrl.query[key];
        if (value !== undefined) {
            query[key] = Array.isArray(value) ? value : value.toString();
        }
    }

    return {
        pathname: parsedUrl.pathname || '',
        query,
    };
}

// get the HTTP method (e.g., GET, POST)
export function getMethod(req: http.IncomingMessage): string {
    return req.method?.toUpperCase() || 'GET';
}

// read the request body (for POST/PUT requests)
export function getRequestBody(req: http.IncomingMessage, options: { timeout?: number; maxSize?: number } = {}): Promise<string> {
    const { timeout = 10000, maxSize = 1024 * 1024 } = options; // Default: 10s timeout, 1MB max size

    return new Promise((resolve, reject) => {
        let body = '';
        let size = 0;

        const timeoutId = setTimeout(() => {
            req.destroy();
            reject(new Error('Request timeout'));
        }, timeout);

        req.on('data', (chunk) => {
            size += chunk.length;
            if (size > maxSize) {
                req.destroy();
                clearTimeout(timeoutId);
                reject(new Error('Request body too large'));
            }
            body += chunk.toString();
        });

        req.on('end', () => {
            clearTimeout(timeoutId);
            resolve(body);
        });

        req.on('error', (err) => {
            clearTimeout(timeoutId);
            reject(err);
        });
    });
}

// serve static files (e.g., HTML, CSS, JS)
export function serveStatic(res: http.ServerResponse, baseDir: string, requestedPath: string): void {
    // Resolve the requested path relative to the base directory
    const filePath = path.resolve(path.join(baseDir, requestedPath));

    // Ensure the resolved path is within the base directory
    if (!filePath.startsWith(path.resolve(baseDir))) {
        sendText(res, 403, 'Forbidden: Access denied');
        console.error('Error: Attempted to access restricted path:', filePath);
        return;
    }

    // Check if the filePath exists and is accessible
    fs.stat(filePath, (err, stats) => {
        if (err) {
            // File or directory not found
            sendText(res, 404, 'File Not Found');
            console.error('Error:', err);
            return;
        }

        if (stats.isDirectory()) {
            // If it's a directory, serve the default file (e.g., index.html)
            const defaultFile = path.join(filePath, 'index.html');
            fs.readFile(defaultFile, (err, data) => {
                if (err) {
                    // Default file not found
                    sendText(res, 404, 'Directory index not found');
                    console.error('Error:', err);
                } else {
                    // Serve the default file
                    sendBuffer(res, 200, data, 'text/html');
                }
            });
        } else if (stats.isFile()) {
            // If it's a file, serve it
            const extname = path.extname(filePath).toLowerCase();
            const contentType = {
                '.html': 'text/html',
                '.css': 'text/css',
                '.js': 'application/javascript',
                '.json': 'application/json',
                '.png': 'image/png',
                '.jpg': 'image/jpeg',
                '.jpeg': 'image/jpeg',
                '.gif': 'image/gif',
                '.svg': 'image/svg+xml',
                '.ico': 'image/x-icon',
                '.txt': 'text/plain',
                '.pdf': 'application/pdf',
                '.zip': 'application/zip',
                '.mp4': 'video/mp4',
                '.mp3': 'audio/mpeg',
                '.wav': 'audio/wav',
                '.ogg': 'audio/ogg',
                '.webp': 'image/webp',
                '.avif': 'image/avif',
                '.flac': 'audio/flac',
                '.aac': 'audio/aac',
                '.woff': 'font/woff',
                '.woff2': 'font/woff2',
                '.ttf': 'font/ttf',
                '.eot': 'application/vnd.ms-fontobject',
                '.xml': 'application/xml',
                '.csv': 'text/csv'
            }[extname] || 'application/octet-stream';

            fs.readFile(filePath, (err, data) => {
                if (err) {
                    sendText(res, 404, 'File Not Found');
                    console.error('Error:', err);
                } else {
                    sendBuffer(res, 200, data, contentType);
                }
            });
        } else {
            // Handle other cases (e.g., symbolic links)
            sendText(res, 404, 'Not a file or directory');
        }
    });
}

// Router class to handle routes and methods
export class Router {
    private routes: { [path: string]: { [method: string]: (req: http.IncomingMessage, res: http.ServerResponse) => void } } = {};

    // Add a route with a handler for a specific HTTP method
    addRoute(path: string, method: string, handler: (req: http.IncomingMessage, res: http.ServerResponse) => void): void {
        if (!this.routes[path]) {
            this.routes[path] = {};
        }
        this.routes[path][method.toUpperCase()] = handler;
    }

    // Handle incoming requests
    handleRequest(req: http.IncomingMessage, res: http.ServerResponse): void {
        const { pathname } = parseUrl(req);
        const method = getMethod(req);
    
        // Check for exact match
        if (this.routes[pathname] && this.routes[pathname][method]) {
            return this.routes[pathname][method](req, res);
        }
    
        // Check for wildcard matches (e.g., "/static/*" should match "/static/style.css")
        for (const route in this.routes) {
            if (route.endsWith("/*") && pathname.startsWith(route.replace("/*", ""))) {
                if (this.routes[route][method]) {
                    return this.routes[route][method](req, res);
                }
            }
        }
    
        // If no match found, send 404
        this.notFoundHandler(req, res);
    }
    

    // Default 404 handler
    private notFoundHandler(req: http.IncomingMessage, res: http.ServerResponse): void {
        sendText(res, 404, 'Not Found');
    }
}

// Create an HTTP server with a router
export function createServer(router: Router): http.Server {
    return http.createServer((req, res) => {
        router.handleRequest(req, res);
    });
}