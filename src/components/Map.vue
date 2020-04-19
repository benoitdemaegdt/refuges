<template>
  <div style="height: 100%; width: 100%">
    <l-map
      :zoom="zoom"
      :center="center"
      :options="mapOptions"
      style="height: 100%; z-index: 4"
      @update:center="centerUpdate"
      @update:zoom="zoomUpdate"
    >
      <l-control-zoom position="topright"></l-control-zoom>
      <l-tile-layer :url="url" :attribution="attribution"/>
      <l-control-scale position="bottomleft" :imperial="false" :metric="true"></l-control-scale>
      <l-circle-marker
        v-for="(cabane, index) in cabanes"
        :key="index"
        :lat-lng="[cabane.latitude, cabane.longitude]"
        radius="6"
        fillColor="red"
        fillOpacity="0.5"
        color="red"
      />
    </l-map>
  </div>
</template>

<script>
import { latLng } from "leaflet";
import { LMap, LTileLayer, LCircleMarker, LControlScale, LControlZoom } from 'vue2-leaflet';

export default {
  name: 'Map',
  components: {
    LMap,
    LTileLayer,
    LCircleMarker,
    LControlScale,
    LControlZoom
  },
  props: {
    cabanes: {
      type: Array,
      required: true,
    },
  },
  data: () =>  ({
    zoom: 11,
    center: latLng(44.82698, 5.48280),
    url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    currentZoom: 11.5,
    currentCenter: latLng(44.82698, 5.48280),
    mapOptions: {
      zoomControl: false,
      zoomSnap: 0.5
    },
  }),
  methods: {
    zoomUpdate(zoom) {
      this.currentZoom = zoom;
    },
    centerUpdate(center) {
      this.currentCenter = center;
    },
  }
}
</script>
