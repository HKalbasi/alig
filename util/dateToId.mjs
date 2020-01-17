import base58 from "base58";

export const dateToId = (d) => {
  return base58.int_to_base58(d.valueOf());
};

export const idToDate = (d) => {
  return new Date(base58.base58_to_int(d));
};
const y = new Date('2040');
console.log(y);
const x = dateToId(y);
console.log(x);
console.log(idToDate(x));