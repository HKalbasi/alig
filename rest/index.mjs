import Koa from "koa";
import KoaRestRouter from "koa-rest-router";
import { objectList, readObject } from "../gitEngine/git.mjs";

export const restHandlerBuilder = (prefixWithoutRest, gitDir) => {
  const prefix = `${prefixWithoutRest}/rest`;
  const app = new Koa();
  const router = KoaRestRouter({ prefix });
  
  router.resource('object', {
    index: async (ctx) => {
      ctx.body = await objectList(gitDir);
    },
    show: async (ctx) => {
      ctx.body = await readObject(gitDir, ctx.params.object);
    },
  });
  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      ctx.status = err.status || 500;
      ctx.body = err.message;
      ctx.app.emit('error', err, ctx);
    }
  });
  app.use(async (ctx, next) => {
    if (ctx.url.substr(prefix.length,7) === '/byPath') {
      ctx.body = 'bikhial :)';
    }
    else {
      await next();
    }
  });
  app.use(router.middleware());
  return app.callback();
};