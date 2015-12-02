'use strict';

let gulp = require('gulp'),
	runSequence = require('run-sequence'),
	changed = require('gulp-changed'),
	plumber = require('gulp-plumber'),
	babel = require('gulp-babel'),
	sourcemaps = require('gulp-sourcemaps'),
	sass = require('gulp-sass'),
	paths = require('../paths'),
	compilerOptions = require('../babel-options'),
	notify = require("gulp-notify"),
	browserSync = require('browser-sync');

gulp.task('build-js', ['lint'], () => {
	return gulp.src(paths.src)
		.pipe(plumber({
			errorHandler: notify.onError('Error: <%= error.message %>')
		}))
		.pipe(changed(paths.output, {extensions: '.js'}))
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(babel(Object.assign({}, compilerOptions)))
		.pipe(sourcemaps.write('maps'))
		.pipe(gulp.dest(paths.output));
});

gulp.task('build-html', () => {
	return gulp.src(paths.html)
		.pipe(changed(paths.output, {extension: '.html'}))
		.pipe(gulp.dest(paths.output));
});

gulp.task('build-css', () => {
	return gulp.src(paths.styleScss)
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(sourcemaps.write('maps'))
		.pipe(gulp.dest(paths.output));
});

gulp.task('build', callback => {
	return runSequence(
		'clean',
		[
			'build-js',
			'build-html',
			'build-css'
		],
		callback
	);
});
