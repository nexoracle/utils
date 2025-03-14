import http from 'http';
import url from 'url';
import fs from 'fs';
import path from 'path';
import { IncomingMessage, ServerResponse } from 'http';

// Middleware type
type Middleware = (req: IncomingMessage, res: ServerResponse, next: () => void) => void;

// Router class to handle routes and methods
class Router {
    private routes: { [path: string]: { [method: string]: (req: IncomingMessage, res: ServerResponse) => void } } = {};
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
    get(path: string, handler: (req: IncomingMessage, res: ServerResponse) => void): void {
        this.addRoute(path, 'GET', handler);
    }

    // Add POST route
    post(path: string, handler: (req: IncomingMessage, res: ServerResponse) => void): void {
        this.addRoute(path, 'POST', handler);
    }

    // Add PUT route
    put(path: string, handler: (req: IncomingMessage, res: ServerResponse) => void): void {
        this.addRoute(path, 'PUT', handler);
    }

    // Add DELETE route
    delete(path: string, handler: (req: IncomingMessage, res: ServerResponse) => void): void {
        this.addRoute(path, 'DELETE', handler);
    }

    // Add a route with a handler for a specific HTTP method
    private addRoute(path: string, method: string, handler: (req: IncomingMessage, res: ServerResponse) => void): void {
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
        } else {
            this.settings[key] = value;
        }
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
                apex.text(res, 500, `Error rendering view: ${err.message}`);
            } else {
                apex.html(res, 200, html || '');
            }
        });
    }

    // Handle incoming requests
    handleRequest(req: IncomingMessage, res: ServerResponse): void {
        const { pathname } = parseUrl(req);
        const method = getMethod(req);

        // Execute middlewares
        const executeMiddlewares = (index: number) => {
            if (index < this.middlewares.length) {
                this.middlewares[index](req, res, () => executeMiddlewares(index + 1));
            } else {
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
        };

        executeMiddlewares(0);
    }

    // Default 404 handler
    private notFoundHandler(req: IncomingMessage, res: ServerResponse): void {
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

function getMethod(req: IncomingMessage): string {
    return req.method?.toUpperCase() || 'GET';
}

export { apex };