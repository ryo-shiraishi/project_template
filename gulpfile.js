const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require("gulp-autoprefixer");
const plumber = require("gulp-plumber"); // sass エラー時、監視をストップしない
const sourcemaps = require("gulp-sourcemaps");

const webpackStream = require('webpack-stream');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');

gulp.task('sass', function(){
  gulp.src('./src/scss/style.scss')
  .pipe(plumber())
  .pipe(sourcemaps.init())
  .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
  .pipe(sourcemaps.write({includeContent: false}))
  .pipe(sourcemaps.init({loadMaps: true}))
  .pipe(autoprefixer(['last 2 versions', 'ie >= 10', 'Android >= 4', 'iOS >= 8']))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('./'));
});

gulp.task('watch', ['sass'], function(){
  var watcherScss = gulp.watch('./src/scss/**/*.scss', ['sass']);
  watcherScss.on('change', function(event){});

  var watcherJs = gulp.watch('./src/js/*.js', ['webpack']);
  watcherJs.on('change', function(event){});
});

gulp.task('webpack', function(){
  return gulp.src('./src/js/*.js')
  .pipe(plumber())
  .pipe(webpackStream(webpackConfig, webpack))
  .pipe(gulp.dest('./dest/js/'));
});


gulp.task('default', ['watch']);
