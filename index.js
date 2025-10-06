const fs = require('fs').promises;
const path = require('path');
const marked = require('marked');
const ejs = require('ejs');
const { program } = require('commander');

async function generateSite() {
  // Source of the Markdown
  const contentDir = './src/content';
  // Deployable Docs Directory
  const outputDir = './docs';
  // Template for the Page
  const template = await fs.readFile('./src/templates/index.ejs', 'utf-8');
  // All the blog posts
  const files = await fs.readdir(contentDir);

  for (const file of files) {
    if (file.endsWith('.md')) {
      const markdown = await fs.readFile(path.join(contentDir, file), 'utf-8');
      const htmlContent = marked.parse(markdown);
      const output = await ejs.render(template, { content: htmlContent });
      const outputFile = path.join(outputDir, file.replace('.md', '.html'));
      await fs.writeFile(outputFile, output);
      console.log(`Generated ${outputFile}`);
    }
  }
}

program
  .command('build')
  .description('Generate the static site')
  .action(generateSite);

program.parse();