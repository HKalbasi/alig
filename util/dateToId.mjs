import base58 from "base58";

export const dateToId = (d) => {
  return base58.int_to_base58(d.valueOf());
};

export const idToDate = (d) => {
  return new Date(base58.base58_to_int(d));
};
