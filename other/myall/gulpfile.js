/*
  页面结构
  myall
    -src    设计文件
      -css
      -js
      -img
      -less
    -public 压缩打包上线文件
      -css
      -js
      -img
*/

// 引入 gulp
var gulp = require('gulp');
 
// 引入组件
var htmlmin = require('gulp-htmlmin'), //html压缩
    imagemin = require('gulp-imagemin'),//图片压缩
    pngcrush = require('imagemin-pngcrush'),
    minifycss = require('gulp-minify-css'),//css压缩
    cleanCSS = require('gulp-clean-css'),
    less = require('gulp-less'),
    jshint = require('gulp-jshint'),//js检测
    uglify = require('gulp-uglify'),//js压缩
    //babel = require('gulp-babel'),
    concat = require('gulp-concat'),//文件合并
    rename = require('gulp-rename'),//文件更名
    browserSync = require('browser-sync'),
    argv = require('yargs').argv,
    notify = require('gulp-notify');//提示信息
 
// 压缩html
gulp.task('html', function() {
  return gulp.src('*.html')
    .pipe(htmlmin({collapseWhitespace: true,minifyJS:true,minifyCSS:true,removeEmptyAttributes:true}))
    .pipe(gulp.dest('./public'))
    .pipe(notify({ message: 'html task ok' }));
 
});
 
// 压缩图片
gulp.task('img', function() {
  return gulp.src('src/img/*')
    .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngcrush()]
    }))
    .pipe(gulp.dest('./public/img'))
    .pipe(notify({ message: 'img task ok' }));
});

// 解析less
gulp.task('less', function() {
  return gulp.src('src/less/*.less')
    .pipe(less())
    .pipe(gulp.dest('src/css'))
    .pipe(notify({ message: 'less task ok' }));
});
 

// 合并、压缩、重命名css
gulp.task('css', function() {
  return gulp.src(['src/css/*.css'])
    //.pipe(cleanCSS())
    .pipe(concat('myall.css'))
    .pipe(gulp.dest('public/css'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('public/css'))
    .pipe(notify({ message: 'css task ok' }));
});

// 检查js
gulp.task('lint', function() {
  return gulp.src('src/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(notify({ message: 'lint task ok' }));
});
 
// 合并、压缩js文件
gulp.task('js', function() {
  return gulp.src('src/js/*.js')
    .pipe(concat('myall.js'))
    .pipe(gulp.dest('public/js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('public/js'))
    .pipe(notify({ message: 'js task ok' }));
});


//自动刷新
var path = {
    baseDir: "./"
};

gulp.task('browserSync', function() {
    var scope = this,files="";
    if(argv.p){//生产环境
            files = 'public';
        }else{//非生产环境
            files = 'src';
        }
    browserSync.init(files, {
        server: {
            baseDir: path.baseDir
        }
    });

});

 
// 默认任务
gulp.task('default', function(){
  gulp.run('img', 'css','less', 'lint', 'js', 'html', 'browserSync');
 
  // 监听html文件变化
  gulp.watch('src/*.html', function(){
    gulp.run('html');
  });

  // Watch .css files
  gulp.watch('src/less/*.less', ['less']);
 
  // Watch .css files
  gulp.watch('src/css/*.css', ['css']);
 
  // Watch .js files
  gulp.watch('src/js/*.js', ['lint', 'js']);
 
  // Watch image files
  gulp.watch('src/img/*', ['img']);

});