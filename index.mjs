import http from "http";
import { restHandlerBuilder } from "./rest/index.mjs";
import koa from "koa";
import koaSend from "koa-send";

const restHandler = restHandlerBuilder('', '.');

const frontHandler = (new koa()).use(async (ctx) => {
  if (ctx.path == '/dist/main.js') {
    await koaSend(ctx, 'front/dist/main.js');
  }
  else {
    await koaSend(ctx, 'front/index.html');
  }
}).callback();

const main = async () => {
  const server = http.createServer((req, res) => {
    if (req.url.substring(0,5) == '/rest'){
      restHandler(req, res);
    }
    else frontHandler(req,res);
  });
  server.listen(8080);
};

main();