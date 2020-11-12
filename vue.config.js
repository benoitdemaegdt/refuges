module.exports = {
  runtimeCompiler: true,
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
    config.plugins.delete('prefetch')
  },
};
