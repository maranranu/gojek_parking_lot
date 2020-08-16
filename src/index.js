const processCommand = require('./controllers');
let args = process.argv;

let interactiveMode = args[2] == 'true';
let commandArg = args.splice(3,2);

processCommand(interactiveMode, commandArg)
.then((msg) => {
  process.exit();
})
.catch((err) => {
  console.log(err);
  process.exit(1);
})
