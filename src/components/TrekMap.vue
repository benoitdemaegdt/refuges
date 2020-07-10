<template>
  <div style="height: 100%;">
    <div id="map" style="height: 70%; width: 100%"></div>
    <div id="graph" style="height: 30%; width: 100%">
      <highcharts :options="chartOptions"></highcharts>
    </div>
  </div>
</template>

<script>
// data (TODO: store this data elsewhere)
import { elevation } from '@/data/bauges/elevation.json';
import path from '@/data/bauges/path.json';

// components
const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
import 'mapbox-gl/dist/mapbox-gl.css';

import { Chart } from 'highcharts-vue';
import Highcharts from 'highcharts'
import annotations from 'highcharts/modules/annotations.js'
annotations(Highcharts);

export default {
  name: 'TrekMap',
  components: {
    highcharts: Chart,
  },
  data: () => ({
    elevation: [],
    chartOptions: {
      title: { text: null },
      legend: { enabled: false },
      credits: { enabled: false },
      chart: { height: 250 },
      annotations: [
        {
          labels: [
            {
              point: { xAxis: 0, yAxis: 0, x: 16, y: 2021.2 },
              text: 'Pointe de la Chaurionde'
            },
            {
              point: { xAxis: 0, yAxis: 0, x: 38.1, y: 1501 },
              text: 'Refuge de la Combe'
            },
            {
              point: { xAxis: 0, yAxis: 0, x: 64, y: 1534 },
              text: 'Semnoz'
            },
          ]
        }
      ],
      xAxis: {
        labels: { format: '{value} km' },
        minRange: 5,
        title: { text: 'Distance' },
        accessibility: { rangeDescription: 'Range: 0 to 187.8km.' }
      },
      yAxis: {
        startOnTick: true,
        endOnTick: false,
        maxPadding: 0.35,
        title: { text: null },
        labels: { format: '{value} m' }
      },
      tooltip: {
        headerFormat: 'Distance: {point.x:.1f} km<br>',
        pointFormat: 'Altitude: {point.y} m',
        shared: true
      },
      series: [
        {
          color: '#78909C',
          marker: { enabled: false },
          threshold: null,
          data: elevation,
        },
      ],
    },
  }),
  mounted() {
    mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_GL_TOKEN;
    // set up map
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/benoitdemaegdt/cka2hsqkq3k5r1iobsq729rh3',
      center: [5.7167, 45.1667],
      zoom: 11,
      attributionControl: false,
    });
    this.map.dragRotate.disable();
    this.map.touchZoomRotate.disableRotation();
    this.map.addControl(new mapboxgl.NavigationControl({ showCompass: false }));
    this.map.addControl(new mapboxgl.FullscreenControl(), 'top-left');
    this.map.addControl(new mapboxgl.ScaleControl(), 'bottom-left');
    this.map.addControl(new mapboxgl.GeolocateControl({
      positionOptions: { enableHighAccuracy: true },
      trackUserLocation: true,
    }), 'top-left');
    // display trek
    this.map.on('load', () => {
      this.map.addSource('trek', {
        type: 'geojson',
        data: path.features[0],
      });
      this.map.addLayer({
        id: 'trek',
        type: 'line',
        source: 'trek',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#D81B60',
          'line-width': 3
        }
      });
      // fit bounds
      const coordinates = path.features[0].geometry.coordinates;
      const bounds = coordinates.reduce((bounds, coord) => {
        return bounds.extend(coord);
      }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));
 
      this.map.fitBounds(bounds, { padding: 20 });
    });
  },
}
</script>

<style>
.mapboxgl-ctrl-logo {
  display: none !important;
}
</style>