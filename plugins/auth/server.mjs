/* eslint-disable immutable/no-mutation */
import Koa from "koa";
import bodyParser from "koa-bodyparser";

const app = (new Koa()).use(bodyParser());

export const handler = app.use(ctx => {
  ctx.body = ctx.request.body;
}).callback();
