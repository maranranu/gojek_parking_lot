const fs = require('fs');
const readline = require('readline');
const {commandHandling} = require('./command');

function fileRead(fileName) {
  return new Promise((resolve, reject) => {
    return fs.readFile(fileName, 'utf-8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.split('/n'));
      }
    })
  })
}

function processInteractiveConsole() {
  let input = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  })
  return input.question('Input: ', (line) => {
    let commandArgs = line.split(' ');
    let commandType = commandArgs[0];
    commandArgs.splice(0,1);
    if (line == "exit") {
      input.close();
      process.exit();
    } else {
      commandHandling(commandType, commandArgs);
      processInteractiveConsole();
    }
  })
}

function processCommand(isInteractive, fileName) {
  if (!isInteractive) {
    return fileRead(fileName)
    .then((lines) => {
      for (let line in lines) {
        let commandArgs = line.split(' ');
        let commandType = commands[0];
        commandArgs.splice(0,1);
        commandHandling(commandType, commandArgs);
      }
    })
  } else {
    processInteractiveConsole();
  }
}

module.exports = processCommand;
