import YAML from "yaml";
import fs from "fs";
import { promisify } from "util";
import { git } from "../../gitEngine/wrapper.mjs";
import { aligGitAccount } from "../../constants/aligGitAccount.mjs";
import { dateToId } from "../../util/dateToId.mjs";

// eslint-disable-next-line toplevel/no-toplevel-side-effect
process.on('unhandledRejection', up => { throw up; });

const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);
const makedir = promisify(fs.mkdir);

const writeAndCommitIssue = async (json, dir, id, message, author) => {
  const yaml = YAML.stringify(json);
  await writeFile(`.issues/${id}`, yaml);
  await git.add({ dir, filepath: `.issues/${id}` });
  await git.commit({
    dir, message, author, committer: aligGitAccount,
  });
};

export const createIssue = async (title, author) => {
  await makedir('.issues', { recursive: true });
  const k = new Date();
  const id = dateToId(k);
  const json = {
    head: {
      title,
      time: k.toJSON(),
      author,
      status: 'open',
    },
    body: [],
  };
  await writeAndCommitIssue(
    json,
    ".",
    id,
    `alig: create issue #${id}`,
    author,
  );
  return id;
};

export const readIssue = async (id) => {
  const address = `.issues/${id}`;
  const yaml = (await readFile(address)).toString();
  return YAML.parse(yaml);
};

export const addComment = async ({ id, text, author }) => {
  const json = await readIssue(id);
  json.body.push({
    type: 'comment',
    time: (new Date()).toJSON(),
    author,
    text,
  });
  await writeAndCommitIssue(
    json,
    ".",
    id,
    `alig: add comment ${json.body.length} to #${id}`,
    author,
  );
};
