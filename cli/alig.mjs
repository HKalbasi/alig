import commander from "commander";
import { readIssue, addComment } from "../alig/issue/main.mjs";
import { git } from "../gitEngine/wrapper.mjs";
import readLine from "readline";


const main = async () => {
  const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const question = (q) => {
    return new Promise((res) => {
      rl.question(q,res);
    });
  };
  const program = new commander.Command();
  program
    .command('issue')
    .description('show, create or modify issues')
    .option('-n, --new', 'open a new issue')
    .action(async (opt) => {
      if (opt.new) {
        await question('Enter title: ');
      }
      else {
        process.exit(0);
      }
    });
  program.parse(process.argv);
};

main();