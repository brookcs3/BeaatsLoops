import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

async function render() {
  const templatePath = join('frontend', 'index.template.html');
  const outputPath = join('frontend', 'index.html');
  const template = await readFile(templatePath, 'utf8');
  const html = template
    .replace(/\{\{TITLE\}\}/g, 'Beats - 12 Second Profile')
    .replace(/\{\{DESCRIPTION\}\}/g, 'Share up to three looping 12 second beats and build your audio profile.')
    .replace(/\{\{URL\}\}/g, 'https://example.com');
  await writeFile(outputPath, html);
  console.log('Generated', outputPath);
}

render();
