import Papa from 'papaparse';

const BASE_URL = 'https://docs.google.com/spreadsheets/d/e/';

function getData(sheetId, gid) {
  return new Promise((resolve, reject) => {
    if (!sheetId || !gid) return reject('sheetId and gid cannot be undefined');
    Papa.parse(`${BASE_URL}${sheetId}/pub?gid=${gid}&output=csv`, {
      download: true,
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      transform(value, column) {
        if (['images_indoor', 'images_outdoor', 'accesses', 'transports'].includes(column)) {
          return value
            ? value.split('@@').map(element => element.trim())
            : [];
        }
        return value;
      },
      complete(results) {
        return resolve(results.data);
      },
      error(error)  {
        return reject(error);
      },
    });
  });
}

export async function getShacksByMassif(massif) {
  try {
    return await getData(massif.data.sheetId, massif.data.shackTabId);
  } catch (error) {
    console.log(error);
  }
}

