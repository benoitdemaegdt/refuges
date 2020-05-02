const fs = require('fs');
const path = require('path');

const OUTPUT = [];
const MASSIFS = JSON.parse(fs.readFileSync(path.resolve(__dirname, './massifs.json')));

for (const massif of MASSIFS) {
  OUTPUT.push({
    name: massif.name,
    type: 'massif',
    path: `/refuges/massifs/${massif.key}`,
  });
}

let json = JSON.stringify(OUTPUT, null, 2);
fs.writeFileSync(path.resolve(__dirname, './search.json'), json);