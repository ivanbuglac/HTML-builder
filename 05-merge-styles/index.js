const fs = require('fs/promises');
const path = require('path');

async function mergeStyles() {
  const stylesDir = path.join(__dirname, 'styles');
  const distDir = path.join(__dirname, 'dist');
  const bundlePath = path.join(distDir, 'bundle.css');

  try {
    await fs.mkdir(distDir, { recursive: true });

    await fs.rm(bundlePath, { force: true });

    const files = await fs.readdir(stylesDir, { withFileTypes: true });

    const cssFiles = files.filter(
      (file) => file.isFile() && path.extname(file.name) === '.css',
    );

    const styles = [];
    for (const file of cssFiles) {
      const filePath = path.join(stylesDir, file.name);
      const fileContent = await fs.readFile(filePath, 'utf-8');
      styles.push(fileContent); // Добавляем содержимое в массив
    }

    await fs.writeFile(bundlePath, styles.join('\n'), 'utf-8');

    console.log('Стили успешно объединены в bundle.css.');
  } catch (err) {
    console.error('Ошибка при объединении стилей:', err.message);
  }
}

mergeStyles();
