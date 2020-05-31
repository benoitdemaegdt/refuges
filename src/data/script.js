const https = require('https');
const fs = require('fs');
const path = require('path');

const OUTPUT = [];
const BASE_URL = 'https://docs.google.com/spreadsheets/d/e/';
const MASSIFS = JSON.parse(fs.readFileSync(path.resolve(__dirname, './massifs.json')));

(async() => {

  for (const massif of MASSIFS) {
    const shacks = await getData(massif);
    OUTPUT.push(...shacks);
  }

  let json = JSON.stringify(OUTPUT, null, 2);
  fs.writeFileSync(path.resolve(__dirname, './search.json'), json);
})()
.catch(err => console.log('err :', err));

/**
 * download csv file
 */
async function getData(massif) {
  const URL = `${BASE_URL}${massif.data.sheetId}/pub?gid=${massif.data.shackTabId}&output=csv`
  return new Promise((resolve, reject) => {
    let rawData = '';
    const request = https.get(URL, res => {
      if (res.statusCode < 200 || res.statusCode > 299) {
        return reject(`Failed to download file: ${res.statusCode}`);
      }
      res.on('data', chunk => {
        rawData += chunk;
      });
      res.on('end', () => {
        rawData = rawData.toString();
        const data = [];
        const lines = rawData.split('\n');
        for (let [index, line] of lines.entries()) {
          if (index > 0) {
            line = line.split(',');
            data.push({
              name: line[0],
              type: `${line[2]}, ${massif.name}`,
              path: `/massifs/${massif.key}/cabanes/${line[1]}`,
            });
          }
        }
        return resolve(data);
      })
    });
    request.on('error', err => reject(err))
  });
}