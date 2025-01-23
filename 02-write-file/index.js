const fs = require('fs');
const path = require('path');
const readline = require('readline');

const interfaceForRiding = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

interfaceForRiding.on('SIGINT', () => {
  process.emit('SIGINT');
});

const filePath = path.join(__dirname, 'output.txt');

const writeData = fs.createWriteStream(filePath, { flags: 'a' });
console.log('Введите текст');

interfaceForRiding.on('line', (text) => {
  if (text.trim().toLowerCase() === 'exit') {
    exitProgram();
  } else {
    writeData.write(text + '\n', () => {
      console.log('Запись завершена');
    });
  }
});

const exitProgram = () => {
  console.log('Выход');
  interfaceForRiding.close();
  writeData.end();
};

process.on('SIGINT', exitProgram);
