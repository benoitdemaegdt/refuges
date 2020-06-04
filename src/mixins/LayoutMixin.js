export default {
  computed: {
    screenWidth() {
      return window.innerWidth;
    },
    sreenHeight() {
      return window.innerHeight;
    },
    isPwa() {
      return window.matchMedia('(display-mode: standalone)').matches;
    },
  },
};
