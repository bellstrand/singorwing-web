let gulp = require('gulp'),
	runSequence = require('run-sequence'),
	del = require('del'),
	vinylPaths = require('vinyl-paths'),
	paths = require('../paths'),
	bundles = require('../bundles.js'),
	resources = require('../export.js');

gulp.task('clean-export', () => {
	return gulp.src([paths.export])
		.pipe(vinylPaths(del));
});

function getBundles() {
	let bl = [];
	for (let b in bundles.bundles) {
		bl.push(b + '*.js');
	}
	return bl;
}

function getExportList() {
	return resources.list.concat(getBundles());
}

gulp.task('export-copy', () => {
	return gulp.src(getExportList(), { base: '.' })
		.pipe(gulp.dest(paths.export));
});

// use after prepare-release
gulp.task('export', callback => {
	return runSequence(
		'bundle',
		'clean-export',
		'export-copy',
		callback
	);
});
