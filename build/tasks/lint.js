'use strict';

let gulp = require('gulp'),
	changed = require('gulp-changed'),
	paths = require('../paths'),
	eslint = require('gulp-eslint');

gulp.task('lint', () => {
	return gulp.src(paths.src)
		.pipe(changed(paths.output, { extensions: '.js' }))
		.pipe(eslint())
		.pipe(eslint.format());
});
