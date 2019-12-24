import Koa from "koa";
import KoaRestRouter from "koa-rest-router";
import { objectList, readObject } from "../gitEngine/git.mjs";
import { getTreeOfBranch } from "../gitEngine/shortcut.mjs";

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
      ctx.body = err.stack;
      ctx.app.emit('error', err, ctx);
    }
  });
  app.use(async (ctx, next) => {
    if (ctx.url.substr(prefix.length,7) === '/byPath') {
      const pth = ctx.url.slice(prefix.length + 8).split('/');
      let obj = await getTreeOfBranch(gitDir, pth[0]);
      const list = pth.slice(1);
      for (let i=0; i<list.length; i++) {
        if (list[i] === '') continue;
        console.log(obj, list[i]);
        if (obj.type !== 'tree') throw new Error("not found");
        const entry = obj.data.find(y => y.name === list[i]);
        if (entry == undefined) throw new Error("not found");
        obj = await readObject(gitDir, entry.ref);
      };
      ctx.body = obj;
    }
    else {
      await next();
    }
  });
  app.use(router.middleware());
  return app.callback();
};