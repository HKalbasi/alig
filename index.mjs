import http from "http";
import { restHandlerBuilder } from "./rest/index.mjs";
import koa from "koa";
import koaSend from "koa-send";
import cgi from "cgi";
import path from "path";
import git from "isomorphic-git";
import fs from "fs";

git.plugins.set('fs', fs);

const repoPath = path.resolve(process.argv[2]);
const restHandler = restHandlerBuilder('', repoPath);

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
    GIT_PROJECT_ROOT: repoPath,
  },
});

const main = async () => {
  const server = http.createServer((req, res) => {
    if (req.url.substring(0,5) == '/rest'){
      restHandler(req, res);
    }
    else if (req.url.substring(0,9) === '/alig.git') {
      req.url = req.url.slice(9);
      console.log(req.url, req.headers);
      if (req.url === '/info/refs?service=git-receive-pack') {
        if (req.headers['authorization'] !== 'Basic aGFtaWQ6cmV6YQ==') {
          res.statusCode = 401;
          res.setHeader('WWW-Authenticate', 'Basic');
          res.end();
          return;  
        }
      }
      gitSmartHttp(req,res);
    }
    else frontHandler(req,res);
  });
  server.listen(8080);
};

main();