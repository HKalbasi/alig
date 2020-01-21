import * as issue from "../alig/issue.mjs";
import commander from "commander";

const main = async () => {
  const program = new commander.Command();
  program
    .command('issue <id>')
    .description('show issue with id <id>')
    .action((id) => {
      console.log(id);
    });
  program.parse(process.argv);
};

main();