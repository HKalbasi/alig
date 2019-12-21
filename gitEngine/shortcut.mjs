import { readObject, branchToCommit } from "./git.mjs";

export const getTreeOfBranch = async (adr, branch) => {
  const commitHash = await branchToCommit(adr, branch);
  const commit = await readObject(adr, commitHash);
  return readObject(adr, commit.tree);
};