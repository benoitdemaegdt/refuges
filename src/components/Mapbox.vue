<template>
  <div id="map" style="height: 100%; width: 100%"></div>
</template>

<script>
const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

export default {
  name: 'Mapbox',
  data: () => ({

  }),
  mounted() {
    mapboxgl.accessToken = '';
    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/outdoors-v11',
      center: [5.51194, 44.80543],
      zoom: 11,
    });
    map.addControl(new mapboxgl.NavigationControl({ showCompass: false }));
    map.addControl(new mapboxgl.FullscreenControl(), 'top-left');

    // markers
    var el = document.createElement('div');
    el.className = 'mapbox-marker';
    el.innerHTML = 'test';
    new mapboxgl.Marker(el)
      .setLngLat([5.51194, 44.80543])
      .addTo(map);
  }
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
</style>