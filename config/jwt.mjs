import jwt from "jsonwebtoken";
import { getConfig } from "./config.mjs";

export const jwtBuilder = async (gitDir) => {
  const secret = await (async () => {
    const config = await getConfig({ gitDir });
    if (config.jwt === undefined || config.jwt.secret === undefined) {
      console.warn('Warning: jwt passphrase is not provided. anyone can sign json web tokens');
      return 'test propose only';
    }
    return config.jwt.secret;
  })();
  return {
    sign: (value) => jwt.sign(value, secret),
    verify: (token) => jwt.verify(token, secret),
  };
};
