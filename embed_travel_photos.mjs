import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const htmlPath = path.join(root, 'outputs', '英国冰岛路书_简介执行版.html');
const photoDir = path.join(root, 'work', 'travel-photos');
const photos = {
  NATIONAL_GALLERY: 'national-gallery.jpg',
  SKY_GARDEN: 'sky-garden.jpg',
  SEVEN_SISTERS: 'seven-sisters.jpg',
  CAMBRIDGE: 'cambridge.jpg',
  THINGVELLIR: 'thingvellir.jpg',
  SOLHEIMAJOKULL: 'solheimajokull.jpg',
  JOKULSARLON: 'jokulsarlon.jpg',
  BLUE_LAGOON: 'blue-lagoon.jpg',
  KIRKJUFELL: 'kirkjufell.jpg'
};

let html = fs.readFileSync(htmlPath, 'utf8');
for (const [key, filename] of Object.entries(photos)) {
  const marker = `__PHOTO_${key}__`;
  if (!html.includes(marker)) throw new Error(`Missing marker: ${marker}`);
  const data = fs.readFileSync(path.join(photoDir, filename)).toString('base64');
  html = html.replace(marker, `data:image/jpeg;base64,${data}`);
}
if (/__PHOTO_[A-Z_]+__/.test(html)) throw new Error('Unresolved photo marker remains');
fs.writeFileSync(htmlPath, html);
