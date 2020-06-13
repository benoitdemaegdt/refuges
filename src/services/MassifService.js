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
        if (['images_indoor', 'images_outdoor', 'accesses', 'transports', 'phones'].includes(column)) {
          return value
            ? value.split('@@').map(element => element.trim())
            : [];
        }
        return value ? value : undefined;
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

export async function getAllShacks() {
  const SEARCH_SHEET_ID = '2PACX-1vR9BXRYiRrKj73d_4ddTG_NHXlHycIpbPGv8hvKmvANnUsbvTzPfWmCaV-9M7e54UcqLot7BcZKvyzO';
  const SEARCH_TAB_ID = '1259933617';
  try {
    return await getData(SEARCH_SHEET_ID, SEARCH_TAB_ID);
  } catch (error) {
    console.log(error);
  }
}

