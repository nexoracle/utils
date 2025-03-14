import http from 'http';
import url from 'url';
import fs from 'fs';
import path from 'path';
import { IncomingMessage, ServerResponse } from 'http';

// Enhanced Request type
interface Request extends IncomingMessage {
    body?: any;
    cookies?: { [key: string]: string };
    session?: any;
    query?: { [key: string]: string | string[] };
    params?: { [key: string]: string };
    ip?: string;
}

// Enhanced Response type
interface Response extends ServerResponse {
    status: (code: number) => Response;
    json: (data: any) => void;
    send: (data: any) => void;
    cookie: (name: string, value: string, options?: any) => void;
    clearCookie: (name: string, options?: any) => void;
    redirect: (url: string) => void;
}

// Middleware type
type Middleware = (req: Request, res: Response, next: () => void) => void;

class Router {
    private routes: { [path: string]: { [method: string]: (req: Request, res: Response) => void } } = {};
    private middlewares: Middleware[] = [];
    private settings: { [key: string]: any } = {};
    private viewsDir: string = '';
    private viewEngine: ((filePath: string, data: { [key: string]: any }, callback: (err: Error | null, html?: string) => void) => void) | null = null;

    // Add middleware
    use(path: string | Middleware, middleware?: Middleware): void {
        if (typeof path === 'string' && middleware) {
            this.middlewares.push((req, res, next) => {
                if (req.url?.startsWith(path)) {
                    middleware(req, res, next);
                } else {
                    next();
                }
            });
        } else if (typeof path === 'function') {
            this.middlewares.push(path);
        }
    }

    // Add GET route
    get(path: string, handler: (req: Request, res: Response) => void): void {
        this.addRoute(path, 'GET', handler);
    }

    // Add POST route
    post(path: string, handler: (req: Request, res: Response) => void): void {
        this.addRoute(path, 'POST', handler);
    }

    // Add PUT route
    put(path: string, handler: (req: Request, res: Response) => void): void {
        this.addRoute(path, 'PUT', handler);
    }

    // Add DELETE route
    delete(path: string, handler: (req: Request, res: Response) => void): void {
        this.addRoute(path, 'DELETE', handler);
    }

    // Add a route with a handler for a specific HTTP method
    private addRoute(path: string, method: string, handler: (req: Request, res: Response) => void): void {
        if (!this.routes[path]) {
            this.routes[path] = {};
        }
        this.routes[path][method.toUpperCase()] = handler;
    }

    // Set configuration
    set(key: string, value: any): void {
        if (key === 'view engine') {
            if (value === 'ejs') {
                this.viewEngine = (filePath: string, data: { [key: string]: any }, callback: (err: Error | null, html?: string) => void) => {
                    fs.readFile(filePath, 'utf8', (err, template) => {
                        if (err) return callback(err);
                        const rendered = template.replace(/<%=\s*(.*?)\s*%>/g, (_, key) => data[key] || '');
                        callback(null, rendered);
                    });
                };
            } else {
                throw new Error(`Unsupported view engine: ${value}`);
            }
        } else if (key === 'views') {
            this.viewsDir = value;
        }
        this.settings[key] = value;
    }

    // Get configuration
    getSetting(key: string): any {
        return this.settings[key];
    }

    // Render a view
    render(res: ServerResponse, viewName: string, data: { [key: string]: any } = {}): void {
        if (!this.viewEngine) {
            throw new Error('View engine not set. Use set("view engine", "ejs") to configure a view engine.');
        }

        const viewExtension = this.getSetting('view engine'); // Get the view engine extension
        if (!viewExtension) {
            throw new Error('View engine not set. Use set("view engine", "ejs") to configure a view engine.');
        }

        const viewPath = path.join(this.viewsDir, `${viewName}.${viewExtension}`);

        this.viewEngine(viewPath, data, (err, html) => {
            if (err) {
                console.error(`Error rendering view: ${err.message}`); // Debugging
                apex.text(res, 500, `Error rendering view: ${err.message}`);
            } else {
                apex.html(res, 200, html || '');
            }
        });
    }

    // Handle incoming requests
    handleRequest(req: IncomingMessage, res: ServerResponse): void {
        const enhancedReq = req as Request;
        const enhancedRes = res as Response;

        // Enhance req object
        enhancedReq.ip = req.socket.remoteAddress;
        enhancedReq.query = parseUrl(req).query;

        // Enhance res object
        enhancedRes.status = function (code: number) {
            this.statusCode = code;
            return this;
        };
        enhancedRes.json = function (data: any) {
            this.setHeader('Content-Type', 'application/json');
            this.end(JSON.stringify(data));
        };
        enhancedRes.send = function (data: any) {
            if (typeof data === 'object') {
                this.json(data);
            } else {
                this.setHeader('Content-Type', 'text/plain');
                this.end(data);
            }
        };
        enhancedRes.cookie = function (name: string, value: string, options?: any) {
            const cookie = `${name}=${value}; ${Object.entries(options || {}).map(([k, v]) => `${k}=${v}`).join('; ')}`;
            this.setHeader('Set-Cookie', cookie);
        };
        enhancedRes.clearCookie = function (name: string, options?: any) {
            this.setHeader('Set-Cookie', `${name}=; Expires=Thu, 01 Jan 1970 00:00:00 GMT`);
        };
        enhancedRes.redirect = function (url: string) {
            this.writeHead(302, { Location: url });
            this.end();
        };

        // Execute middlewares
        const executeMiddlewares = (index: number) => {
            if (index < this.middlewares.length) {
                this.middlewares[index](enhancedReq, enhancedRes, () => executeMiddlewares(index + 1));
            } else {
                // Check for exact match
                if (this.routes[enhancedReq.url!] && this.routes[enhancedReq.url!][enhancedReq.method!]) {
                    return this.routes[enhancedReq.url!][enhancedReq.method!](enhancedReq, enhancedRes);
                }

                // Check for wildcard matches (e.g., "/static/*" should match "/static/style.css")
                for (const route in this.routes) {
                    if (route.endsWith("/*") && enhancedReq.url!.startsWith(route.replace("/*", ""))) {
                        if (this.routes[route][enhancedReq.method!]) {
                            return this.routes[route][enhancedReq.method!](enhancedReq, enhancedRes);
                        }
                    }
                }

                // If no match found, send 404
                this.notFoundHandler(enhancedReq, enhancedRes);
            }
        };

        executeMiddlewares(0);
    }

    // Default 404 handler
    private notFoundHandler(req: Request, res: Response): void {
        apex.text(res, 404, 'Not Found');
    }
}

// Create an HTTP server with a router
function createServer(router: Router): http.Server {
    return http.createServer((req, res) => {
        router.handleRequest(req, res);
    });
}

// Utility functions
const apex = {
    Router,
    createServer,
    text(res: ServerResponse, statusCode: number, message: string): void {
        res.writeHead(statusCode, { 'Content-Type': 'text/plain' });
        res.end(message);
    },
    json(res: ServerResponse, statusCode: number, data: object): void {
        res.writeHead(statusCode, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(data));
    },
    html(res: ServerResponse, statusCode: number, html: string): void {
        res.writeHead(statusCode, { 'Content-Type': 'text/html' });
        res.end(html);
    },
    sendFile(res: ServerResponse, filePath: string): void {
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
                apex.text(res, 404, 'File Not Found');
            } else {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(data);
            }
        });
    },
    static(staticPath: string): Middleware {
        return (req, res, next) => {
            const { pathname } = parseUrl(req);
            const filePath = path.join(staticPath, pathname);

            fs.stat(filePath, (err, stats) => {
                if (err || !stats.isFile()) {
                    next();
                } else {
                    apex.sendFile(res, filePath);
                }
            });
        };
    },
    favicon(iconPath: string): Middleware {
        return (req, res, next) => {
            if (req.url === '/favicon.ico') {
                apex.sendFile(res, iconPath);
            } else {
                next();
            }
        };
    }
};

function parseUrl(req: IncomingMessage): { pathname: string; query: { [key: string]: string | string[] } } {
    const parsedUrl = url.parse(req.url || '', true);
    const query: { [key: string]: string | string[] } = {};

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


export { apex };