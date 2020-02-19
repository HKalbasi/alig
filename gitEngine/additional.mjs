
import { git } from "./wrapper.mjs";

/**
 * @param {String} gitdir
 * @param {String} oid
 * @param {String} pathString
 * @param {String|Buffer} dataBad
 */
export const addFileToTree = async (gitdir, oid, pathString, dataBad) => {
  const data = dataBad instanceof Buffer ? dataBad : Buffer.from(dataBad);
  const path = pathString.split('/');
  const rec = async (tree, i) => {
    if (i === path.length) {
      return git.writeBlob({
        gitdir,
        blob: data,
      });
    }
    if (tree === undefined) {
      return git.writeTree({
        tree: [{
          oid: await rec(undefined, i + 1),
          path: path[i],
          mode: i === path.length - 1 ? '100644' : '040000',
          type: i === path.length - 1 ? 'blob' : 'tree',
        }],
        gitdir,
      });
    }
    const item = tree.find(x => x.path === path[i]);
    if (item === undefined) {
      return git.writeTree({
        gitdir,
        tree: [...tree, {
          oid: await rec(undefined, i + 1),
          path: path[i],
          mode: i === path.length - 1 ? '100644' : '040000',
          type: i === path.length - 1 ? 'blob' : 'tree',
        }],
      });
    }
    const itemUnfold = await git.readTree({
      gitdir,
      oid: item.oid,
    }).tree;
    const newTree = tree.map(x => {
      if (x.path !== path[i]) return x;
      return {
        oid: rec(itemUnfold, i + 1),
        path: path[i],
        mode: i === path.length - 1 ? '100644' : '040000',
        type: i === path.length - 1 ? 'blob' : 'tree',
      };
    });
    return git.writeTree({ tree: newTree, gitdir });
  };
  const theTree = await git.readTree({
    gitdir,
    oid,
  });
  return rec(theTree.tree, 0);
};

export const commitFile = async ({
  gitdir, branch, path, data, message, author,
}) => {
  const oid = await git.resolveRef({
    gitdir,
    ref: branch,
  });
  const oldTree = (await git.readCommit({ gitdir, oid })).commit.tree;
  const newTree = await addFileToTree(gitdir, oldTree, path, data);
  return git.commit({
    message,
    gitdir,
    author,
    ref: branch,
    tree: newTree,
  });
};

// eslint-disable-next-line toplevel/no-toplevel-side-effect
commitFile({
  gitdir: '.git',
  branch: 'master',
  path: 'salam.txt',
  data: 'salam',
  message: 'add salam file',
  author: {
    name: 'hamid',
    email: 'a@b.c',
  },
});