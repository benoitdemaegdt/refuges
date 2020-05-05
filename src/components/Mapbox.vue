<template>
  <div id="map" style="height: 100%; width: 100%"></div>
</template>

<script>
const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
import Vue from 'vue';
import Tooltip from '@/components/Tooltip.vue';
// import Popup from '@/components/Popup.vue';

export default {
  name: 'Mapbox',
  props: {
    shacks: { type: Array, required: true },
    mouseOveredShackIndex: { type: Number },
  },
  data: () => ({
    map: undefined,
    markers: [],
    popups: [],
  }),
  mounted() {
    mapboxgl.accessToken = '';
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/outdoors-v11',
      center: [5.51194, 44.80543],
      zoom: 11,
    });
    this.map.addControl(new mapboxgl.NavigationControl({ showCompass: false }));
    this.map.addControl(new mapboxgl.FullscreenControl(), 'top-left');


  },
  watch: {
    shacks: {
      handler(newShacks) {
        if (newShacks) {
          this.clearMarkers();
          newShacks.forEach((shack) => {
            // create marker
            const el = document.createElement('div');
            el.className = 'mapbox-marker';
            el.innerHTML = `<b>${shack.beds}</b>&nbsp<i class="v-icon notranslate mdi mdi-bed-outline theme--light" style="font-size:18px; color: rgb(34,34,34);"></i>`;

            // create popup
            const MapboxPopup = Vue.extend(Tooltip)

            const popup = new mapboxgl.Popup()
              .setLngLat([shack.longitude, shack.latitude])
              .setHTML(`<div id="mapbox-popup-content-${shack.key}"></div>`)
              .addTo(this.map)

            const MapboxPopupInstance = new MapboxPopup({
              propsData: { cabane: shack }
            });

            MapboxPopupInstance.$mount(`#mapbox-popup-content-${shack.key}`);
            popup._update();

            // attach marker and popup to map
            const marker = new mapboxgl.Marker(el)
              .setLngLat([shack.longitude, shack.latitude])
              .setPopup(popup)
              .addTo(this.map);

            // keep track of markers and popups
            this.markers.push(marker);
            this.popups.push(popup)
          });
        }
      },
    },
    mouseOveredShackIndex: {
      handler(newShack, oldShack) {
        if (oldShack !== undefined) {
          const el = this.markers[oldShack].getElement();
          el.classList.remove('mapbox-marker-hover');
        }
        if (newShack !== undefined) {
          const el = this.markers[newShack].getElement();
          el.classList.add('mapbox-marker-hover');
        }
      },
    },
  },
  methods: {
    clearMarkers() {
      if (this.markers.length > 0) {
        for (let i = 0; i < this.markers.length; i++) {
          this.markers[i].remove();
          this.popups[i].remove();
        }
      }
    },
  },
}
</script>

<style>
.mapbox-marker {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 28px;
  border-radius: 28px;
  padding: 0px 8px;
  background-color: white;
  color: rgb(34, 34, 34);
  box-shadow: rgba(0, 0, 0, 0.08) 0px 0px 0px 1px, rgba(0, 0, 0, 0.18) 0px 1px 2px;
  font-size: 13px;
}

.mapbox-marker-hover, .mapbox-marker-hover > i {
  color: white !important;
}

.mapbox-marker-hover {
  background-color: rgb(34, 34, 34) !important;
}

.mapboxgl-popup-content {
  background-color: transparent;
  box-shadow: none;
}

.mapboxgl-popup-tip {
  border-top-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  border-left-color: transparent !important;
}

</style>