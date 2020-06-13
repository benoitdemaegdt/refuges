const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

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
  configureWebpack: {
    plugins: [new BundleAnalyzerPlugin()]
  },
  chainWebpack: (config) => {
    config.plugins.delete('prefetch')
  },
};
