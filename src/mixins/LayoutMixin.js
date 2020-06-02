export default {
  computed: {
    screenWidth() {
      return window.innerWidth;
    },
    isPwa() {
      return window.matchMedia('(display-mode: standalone)').matches;
    },
  },
};
