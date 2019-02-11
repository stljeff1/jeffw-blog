'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');

var cssnano = require('gulp-cssnano');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var sassGlob = require('gulp-sass-glob');


var browserify = require('browserify');
var source = require('vinyl-source-stream');

var babelify = require('babelify');


var THEME_DIR = "./",

	ASSETS_DIR = THEME_DIR + 'assets/',

	SITE_STYLES_INIT_FILE = ASSETS_DIR + "scss/site.scss",

	FOUNDATION_STYLES_INIT_FILE = ASSETS_DIR + "scss/foundation-custom.scss",

	DESTINATION_STYLES = 'site.css',

	DESTINATION__FOUNDATION = 'foundation-custom.css',

	CSS_UTIL_DIR = 'node_modules/foundation-sites/scss/'
;



sass.compiler = require('node-sass');


gulp.task('foundation', function () {
  return gulp.src(FOUNDATION_STYLES_INIT_FILE)
    .pipe(sass({includePaths: [CSS_UTIL_DIR]}).on('error', sass.logError))
    //.pipe(sourcemaps.init())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    //.pipe(sourcemaps.write())
    .pipe(gulp.dest(ASSETS_DIR))
    .pipe(cssnano())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(ASSETS_DIR));
});

gulp.task('bundle-js', function() {
  var bundleStream = browserify({
    entries: './assets/js/vendor.js'
  }) .transform('babelify', {

    // https://babeljs.io/docs/en/env/
    presets: ['@babel/preset-env']
  }).bundle();

  bundleStream.pipe(source('vendor-bun.js'))
    .pipe(gulp.dest('./assets'));
});

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
        entries: 'assets/js/vendor.js',
        debug: true,
        extensions: ['.js', '.json', '.es6'],
        paths: ['node_modules/foundation-sites/dist/js/plugins']
    })
        .transform(babelify)
        .bundle()
        .pipe(source('all.js'))
        .pipe(gulp.dest('assets'));
});

gulp.task('sass', function () {
  	return gulp.src(SITE_STYLES_INIT_FILE)
	  	.pipe(sourcemaps.init())
      .pipe(sassGlob())
		  .pipe(sass({includePaths: [CSS_UTIL_DIR]}).on('error', sass.logError))
    	.pipe(rename(DESTINATION_STYLES))
		  .pipe(gulp.dest(ASSETS_DIR));
});



gulp.task('watch', function () {
  return gulp.watch(ASSETS_DIR + 'scss/**/*.scss', gulp.series('sass'));
});


gulp.task('watch-foundation', function () {
  return gulp.watch(ASSETS_DIR + 'scss/utils/_site-vars.scss', gulp.series('foundation'));
});

gulp.task('watch-all', gulp.parallel(['watch', 'watch-foundation']));

