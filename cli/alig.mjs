import commander from "commander";
import readLine from "readline";
import { issueCliBuilder } from "../alig/issue/cli.mjs";

const main = async () => {
  const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const question = (q) => {
    return new Promise((res) => {
      rl.question(q, res);
    });
  };
  const { viewIssue } = issueCliBuilder(rl);
  const program = new commander.Command();
  program
    .command('issue')
    .description('show, create or modify issues')
    .option('-n, --new', 'open a new issue')
    .option('-i, --id <id>', 'show issue with specific id')
    .action(async (opt) => {
      if (opt.new) {
        await question('Enter title: ');
      } else {
        await viewIssue(opt.id);
        process.exit(0);
      }
    });
  program.parse(process.argv);
};

// eslint-disable-next-line toplevel/no-toplevel-side-effect
main();
