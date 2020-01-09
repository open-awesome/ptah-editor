// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
  configureWebpack: {
    resolve: {
      alias: require('./aliases.config').webpack
    },
    optimization: {
      minimizer: [new OptimizeCSSAssetsPlugin({})]
    },
    module: {
      rules: [
        {
          resourceQuery: /blockType=i18n/,
          type: 'javascript/auto',
          loader: '@kazupon/vue-i18n-loader'
        },
        {
          test: /\.(sa|sc|c)ss$/,
          include: [
            path.resolve(__dirname, 'src/assets/sass/sections')
          ],
          use: [
            {
              loader: MiniCssExtractPlugin.loader
            },
            'css-loader',
            'sass-loader'
          ]
        }
      ]
    },

    plugins: [
      // new BundleAnalyzerPlugin(),
      new MiniCssExtractPlugin({
        filename: '[name].css'
      })
    ]
  },

  chainWebpack: config => {
    config
      .entry('ptah_sections')
      .add('./src/assets/sass/sections/sections.sass')
      .end()
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
