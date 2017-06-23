import gulp from 'gulp';
import changedInPlace from 'gulp-changed-in-place';
import sourcemaps from 'gulp-sourcemaps';
import postcss from 'gulp-postcss';
import cssnext from 'postcss-cssnext';
import precss from 'precss';
import project from '../aurelia.json';
import {build} from 'aurelia-cli';

export default function processCSS(done) {
	let processors = [
		cssnext({ browsers: ['last 2 version'] }),
		precss({
			variables: {
				variables: require(project.cssProcessor.variables)
			}
		})
	];

	return gulp.src(project.cssProcessor.source)
		.pipe(changedInPlace({firstPass: true}))
		.pipe(sourcemaps.init())
		.pipe(postcss(processors)).on('error', error => {
			console.log(error)
			done();
		})
		.pipe(build.bundle());
}
