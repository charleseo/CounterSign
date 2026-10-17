const fs = require('fs');
const content = fs.readFileSync('scripts/clean_home_desktop.html', 'utf8');

// Find style blocks
const styles = [];
const styleRegex = /<style>([\s\S]*?)<\/style>/g;
let match;
while ((match = styleRegex.exec(content)) !== null) {
  styles.push(match[1]);
}
console.log('Number of style tags:', styles.length);
styles.forEach((s, i) => {
  console.log(`--- STYLE ${i} (length: ${s.length}) ---`);
  console.log(s.slice(0, 1000));
  console.log('...\n');
  fs.writeFileSync(`scripts/desktop_style_${i}.css`, s);
});

// Find data-dc-script
const scriptMatch = content.match(/<script data-dc-script[\s\S]*?>([\s\S]*?)<\/script>/);
if (scriptMatch) {
  console.log('Script length:', scriptMatch[1].length);
  fs.writeFileSync('scripts/clean_home_desktop_logic.js', scriptMatch[1]);
}
