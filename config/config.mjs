import fs from "fs";
import { promisify } from "util";
import path from "path";
import YAML from "yaml";

const readFile = promisify(fs.readFile);

export const getConfig = (() => {
  let config;
  return async ({ gitDir }) => {
    if (config !== undefined) return config;
    try {
      const buf = await readFile(path.join(gitDir, 'alig-config.yaml'));
      config = YAML.parse(buf.toString());
    } catch (e) {
      config = {};
    }
    return config;
  };
})();
