/**
 * this script takes a gpx file and returns a monpetitsommet.fr json file
 * how to use it ?
 * - copy/paste your gpx input inside "input.gpx"
 * - run : "node scripts/trek.js" and see the generated file in the proper massif folder
 */
const fs = require('fs');
const path = require('path');
const _ = require('lodash')
const DOMParser = require('xmldom').DOMParser;
const inquirer = require('inquirer');
const tj = require('@tmcw/togeojson');
const turf = require('@turf/turf');
const cliProgress = require('cli-progress');

checkNodeVersion();
const massifs = getAllMassifs();

inquirer
  .prompt([
    {
      type: 'list',
      name: 'massif',
      message: 'Dans quel massif voulez vous ajouter une rando ?',
      choices: massifs,
    },
    {
      type: 'input',
      name: 'title',
      message: 'Nom de la randonnée ?',
    },
    {
      type: 'number',
      name: 'stepCount',
      message: "Combien d'étapes ?",
      default: 0,
    },
    {
      type: 'number',
      name: 'pointOfInterestCount',
      message: "Combien de points d'intérêt ?",
      default: 0,
    },
  ])
  .then(answers => {
    const massif = answers.massif;
    const title = answers.title;
    const stepCount = answers.stepCount;
    const pointOfInterestCount = answers.pointOfInterestCount
    const key = slugify(answers.title);
    const trekObject = buildTrekObject({ title, key, stepCount, pointOfInterestCount });
    updateMassifTreksFile(massif, trekObject);
    createTrekFile(massif, key, trekObject);
  });

/**
 * update massifs/<MASSIF_NAME>/randonnees.json file
 */
function updateMassifTreksFile(massif, { title, key, summary }) {
  const source = path.resolve(__dirname, `../massifs/${massif}/randonnees.json`);
  const massifTreks = JSON.parse(fs.readFileSync(source, 'utf8'));
  checkTrekUnicity(massifTreks, key);
  massifTreks.push({ title, key, summary });
  fs.writeFileSync(source, JSON.stringify(massifTreks, null, 2));
}

/**
 * check trek unicity
 */
function checkTrekUnicity(massifTreks, newTrekKey) {
  const trekList = massifTreks.map(trek => trek.key);
  if (trekList.includes(newTrekKey)) {
    console.log('Error : this trek already exists.\n', massifTreks.find(trek => trek.key === newTrekKey));
    process.exit(1);
  }
}

/**
 * create massifs/<MASSIF_NAME>/randonnees/<TREK_KEY>.json file
 */
function createTrekFile(massif, key, trekObject) {
  const source = path.resolve(__dirname, `../massifs/${massif}/randonnees/${key}.json`);
  fs.writeFileSync(source, JSON.stringify(trekObject, null, 2));
}

/**
 * check NodeJS major version is >= 10
 */
function checkNodeVersion() {
  const NODE_MAJOR_VERSION = process.versions.node.split('.')[0];
  if (NODE_MAJOR_VERSION < 10) {
    console.log('Error : NodeJS major version should be >= 10');
    process.exit(1);
  }
}
/**
 * get a list of all existing massifs
 * ['bauges', 'vercors', 'chartreuse']
 */
function getAllMassifs() {
  const source = path.resolve(__dirname, '../massifs');
  return fs.readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
}

/**
 * slugify any string
 * "Traversée des Bauges" -> "traversee-des-bauges"
 */
function slugify(str) {
  return str
    .toString()                     // Cast to string
    .toLowerCase()                  // Convert the string to lowercase letters
    .normalize('NFD')               // The normalize() method returns the Unicode Normalization Form of a given string.
    .trim()                         // Remove whitespace from both sides of a string
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-');        // Replace multiple - with single -
}

/**
 * build trek object with monpetitsommet.fr format
 */
function buildTrekObject({ title, key, stepCount, pointOfInterestCount }) {
  const trekPoints = [];
  const trekCoordinates = getTrekCoordinates();
  const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
  progressBar.start(trekCoordinates.length, 0);
  for (let index = 0; index < trekCoordinates.length; index++) {
    progressBar.update(index + 1);
    let distanceFromBeginning = computePointDistance(trekCoordinates, index);
    let elevationSinceBeginning = computePointElevation(trekCoordinates, index);
    trekPoints.push([...trekCoordinates[index], distanceFromBeginning, elevationSinceBeginning]);
  }
  progressBar.stop();
  return {
    title,
    key,
    summary: {
      distance: _.last(trekPoints)[3],
      elevation: _.last(trekPoints)[4],
      duration: 0,
    },
    introduction: {
      text: '',
      image: '',
    },
    pointsOfInterest: new Array(pointOfInterestCount).fill({ name: '', distance: 0, elevation: 0 }),
    steps: new Array(stepCount).fill({ title: '', text: '' }),
    coordinates: trekPoints,
  };
}

/**
 * parse input.gpx file and return array of 3D coordinates
 * -> [[6.31358, 45.63063, 322.85507202148], [6.31313, 45.63055, 323.08053588867], ...]
 */
function getTrekCoordinates() {
  const source = path.resolve(__dirname, 'input.gpx');
  const kml = new DOMParser().parseFromString(fs.readFileSync(source, 'utf8'));
  const geojson = tj.gpx(kml);
  return _.get(geojson, 'features[0].geometry.coordinates');
}

/**
 * compute distance between two points along a line/path
 */
function computePointDistance(trekCoordinates, index) {
  const from = {
    type: 'Feature',
    properties: {},
    geometry: { type: 'Point', coordinates: trekCoordinates[0].slice(0, 2) },
  };
  const to = {
    type: "Feature",
    properties: {},
    geometry: { type: 'Point', coordinates: trekCoordinates[index].slice(0, 2) },
  };
  const line = {
    type: 'Feature',
    geometry: { type: 'LineString', coordinates: trekCoordinates },
  };
  const slicedLine = turf.lineSlice(from, to, line);
  const distance = turf.length(slicedLine, { units: 'kilometers' });
  return Math.round(distance * 100) / 100;
}

/**
 * compute cumulative elevation up to a given point
 */
function computePointElevation(trekCoordinates, index) {
  const elevation = trekCoordinates.slice(0, index).reduce((cumulativeElevation, _currentPoint, idx) => {
    if (idx === 0) return cumulativeElevation;
    const currentElevation = _.last(trekCoordinates[idx]);
    const previousElevation = _.last(trekCoordinates[idx - 1]);
    return cumulativeElevation + Math.max((currentElevation - previousElevation), 0);
  }, 0);
  return Math.round(elevation * 100) / 100;
}
