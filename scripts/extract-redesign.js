const fs = require('fs');
const zlib = require('zlib');

const html = fs.readFileSync('Countersign redesign.html', 'utf8');

const manifestStart = html.indexOf('<script type="__bundler/manifest">');
const manifestEnd = html.indexOf('</script>', manifestStart);
const manifestJson = html.slice(manifestStart + '<script type="__bundler/manifest">'.length, manifestEnd);

const templateStart = html.indexOf('<script type="__bundler/template">');
const templateEnd = html.indexOf('</script>', templateStart);
const templateJson = html.slice(templateStart + '<script type="__bundler/template">'.length, templateEnd);

const pageOrderStart = html.indexOf('<script type="__bundler/page_order">');
const pageOrderEnd = pageOrderStart !== -1 ? html.indexOf('</script>', pageOrderStart) : -1;
const pageOrder = pageOrderStart !== -1 ? JSON.parse(html.slice(pageOrderStart + '<script type="__bundler/page_order">'.length, pageOrderEnd)) : [];

console.log('Manifest length:', manifestJson.length, 'Template length:', templateJson.length, 'Page order:', pageOrder);

const manifest = JSON.parse(manifestJson);
let template = JSON.parse(templateJson);

const extractedFiles = [];

for (const [uuid, entry] of Object.entries(manifest)) {
  const buf = Buffer.from(entry.data, 'base64');
  let bytes = buf;
  if (entry.compressed) {
    try {
      bytes = zlib.gunzipSync(buf);
    } catch (e) {
      console.error('Gunzip error for', uuid, e.message);
    }
  }
  const isText = entry.mime.includes('html') || entry.mime.includes('text') || entry.mime.includes('javascript') || entry.mime.includes('css') || entry.mime.includes('json');
  console.log(`Asset ${uuid}: mime=${entry.mime}, size=${bytes.length}`);
  if (isText) {
    const ext = entry.mime.includes('html') ? 'html' : entry.mime.includes('css') ? 'css' : entry.mime.includes('javascript') ? 'js' : 'txt';
    const filename = `scripts/extracted_${uuid}.${ext}`;
    fs.writeFileSync(filename, bytes);
    extractedFiles.push({ uuid, mime: entry.mime, filename });
  }
}

fs.writeFileSync('scripts/extracted_template.html', template);
console.log('Saved template to scripts/extracted_template.html');
console.log('Extracted text assets:', extractedFiles);
