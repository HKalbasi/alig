/* eslint-disable immutable/no-mutation */

export const IssueHandler = async (ctx) => {
  if (ctx.url.substr(0, 8) === 'add-item') {
    if (!ctx.state.user.auth) {
      ctx.status = 401;
      ctx.body = { ok: false };
      return;
    }
    ctx.body = { ok: true };
  }
};
