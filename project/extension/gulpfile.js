/**
 * Created by youku on 2015/9/10.
 */
var gulp = require('gulp'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    plugins = gulpLoadPlugins(),
    browserSync = require('browser-sync');


gulp.task('default',["clean","minifyCss","uglify"] ,function () {
    var files = [
        './*.html',
        './css/*.css',
        './js/*.js'
    ];

    browserSync.init(files, {
        server: {
            baseDir: './'
        }
    });
});

gulp.task('clean', function () {
    return gulp.src(["js/extension.js"], {read: false})
        .pipe(plugins.clean());
});

gulp.task("uglify",function(){
    var watcher = gulp.watch('build/*.js');
    watcher.on('change', function (event) {
        gulp.src("build/*.js")
            .pipe(plugins.jshint())
            .pipe(plugins.uglify())
            .pipe(gulp.dest("js"));
    });

    /*gulp.src("build/*.js")
        .pipe(plugins.watch("build/*.js"))
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('default'))
        .pipe(plugins.uglify())
        .pipe(gulp.dest("js"));*/
});
/*
gulp.task("afterUglify",["uglify"],function(){
    console.log(123)
    gulp.src(["js/!*.js","!js/U*.js"])
        .pipe(plugins.concat("Util.js"))
        .pipe(gulp.dest("js"));
});*/

gulp.task("minifyCss",function(){
    gulp.src("less/*.less")
        .pipe(plugins.watch("less/*.less"))
        .pipe(plugins.less())
        .pipe(plugins.autoprefixer())
        .pipe(plugins.minifyCss())
        .pipe(gulp.dest("css"));
});




/*gulp.task("tt",function(){
    var watch = gulp.watch("less/gulp.less");
    watch.on("change",function(event){
        gulp.src("less/gulp.less")
            .pipe(plugins.less())
            .pipe(gulp.dest("css"))
            .pipe(plugins.livereload());
    });
});*/

/*gulp.task("aaa",function(){
    var watch = gulp.watch("*.html",["build"]);
    watch.on("change",function(event){
        console.log(event.type)
        watch.remove("gulp.html");
    });
})


gulp.task("build",function(){
    console.log("build")
});*/



/*
gulp.task("js",["css","imgs"],function(){
    console.log(123)
    aaa();
    console.log()
});
gulp.task("css",function(){
    console.log(0)
});
gulp.task("imgs",function(){
    console.log(2)
});*/

/*gulp.task("done",["css","js","imgs"]);

gulp.task("css",function(){
    console.log(0)
});
gulp.task("js",function(){
    console.log(1)
});
gulp.task("imgs",function(){
    console.log(2)
});*/

/*gulp.task("greet",function(){
    console.log(123)
});*/

/*
gulp.task('js', function () {
    return gulp.src('js/!*.js')
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('default'))
        .pipe(plugins.uglify())
        .pipe(plugins.concat('app.js'))
        .pipe(gulp.dest('build'));
});*/
