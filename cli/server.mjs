/* eslint-disable immutable/no-mutation */
import http from "http";
import { restHandlerBuilder } from "../rest/index.mjs";
import Koa from "koa";
import koaSend from "koa-send";
import cgi from "cgi";
import { projectRoot } from "../util/rootAddress.mjs";

const frontHandler = (new Koa()).use(async (ctx) => {
  if (ctx.path.substr(0, 6) === '/dist/') {
    await koaSend(ctx, 'front/dist/' + ctx.path.substr(6), { root: projectRoot });
  } else {
    await koaSend(ctx, 'front/index.html', { root: projectRoot });
  }
}).callback();

export const serverBuilder = (repoPath) => async () => {
  const restHandler = restHandlerBuilder('', repoPath);
  const gitSmartHttp = cgi('git', {
    args: ['http-backend'],
    env: {
      GIT_HTTP_EXPORT_ALL: true,
      GIT_PROJECT_ROOT: repoPath,
    },
  });
  const server = http.createServer((req, res) => {
    if (req.url.substring(0, 5) === '/rest') {
      restHandler(req, res);
    } else if (req.url.substring(0, 9) === '/alig.git') {
      const url = req.url.slice(9);
      console.log(req.url, req.headers);
      if (url === '/info/refs?service=git-receive-pack') {
        if (req.headers.authorization !== 'Basic aGFtaWQ6cmV6YQ==') {
          res.statusCode = 401;
          res.setHeader('WWW-Authenticate', 'Basic');
          res.end();
          return;
        }
      }
      gitSmartHttp(req, res);
    } else frontHandler(req, res);
  });
  server.listen(8080);
};
