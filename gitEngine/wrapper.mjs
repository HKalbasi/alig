import git from "isomorphic-git";
import fs from "fs";

git.plugins.set('fs', fs);

export const readObject = async (adr, oid) => {
  const { object, type } = await git.readObject({
    gitdir: adr,
    oid,
  });
  if (type === 'tree') {
    return {
      type: 'tree',
      data: object.entries.map(({mode, oid, path}) => ({mode, ref: oid, name: path})),
    };
  }
  if (type === 'blob') {
    return {
      type: 'blob',
      data: object.toString('base64'),
    };
  }
  return object;
};

export const branchToCommit = async (adr, ref) => {
  return git.resolveRef({
    gitdir: adr,
    ref,
  });
};

export const commitFile = async (dir, filepath, message) => {
  await git.add({dir, filepath});
};