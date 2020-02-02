#!/usr/bin/env node

import commander from "commander";
import readLine from "readline";
import { issueCliBuilder } from "../alig/issue/cli.mjs";
import path from "path";
import { serverBuilder } from "./server.mjs";

const main = async () => {
  const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const { viewIssue, create } = issueCliBuilder(rl);
  const program = new commander.Command();
  program
    .command('serve <path>')
    .description('run alig web server')
    .action(async (repoPath) => {
      await serverBuilder(path.resolve(repoPath))();
    });
  program
    .command('issue')
    .description('show, create or modify issues')
    .option('-n, --new', 'open a new issue')
    .option('-i, --id <id>', 'show issue with specific id')
    .action(async (opt) => {
      if (opt.new) {
        await create();
      } else {
        await viewIssue(opt.id);
      }
      process.exit(0);
    });
  program.parse(process.argv);
};

// eslint-disable-next-line toplevel/no-toplevel-side-effect
main();
