module.exports = {
  publicPath: "/",
  transpileDependencies: ["vuetify"],
  pwa: {
    workboxPluginMode: 'GenerateSW',
    workboxOptions: {
      exclude: [/\.map$/, /_redirects/],
      skipWaiting: true,
    },
  },
  chainWebpack: (config) => {
    config.module
      .rule("vue")
      .use("vue-loader")
      .loader("vue-loader")
      .tap((options) => {
        options.transformAssetUrls = {
          "v-img": "src",
        };
        return options;
      });
    config.plugin("VuetifyLoaderPlugin").tap(() => [
      { progressiveImages: true },
    ]);
  },
};
