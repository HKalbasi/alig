import YAML from "yaml";
import fs from "fs";
import { promisify } from "util";
import { git } from "../gitEngine/wrapper.mjs";
import { aligGitAccount } from "../constants/aligGitAccount.mjs";

process.on('unhandledRejection', up => { throw up; });

const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);

const commitFile = async (dir, filepath, message, author) => {
  await git.add({dir, filepath});
  await git.commit({dir, message, author, committer: aligGitAccount});
};

export const addComment = async ({id, text, author}) => {
  const address = `.issues/${id}`;
  const yaml = (await readFile(address)).toString();
  const json = YAML.parse(yaml);
  json.body.push({
    type: 'comment',
    time: (new Date).toJSON(),
    author,
    text,
  });
  const result = YAML.stringify(json);
  await writeFile(address, result);
  await commitFile(
    ".",
    address,
    `alig: add comment ${json.body.length} to #${id}`,
    author,
  );
};
