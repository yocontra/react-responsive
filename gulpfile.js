'use strict';

var http = require('http');
var path = require('path');

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var sourcemaps = require('gulp-sourcemaps');
var lr = require('gulp-livereload');
var cached = require('gulp-cached');
var deploy = require('gulp-gh-pages');

var merge = require('merge-stream');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var watchify = require('watchify');
var browserify = require('browserify');
var ecstatic = require('ecstatic');
var reactify = require('reactify');

var paths = {
  js: 'src/**/*.js'
};

var bundleCache = {};
var pkgCache = {};

var bundler = watchify(browserify('./src/index.js', {
  cache: bundleCache,
  packageCache: pkgCache,
  fullPaths: false,
  standalone: 'react-responsive',
  debug: true
}));

var sampleBundler = watchify(browserify('./samples/sandbox/src/index.jsx', {
  cache: bundleCache,
  packageCache: pkgCache,
  fullPaths: false,
  standalone: 'sample',
  debug: true
}));
sampleBundler.transform(reactify);

var staticSampleBundler = watchify(browserify('./samples/static/src/index.jsx', {
  cache: bundleCache,
  packageCache: pkgCache,
  fullPaths: true,
  standalone: 'sample',
  debug: true
}));
staticSampleBundler.transform(reactify);

gulp.task('watch', function(){
  bundler.on('update', function(){
    gulp.start('js');
  });
  sampleBundler.on('update', function(){
    gulp.start('samples');
  });
});

gulp.task('js', function(){
  var browserifyStream = bundler.bundle()
    // browserify -> gulp transfer
    .pipe(source('react-responsive.js'))
    .pipe(buffer())
    .pipe(cached('js'))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'));

  var lintStream = gulp.src(paths.js)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));

  return merge(browserifyStream, lintStream);
});

gulp.task('samples', function(){
  var browserifyStream = sampleBundler.bundle()
    // browserify -> gulp transfer
    .pipe(source('sample.js'))
    .pipe(buffer())
    .pipe(cached('samples'))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('samples/sandbox/dist'))
    .pipe(lr());

  var browserifyStream2 = staticSampleBundler.bundle()
    // browserify -> gulp transfer
    .pipe(source('index.js'))
    .pipe(buffer())
    .pipe(cached('index'))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('samples/static/dist'));

  var staticStream = gulp.src(['samples/sandbox/src/**/*', '!samples/sandbox/src/**/*.js'])
    .pipe(cached('static-samples'))
    .pipe(gulp.dest('samples/sandbox/dist'));

  return merge(staticStream, browserifyStream, browserifyStream2);
});

gulp.task('sample-server', function(cb){
  var port = parseInt(process.env.PORT) || 9090;
  var rootFolder = path.join(__dirname, './samples/sandbox/dist');
  var server = http.createServer(ecstatic({root: rootFolder}));
  server.listen(port, cb);
});

gulp.task('deploy', function(){
  return gulp.src('./samples/sandbox/dist/**/*')
    .pipe(deploy());
});

gulp.task('default', ['js', 'samples', 'sample-server', 'watch']);
