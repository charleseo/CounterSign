const fs = require('fs');

function extract(fileIn, fileOut) {
  const html = fs.readFileSync(fileIn, 'utf8');
  const start = html.indexOf('<script type="__bundler/template">');
  const end = html.indexOf('</script>', start);
  const json = html.slice(start + '<script type="__bundler/template">'.length, end);
  fs.writeFileSync(fileOut, JSON.parse(json));
  console.log('Saved', fileOut);
}

extract('scripts/canvas_home_phone.html', 'scripts/raw_template_home_phone.html');
extract('scripts/canvas_role_record.html', 'scripts/raw_template_role_record.html');
