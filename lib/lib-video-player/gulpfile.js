var gulp = require('gulp'),
  minifycss = require('gulp-minify-css'),
  uglify = require('gulp-uglify'),
  webpack = require('gulp-webpack'),
  named = require('vinyl-named'),
  watch = require('gulp-watch'),
  del = require('del');

var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var px2rem = require('postcss-px2rem');
var webpackConfig = require('./webpack.config.js');
var processors = [px2rem({
  remUnit: 75
}), autoprefixer({
  browsers: ['ios_saf >= 7', 'android >= 4']
})];

gulp.task('clean', function(cb) {
  return del(['./publish/*']);
});

gulp.task('webpack', function() {
  return gulp.src('./src/index.js')
    .pipe(webpack(webpackConfig()))
    .pipe(uglify()) //压缩
    .pipe(gulp.dest('./publish/'))
});

gulp.task('webpack_watch', function() {
  return gulp.src('./src/index.js')
    .pipe(webpack(webpackConfig(true)))
    .pipe(gulp.dest('./publish/'))
});

gulp.task('css', function() {
  return gulp.src('./src/css/*.css')
    .pipe(minifycss()) //执行压缩
    .pipe(gulp.dest('./publish/'))
    .pipe(postcss(processors))
    .pipe(gulp.dest('./src/cssrem/'))
    .pipe(minifycss()) //执行压缩
    .pipe(gulp.dest('./publish/cssrem/'));
});

gulp.task('css_watch', function() {
  return watch('./src/css/*.css', { ignoreInitial: false })
    .pipe(gulp.dest('./publish/'))
    .pipe(postcss(processors))
    .pipe(gulp.dest('./src/cssrem/'))
    .pipe(gulp.dest('./publish/cssrem/'));
});

gulp.task('build', ['clean', 'webpack', 'css'], function() {});
gulp.task('watch', ['webpack_watch', 'css_watch'], function() {});
