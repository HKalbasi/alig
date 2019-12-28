import http from "http";
import { restHandlerBuilder } from "./rest/index.mjs";
import koa from "koa";
import koaSend from "koa-send";
import cgi from "cgi";
import path from "path";

const restHandler = restHandlerBuilder('', '.');

const frontHandler = (new koa()).use(async (ctx) => {
  if (ctx.path == '/dist/main.js') {
    await koaSend(ctx, 'front/dist/main.js');
  }
  else {
    await koaSend(ctx, 'front/index.html');
  }
}).callback();

const gitSmartHttp = cgi('git', {
  args: ['http-backend'],
  env: {
    GIT_HTTP_EXPORT_ALL: true,
    GIT_PROJECT_ROOT: path.resolve('.'),
  },
});

const main = async () => {
  const server = http.createServer((req, res) => {
    if (req.url.substring(0,5) == '/rest'){
      restHandler(req, res);
    }
    else if (req.url.substring(0,9) === '/alig.git') {
      req.url = req.url.slice(9);
      gitSmartHttp(req,res);
    }
    else frontHandler(req,res);
  });
  server.listen(8080);
};

main();