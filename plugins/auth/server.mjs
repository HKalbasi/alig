/* eslint-disable immutable/no-mutation */
import Koa from "koa";
import bodyParser from "koa-bodyparser";
import { jwtBuilder } from "../../config/jwt.mjs";

const app = (new Koa()).use(bodyParser());

const renderEmail = (name, token) => `
hello ${name}.
this is your token: ${token}
keep it in a secret place.
`;

export const handlerBuilder = async ({ gitDir }) => {
  const { sign } = await jwtBuilder(gitDir);
  return app.use(ctx => {
    const { email, name } = ctx.request.body;
    const token = sign({ email, name });
    console.log(renderEmail(name, token));
  }).callback();
};
