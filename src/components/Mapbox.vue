<template>
  <div id="map" style="height: 100%; width: 100%"></div>
</template>

<script>
const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
import Vue from 'vue';
import Tooltip from '@/components/Tooltip.vue';

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
    mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_GL_TOKEN;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/outdoors-v11',
      center: [5.7167, 45.1667],
      zoom: 11,
    });
    this.map.addControl(new mapboxgl.NavigationControl({ showCompass: false }));
    this.map.addControl(new mapboxgl.FullscreenControl(), 'top-left');
    this.map.addControl(new mapboxgl.ScaleControl(), 'bottom-left');
  },
  watch: {
    shacks: {
      handler(newShacks) {
        if (newShacks) {
          this.clearMarkers();
          const bounds = new mapboxgl.LngLatBounds();
          newShacks.forEach((shack) => {
            // create marker
            const el = document.createElement('div');
            el.className = 'mapbox-marker';
            el.innerHTML = `<span class="mapbox-marker-content"><b>${shack.beds}</b>&nbsp<i class="v-icon mdi mdi-bed-outline mapbox-marker-content-icon" style="transition-property: none;"></i></span>`;

            // create popup
            const MapboxPopup = Vue.extend(Tooltip)

            const popup = new mapboxgl.Popup({ closeButton: false })
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

            // add marker to map bounds
            bounds.extend([shack.longitude, shack.latitude]);
          });
          
          // fit map to markers
          if (newShacks.length > 1) {
            this.map.fitBounds(bounds, { padding: 100 });
          } else if (newShacks.length === 1) {
            this.map.flyTo({
              center: [newShacks[0].longitude, newShacks[0].latitude],
              essential: true,
            });
          }
        }
      },
    },
    mouseOveredShackIndex: {
      handler(newShack, oldShack) {
        if (oldShack !== undefined) {
          const el = this.markers[oldShack].getElement();
          const content = el.querySelector('.mapbox-marker-content');
          el.classList.remove('mapbox-marker-hover');
          content.classList.remove('mapbox-marker-content-hover');
        }
        if (newShack !== undefined) {
          const el = this.markers[newShack].getElement();
          const content = el.querySelector('.mapbox-marker-content');
          el.classList.add('mapbox-marker-hover');
          content.classList.add('mapbox-marker-content-hover');
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
        this.markers = [];
        this.popups = [];
      }
    },
  },
}
</script>

<style>
/**
 * markers default rules
 */
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

.mapbox-marker-content {
  color: rgb(34, 34, 34);
}

.mapbox-marker-content-icon {
  font-size: 18px !important;
}

/**
 * rules when a marker is :hover
 */
.mapbox-marker:hover {
  height: 29px;
  font-size: 14px;
  z-index: 10;
}

.mapbox-marker:hover .mapbox-marker-content-icon {
  font-size: 20px !important;
}

/**
 * rules when a shackListItem is being :hover
 */
.mapbox-marker-hover {
  background-color: rgb(34, 34, 34) !important;
  height: 30px;
  z-index: 10;
}

.mapbox-marker-content-hover {
  color: white !important;
}

/**
 * modify mapbox default css rules
 */
.mapboxgl-popup {
  z-index: 11 !important;
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

.mapboxgl-ctrl-logo {
  display: none !important;
}

</style>