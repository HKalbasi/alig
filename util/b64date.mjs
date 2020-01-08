export const dateToBase64 = (d) => {
  let x = d.valueOf();
  const data = new Uint8Array(6);
  for (let i = 5; i >= 0; i--) {
    data[i] = x % 256;
    x /= 256;
  }
  return Buffer.from(data).toString('base64').replace('+','-').replace('/','_');
};

export const base64ToDate = (d) => {
  const x = Buffer.from(d.replace('-','+').replace('_','/'), 'base64');
  let data = 0;
  let z = 1;
  for (let i = 5; i >= 0; i--) {
    const k = x.readUInt8(i);
    data += z * k;
    z *= 256;
  }
  return new Date(data);
};
const y = new Date();
console.log(y);
const x = dateToBase64(y);
console.log(x);
console.log(base64ToDate(x));