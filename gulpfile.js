var gulp = require('gulp');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var ghPages = require('gulp-gh-pages');
var jade = require('gulp-jade');
var path = require('path');

gulp.task('less', function () {
  var LessPluginCleanCSS = require("less-plugin-clean-css"),
      cleancss = new LessPluginCleanCSS({advanced: true});
  
  var LessPluginAutoPrefix = require('less-plugin-autoprefix'),
      autoprefix= new LessPluginAutoPrefix({browsers: ["last 3 versions"]});
  
  
  gulp.src('./less/*.less')
    .pipe(sourcemaps.init())
    .pipe(less({
      paths: [ path.join(__dirname, 'bower_components') ],
      plugins: [autoprefix, cleancss]
     }))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./dist/css'));

});

gulp.task('copy', function() {
  gulp.src(['./CNAME', './static/**/*' ])
    .pipe(gulp.dest('./dist/'))
  gulp.src([path.join(__dirname, 'bower_components', 'video.js') + '/**/*' ])
    .pipe(gulp.dest('./dist/video.js'))
});
var local = true;
var media = local ? '' : '', base = local ? '' : '';
gulp.task('jade', function() {
  gulp.src('./jade/**/*.jade')
    .pipe(jade({locals:{media_root:media,base_url:base}}))
    .pipe(gulp.dest('./dist/'))
});
 
gulp.task('deploy', function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages({branch:'gh-pages', force:true}));
});


gulp.task('connect', function () {
    var connect = require('connect');
    var serveStatic = require('serve-static');
    var serveIndex = require('serve-index');
    
    var app = connect()
        .use(require('connect-livereload')({ port: 35729 }))
        .use(serveStatic('./dist/'))
        .use(serveIndex('./dist/'));

    require('http').createServer(app)
        .listen(9000)
        .on('listening', function() {
            console.log('Started connect web server on http://localhost:9000.');
        });
});

gulp.task('serve', ['connect'], function () {
    var livereload = require('gulp-livereload');

    livereload.listen();

    require('opn')('http://localhost:9000');
    
    var listen_globs = ['./dist/**/*']

    var delay_livereload = function(timeout) {
      return function(vinyl) {
        setTimeout(function() { livereload.changed(vinyl) }, timeout)
      };
    }

    gulp.watch(listen_globs).on('change', delay_livereload(500));
    
    gulp.watch(['./jade/**/*'], ['jade']);
    gulp.watch(['./less/**/*'], ['less']);
});