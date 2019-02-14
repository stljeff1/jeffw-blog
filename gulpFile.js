'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');

var cssnano = require('gulp-cssnano');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var sassGlob = require('gulp-sass-glob');
var gulpMerge = require('gulp-merge')

var browserify = require('browserify');
var source = require('vinyl-source-stream');

var babelify = require('babelify');


var THEME_DIR = "./",

	ASSETS_DIR = THEME_DIR + 'assets/',

	SITE_STYLES_INIT_FILE = ASSETS_DIR + "scss/site.scss",

  SITE_SCRIPTS_INIT_FILE = ASSETS_DIR + 'js/site.js',

	VENDOR_STYLES_INIT_FILE = ASSETS_DIR + "scss/vendor.scss",

	DESTINATION_FOLDER = ASSETS_DIR + "dist/",

	DESTINATION_VENDOR_STYLES = 'vendor.css',

	INCLUDE_DIRS = [
    'node_modules/'
  ]
;



sass.compiler = require('node-sass');


gulp.task('foundation', function () {
  return gulp.src(ASSETS_DIR + 'scss/vendor/foundation-custom.scss')
    .pipe(sass({includePaths: ['node_modules/foundation-sites/scss', 'node_modules']}).on('error', sass.logError))
    //.pipe(sourcemaps.init())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    //.pipe(sourcemaps.write())
    .pipe(gulp.dest(DESTINATION_FOLDER))
    .pipe(cssnano())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(DESTINATION_FOLDER));
});

gulp.task('vendor-styles', function () {
  return gulp.src(VENDOR_STYLES_INIT_FILE)
    .pipe(sass({includePaths: INCLUDE_DIRS}).on('error', sass.logError))
    //.pipe(sourcemaps.init())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    //.pipe(sourcemaps.write())
    .pipe(gulp.dest(DESTINATION_FOLDER + DESTINATION_VENDOR_STYLES))
    .pipe(cssnano())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(DESTINATION_FOLDER));
});

// gulp.task('bundle-js', function() {
//   var bundleStream = browserify({
//     entries: SITE_SCRIPTS_INIT_FILE
//   }) .transform('babelify', {

//     // https://babeljs.io/docs/en/env/
//     presets: ['@babel/preset-env']
//   }).bundle();

//   bundleStream.pipe(source('vendor-bun.js'))
//     .pipe(gulp.dest('./assets'));
// });

// gulp.task('js', function() {


//     return browserify({
//         entries: 'assets/js/site.js',
//         debug: true,
//         extensions: ['.js', '.json', '.es6'],
//         paths: ['node_modules/foundation-sites/dist/js/plugins']
//     })
//         .transform(babelify)
//         .bundle()
//         .pipe(source('vendor.js'))
//         .pipe(gulp.dest('assets'));
// })

gulp.task('js', function() {

    return browserify({
        entries: SITE_SCRIPTS_INIT_FILE,
        debug: true,
        extensions: ['.js', '.json', '.es6'],
        paths: INCLUDE_DIRS
    })
        .transform(babelify)
        .bundle()
        .pipe(source('all.js'))
        .pipe(gulp.dest(DESTINATION_FOLDER));
});

gulp.task('sass', function () {
  	return gulp.src(SITE_STYLES_INIT_FILE)
	  	.pipe(sourcemaps.init())
      .pipe(sassGlob())
		  .pipe(sass({includePaths: ['node_modules/foundation-sites/scss', 'node_modules']}).on('error', sass.logError))
    	.pipe(rename('site.css'))
		  .pipe(gulp.dest(DESTINATION_FOLDER));
});



gulp.task('watch-styles', function () {
  return gulp.watch(ASSETS_DIR + 'scss/**/*.scss', gulp.series('sass'));
});

gulp.task('watch-js', function () {
  return gulp.watch(ASSETS_DIR + 'js/**/*.js', gulp.series('js'));
});


gulp.task('watch-vendor', function () {
  return gulp.watch(ASSETS_DIR + 'vendor/**/*.scss', gulp.series('vendor-styles'));
});

gulp.task('watch', gulp.parallel(['watch-styles', 'watch-js', 'watch-vendor']));

gulp.task('build', gulp.parallel(['foundation', 'js', 'sass']));

