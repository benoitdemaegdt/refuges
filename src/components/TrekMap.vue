<template>
  <div style="height: 100%;">
    <div id="map" style="height: 70%; width: 100%"></div>
    <div ref="graph" style="height: 30%; width: 100%">
      <highcharts :options="chartOptions"></highcharts>
    </div>
  </div>
</template>

<script>
// mixins
import MapboxMixin from '@/mixins/MapboxMixin.js';

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
  props: {
    coordinates: { type: Array, required: true }, // [long, lat, alt, dist, elevation]
    pointsOfInterest: { type: Array, required: true },
  },
  mixins: [ MapboxMixin ],
  data: () => ({
    chartHeight: undefined,
    hoveredGraphPointIndex: undefined,
    marker: undefined,
  }),
  mounted() {
    this.chartHeight = this.$refs['graph'].clientHeight;
    // create map
    this.createMap();
    // display trek
    this.map.on('load', () => {
      this.map.addSource('trek', {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: { type: 'LineString', coordinates: this.coordinates.map(coord => coord.slice(0, 2)) },
        },
      });
      this.map.addLayer({
        id: 'trek',
        type: 'line',
        source: 'trek',
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        paint: { 'line-color': '#D81B60', 'line-width': 3 }
      });
      // start and finish markers
      this.createMarker('mapbox-marker-start', this.coordinates[0].slice(0, 2));
      this.createMarker('mapbox-marker-finish', this.coordinates[this.coordinates.length - 1].slice(0, 2));
      // fit bounds
      const coordinates = this.coordinates;
      const bounds = coordinates.reduce((bounds, coord) => {
        return bounds.extend(coord.slice(0, 2));
      }, new mapboxgl.LngLatBounds(coordinates[0].slice(0, 2), coordinates[0].slice(0, 2)));
 
      this.map.fitBounds(bounds, { padding: 20 });
    });
  },
  watch: {
    hoveredGraphPointIndex: {
      handler(newIndex) {
        if (newIndex !== undefined) {
          if (this.marker) this.marker.remove();
          const coordinates = this.coordinates[newIndex].slice(0, 2);
          const newMarker = document.createElement('div');
          newMarker.className = 'mapbox-marker-dynamic';
          this.marker = new mapboxgl.Marker(newMarker)
            .setLngLat(coordinates)
            .addTo(this.map);
        } else {
          this.marker.remove();
        }
      },
    },
  },
  computed: {
    chartOptions() {
      const self = this;
      return {
        title: { text: null },
        legend: { enabled: false },
        credits: { enabled: false },
        chart: { height: this.chartHeight },
        annotations: [
          {
            labels: this.pointsOfInterest.map(poi => ({
              point: { xAxis: 0, yAxis: 0, x: poi.distance, y: poi.elevation },
              text: poi.name,
            })),
          }
        ],
        xAxis: {
          labels: { format: '{value} km' },
          minRange: 5,
          title: { text: null },
        },
        yAxis: {
          startOnTick: true,
          endOnTick: false,
          maxPadding: 0.35,
          title: { text: null },
          labels: { format: '{value} m' }
        },
        tooltip: {
          formatter() {
            return `
              <b>Distance : ${Math.round(this.x * 100) / 100} km</b><br>
              <b>Dénivelé : ${Math.round(self.coordinates[self.hoveredGraphPointIndex][4])} m</b>
            `;
          }
        },
        series: [
          {
            color: '#78909C',
            marker: { enabled: false },
            threshold: null,
            data: this.coordinates.map(coord => [coord[3], coord[2]]),
            point: {
              events: {
                mouseOver( { target: { index } }) {
                  self.hoveredGraphPointIndex = index;
                },
                mouseOut() {
                  self.hoveredGraphPointIndex = undefined;
                },
              },
            },
          },
        ],
      };
    },
  },
  methods: {
    createMarker(markerClass, coordinates) {
      const marker = document.createElement('div');
      marker.className = markerClass;
      new mapboxgl.Marker(marker)
        .setLngLat(coordinates)
        .addTo(this.map);
    },
  },
}
</script>

<style>
.mapboxgl-ctrl-logo {
  display: none !important;
}

.mapbox-marker-start {
  background-color: #00C853;
  border-style: solid;
  border-width: 1px;
  border-color: black;
  width: 13px;
  height: 13px;
  border-radius: 50%;
}

.mapbox-marker-finish {
  background-color: #EF5350;
  border-style: solid;
  border-width: 1px;
  border-color: black;
  width: 13px;
  height: 13px;
  border-radius: 50%;
}

.mapbox-marker-dynamic {
  background-color: #1E88E5;
  border-style: solid;
  border-width: 2px;
  border-color: white;
	height: 15px;
	width: 15px;
  border-radius: 50%;
}
</style>