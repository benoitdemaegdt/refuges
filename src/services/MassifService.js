const BASE_URL = 'https://sheets.googleapis.com/v4/spreadsheets/';
const API_KEY = process.env.VUE_APP_GOOGLE_API_KEY;

async function getData(sheetId, tabName) {
  const res = await fetch(`${BASE_URL}${sheetId}/values/${tabName}?key=${API_KEY}`)
  const data = await res.json()
  const headers = data.values.shift();
  return data.values.map((row) => {
    return headers.reduce((acc, header, idx) => ({
      ...acc,
      [header]: castValue(header, row[idx])
    }), {});
  });
}

function castValue(header, value) {
  if (['images_indoor', 'images_outdoor', 'accesses', 'transports', 'phones'].includes(header)) {
    return value ? value.split('@@').map(element => element.trim()) : [];
  }
  if (value === '') return undefined;
  if (value === 'TRUE') return true;
  if (value === 'FALSE') return false;
  if (!isNaN(Number(value))) return Number(value);
  return value;
}

export async function getShacksByMassif(massif) {
  try {
    return await getData(massif.data.sheetId, 'cabanes');
  } catch (error) {
    console.log(error);
  }
}

export async function getAllShacks() {
  const SEARCH_SHEET_ID = '1O9g4mjfmEM8rdrX1tK0jvVIoGFmBvEBDDyi3WwXy8NM';
  try {
    return await getData(SEARCH_SHEET_ID, 'cabanes');
  } catch (error) {
    console.log(error);
  }
}

