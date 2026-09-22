import fs from 'node:fs';

const source = fs.readFileSync('outputs/英国冰岛路书_简介执行版.html', 'utf8')
  .replace(/<script>[\s\S]*?<\/script>/g, '')
  .replace(/<style>[\s\S]*?<\/style>/g, '')
  .replace(/<img[^>]*>/g, '');
const text = [...source.matchAll(/>([^<>]+)</g)]
  .map(match => match[1].replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim())
  .filter(Boolean)
  .filter(value => /[\u3400-\u9fff]/.test(value));
const unique = [...new Set(text)];
console.log(JSON.stringify({count: unique.length, items: unique}, null, 2));
