import { git } from "./wrapper.mjs";

export const tryMerge = async (gitdir, ours, theirs) => {
  try {
    const mergeReport = await git.merge({
      ours,
      theirs,
      dryRun: true,
      gitdir,
      author: {
        name: 'gav',
        email: 'a@b.c',
      },
    });
    return {
      ...mergeReport,
      ok: true,
    };
  } catch (e) {
    console.log(e);
    return { ok: false, reason: e + "" };
  }
};
