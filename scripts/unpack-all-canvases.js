const fs = require('fs');
const zlib = require('zlib');

const files = [
  { in: 'scripts/canvas_home_desktop.html', out: 'scripts/rendered_home_desktop.html' },
  { in: 'scripts/canvas_home_phone.html', out: 'scripts/rendered_home_phone.html' },
  { in: 'scripts/canvas_role_record.html', out: 'scripts/rendered_role_record.html' },
  { in: 'scripts/canvas_hero_a_signing_desk.html', out: 'scripts/rendered_hero_a_signing_desk.html' },
  { in: 'scripts/canvas_hero_b_country_switch.html', out: 'scripts/rendered_hero_b_country_switch.html' },
  { in: 'scripts/canvas_hero_c_inspection_lens.html', out: 'scripts/rendered_hero_c_inspection_lens.html' },
];

for (const f of files) {
  if (!fs.existsSync(f.in)) continue;
  const html = fs.readFileSync(f.in, 'utf8');

  const manifestStart = html.indexOf('<script type="__bundler/manifest">');
  const manifestEnd = html.indexOf('</script>', manifestStart);
  if (manifestStart === -1) {
    console.log(f.in, 'no manifest script');
    continue;
  }
  const manifestJson = html.slice(manifestStart + '<script type="__bundler/manifest">'.length, manifestEnd);

  const templateStart = html.indexOf('<script type="__bundler/template">');
  const templateEnd = html.indexOf('</script>', templateStart);
  const templateJson = html.slice(templateStart + '<script type="__bundler/template">'.length, templateEnd);

  const manifest = JSON.parse(manifestJson);
  let template = JSON.parse(templateJson);

  for (const [uuid, entry] of Object.entries(manifest)) {
    const buf = Buffer.from(entry.data, 'base64');
    const bytes = entry.compressed ? zlib.gunzipSync(buf) : buf;
    if (entry.mime.includes('font')) {
      template = template.split(uuid).join('data:' + entry.mime + ';base64,' + bytes.toString('base64'));
    } else if (entry.mime.includes('image')) {
      template = template.split(uuid).join('data:' + entry.mime + ';base64,' + bytes.toString('base64'));
    } else {
      template = template.split(uuid).join(bytes.toString('utf8'));
    }
  }

  fs.writeFileSync(f.out, template);
  console.log(`Rendered ${f.out} (size: ${template.length})`);
}
