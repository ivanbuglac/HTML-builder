const { error } = require('console');
const fs = require('fs/promises');
const path = require('path');

const secretFolderPath = path.join(__dirname, 'secret-folder');

async function filesInSecretFolder() {
  const files = await fs.readdir(secretFolderPath, { withFileTypes: true });
  for (const file of files) {
    if (file.isFile()) {
      const filePath = path.join(secretFolderPath, file.name);
      const infoAboutFile = await fs.stat(filePath);
      const fileName = path.parse(file.name).name;
      const fileExtension = path.extname(file.name).slice(1);
      const fileSize = infoAboutFile.size;
      console.log(`${fileName} - ${fileExtension} - ${fileSize} bytes`);
    } else {
      console.log(error);
    }
  }
}

filesInSecretFolder();
