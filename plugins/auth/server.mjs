/* eslint-disable immutable/no-mutation */
import Koa from "koa";
import bodyParser from "koa-bodyparser";
import { getConfig } from "../../config/config.mjs";
import { jwtBuilder } from "../../config/jwt.mjs";

const app = (new Koa()).use(bodyParser());

export const handlerBuilder = async ({ gitDir }) => {
  const config = await getConfig({ gitDir });
  const { sign } = await jwtBuilder(gitDir);
  console.log(config);
  return app.use(ctx => {
    if (!(config.users instanceof Array)) {
      ctx.body = {
        ok: false,
      };
      return;
    }
    const user = config.users.find(x => x.email === ctx.request.body.email);
    if (user === undefined) {
      ctx.body = {
        ok: false,
      };
      return;
    }
    ctx.body = {
      ok: true,
      jwt: sign({ email: user.email, username: user.username }),
    };
  }).callback();
};
