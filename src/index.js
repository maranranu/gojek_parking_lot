const processCommand = require('./controllers');
let args = process.argv;

let interactiveMode = args[2] || true;
let commandArg = args.splice(2,2);

processCommand(interactiveMode, commandArg)
// .then(() => {
//
// }).catch((error) => {
//   console.error('Failed to run an application ', error);
// })
