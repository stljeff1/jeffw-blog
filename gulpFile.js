'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');

var cssnano = require('gulp-cssnano');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var sassGlob = require('gulp-sass-glob');


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

