const PARAM_IDX = 55;
const QUALITY_FACTOR = 2;
const PARAMETERS = {
  standard: ['f_auto'],
  preload: ['f_auto', 'e_blur:10000', 'q_1'],
};

export default {
  methods: {
    getImage(imageList, index, { height, imageType = 'standard' }) {
      if (imageList[index].includes('cloudinary')) {
        return `${imageList[index].slice(0, PARAM_IDX)}h_${height * QUALITY_FACTOR},${this.getParams(imageType)}/${imageList[index].slice(PARAM_IDX)}`;
      }
    },
    getParams(imageType) {
      if (!Object.keys(PARAMETERS).includes(imageType)) return '';
      return PARAMETERS[imageType].join(',');
    }
  },
};
