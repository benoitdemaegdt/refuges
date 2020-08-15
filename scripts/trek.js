/**
 * this script takes a gpx file and returns a monpetitsommet.fr json file
 * how to use it ?
 * - copy/paste your gpx input inside "input.gpx"
 * - run : "node trek.js" and see the generated file in the proper massif folder
 */
const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
// const tj = require("@tmcw/togeojson");
// const turf = require('@turf/turf');

checkNodeVersion();
const massifs = getAllMassifs();

inquirer
  .prompt([
    {
      type: 'list',
      name: 'massif',
      message: 'Dans quel massif voulez vous ajouter une rando ?',
      choices: [...massifs, 'vercors', 'charteuse', 'hey'],
    },
    {
      name: 'title',
      message: 'Nom de la randonnée ?',
    },
  ])
  .then(answers => {
    const massif = answers.massif;
    const title = answers.title;
    const key = slugify(answers.title);
    // TODO: edit bauges/randonnees.json if necessary
    const outputFile = { title, key };
    const outputSource = path.resolve(__dirname, `../massifs/${massif}/randonnees/${key}.json`);
    fs.writeFileSync(outputSource, JSON.stringify(outputFile, null, 2));
  });



// // INPUT FILE
// const inputGeoJson = require('./input.json');

// const coordinates = bauges.features[0].geometry.coordinates;

// const result = {
//   "type": "FeatureCollection",
//   "features": [
//     {
//       "type": "Feature",
//       "geometry": {
//         "type": "LineString",
//         "coordinates": []
//       },
//     },
//   ],
// };

// var from = {
//   "type": "Feature",
//   "properties": {},
//   "geometry": {
//     "type": "Point",
//     "coordinates": coordinates[0].slice(0,-1)
//   }
// };

// coordinates.forEach((coordinate, index) => {
//   console.log(`processing coordinates ${index}`);
//   const altitude = coordinate.pop()
//   const to = {
//     "type": "Feature",
//     "properties": {},
//     "geometry": {
//       "type": "Point",
//       "coordinates": coordinate
//     }
//   };
//   var sliced = turf.lineSlice(from, to, bauges.features[0]);
//   const distance = turf.length(sliced, {units: 'kilometers'});
//   result.features[0].geometry.coordinates.push([...coordinate, altitude, distance])
// });

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
