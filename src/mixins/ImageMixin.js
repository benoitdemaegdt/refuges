const PARAM_IDX = 55;
export default {
  methods: {
    getImage(imageList, index, { height }) {
      if (imageList[index].includes('cloudinary')) {
        return `${imageList[index].slice(0, PARAM_IDX)}h_${height},f_auto/${imageList[index].slice(PARAM_IDX)}`
      }
      return require('@/assets/images/' + imageList[index] + '?vuetify-preload');
    },
  },
};
