const fs = require('fs');

const html = fs.readFileSync('scripts/canvas_home_desktop.html', 'utf8');

const templateStart = html.indexOf('<script type="__bundler/template">');
const templateEnd = html.indexOf('</script>', templateStart);
const templateJson = html.slice(templateStart + '<script type="__bundler/template">'.length, templateEnd);

const template = JSON.parse(templateJson);
console.log('Raw template length:', template.length);
fs.writeFileSync('scripts/raw_template_home_desktop.html', template);
