import fs from 'node:fs';

const htmlPath = 'outputs/英国冰岛路书_简介执行版.html';
const sourcePath = 'work/enhancements-v3.js';
const start = '  // ENHANCEMENTS_V3_START';
const end = '  // ENHANCEMENTS_V3_END';
let html = fs.readFileSync(htmlPath, 'utf8');
const source = fs.readFileSync(sourcePath, 'utf8').trimEnd();
const existingStart = html.indexOf(start);
if (existingStart >= 0) {
  const existingEndStart = html.indexOf(end, existingStart);
  if (existingEndStart < 0) throw new Error('Enhancement end marker missing');
  html = html.slice(0, existingStart) + source + html.slice(existingEndStart + end.length);
} else {
  const galleryStart = html.indexOf('  const PHOTO_DB_NAME');
  if (galleryStart < 0) throw new Error('Gallery insertion point missing');
  html = html.slice(0, galleryStart) + source + '\n\n' + html.slice(galleryStart);
}
fs.writeFileSync(htmlPath, html);
