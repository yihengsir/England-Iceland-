import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const htmlPath = path.join(root, 'outputs', '英国冰岛路书_简介执行版.html');
const blockPath = path.join(root, 'work', 'gallery-v2.js');
const startMarker = '  const PHOTO_DB_NAME';
const endMarkers = [
  "  window.addEventListener('beforeunload', () => customPhotoUrls.forEach(url => URL.revokeObjectURL(url)));",
  "  window.addEventListener('beforeunload', () => allObjectUrls.forEach(url => URL.revokeObjectURL(url)));"
];
let html = fs.readFileSync(htmlPath, 'utf8');
const start = html.indexOf(startMarker);
const endMarker = endMarkers.find(marker => html.indexOf(marker, start) >= 0);
const endStart = endMarker ? html.indexOf(endMarker, start) : -1;
if (start < 0 || endStart < 0) throw new Error('Existing gallery block markers not found');
const end = endStart + endMarker.length;
const replacement = fs.readFileSync(blockPath, 'utf8').trimEnd();
html = html.slice(0, start) + replacement + html.slice(end);
fs.writeFileSync(htmlPath, html);
