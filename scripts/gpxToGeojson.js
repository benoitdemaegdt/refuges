/**
 * this script takes a gpx file and returns a geojson file
 * how to use it ?
 * - copy/paste your gpx input inside "input.gpx"
 * - node scripts/gpxToGeojson.js
 */
 const fs = require('fs');
 const path = require('path');
 const _ = require('lodash')
 const DOMParser = require('xmldom').DOMParser;
 const tj = require('@tmcw/togeojson');
 const turf = require('@turf/turf');
 const cliProgress = require('cli-progress');

 checkNodeVersion();
 const geojson = getGeojson()
 const coordinates = getCoordinates(geojson)
  .map((coordinate, index, coordinates) => [...coordinate, addDistance(coordinates, index)])

  const totalDistance = _.last(_.last(coordinates))
  let range = _.map(_.range(0, totalDistance, 0.1), i => _.round(i, 1));
  const newCoodinates = range.map(item => findClosestCoordinate(coordinates, item))
  _.set(geojson, 'features[0].geometry.coordinates', newCoodinates);

  console.log(JSON.stringify(geojson, null, 2));



 // add distance
 // filter too many points (keep one point each 100m)

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

  // parse input.gpx file and return geojson
  function getGeojson() {
    const source = path.resolve(__dirname, 'input.gpx');
    const gpx = new DOMParser().parseFromString(fs.readFileSync(source, 'utf8'));
    const geojson = tj.gpx(gpx)
    return _.omit(geojson, 'features[0].properties.coordTimes')
  }

  // get all coordinates from a geojson
  function getCoordinates(geojson) {
    return _.get(geojson, 'features[0].geometry.coordinates')
  }

  // add distance from start to each geojson coordinates
  function addDistance(coordinates, index) {
    const from = {
      type: 'Feature',
      properties: {},
      geometry: { type: 'Point', coordinates: coordinates[0].slice(0, 2) },
    };
    const to = {
      type: "Feature",
      properties: {},
      geometry: { type: 'Point', coordinates: coordinates[index].slice(0, 2) },
    };
    const line = {
      type: 'Feature',
      geometry: { type: 'LineString', coordinates },
    };
    const slicedLine = turf.lineSlice(from, to, line);
    const distance = turf.length(slicedLine, { units: 'kilometers' });
    return Math.round(distance * 100) / 100;
  }

  function findClosestCoordinate(coordinates, distance) {
    return coordinates.reduce((prev, curr) => {
      return Math.abs(_.last(curr) - distance) < Math.abs(_.last(prev) - distance) ? curr : prev;
    });
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



