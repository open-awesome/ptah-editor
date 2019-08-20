const path = require('path')

module.exports = {
  configureWebpack: {
    resolve: {
      alias: require('./aliases.config').webpack
    },
    module: {
      rules: [
        {
          resourceQuery: /blockType=i18n/,
          type: 'javascript/auto',
          loader: '@kazupon/vue-i18n-loader'
        }
      ]
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'sass',
      patterns: [path.resolve(__dirname, 'src/assets/sass/_colors.sass')]
    }
  },
  css: {
    extract: false
  },
  transpileDependencies: [
    'vue-update-message'
  ]
}
