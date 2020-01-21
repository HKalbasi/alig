import YAML from "yaml";
import fs from "fs";
import { promisify } from "util";
import { git } from "../gitEngine/wrapper.mjs";
import { aligGitAccount } from "../constants/aligGitAccount.mjs";

process.on('unhandledRejection', up => { throw up; });

const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);

const writeAndCommitIssue = async (json, dir, filepath, message, author) => {
  const yaml = YAML.stringify(json);
  await writeFile(address, yaml);
  await git.add({dir, filepath});
  await git.commit({dir, message, author, committer: aligGitAccount});
};

export const readIssue = async(id) => {
  const address = `.issues/${id}`;
  const yaml = (await readFile(address)).toString();
  return YAML.parse(yaml);
};

export const addComment = async ({id, text, author}) => {
  const json = await readIssue(id);
  json.body.push({
    type: 'comment',
    time: (new Date).toJSON(),
    author,
    text,
  });
  await writeAndCommitIssue(
    json,
    ".",
    address,
    `alig: add comment ${json.body.length} to #${id}`,
    author,
  );
};
