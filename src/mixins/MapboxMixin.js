const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

export default {
  data: () => ({
    map: undefined,
  }),
  methods: {
    createMap() {
      mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_GL_TOKEN;
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
    },
  },
};