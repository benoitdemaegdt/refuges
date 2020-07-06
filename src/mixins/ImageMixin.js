const PARAM_IDX = 55;
const QUALITY_FACTOR = 2;
export default {
  methods: {
    getImage(imageList, index, { height }) {
      if (imageList[index].includes('cloudinary')) {
        return `${imageList[index].slice(0, PARAM_IDX)}h_${height * QUALITY_FACTOR},f_auto/${imageList[index].slice(PARAM_IDX)}`;
      }
    },
    getPreloadImage(imageList, index, { height }) {
      if (imageList[index].includes('cloudinary')) {
        return `${imageList[index].slice(0, PARAM_IDX)}h_${height * QUALITY_FACTOR},f_auto,e_blur:10000,q_1/${imageList[index].slice(PARAM_IDX)}`;
      }
    }
  },
};
