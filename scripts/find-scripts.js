const fs = require('fs');
const content = fs.readFileSync('scripts/clean_home_desktop.html', 'utf8');

const regex = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
let m;
let count = 0;
while ((m = regex.exec(content)) !== null) {
  count++;
  console.log('Script ' + count + ': tag=' + m[0].slice(0, 100));
  fs.writeFileSync('scripts/script_' + count + '.js', m[1]);
}
console.log('Total scripts found:', count);
