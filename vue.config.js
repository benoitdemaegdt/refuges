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
};
