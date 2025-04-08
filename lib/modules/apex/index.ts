import { bodyParser } from "./middlewares/bodyParser";
import { cors } from "./middlewares/cors";
import { createServer } from "./middlewares/createServer";
import { favicon } from "./middlewares/favicon";
import { rateLimit } from "./middlewares/rateLimit";
import { serveStatic } from "./middlewares/static";
import { useFlash } from "./middlewares/useFlush";
import { Router } from "./router";

const apex = {
  Router,
  createServer,
  bodyParser,
  useFlash,
  cors,
  static: serveStatic,
  favicon,
  rateLimit,
};

export { apex };
