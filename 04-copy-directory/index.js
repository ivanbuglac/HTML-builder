const fs = require('fs/promises');
const path = require('path');

async function copyDirectory() {
  const sourceDir = path.join(__dirname, 'files');
  const destDir = path.join(__dirname, 'files-copy');

  try {
    await fs.mkdir(destDir, { recursive: true });

    const existingFiles = await fs.readdir(destDir);
    for (const file of existingFiles) {
      await fs.rm(path.join(destDir, file), { recursive: true, force: true });
    }

    const files = await fs.readdir(sourceDir, { withFileTypes: true });

    for (const file of files) {
      const sourcePath = path.join(sourceDir, file.name);
      const destPath = path.join(destDir, file.name);

      if (file.isFile()) {
        await fs.copyFile(sourcePath, destPath);
      } else if (file.isDirectory()) {
        await copySubDirectory(sourcePath, destPath);
      }
    }

    console.log('Копирование завершено.');
  } catch (err) {
    console.error('Ошибка при копировании директории:', err.message);
  }
}

async function copySubDirectory(sourceDir, destDir) {
  await fs.mkdir(destDir, { recursive: true });

  const files = await fs.readdir(sourceDir, { withFileTypes: true });

  for (const file of files) {
    const sourcePath = path.join(sourceDir, file.name);
    const destPath = path.join(destDir, file.name);

    if (file.isFile()) {
      await fs.copyFile(sourcePath, destPath);
    } else if (file.isDirectory()) {
      await copySubDirectory(sourcePath, destPath);
    }
  }
}

copyDirectory();
