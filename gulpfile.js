const gulp = require('gulp')
const gutil = require('gulp-util')
const webpack = require('webpack')
const path = require('path')

const i18nConvertor = require('./utils/i18nConvertor')
const gsheetsDataProvider = require('./utils/gsheetsDataProvider')

gulp.task('cjs', function (callback) {
  let myConfig = {
    mode: (process.env.npm_config_development) ? 'development' : 'production',
    entry: {
      preload: './src/cscripts/index.js'
    },
    output: {
      path: path.join(__dirname, './public/js'),
      publicPath: './public/js',
      filename: 'cjs.js'
    }
  }

  // run webpack
  webpack(myConfig, function (err, stats) {
    if (err) throw new gutil.PluginError('webpack', err)
    gutil.log('[webpack]', stats.toString({
      colors: true,
      progress: true
    }))
    callback()
  })
})

gulp.task('public-image', function () {
  gulp.src([
    './src/assets/img/**/*.jpg',
    './src/assets/img/**/*.png',
    './src/assets/img/**/*.gif',
    './src/assets/img/**/*.svg'])
    .pipe(gulp.dest('./public/img'))
})

gulp.task('locale_sync', (callback) => {
  // update locales from google sheets API
  gsheetsDataProvider.getLocales((rawData) => {
    const jsonData = JSON.parse(rawData)
    i18nConvertor.fromAllLocaleDataToFiles(jsonData)

    callback()
  })
})
