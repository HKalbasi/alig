import crypto from "crypto-js";
const gitsha = crypto.SHA1;

export const githash = (buf) => gitsha(crypto.lib.WordArray.create(buf))
  .toString(crypto.enc.Hex);
