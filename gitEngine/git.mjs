import { promisify } from "util";
import fs from "fs";
const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const makeDir = promisify(fs.mkdir);
import path from "path";
import zlib from "zlib";
import { githash } from "../util/hash.mjs";

const unzip = promisify(zlib.unzip);
const zip = promisify(zlib.deflate);

const writeRecursive = async (adr, data) => {
  await makeDir(path.dirname(adr), { recursive: true });
  await writeFile(adr, data);
};

export const objectList = async (adr) => {
  const objAdr = path.join(adr, '.git/objects');
  const result = await Promise.all((await readdir(objAdr)).map(
    async (x)=>(await readdir(path.join(objAdr, x))).map(y=>x + y),
  ));
  return result.flat();
};

export const addressOfObject = (adr, objHash) => {
  return path.join(adr, '.git/objects', objHash.slice(0, 2), objHash.slice(2));
};

export const addressOfBranch = (adr, branch) => {
  return path.join(adr, '.git/refs/heads', branch);
};

export const readObject = async (adr, objHash) => {
  const objAdr = addressOfObject(adr, objHash);
  const buf = await unzip(await readFile(objAdr));
  const type = buf.slice(0, 4).toString();
  switch (type) {
    case "blob": {
      let i = 5;
      while (buf[i] !== 0) i++;
      return {
        type: "blob",
        data: buf.slice(i + 1).toString('base64'),
      };
    }
    case "comm": {
      let i = 7;
      while (buf[i] !== 0) i++;
      i += 6;
      const tree = buf.slice(i, i + 40).toString();
      i += 41;
      const parents = [];
      while (buf[i] === 112) {
        i += 7;
        parents.push(buf.slice(i, i + 40).toString());
        i += 41;
      }
      while (buf[i] !== 10) i++;
      i += 11;
      const committerHead = i;
      while (buf[i] !== 10) i++;
      const str = buf.slice(committerHead, i).toString().split('<');
      const str1 = str[1].split('>');
      i += 1;
      return {
        type: "commit",
        tree,
        parents,
        committer: {
          name: str[0].slice(0, -1),
          email: str1[0],
        },
        time: str1[1].slice(1),
        message: buf.slice(i).toString(),
      };
    }
    case "tree": {
      let i = 4;
      while (buf[i] !== 0) i++;
      i++;
      const data = [];
      while (i < buf.length) {
        const modeHead = i;
        while (buf[i] !== 32) i++;
        const mode = buf.slice(modeHead, i).toString();
        i++;
        const nameHead = i;
        while (buf[i] !== 0) i++;
        const name = buf.slice(nameHead, i).toString();
        i++;
        const ref = buf.slice(i, i + 20).toString('hex');
        i += 20;
        data.push({
          mode, ref, name,
        });
      }
      return {
        type: "tree",
        data,
      };
    }
  }
};

export const objectToBuffer = (obj) => {
  const bodyBuf = ((obj) => {
    switch (obj.type) {
      case "blob": {
        return obj.data;
      }
      case "commit": {
        const str = `${obj.committer.name} <${obj.committer.email}> ${obj.time}\n`;
        return Buffer.from(
          `tree ${obj.tree}\n`
          + obj.parents.map(x => `parent ${x}\n`).join()
          + `author ${str}`
          + `committer ${str}`
          + obj.message,
        );
      }
      case "tree": {
        return Buffer.concat(obj.data.map(x=>Buffer.concat([
          Buffer.from(`${x.mode} ${x.name}\0`),
          Buffer.from(x.ref, 'hex'),
        ])));
      }
    }
  })(obj);
  const headBuf = Buffer.from(`${obj.type} ${bodyBuf.length}\0`);
  return Buffer.concat([headBuf, bodyBuf]);
};

export const githashOfObject = (x) => githash(objectToBuffer(x));

export const writeObject = async (adr, obj) => {
  const buf = objectToBuffer(obj);
  const sha = githash(buf);
  const zipped = await zip(buf);
  await writeRecursive(addressOfObject(adr, sha), zipped);
  return sha;
};

export const branchToCommit = async (adr, branch) => {
  const badr = addressOfBranch(adr, branch);
  return (await readFile(badr)).slice(0, 40).toString();
};