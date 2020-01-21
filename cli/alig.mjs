import commander from "commander";
import { readIssue } from "../alig/issue.mjs";
import readLine from "readline";
import { promisify } from "util";
import editor from "editor";
import fs from "fs";

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const authorToString = ({name, email}) => `${name}<${email}>`;

const multilineInput = async (init) => {
  const adr = `/tmp/lanate khoda`;
  await writeFile(adr, init);
  await new Promise((res) => {
    editor(adr, ()=>{
      res();
    });
  });
  return (await readFile(adr)).toString();
};

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
  const addIssueCli = async () => {
    rl.pause();
    const text = await multilineInput('Now enter text here, then save and close.');
    console.log(text);
    rl.resume();
  };
  const program = new commander.Command();
  program
    .command('issue <id>')
    .description('show issue with id <id>')
    .action(async (id) => {
      try{
        const issue = await readIssue(id);
        console.log(issue.head.title);
        console.log(`by ${authorToString(issue.head.author.name)} at ${issue.head.time}`);  
        issue.body.forEach(e => {
          if (e.type === 'comment') {
            console.log(`${authorToString(e.author)} commented at ${e.time}:`);
            console.log(e.text);
          }
          else {
            console.log(e);
          }
        });
        const res = await question('a for add comment, and anything else for exit:\n');
        if (res === 'a') {
          await addIssueCli();
          process.exit(0);
        }
        else {
          process.exit(0);
        }
      }
      catch(e) {
        console.log(e);
      }
    });
  program.parse(process.argv);
};

main();