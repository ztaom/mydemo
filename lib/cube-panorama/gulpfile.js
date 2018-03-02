var gulp = require('gulp');
var imgUploader = require('@ali/gulp-img-uploader');

var IMG_PATH = 'images/';
var IMG_TYPES = ['png', 'jpg', 'jpeg', 'gif'];
var images = IMG_PATH + '**/*.{' + IMG_TYPES.join(',') + '}';


gulp.task('default', ['images'], function () {
  console.log('done');
});

gulp.task('images', function () {
  return gulp.src(images)
    .pipe(imgUploader());
});
