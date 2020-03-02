
import { git } from "./wrapper.mjs";

export const addFileToTree = async ({
  gitdir, oid, path: pathString, data: dataBad,
}) => {
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

export const readObjectFromTree = async ({ gitdir, oid, path: pathString }) => {
  const path = pathString.split('/');
  let tree = (await git.readTree({ gitdir, oid }));
  for (let i = 0; i < path.length; i += 1) {
    const x = path[i];
    const o = tree.tree.find(a => a.path === x);
    if (o === undefined) throw new Error("path not exist");
    if (o.mode !== '040000') {
      if (i !== path.length - 1) throw new Error("path not exist");
      return git.readBlob({ gitdir, oid: o.oid });
    }
    // eslint-disable-next-line no-await-in-loop
    tree = (await git.readTree({ gitdir, oid: o.oid }));
  }
  return tree;
};

export const commitFile = async ({
  gitdir, branch, path, data, message, author,
}) => {
  const oid = await git.resolveRef({
    gitdir,
    ref: branch,
  });
  const oldTree = (await git.readCommit({ gitdir, oid })).commit.tree;
  const newTree = await addFileToTree({
    gitdir, oid: oldTree, path, data,
  });
  return git.commit({
    message,
    gitdir,
    author,
    ref: 'refs/heads/' + branch,
    tree: newTree,
  });
};
