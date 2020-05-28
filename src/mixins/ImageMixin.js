const PARAM_IDX = 55;
const QUALITY_FACTOR = 2;
export default {
  methods: {
    getImage(imageList, index, { height }) {
      if (imageList[index].includes('cloudinary')) {
        return `${imageList[index].slice(0, PARAM_IDX)}h_${height * QUALITY_FACTOR},f_auto/${imageList[index].slice(PARAM_IDX)}`
      }
      return require('@/assets/images/' + imageList[index] + '?vuetify-preload');
    },
  },
};
