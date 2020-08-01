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
    coordinates: { type: Array, required: true },
    pointsOfInterest: { type: Array, required: true },
  },
  mixins: [ MapboxMixin ],
  data: () => ({
    chartHeight: undefined,
    hoveredGraphPointIndex: undefined,
    popup: undefined
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
          geometry: {
            type: 'LineString',
            coordinates: this.coordinates,
          },
        },
      });
      this.map.addLayer({
        id: 'trek',
        type: 'line',
        source: 'trek',
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        paint: { 'line-color': '#D81B60', 'line-width': 3 }
      });
      // fit bounds
      const coordinates = this.coordinates;
      const bounds = coordinates.reduce((bounds, coord) => {
        return bounds.extend(coord.slice(0,-1));
      }, new mapboxgl.LngLatBounds(coordinates[0].slice(0,-1), coordinates[0].slice(0,-1)));
 
      this.map.fitBounds(bounds, { padding: 20 });
    });
  },
  watch: {
    hoveredGraphPointIndex: {
      handler(newIndex) {
        if (newIndex !== undefined) {
          if (this.popup) this.popup.remove();
          const coordinates = this.coordinates[newIndex].slice(0,-2);
          const distance = this.coordinates[newIndex].slice(-1)[0];
          this.popup = new mapboxgl.Popup({ closeOnClick: false, closeButton: false })
            .setLngLat(coordinates)
            .setHTML(`<h1>distance: ${Math.round(distance * 100) / 100} km</h1>`)
            .addTo(this.map);
        } else {
          this.popup.remove();
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
              <b>Distance: ${Math.round(this.x * 100) / 100} km</b><br>
              <b>Altitude: ${Math.round(this.y)} m</b>
            `;
          }
        },
        series: [
          {
            color: '#78909C',
            marker: { enabled: false },
            threshold: null,
            data: this.coordinates.map(coord => coord.slice(2).reverse()),
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
  }
}
</script>

<style>
.mapboxgl-ctrl-logo {
  display: none !important;
}
</style>