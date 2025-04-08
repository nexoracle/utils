import http from "http";
import { Router } from "../router";

export function createServer(router: Router): http.Server {
  return http.createServer((req, res) => {
    router.handleRequest(req, res);
  });
}
