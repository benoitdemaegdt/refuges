const BASE_URL = 'https://api.monpetitsommet.fr/';

export async function getTrekData(massif, trek) {
  const res = await fetch(`${BASE_URL}massifs/${massif}/randonnees/${trek}.json`);
  if (!res.ok) {
    console.log('res :>> ', res);
    throw new Error(res.status);
  }
  return res.json();
}

export async function getTrekList(massif) {
  const res = await fetch(`${BASE_URL}massifs/${massif}/randonnees.json`);
  if (!res.ok) {
    console.log('res :>> ', res);
    throw new Error(res.status);
  }
  return res.json();
}
