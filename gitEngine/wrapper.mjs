import git from "isomorphic-git";

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
}