var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifycss = require('gulp-minify-css');
var jshint = require('gulp-jshint');
var connect = require('gulp-connect');
var gutil = require('gulp-util');
var ghPages = require('gulp-gh-pages');


// *******************************************

gulp.task('buildApp', function(){
  return gulp.src(['src/js/app.js','src/js/**/*.js'])
    .pipe(concat('app.js'))
    .pipe(uglify({mangle: false}).on('error', gutil.log))
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload());
});

gulp.task('buildVendor', function(){
  return gulp.src([
    'bower_components/angular/angular.min.js',
    'bower_components/angular-route/angular-route.min.js',
    'bower_components/angular-sanitize/angular-sanitize.min.js',
    'bower_components/angular-cookies/angular-cookies.min.js',
    'bower_components/firebase/firebase.js',
    'bower_components/angularfire/dist/angularfire.min.js',
    'bower_components/jquery/dist/jquery.min.js',
    'bower_components/chart.js/dist/Chart.min.js',
    'bower_components/angular-chart.js/dist/angular-chart.min.js',
    'bower_components/bootstrap/js/tooltip.js',
    'bower_components/bootstrap/js/**/*.js'])
    .pipe(concat('vendors.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('buildCSS', function(){
  return gulp.src([
    'src/css/homestyle.css',
    'bower_components/**/*.css',
    'src/css/**/*.css'])
  .pipe(concat('styles.css'))
  .pipe(minifycss())
  .pipe(gulp.dest('dist'))
  .pipe(connect.reload());
});

gulp.task('moveHTML', function(){
  return gulp.src('src/**/*.html')
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload());
});


gulp.task('build', ['buildVendor', 'buildApp', 'buildCSS', 'moveHTML']);

// **********************************

gulp.task('connect', function(){
  connect.server({
    root: 'dist',
    livereload: true
  });
});

gulp.task('watch', function(){
  gulp.watch('src/js/**/*.js', ['buildApp']);
  gulp.watch('src/css/**/*.css', ['buildCSS']);
  gulp.watch('src/**/*.html', ['moveHTML']);
});

// *******************************************
gulp.task('deploy', function() {
  return gulp.src('dist/**/*')
    .pipe(ghPages());
});

// *******************************************

gulp.task('default', ['build', 'watch', 'connect', 'deploy']);
