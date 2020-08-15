const fs = require('fs');
const path = require('path');
const readline = require('readline');
const {commandHandling} = require('./command');

function fileRead(fileName) {
  return new Promise((resolve, reject) => {
    const cwd = process.cwd();
    return fs.readFile(path.resolve(cwd, fileName), 'utf-8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    })
  })
}

function processInteractiveConsole() {
  return new Promise((resolve, reject) => {
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
        resolve();
      } else {
        commandHandling(commandType, commandArgs);
        processInteractiveConsole();
      }
    })
  })
}

async function processCommand(isInteractive, args) {
  try {
    if (!isInteractive) {
      let lines = await fileRead(args[0])
      lines = lines.split('\n');
      for (let line = 0; line < lines.length; line++) {
        command = lines[line];
        let commandArgs = command.split(' ');
        let commandType = commandArgs[0];
        commandArgs.splice(0,1);
        commandHandling(commandType, commandArgs);
      }
    } else {
      return processInteractiveConsole();
    }
  } catch (error) {
    throw error;
  }
}

module.exports = processCommand;
