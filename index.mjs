import http from "http";
import next from "next";
import { restHandlerBuilder } from "./rest/index.mjs";
import frontRoutes from "./front/routes.mjs";

const restHandler = restHandlerBuilder('/rest', '.');

const main = async () => {
  const app = next({ dev: true, dir: './front' });
  await app.prepare();
  const handle = frontRoutes.getRequestHandler(app);
  const server = http.createServer((req, res) => {
    if (req.url.substring(0,5) == '/rest'){
      restHandler(req, res);
    }
    else handle(req,res);
  });
  server.listen(8080);
};

main();