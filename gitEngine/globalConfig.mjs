import fs from "fs";
import { promisify } from "util";
import { homedir } from "os";

const readFile = promisify(fs.readFile);

/**
 * 
 * @param {string} config text of config
 * @param {string} path 
 */
const getFromConfigString = (config, path) => {
  const [a, b] = path.split('.');
  let l = false;
  const ts = config.split('\n')
  for (let i = 0; i < ts.length; i++){
    const e = ts[i];
    if (e.charAt(0) === '[') {
      l = (e.slice(1,-1) === a);
      continue;
    }
    if (!l) continue;
    const [key, value] = e.split(' = ');
    if (key.replace(/\s/g,'') === b) {
      return value;
    }
  }
};

export const readConfig = async (x, gitpath) => {
  const config = (await readFile(`${homedir()}/.gitconfig`)).toString();
  return getFromConfigString(config, x);
};