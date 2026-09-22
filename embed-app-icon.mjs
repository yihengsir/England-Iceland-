import fs from 'node:fs';

const htmlPath = 'outputs/英国冰岛路书_简介执行版.html';
let html = fs.readFileSync(htmlPath, 'utf8');
const data = 'data:image/png;base64,' + fs.readFileSync('tmp/trip-icon-180.png').toString('base64');
const start = '  <!-- APP_ICON_START -->';
const end = '  <!-- APP_ICON_END -->';
const block = `${start}\n  <meta name="apple-mobile-web-app-capable" content="yes">\n  <meta name="apple-mobile-web-app-status-bar-style" content="default">\n  <meta name="apple-mobile-web-app-title" content="英国冰岛路书">\n  <meta name="theme-color" content="#fffaf0">\n  <link rel="apple-touch-icon" sizes="180x180" href="${data}">\n  <link rel="icon" type="image/png" href="${data}">\n${end}`;
const existingStart = html.indexOf(start);
if (existingStart >= 0) {
  const existingEnd = html.indexOf(end, existingStart);
  if (existingEnd < 0) throw new Error('Icon block end missing');
  html = html.slice(0, existingStart) + block + html.slice(existingEnd + end.length);
} else {
  html = html.replace('</title>', '</title>\n' + block);
}
fs.writeFileSync(htmlPath, html);
