import Koa from "koa";
import KoaRestRouter from "koa-rest-router";
import { objectList, readObject } from "../gitEngine/git.mjs";

export const restHandlerBuilder = (prefix, gitDir) => {
  const app = new Koa();
  const router = KoaRestRouter({ prefix: '/rest' });
  
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
  app.use(router.middleware());
    
  return app.callback();
};