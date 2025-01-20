const fs = require('fs');
const path = require('path');
const readline = require('readline');

const interfaceForRiding = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const filePath = path.join(__dirname, 'output.txt');

const writeData = fs.createWriteStream(filePath, { flags: 'a' });

interfaceForRiding.on('line', (text) => {
  if (text.trim().toLowerCase() === 'exit') {
    exitProgram();
  } else {
    writeData.write(text + '\n', () => {
      console.log('complete');
    });
  }
});

const exitProgram = () => {
  console.log('Exit');
  interfaceForRiding.close();
  writeData.end();
};

process.on('SIGINT', exitProgram);
