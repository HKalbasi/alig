/* eslint-disable immutable/no-mutation */
import Koa from "koa";
import KoaRestRouter from "koa-rest-router";
import { readObject } from "../gitEngine/wrapper.mjs";
import { getTreeOfBranch } from "../gitEngine/shortcut.mjs";
import { tryMerge } from "../gitEngine/merge.mjs";
import { jwtBuilder } from "../config/jwt.mjs";

export const restHandlerBuilder = async (prefixWithoutRest, gitDir) => {
  const prefix = `${prefixWithoutRest}/rest`;
  const app = new Koa();
  const router = KoaRestRouter({ prefix });
  const { verify } = await jwtBuilder(gitDir);

  router.resource('object', {
    /* index: async (ctx) => {
      ctx.body = await objectList(gitDir);
    }, */
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
    try {
      const token = ctx.request.header.authorization.slice(7);
      ctx.state.user = verify(token);
      console.log(token, ctx.state.user);
    } catch (e) {
      // There is no user
    }
    await next();
  });
  app.use(async (ctx, next) => {
    if (ctx.url.substr(prefix.length, 7) === '/byPath') {
      const pth = ctx.url.slice(prefix.length + 8).split('/');
      let obj = await getTreeOfBranch(gitDir, pth[0]);
      const list = pth.slice(1).filter(x => x !== '');
      for (let i = 0; i < list.length; i += 1) {
        console.log(obj, list[i]);
        if (obj.type !== 'tree') throw new Error("not found");
        const entry = obj.data.find(y => y.name === list[i]);
        if (entry === undefined) throw new Error("not found");
        // eslint-disable-next-line no-await-in-loop
        obj = await readObject(gitDir, entry.ref);
      }
      ctx.body = obj;
    } else if (ctx.url.substr(prefix.length, 9) === '/tryMerge') {
      const param = (new URL(ctx.url, 'http://x.y')).searchParams;
      if (!param.has('ours') || !param.has('theirs')) {
        ctx.status = 404;
        ctx.body = 404;
        return;
      }
      const ours = param.get('ours');
      const theirs = param.get('theirs');
      ctx.body = await tryMerge(gitDir, ours, theirs);
    } else {
      await next();
    }
  });
  app.use(router.middleware());
  return app.callback();
};
