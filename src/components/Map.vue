<template>
  <div style="height: 100%; width: 100%">
    <l-map
      ref="map"
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
      <l-marker
        v-for="(cabane, index) in cabanes"
        :key="index"
        :lat-lng="[cabane.latitude, cabane.longitude]"
        :icon="getIcon(cabane)"
        :z-index-offset="cabane.key === mouseOveredCabaneKey ? 100 : 0"
        >
          <l-popup :options="popupOptions">
            <Tooltip :cabane="cabane" :goToShack="goToShack"></Tooltip>
          </l-popup>
        </l-marker>
    </l-map>
  </div>
</template>

<script>
import L from "leaflet";
import { latLng } from "leaflet";
import 'leaflet-fullscreen/dist/Leaflet.fullscreen';
import {
  LMap,
  LTileLayer,
  LControlScale,
  LControlZoom,
  LPopup,
  LMarker,
} from 'vue2-leaflet';
import Tooltip from '@/components/Tooltip.vue';
import LayoutMixin from '@/mixins/LayoutMixin.js';
import ShackMixin from '@/mixins/ShackMixin.js';

export default {
  name: 'Map',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LControlScale,
    LControlZoom,
    LPopup,
    Tooltip,
  },
  props: {
    cabanes: { type: Array, required: true },
    massif: { type: Object, required: true },
    mouseOveredCabaneKey: { type: String },
  },
  mixins: [ LayoutMixin, ShackMixin ],
  data: () =>  ({
    map: undefined,
    zoom: 8,
    center: latLng(45.1667, 5.7167),
    url: undefined,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    currentZoom: undefined,
    currentCenter: undefined,
    mapOptions: {
      zoomControl: false,
      zoomSnap: 0.5
    },
    popupOptions: {
      closeButton: false,
      maxWidth: 249,
      minWidth: 249,
    }
  }),
  created() {
    this.url = process.env.VUE_APP_MAPBOX_TOKEN
      ? `https://api.mapbox.com/styles/v1/mapbox/outdoors-v9/tiles/{z}/{x}/{y}?access_token=${process.env.VUE_APP_MAPBOX_TOKEN}`
      : 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';
  },
  mounted() {
    this.map = this.$refs.map.mapObject;
    this.map.addControl(new L.Control.Fullscreen());
  },
  watch: {
    cabanes: {
      handler(newCabanes) {
        if (newCabanes) {
          // close all existing tooltips
          this.map.closePopup();
          // add new markers
          const markers = [];
          for (const cabane of newCabanes) {
            markers.push(L.marker([cabane.latitude, cabane.longitude]));
          }
          // fit map to new markers bounds
          const group = new L.featureGroup(markers);
          this.map.fitBounds(group.getBounds().pad(0.1));
        }
      },
    },
  },
  methods: {
    zoomUpdate(zoom) {
      this.currentZoom = zoom;
    },
    centerUpdate(center) {
      this.currentCenter = center;
    },
    getColor(cabane) {
      return cabane.key === this.mouseOveredCabaneKey ? 'red' : 'blue';
    },
    getIcon(cabane) {
      const dynamicClass = cabane.key === this.mouseOveredCabaneKey ? 'map-label-content-hovered' : 'map-label-content';
      const iconColor = cabane.key === this.mouseOveredCabaneKey ? 'white' : 'rgb(34,34,34)';
      return L.divIcon({
        iconSize: null,
        html: `
          <div class="map-label">
            <div class="${dynamicClass}">
              <b>${cabane.beds}</b>&nbsp<i class="v-icon notranslate mdi mdi-bed-outline theme--light" style="font-size:18px; color: ${iconColor};"></i>
            </div>
          </div>
        `,
      })
    }
  },
}
</script>

<style>
  .leaflet-popup-content {
    margin-left: 0px !important;
    margin-right: 0px !important;
    margin-bottom: 0px !important;
  }

  .leaflet-popup-content-wrapper {
    padding-top: 0px !important;
    padding-right: 0px !important;
    padding-left: 0px !important;
  }

  .map-label {
    position: absolute;
    transform: translate(calc(-50% + 0px), calc(-20% + 0px));
    display: flex;
    flex-direction: column;
    text-align: center;
  }
  
  .map-label-content, .map-label-content-hovered {
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 28px;
    padding: 0px 8px;
    box-shadow: rgba(0, 0, 0, 0.08) 0px 0px 0px 1px, rgba(0, 0, 0, 0.18) 0px 1px 2px;
    font-size: 13px;
    transition: all .1s ease-in-out;
  }

  .map-label-content {
    background-color: white;
    color: rgb(34, 34, 34);
  }

  .map-label-content-hovered {
    background-color: rgb(34, 34, 34);
    color: white;
    transform: scale(1.1);
  }

  .map-label-content:hover {
    transform: scale(1.1);
  }
</style>
